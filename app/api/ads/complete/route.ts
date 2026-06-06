import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rewardCompletedAd } from "@/lib/rewards";
import { getBearerUser, rateLimit } from "@/lib/security";

const schema = z.object({ adId: z.string(), completionToken: z.string().min(10) });

export async function POST(req: NextRequest) {
  const limited = rateLimit(req);
  if (limited) return limited;
  const auth = getBearerUser(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = schema.parse(await req.json());
  // In production, verify completionToken against the selected ad network server-side callback.
  const user = await rewardCompletedAd(auth.userId, body.adId, req.headers.get("x-forwarded-for") ?? undefined, req.headers.get("user-agent") ?? undefined);
  return NextResponse.json({ diamondBalance: user.diamondBalance, adsWatched: user.adsWatched });
}
