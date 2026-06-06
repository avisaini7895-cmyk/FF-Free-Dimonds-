import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [totalUsers, pendingWithdrawals, completedWithdrawals, totalAds] = await Promise.all([
    prisma.user.count(),
    prisma.withdrawal.count({ where: { status: "PENDING" } }),
    prisma.withdrawal.count({ where: { status: "TOPUP_COMPLETE" } }),
    prisma.user.aggregate({ _sum: { adsWatched: true } })
  ]);
  return NextResponse.json({ totalUsers, pendingWithdrawals, completedWithdrawals, totalAdsWatched: totalAds._sum.adsWatched ?? 0 });
}
