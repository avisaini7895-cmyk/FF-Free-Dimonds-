import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { makeReferralCode, REFERRAL_REWARD } from "@/lib/rewards";
import { rateLimit, signUserToken } from "@/lib/security";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
  referralCode: z.string().optional()
});

export async function POST(req: NextRequest) {
  const limited = rateLimit(req);
  if (limited) return limited;
  const body = schema.parse(await req.json());
  const passwordHash = await bcrypt.hash(body.password, 12);
  const referrer = body.referralCode ? await prisma.user.findUnique({ where: { referralCode: body.referralCode } }) : null;

  const user = await prisma.$transaction(async (tx) => {
    const created = await tx.user.create({
      data: {
        email: body.email,
        passwordHash,
        fullName: body.fullName,
        referralCode: makeReferralCode(body.fullName),
        referredById: referrer?.id
      }
    });
    if (referrer && referrer.id !== created.id) {
      await tx.referral.create({ data: { referrerId: referrer.id, referredId: created.id, reward: REFERRAL_REWARD } });
      await tx.user.update({ where: { id: referrer.id }, data: { diamondBalance: { increment: REFERRAL_REWARD } } });
      await tx.notification.create({ title: "New referral", message: `${referrer.fullName} earned ${REFERRAL_REWARD} diamonds.`, type: "REFERRAL" });
    }
    return created;
  });

  return NextResponse.json({ user, token: signUserToken({ userId: user.id, role: user.role }) }, { status: 201 });
}
