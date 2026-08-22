import {Router} from 'express';import bcrypt from 'bcryptjs';import {z} from 'zod';import {users} from '../data/store.js';import {sign} from '../middleware/auth.js';
const r=Router();
const safe=u=>{const {passwordHash,...x}=u;return x};
r.post('/register',async(req,res)=>{const s=z.object({name:z.string().min(2),email:z.string().email(),password:z.string().min(6),role:z.enum(['PROVIDER','NGO','VOLUNTEER'])}).safeParse(req.body);if(!s.success)return res.status(400).json({message:'Invalid input'});if(users.some(u=>u.email===s.data.email))return res.status(409).json({message:'Email already registered'});const u={_id:crypto.randomUUID(),...s.data,passwordHash:await bcrypt.hash(s.data.password,10),location:{city:'Guwahati'},coordinates:{lat:26.1445,lng:91.7362},capacity:s.data.role==='NGO'?40:0,foodPreferences:[],availability:true,verified:false};users.push(u);res.json({token:sign(u),user:safe(u)})});
r.post('/login',async(req,res)=>{const u=users.find(x=>x.email===req.body.email);if(!u||!(await bcrypt.compare(req.body.password,u.passwordHash)))return res.status(401).json({message:'Invalid credentials'});res.json({token:sign(u),user:safe(u)})});
export default r;
