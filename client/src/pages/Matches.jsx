import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";
import { api } from "../lib/api";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
import Map from "../components/Map";
const mins = (d) => Math.max(0, Math.round((new Date(d) - Date.now()) / 60000));
export default function Matches() {
  const { id } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  useEffect(() => {
    api
      .get(`/matches/${id || "FR1024"}`)
      .then((x) => setData(x.data))
      .catch((x) =>
        setErr(x.response?.data?.message || "Could not load matches"),
      );
  }, [id]);
  if (err)
    return (
      <Layout>
        <Topbar title="Smart matching" />
        <div className="p-8 text-rose-300">{err}</div>
      </Layout>
    );
  if (!data)
    return (
      <Layout>
        <Topbar title="Smart matching" />
        <div className="p-8 text-slate-500">Finding the best recipient…</div>
      </Layout>
    );
  const w = data.winner;
  const claim = async () => {
    const r = await api.patch(`/donations/${data.donation._id}/claim`, {});
    nav(`/tracking/${r.data.delivery._id}`);
  };
  return (
    <Layout>
      <Topbar title="Smart allocation" />
      <div className="space-y-6 p-5 lg:p-8">
        <section className="glass rounded-2xl p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-widest text-emerald-300">
                DONATION {data.donation.code}
              </p>
              <h2 className="mt-2 text-3xl font-black">
                {data.donation.quantity} {data.donation.unit}
              </h2>
              <p className="mt-1 text-slate-400">
                {data.donation.foodName} · {data.donation.foodType}
              </p>
            </div>
            <div className="rounded-xl bg-amber-400/10 px-4 py-3 text-right">
              <Clock3 className="ml-auto text-amber-300" size={17} />
              <p className="mt-1 text-lg font-bold text-amber-300">
                {mins(data.donation.expiryTime)} min
              </p>
              <p className="text-[10px] text-slate-500">until expiry</p>
            </div>
          </div>
        </section>
        <div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="text-emerald-300" size={18} />
              <h2 className="font-bold">SMART ALLOCATION</h2>
            </div>
            <div className="space-y-3">
              {data.matches.map((m, i) => (
                <div
                  key={m.recipient._id}
                  className={`rounded-2xl border p-5 ${i === 0 ? "border-emerald-400/30 bg-emerald-400/6" : "border-white/8 bg-white/[.02]"}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-full ${i === 0 ? "bg-emerald-400 text-[#07110f]" : "bg-white/5 text-slate-400"}`}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{m.recipient.name}</h3>
                          {i === 0 && (
                            <span className="rounded-full bg-emerald-400 px-2 py-1 text-[9px] font-black text-[#07110f]">
                              RECOMMENDED
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                          {m.distance} km · {m.recipient.role} ·{" "}
                          {m.recipient.capacity || "flexible"} capacity
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-emerald-300">
                        {m.score}%
                      </p>
                      <p className="text-[9px] uppercase tracking-widest text-slate-600">
                        match
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-5 gap-2">
                    {Object.entries(m.breakdown).map(([k, v]) => (
                      <div key={k}>
                        <div className="mb-1 flex justify-between text-[9px] text-slate-600">
                          <span>{k.replace("Score", "")}</span>
                          <span>{v}</span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-white/7">
                          <div
                            className="h-full rounded-full bg-emerald-400"
                            style={{ width: `${v}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {i === 0 && (
                    <div className="mt-5 rounded-xl border border-white/7 bg-[#07110f]/60 p-4">
                      <div className="flex gap-2">
                        <Info
                          size={16}
                          className="mt-0.5 shrink-0 text-emerald-300"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-200">
                            WHY THIS MATCH?
                          </p>
                          <ul className="mt-2 space-y-1 text-xs text-slate-400">
                            {m.reason.map((x) => (
                              <li key={x}>
                                <CheckCircle2
                                  className="mr-2 inline text-emerald-400"
                                  size={12}
                                />
                                {x}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <button
                        onClick={claim}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3 font-bold text-[#07110f]"
                      >
                        Accept match <ArrowRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section className="glass rounded-2xl p-4">
            <div className="mb-3 flex items-center justify-between px-2">
              <div>
                <p className="text-xs text-slate-500">ROUTE PREVIEW</p>
                <p className="font-bold">Provider to {w?.recipient.name}</p>
              </div>
              <MapPin className="text-emerald-300" size={18} />
            </div>
            <div className="h-[500px]">
              <Map
                provider={[
                  data.donation.coordinates.lat,
                  data.donation.coordinates.lng,
                ]}
                recipient={
                  w
                    ? [w.recipient.coordinates.lat, w.recipient.coordinates.lng]
                    : undefined
                }
              />
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
