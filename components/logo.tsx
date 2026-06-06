export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-neonPurple to-neonBlue shadow-glow">
        💎
      </div>
      <div>
        <p className="text-xl font-black tracking-[.25em] text-white">DIMONDTOX</p>
        <p className="text-xs uppercase tracking-[.35em] text-cyan-200">Reward Arena</p>
      </div>
    </div>
  );
}
