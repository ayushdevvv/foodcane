import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock3, ArrowUpRight } from "lucide-react";
import { api } from "../lib/api";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
export default function MatchesList() {
  const [ds, setDs] = useState([]);
  useEffect(() => {
    api.get("/donations").then((x) => setDs(x.data));
  }, []);
  return (
    <Layout>
      <Topbar title="Smart matches" />
      <div className="p-5 lg:p-8">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">
            Allocation queue
          </p>
          <h2 className="mt-1 text-3xl font-black">
            Donations waiting for the right recipient
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ds.map((d) => (
            <Link
              key={d._id}
              to={`/matches/${d._id}`}
              className="glass rounded-2xl p-5 hover:border-emerald-400/25"
            >
              <div className="flex justify-between">
                <span className="text-xs text-slate-600">{d.code}</span>
                <span className="text-[10px] font-bold text-emerald-300">
                  {d.status}
                </span>
              </div>
              <h3 className="mt-5 font-bold">{d.foodName}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {d.quantity} {d.unit} · {d.foodType}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-white/7 pt-4">
                <span className="text-xs text-amber-300">
                  <Clock3 className="mr-1 inline" size={13} />
                  {Math.max(
                    0,
                    Math.round((new Date(d.expiryTime) - Date.now()) / 60000),
                  )}{" "}
                  min left
                </span>
                <ArrowUpRight size={16} className="text-emerald-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
