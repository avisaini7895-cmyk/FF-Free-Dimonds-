import { Bell, ChartNoAxesCombined, ShieldCheck, Users, WalletCards } from "lucide-react";
import { Logo } from "@/components/logo";
import { StatCard } from "@/components/stat-card";

const users = [
  ["Aarav Gamer", "9988776655", "DTX8F2A", 72, "ACTIVE"],
  ["Neon Queen", "8877665544", "NQ22XA", 100, "WITHDRAWAL"],
  ["Headshot Pro", "7766554433", "HSPRO9", 41, "ACTIVE"]
];

export default function AdminPage() {
  return (
    <main className="min-h-screen px-6 py-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between"><Logo /><span className="rounded-full bg-purple-400/15 px-4 py-2 text-purple-100"><ShieldCheck className="mr-2 inline" size={18} />Admin</span></nav>
      <section className="mx-auto mt-10 max-w-7xl">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard icon={Users} label="Total Users" value="12,408" />
          <StatCard icon={ChartNoAxesCombined} label="Ads Watched" value="1.8M" />
          <StatCard icon={WalletCards} label="Pending Withdrawals" value="86" />
          <StatCard icon={Bell} label="Suspicious Activity" value="14" />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <section className="glass rounded-[2rem] p-6">
            <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-black">User management</h1><input className="rounded-full border border-white/10 bg-white/5 px-4 py-2" placeholder="Search user" /></div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="text-white/50"><tr><th className="p-3">Name</th><th>Mobile</th><th>Referral</th><th>Diamonds</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user[2] as string} className="border-t border-white/10"><td className="p-3 font-bold">{user[0]}</td><td>{user[1]}</td><td>{user[2]}</td><td>{user[3]}</td><td>{user[4]}</td><td className="space-x-2"><button className="rounded-full bg-cyan-400/15 px-3 py-1 text-cyan-100">Edit</button><button className="rounded-full bg-red-400/15 px-3 py-1 text-red-100">Suspend</button></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="glass rounded-[2rem] p-6">
            <h2 className="text-2xl font-black">Withdrawal queue</h2>
            {['Approve', 'Reject', 'Mark Topup Complete'].map((action) => <button key={action} className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left font-bold">{action}</button>)}
            <h2 className="mt-8 text-2xl font-black">Ads management</h2>
            <textarea className="mt-4 min-h-32 w-full rounded-2xl border border-white/10 bg-white/5 p-4" placeholder="Paste AdMob, Monetag, Adsterra or custom HTML/JS ad code" />
          </section>
        </div>
      </section>
    </main>
  );
}
