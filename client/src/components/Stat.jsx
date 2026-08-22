export default function Stat({ label, value, icon: Icon }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
          <Icon size={19} />
        </span>
        <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-bold text-emerald-300">
          LIVE
        </span>
      </div>
      <p className="mt-5 text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}
