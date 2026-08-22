import jwt from 'jsonwebtoken';
import { users } from '../data/store.js';
export function sign(user){return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET||'foodresq_demo_secret', {expiresIn:'7d'});}
export function auth(req,res,next){const h=req.headers.authorization||'';try{const token=h.startsWith('Bearer ')?h.slice(7):null;if(!token) throw Error();const p=jwt.verify(token,process.env.JWT_SECRET||'foodresq_demo_secret');req.user=users.find(u=>u._id===p.id);if(!req.user) throw Error();next()}catch{res.status(401).json({message:'Unauthorized'})}}
