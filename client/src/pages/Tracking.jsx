import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Check,
  Clock3,
  Navigation,
  PackageCheck,
  Play,
  Truck,
  MapPin,
} from "lucide-react";
import { api } from "../lib/api";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
import Map from "../components/Map";
const steps = [
  ["CLAIMED", "Donation claimed"],
  ["PICKUP_IN_PROGRESS", "Pickup in progress"],
  ["PICKED_UP", "Picked up"],
  ["ON_THE_WAY", "On the way"],
  ["DELIVERED", "Delivered"],
];
export default function Tracking() {
  const { id } = useParams();
  const [d, setD] = useState(null);
  const load = () =>
    api.get(`/deliveries/${id || ""}`).then((x) => setD(x.data));
  useEffect(() => {
    load();
  }, [id]);
  const update = (s) =>
    api
      .patch(`/deliveries/${d._id}/status`, { status: s })
      .then((x) => setD(x.data));
  if (!d)
    return (
      <Layout>
        <Topbar title="Delivery tracking" />
        <div className="p-8 text-slate-500">Loading tracking…</div>
      </Layout>
    );
  const idx = steps.findIndex((x) => x[0] === d.status);
  return (
    <Layout>
      <Topbar title="Delivery tracking" />
      <div className="space-y-6 p-5 lg:p-8">
        <div className="grid gap-6 xl:grid-cols-[.8fr_1.2fr]">
          <section className="glass rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold tracking-widest text-emerald-300">
                  FOODCANE DELIVERY
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  #{d.donation?.slice(-6) || "ACTIVE"}
                </h2>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                {d.status}
              </span>
            </div>
            <div className="mt-8 space-y-0">
              {steps.map(([s, label], i) => (
                <div key={s} className="relative flex gap-4 pb-7 last:pb-0">
                  <div
                    className={`z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border ${i <= idx ? "border-emerald-400 bg-emerald-400 text-[#07110f]" : "border-white/10 bg-[#07110f] text-slate-600"}`}
                  >
                    {i < idx ? (
                      <Check size={15} />
                    ) : i === idx ? (
                      <div className="h-2 w-2 rounded-full bg-current" />
                    ) : (
                      <span className="text-xs">{i + 1}</span>
                    )}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`absolute left-4 top-8 h-full w-px ${i < idx ? "bg-emerald-400/50" : "bg-white/8"}`}
                    />
                  )}
                  <div>
                    <p
                      className={`font-semibold ${i <= idx ? "text-white" : "text-slate-600"}`}
                    >
                      {label}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      {i < idx
                        ? "Completed"
                        : i === idx
                          ? "Current status"
                          : "Pending"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-amber-400/15 bg-amber-400/5 p-4">
              <p className="text-xs font-bold text-amber-300">DEMO CONTROLS</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {steps.map(([s, l]) => (
                  <button
                    key={s}
                    onClick={() => update(s)}
                    className="rounded-lg border border-white/8 bg-white/[.03] px-3 py-2 text-xs font-semibold hover:border-emerald-400/30"
                  >
                    <Play className="mr-1 inline" size={12} />
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </section>
          <section className="glass rounded-2xl p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
              <div>
                <p className="text-xs text-slate-500">LIVE ROUTE</p>
                <p className="font-bold">Pickup to Recipient</p>
              </div>
              <div className="flex gap-4 text-xs text-slate-400">
                <span>
                  <Navigation
                    className="mr-1 inline text-emerald-300"
                    size={13}
                  />
                  {d.distance} km
                </span>
                <span>
                  <Clock3 className="mr-1 inline text-emerald-300" size={13} />~
                  {d.eta} min
                </span>
              </div>
            </div>
            <div className="h-[530px]">
              <Map
                provider={[d.pickupLocation.lat, d.pickupLocation.lng]}
                recipient={[d.dropoffLocation.lat, d.dropoffLocation.lng]}
                current={[d.currentCoordinates.lat, d.currentCoordinates.lng]}
              />
            </div>
          </section>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="glass rounded-2xl p-5">
            <PackageCheck className="text-emerald-300" />
            <p className="mt-4 text-xs text-slate-500">DONATION</p>
            <p className="font-bold">Food pickup</p>
          </div>
          <div className="glass rounded-2xl p-5">
            <Truck className="text-emerald-300" />
            <p className="mt-4 text-xs text-slate-500">VOLUNTEER</p>
            <p className="font-bold">Assigned rescue partner</p>
          </div>
          <div className="glass rounded-2xl p-5">
            <MapPin className="text-emerald-300" />
            <p className="mt-4 text-xs text-slate-500">DESTINATION</p>
            <p className="font-bold">Recipient NGO</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
