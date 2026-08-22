import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Utensils, ArrowLeft, Play } from "lucide-react";
import { useAuth } from "../context/AuthContext";
export default function Login() {
  const [email, setEmail] = useState("restaurant@foodresq.demo"),
    [password, setPassword] = useState("demo123"),
    [err, setErr] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav("/dashboard");
    } catch (x) {
      setErr(x.response?.data?.message || "Login failed");
    }
  };
  const demo = (r) => {
    const a = {
      PROVIDER: "restaurant@foodresq.demo",
      NGO: "ngo@foodresq.demo",
      VOLUNTEER: "volunteer@foodresq.demo",
    };
    setEmail(a[r]);
    setPassword("demo123");
  };
  return (
    <div className="grid-bg flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-5xl grid gap-6 lg:grid-cols-2">
        <div className="hidden rounded-[28px] border border-white/8 bg-emerald-400/6 p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400 text-[#07110f]">
                <Utensils />
              </span>
              <b className="text-xl">Foodcane</b>
            </Link>
            <h1 className="mt-20 text-5xl font-black leading-tight">
              The right food.
              <br />
              <span className="text-emerald-300">The right place.</span>
              <br />
              The right time.
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Demo environment · seeded data included
          </div>
        </div>
        <div className="glass rounded-[28px] p-7 sm:p-10">
          <Link
            to="/"
            className="mb-8 flex items-center gap-2 text-sm text-slate-400"
          >
            <ArrowLeft size={16} />
            Back home
          </Link>
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block text-sm">
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#07110f] px-4 py-3 outline-none focus:border-emerald-400/50"
              />
            </label>
            <label className="block text-sm">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#07110f] px-4 py-3 outline-none focus:border-emerald-400/50"
              />
            </label>
            {err && <p className="text-sm text-rose-300">{err}</p>}
            <button className="w-full rounded-xl bg-emerald-400 py-3 font-bold text-[#07110f]">
              Sign in
            </button>
          </form>
          <div className="mt-7">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              Quick demo login
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {["PROVIDER", "NGO", "VOLUNTEER"].map((r) => (
                <button
                  key={r}
                  onClick={() => demo(r)}
                  className="rounded-xl border border-white/8 bg-white/[.02] px-3 py-3 text-xs font-semibold hover:border-emerald-400/30"
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Play size={12} />
              All demo accounts use <b className="text-slate-300">demo123</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
