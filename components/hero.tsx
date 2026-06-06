"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Logo } from "./logo";

export function Hero() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-grid bg-[length:42px_42px] px-6 py-8">
      <motion.div className="absolute left-1/2 top-24 h-72 w-72 rounded-full bg-purple-600/25 blur-3xl" animate={{ scale: [1, 1.25, 1] }} transition={{ repeat: Infinity, duration: 5 }} />
      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between">
        <Logo />
        <div className="flex gap-3">
          <Link className="rounded-full border border-white/15 px-5 py-2 text-sm" href="/login">Login</Link>
          <Link className="rounded-full bg-cyan-300 px-5 py-2 text-sm font-bold text-slate-950" href="/dashboard">Dashboard</Link>
        </div>
      </nav>
      <section className="relative z-10 mx-auto grid max-w-6xl gap-10 py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-100">Premium esports reward platform</p>
          <h1 className="neon-text text-5xl font-black leading-tight md:text-7xl">Earn, track and withdraw gaming rewards.</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/70">DIMONDTOX includes rewarded ads, referrals, task milestones, secure withdrawals, audit logs and a powerful admin command center.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="rounded-2xl bg-gradient-to-r from-neonPurple to-neonBlue px-7 py-4 font-bold shadow-glow" href="/login">Start earning</Link>
            <Link className="rounded-2xl border border-white/15 px-7 py-4 font-bold" href="/admin">Admin panel</Link>
          </div>
          <p className="mt-5 text-xs text-white/45">Use only with publisher-approved rewards and compliant ad network callbacks.</p>
        </div>
        <div className="glass rounded-[2rem] p-6 shadow-glow">
          <div className="rounded-[1.5rem] bg-slate-950/70 p-5">
            {['Diamond Wallet', 'Referral Engine', 'Task Progress', 'Withdrawal Queue'].map((item, index) => (
              <motion.div key={item} className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .12 }}>
                <div className="flex items-center justify-between"><span>{item}</span><span className="text-cyan-200">ACTIVE</span></div>
                <div className="mt-3 h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-300" style={{ width: `${35 + index * 15}%` }} /></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
