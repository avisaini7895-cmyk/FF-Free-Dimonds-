import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getBearerUser, rateLimit } from "@/lib/security";

const schema = z.object({
  profileImage: z.string().url().optional(),
  fullName: z.string().min(2),
  freeFireUid: z.string().min(4).optional(),
  mobileNumber: z.string().min(8).optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional()
});

export async function GET(req: NextRequest) {
  const auth = getBearerUser(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: auth.userId }, include: { taskProgress: { include: { task: true } }, withdrawals: true, rewards: true } });
  return NextResponse.json(user);
}

export async function PUT(req: NextRequest) {
  const limited = rateLimit(req);
  if (limited) return limited;
  const auth = getBearerUser(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = schema.parse(await req.json());
  const user = await prisma.user.update({
    where: { id: auth.userId },
    data: { ...body, dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : undefined }
  });
  return NextResponse.json(user);
}
