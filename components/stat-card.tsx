import { LucideIcon } from "lucide-react";

export function StatCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string | number }) {
  return (
    <div className="glass rounded-3xl p-5 shadow-blueGlow">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200">
        <Icon size={22} />
      </div>
      <p className="text-sm text-white/60">{label}</p>
      <p className="mt-1 text-3xl font-black">{value}</p>
    </div>
  );
}
