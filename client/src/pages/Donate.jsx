import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, MapPin } from "lucide-react";
import { api } from "../lib/api";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
export default function Donate() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    foodName: "40 Vegetarian Meals",
    foodType: "Cooked Meals",
    quantity: 40,
    description: "Fresh vegetarian meal boxes.",
    expiryTime: new Date(Date.now() + 68 * 60000).toISOString().slice(0, 16),
    location: "GS Road, Guwahati",
    lat: 26.1445,
    lng: 91.7362,
  });
  const [loading, setLoading] = useState(false);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/donations", form);
      nav(`/matches/${data._id}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <Topbar title="Create donation" />
      <div className="mx-auto max-w-4xl p-5 lg:p-8">
        <div className="mb-6 flex items-center gap-4 rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
            <Sparkles />
          </span>
          <p className="font-semibold">Make every minute count.</p>
        </div>
        <form onSubmit={submit} className="glass rounded-2xl p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm sm:col-span-2">
              Food name
              <input
                name="foodName"
                value={form.foodName}
                onChange={change}
                className="field"
                required
              />
            </label>
            <label className="text-sm">
              Food type
              <select
                name="foodType"
                value={form.foodType}
                onChange={change}
                className="field"
              >
                {[
                  "Cooked Meals",
                  "Bakery",
                  "Fruits & Vegetables",
                  "Packaged Food",
                  "Dairy",
                  "Other",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Quantity
              <input
                type="number"
                min="1"
                name="quantity"
                value={form.quantity}
                onChange={change}
                className="field"
                required
              />
            </label>
            <label className="text-sm sm:col-span-2">
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={change}
                className="field min-h-24"
              />
            </label>
            <label className="text-sm">
              Expiry date/time
              <input
                type="datetime-local"
                name="expiryTime"
                value={form.expiryTime}
                onChange={change}
                className="field"
                required
              />
            </label>
            <label className="text-sm">
              Pickup window
              <input value="Now until expiry" readOnly className="field" />
            </label>
            <label className="text-sm sm:col-span-2">
              Pickup location
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-3.5 text-slate-500"
                  size={17}
                />
                <input
                  name="location"
                  value={form.location}
                  onChange={change}
                  className="field pl-11"
                />
              </div>
            </label>
          </div>
          <button
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-emerald-400 py-3.5 font-bold text-[#07110f]"
          >
            {loading
              ? "Creating donation…"
              : "Create donation & find best match"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
