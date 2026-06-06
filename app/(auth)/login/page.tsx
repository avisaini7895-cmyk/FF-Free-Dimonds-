import Link from "next/link";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-10">
      <section className="glass w-full max-w-md rounded-[2rem] p-8 shadow-glow">
        <Logo />
        <h1 className="mt-8 text-3xl font-black">Secure login</h1>
        <p className="mt-2 text-white/60">Google OAuth and JWT endpoints are ready for production credentials.</p>
        <button className="mt-8 w-full rounded-2xl bg-white px-5 py-4 font-bold text-slate-950">Continue with Google</button>
        <div className="my-6 flex items-center gap-3 text-xs text-white/40"><span className="h-px flex-1 bg-white/10" />OR<span className="h-px flex-1 bg-white/10" /></div>
        <form className="space-y-4">
          <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-300" placeholder="Email" type="email" />
          <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-300" placeholder="Password" type="password" />
          <button className="w-full rounded-2xl bg-gradient-to-r from-neonPurple to-neonBlue px-5 py-4 font-bold">Login / Register</button>
        </form>
        <div className="mt-6 flex justify-between text-xs text-white/50">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </div>
      </section>
    </main>
  );
}
