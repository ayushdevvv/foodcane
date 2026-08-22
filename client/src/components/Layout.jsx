import {Link,useLocation} from 'react-router-dom';
import {LogOut,LayoutDashboard,PlusCircle,MapPinned,Truck,ChevronRight,UserRound,Menu,X,ShieldCheck} from 'lucide-react';
import {useAuth} from '../context/AuthContext';
import {useState} from 'react';

const nav=[['/dashboard','Overview',LayoutDashboard],['/donate','Donate Food',PlusCircle],['/matches','Smart Matches',MapPinned],['/tracking','Live Tracking',Truck]];

export default function Layout({children}){
 const {user,logout}=useAuth(); const loc=useLocation(); const [open,setOpen]=useState(false);
 const initials=(user?.name||'FC').split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();
 const Sidebar=({mobile=false})=><aside className={`${mobile?'fixed inset-y-0 left-0 z-50 w-[290px] shadow-2xl':'fixed left-0 top-0 hidden h-screen w-[276px] lg:block'} border-r border-white/[.07] bg-[#081512]/95 p-5 backdrop-blur-2xl`}>
   {mobile&&<button onClick={()=>setOpen(false)} className="absolute right-4 top-5 rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"><X size={18}/></button>}
   <Link to="/dashboard" onClick={()=>setOpen(false)} className="mb-10 flex items-center gap-3 px-2">
    <span className="fc-logo">FC</span><span><b className="block text-[18px] tracking-tight">Foodcane</b><small className="mt-0.5 block text-[9px] font-bold uppercase tracking-[.28em] text-emerald-300/80">Food rescue network</small></span>
   </Link>
   <p className="mb-3 px-2 text-[9px] font-black uppercase tracking-[.22em] text-slate-600">Workspace</p>
   <nav className="space-y-1.5">{nav.map(([to,label,I])=>{const active=loc.pathname===to||((to==='/matches'&&loc.pathname.startsWith('/matches/'))||(to==='/tracking'&&loc.pathname.startsWith('/tracking/')));return <Link key={to} to={to} onClick={()=>setOpen(false)} className={`sidebar-link ${active?'active':''}`}><span className="icon-wrap"><I size={17}/></span><span>{label}</span>{active&&<ChevronRight className="ml-auto" size={14}/>}</Link>})}</nav>
   <p className="mb-3 mt-8 px-2 text-[9px] font-black uppercase tracking-[.22em] text-slate-600">Account</p>
   <Link to="/profile" onClick={()=>setOpen(false)} className={`sidebar-link ${loc.pathname==='/profile'?'active':''}`}><span className="icon-wrap"><UserRound size={17}/></span><span>My profile</span>{loc.pathname==='/profile'&&<ChevronRight className="ml-auto" size={14}/>}</Link>
   <div className="absolute bottom-5 left-5 right-5 overflow-hidden rounded-2xl border border-white/[.07] bg-gradient-to-br from-white/[.055] to-white/[.015] p-3">
     <Link to="/profile" onClick={()=>setOpen(false)} className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-white/[.04]"><span className="avatar">{initials}</span><span className="min-w-0 flex-1"><b className="block truncate text-sm">{user?.name||'User'}</b><span className="mt-0.5 flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-emerald-300"><ShieldCheck size={10}/>{user?.role}</span></span></Link>
     <button onClick={logout} className="mt-2 flex w-full items-center gap-2 rounded-xl border border-white/[.05] px-3 py-2 text-xs font-semibold text-slate-500 transition hover:border-rose-400/20 hover:bg-rose-400/5 hover:text-rose-300"><LogOut size={14}/>Sign out</button>
   </div>
 </aside>;
 return <div className="min-h-screen bg-[#06100d] text-slate-100"><Sidebar/>{open&&<><div onClick={()=>setOpen(false)} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"/><Sidebar mobile/></>}<main className="min-h-screen lg:ml-[276px]">{children}<button onClick={()=>setOpen(true)} className="fixed bottom-5 left-5 z-30 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-[#0b1a16]/95 text-emerald-300 shadow-xl backdrop-blur lg:hidden"><Menu size={20}/></button></main></div>
}
