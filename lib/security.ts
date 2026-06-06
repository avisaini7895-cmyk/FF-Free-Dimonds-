import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const windowMs = 60_000;
const maxRequests = 60;
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const now = Date.now();
  const current = hits.get(ip);
  if (!current || current.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + windowMs });
    return null;
  }
  current.count += 1;
  if (current.count > maxRequests) return new Response("Too many requests", { status: 429 });
  return null;
}

export function signUserToken(payload: { userId: string; role: string }) {
  return jwt.sign(payload, process.env.JWT_SECRET ?? "dev-secret", { expiresIn: "7d" });
}

export function getBearerUser(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET ?? "dev-secret") as { userId: string; role: string };
  } catch {
    return null;
  }
}
