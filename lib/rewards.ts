import { prisma } from "@/lib/prisma";

export const WITHDRAWAL_THRESHOLD = 100;
export const REFERRAL_REWARD = 5;

export function makeReferralCode(name: string) {
  const safe = name.replace(/[^a-z0-9]/gi, "").slice(0, 5).toUpperCase() || "DTX";
  return `${safe}${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export async function rewardCompletedAd(userId: string, adId: string, ip?: string, device?: string) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUniqueOrThrow({ where: { id: userId } });
    if (user.diamondBalance >= WITHDRAWAL_THRESHOLD) {
      throw new Error("Withdrawal threshold reached. Request withdrawal before watching more ads.");
    }

    const ad = await tx.ad.findFirst({ where: { id: adId, enabled: true } });
    const reward = ad?.reward ?? 1;
    const nextBalance = Math.min(user.diamondBalance + reward, WITHDRAWAL_THRESHOLD);

    const updated = await tx.user.update({
      where: { id: userId },
      data: { diamondBalance: nextBalance, adsWatched: { increment: 1 } }
    });

    await tx.reward.create({ data: { userId, type: "DIAMOND", amount: reward, source: "REWARDED_AD", metadata: { adId } } });
    await tx.transaction.create({ data: { userId, amount: reward, type: "CREDIT", status: "COMPLETED", reference: adId } });
    await tx.activityLog.create({ data: { userId, action: "AD_COMPLETED", ip, device, metadata: { adId, reward } } });

    const tasks = await tx.task.findMany({ orderBy: { order: "asc" } });
    for (const task of tasks) {
      const status = updated.adsWatched + 1 >= task.requiredAds ? "READY" : task.order === 1 ? "READY" : "LOCKED";
      await tx.userTask.upsert({
        where: { userId_taskId: { userId, taskId: task.id } },
        update: { progress: { increment: 1 }, status },
        create: { userId, taskId: task.id, progress: 1, status }
      });
    }

    if (nextBalance >= WITHDRAWAL_THRESHOLD) {
      await tx.notification.create({ title: "Withdrawal ready", message: `${user.fullName} reached 100 diamonds.`, type: "WITHDRAWAL_READY" });
    }

    return updated;
  });
}
