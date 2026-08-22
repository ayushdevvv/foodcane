import { Activity, ChevronDown, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Topbar({ title, action }) {
  const { user } = useAuth();
  const initials = (user?.name || "FC")
    .split(" ")
    .map((x) => x[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[.07] bg-[#06100d]/80 px-5 py-4 backdrop-blur-2xl lg:px-8">
      <div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse" />
          <p className="text-[9px] font-black uppercase tracking-[.24em] text-emerald-300/80">
            Foodcane workspace
          </p>
        </div>
        <h1 className="mt-1 text-xl font-bold tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        {action}
        <div className="hidden items-center gap-2 rounded-full border border-white/[.07] bg-white/[.025] px-3 py-2 sm:flex">
          <Activity size={13} className="text-emerald-300" />
          <span className="text-[11px] font-medium text-slate-400">
            Network live
          </span>
        </div>
        <Link
          to="/profile"
          className="group flex items-center gap-2 rounded-full border border-white/[.07] bg-white/[.025] py-1 pl-1 pr-3 hover:border-emerald-400/20"
        >
          <span className="avatar sm:h-8 sm:w-8">{initials}</span>
          <span className="hidden text-left sm:block">
            <b className="block max-w-[110px] truncate text-xs">{user?.name}</b>
            <span className="text-[9px] uppercase tracking-widest text-slate-600">
              Profile
            </span>
          </span>
          <ChevronDown size={13} className="hidden text-slate-600 sm:block" />
        </Link>
      </div>
    </header>
  );
}
