import { BadgeCheck, Clapperboard, Diamond, Gift, Share2, Trophy, Wallet } from "lucide-react";
import { Logo } from "@/components/logo";
import { StatCard } from "@/components/stat-card";

const tasks = [
  ["Task 1", "500 Ads", "Gun Skin", 68],
  ["Task 2", "1000 Ads", "Car Skin", 34],
  ["Task 3", "1500 Ads", "Rare Bundle", 23],
  ["Task 4", "2000 Ads", "2 Rare Bundles", 17],
  ["Task 5", "3000 Ads", "Elite Pass", 11]
];

export default function DashboardPage() {
  const diamonds = 72;
  const canWithdraw = diamonds >= 100;
  return (
    <main className="min-h-screen px-6 py-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between"><Logo /><button className="rounded-full border border-white/15 px-5 py-2">Edit Profile</button></nav>
      <section className="mx-auto mt-10 max-w-7xl">
        <div className="glass rounded-[2rem] p-6 md:p-8">
          <p className="text-cyan-200">Welcome back, Warrior</p>
          <h1 className="mt-2 text-4xl font-black">Your reward dashboard</h1>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <StatCard icon={Diamond} label="Diamond Balance" value={diamonds} />
            <StatCard icon={Share2} label="Referral Earnings" value="25" />
            <StatCard icon={Clapperboard} label="Ads Watched" value="342" />
            <StatCard icon={Trophy} label="Task Progress" value="5 Active" />
          </div>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <section className="glass rounded-[2rem] p-6">
            <h2 className="text-2xl font-black">Rewarded Ads</h2>
            <p className="mt-2 text-sm text-white/60">Buttons lock automatically at 100 diamonds until withdrawal is processed.</p>
            <div className="mt-6 grid gap-3">
              <button disabled={canWithdraw} className="rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-500 px-5 py-4 font-bold disabled:opacity-40">Watch Ad 1</button>
              <button disabled={canWithdraw} className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-4 font-bold disabled:opacity-40">Watch Ad 2</button>
              <button disabled={!canWithdraw} className="rounded-2xl border border-emerald-300/40 bg-emerald-400/10 px-5 py-4 font-bold text-emerald-200 disabled:opacity-40"><Wallet className="mr-2 inline" />Withdraw</button>
            </div>
          </section>
          <section className="glass rounded-[2rem] p-6">
            <h2 className="text-2xl font-black">Task milestones</h2>
            <div className="mt-5 space-y-4">
              {tasks.map(([title, requirement, reward, progress]) => (
                <div key={title as string} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-bold">{title} · {reward}</p><p className="text-sm text-white/50">Complete {requirement}</p></div><button className="rounded-full bg-white/10 px-4 py-2 text-sm"><Gift className="mr-1 inline" size={16} />Claim</button></div>
                  <div className="mt-3 h-3 rounded-full bg-white/10"><div className="h-3 rounded-full bg-gradient-to-r from-neonPurple to-neonBlue" style={{ width: `${progress}%` }} /></div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <section className="glass mt-6 rounded-[2rem] p-6">
          <h2 className="text-2xl font-black"><BadgeCheck className="mr-2 inline text-cyan-200" />Profile data</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3"><input placeholder="Full Name" className="rounded-2xl border border-white/10 bg-white/5 p-3" /><input placeholder="Free Fire UID" className="rounded-2xl border border-white/10 bg-white/5 p-3" /><input placeholder="Mobile Number" className="rounded-2xl border border-white/10 bg-white/5 p-3" /></div>
        </section>
      </section>
    </main>
  );
}
