import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  MapPinned,
  ShieldCheck,
  Utensils,
  ChevronDown,
} from "lucide-react";
export default function Landing() {
  return (
    <div className="grid-bg min-h-screen overflow-hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400 text-[#06110e]">
            <Utensils size={21} />
          </span>
          <b className="text-xl">Foodcane</b>
        </Link>
        <div className="flex gap-3">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2 text-sm text-slate-300 hover:bg-white/5"
          >
            Sign in
          </Link>
          <Link
            to="/login"
            className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-bold text-[#06110e]"
          >
            Explore demo
          </Link>
        </div>
      </nav>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:pt-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-3 py-2 text-xs font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Intelligent surplus food allocation
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-[.98] tracking-[-.04em] sm:text-7xl">
            Rescue surplus food{" "}
            <span className="text-emerald-300">before it expires.</span>
          </h1>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/login"
              className="group flex items-center gap-3 rounded-xl bg-emerald-400 px-5 py-3 font-bold text-[#06110e]"
            >
              Donate Food{" "}
              <ArrowRight
                size={17}
                className="transition group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-white/10 bg-white/[.03] px-5 py-3 font-semibold"
            >
              Find Food / Volunteer
            </Link>
          </div>
          <div className="mt-14 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["12,480+", "Meals rescued"],
              ["326", "Deliveries"],
              ["84", "Partners"],
              ["91%", "Allocation efficiency"],
            ].map((x) => (
              <div key={x[0]}>
                <b className="text-xl">{x[0]}</b>
                <p className="mt-1 text-xs text-slate-500">{x[1]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-emerald-400/5 blur-3xl" />
          <div className="glass relative rounded-[28px] p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">LIVE ALLOCATION</p>
                <p className="font-semibold">Donation #FR1024</p>
              </div>
              <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
                68 min left
              </span>
            </div>
            <div className="rounded-2xl bg-[#07110f] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-black">40</p>
                  <p className="text-xs text-slate-500">vegetarian meals</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">BEST MATCH</p>
                  <p className="text-lg font-bold text-emerald-300">94%</p>
                </div>
              </div>
              <div className="my-6 space-y-3">
                {[
                  ["Hope Foundation", "3.1 km", "94%"],
                  ["CareBridge NGO", "3.8 km", "78%"],
                  ["Helping Hands", "4.4 km", "71%"],
                ].map((x, i) => (
                  <div
                    key={x[0]}
                    className={`rounded-xl border p-3 ${i === 0 ? "border-emerald-400/30 bg-emerald-400/8" : "border-white/7 bg-white/[.02]"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid h-8 w-8 place-items-center rounded-full ${i === 0 ? "bg-emerald-400 text-[#07110f]" : "bg-white/5 text-slate-400"}`}
                        >
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{x[0]}</p>
                          <p className="text-xs text-slate-500">{x[1]}</p>
                        </div>
                      </div>
                      <b className="text-sm text-emerald-300">{x[2]}</b>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-white/[.03] p-4">
                <p className="text-xs font-bold text-slate-300">
                  WHY THIS MATCH?
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-400">
                  <li>Accepts all 40 meals</li>
                  <li>Volunteer available now</li>
                  <li>Verified partner</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-bold">
            From surplus to rescue in minutes.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {[
            ["01", "Donate", Utensils],
            ["02", "Analyze", Clock3],
            ["03", "Match", ShieldCheck],
            ["04", "Pickup", MapPinned],
            ["05", "Rescue", ArrowRight],
          ].map(([n, t, I]) => (
            <div key={n} className="glass rounded-2xl p-5">
              <span className="text-xs font-bold text-emerald-300">{n}</span>
              <I className="mt-8 text-slate-400" size={20} />
              <h3 className="mt-4 font-bold">{t}</h3>
            </div>
          ))}
        </div>
      </section>
      <footer className="border-t border-white/8 px-6 py-8 text-center text-xs text-slate-500">
        Foodcane · Intelligent Surplus Food Allocation & Rescue
      </footer>
    </div>
  );
}
