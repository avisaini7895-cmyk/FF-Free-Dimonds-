import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { WITHDRAWAL_THRESHOLD } from "@/lib/rewards";
import { getBearerUser, rateLimit } from "@/lib/security";

export async function POST(req: NextRequest) {
  const limited = rateLimit(req);
  if (limited) return limited;
  const auth = getBearerUser(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUniqueOrThrow({ where: { id: auth.userId } });
  if (user.diamondBalance < WITHDRAWAL_THRESHOLD) return NextResponse.json({ error: "Minimum 100 diamonds required" }, { status: 400 });
  const withdrawal = await prisma.withdrawal.create({ data: { userId: user.id, amount: user.diamondBalance } });
  await prisma.notification.create({ title: "Withdrawal request", message: `${user.fullName} requested ${user.diamondBalance} diamonds.`, type: "WITHDRAWAL" });
  return NextResponse.json(withdrawal, { status: 201 });
}
