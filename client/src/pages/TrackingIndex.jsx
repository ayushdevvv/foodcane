import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Truck,
  ArrowUpRight,
  MapPin,
  Clock3,
  PackageCheck,
} from "lucide-react";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
import { api } from "../lib/api";
export default function TrackingIndex() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get("/dashboard").then((x) => setItems(x.data.deliveries || []));
  }, []);
  return (
    <Layout>
      <Topbar title="Live tracking" />
      <div className="p-5 lg:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[.22em] text-emerald-300/80">
              Rescue operations
            </p>
            <h2 className="mt-1 text-3xl font-black">
              Every delivery, visible.
            </h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((d) => (
            <Link
              key={d._id}
              to={`/tracking/${d._id}`}
              className="stat-card group"
            >
              <div className="flex items-center justify-between">
                <span className="card-icon">
                  <Truck size={17} />
                </span>
                <span className="badge-green">{d.status}</span>
              </div>
              <p className="mt-5 text-[9px] font-black uppercase tracking-widest text-slate-600">
                Delivery
              </p>
              <h3 className="mt-1 font-bold">
                #{String(d.donation).slice(-6)}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl bg-white/[.025] p-3">
                  <MapPin size={13} className="mb-2 text-emerald-300" />
                  <span className="text-slate-500">Distance</span>
                  <b className="mt-1 block">{d.distance} km</b>
                </div>
                <div className="rounded-xl bg-white/[.025] p-3">
                  <Clock3 size={13} className="mb-2 text-emerald-300" />
                  <span className="text-slate-500">ETA</span>
                  <b className="mt-1 block">~{d.eta} min</b>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-white/[.06] pt-4 text-xs">
                <span className="text-slate-500">
                  <PackageCheck className="mr-1 inline" size={13} />
                  Rescue route
                </span>
                <ArrowUpRight
                  className="text-emerald-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  size={16}
                />
              </div>
            </Link>
          ))}
          {!items.length && (
            <div className="premium-card col-span-full p-10 text-center text-sm text-slate-500">
              No active deliveries right now.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
