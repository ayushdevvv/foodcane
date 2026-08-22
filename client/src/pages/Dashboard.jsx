import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Utensils,
  Truck,
  Users,
  PackageCheck,
  Plus,
  Clock3,
  ArrowUpRight,
  MapPinned,
} from "lucide-react";
import { api } from "../lib/api";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
import Stat from "../components/Stat";
import Map from "../components/Map";
import { useAuth } from "../context/AuthContext";
const minsLeft = (d) =>
  Math.max(0, Math.round((new Date(d) - Date.now()) / 60000));
export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  useEffect(() => {
    api.get("/dashboard").then((x) => setData(x.data));
  }, []);
  if (!data)
    return (
      <Layout>
        <Topbar title="Dashboard" />
        <div className="p-8 text-slate-500">Loading command center...</div>
      </Layout>
    );
  return (
    <Layout>
      <Topbar
        title="Dashboard"
        action={
          user?.role === "PROVIDER" && (
            <Link
              to="/donate"
              className="hidden items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-sm font-bold text-[#07110f] sm:flex"
            >
              <Plus size={16} />
              New donation
            </Link>
          )
        }
      />
      <div className="space-y-6 p-5 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat
            label="Meals rescued"
            value={data.stats.mealsRescued.toLocaleString()}
            icon={Utensils}
          />
          <Stat
            label="Active donations"
            value={data.stats.activeDonations}
            icon={PackageCheck}
          />
          <Stat
            label="Active pickups"
            value={data.stats.activePickups}
            icon={Truck}
          />
          <Stat label="Partner NGOs" value={data.stats.partners} icon={Users} />
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
          <section className="glass rounded-2xl p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  Needs attention
                </p>
                <h2 className="mt-1 text-xl font-bold">Urgent donations</h2>
              </div>
              <Clock3 className="text-amber-300" size={19} />
            </div>
            <div className="space-y-3">
              {data.urgent.length ? (
                data.urgent.map((d) => (
                  <Link
                    key={d._id}
                    to={`/matches/${d._id}`}
                    className="flex items-center justify-between rounded-xl border border-white/7 bg-white/[.02] p-4 hover:border-emerald-400/25"
                  >
                    <div>
                      <p className="font-semibold">{d.foodName}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {d.quantity} {d.unit} · {d.foodType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-amber-300">
                        {minsLeft(d.expiryTime)} min
                      </p>
                      <p className="text-[10px] text-slate-600">until expiry</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No urgent donations nearby.
                </p>
              )}
            </div>
          </section>
          <section className="glass rounded-2xl p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                  Network view
                </p>
                <h2 className="mt-1 text-xl font-bold">Live rescue map</h2>
              </div>
              <MapPinned className="text-emerald-300" size={19} />
            </div>
            <div className="h-[280px]">
              <Map />
            </div>
          </section>
        </div>
        <section className="glass rounded-2xl p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Operational feed
              </p>
              <h2 className="mt-1 text-xl font-bold">Recent donations</h2>
            </div>
            <Link
              to="/matches"
              className="flex items-center gap-1 text-xs font-semibold text-emerald-300"
            >
              View matching <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {data.donations.slice(0, 8).map((d) => (
              <Link
                to={`/matches/${d._id}`}
                key={d._id}
                className="rounded-xl border border-white/7 bg-white/[.02] p-4 hover:border-emerald-400/25"
              >
                <div className="flex justify-between">
                  <span className="text-xs text-slate-600">{d.code}</span>
                  <span className="text-[10px] font-bold text-emerald-300">
                    {d.status}
                  </span>
                </div>
                <p className="mt-4 font-semibold">{d.foodName}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {d.quantity} {d.unit} · {minsLeft(d.expiryTime)}m left
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
