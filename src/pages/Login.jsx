import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme, THEMES } from '../context/ThemeContext';

/* ─── Race state machine ─── */
const R = { IDLE:'idle', TYPING:'typing', RACING:'racing', WIN:'win', LOSE:'lose' };

/* ─── Tiny helpers ─── */
const rand = (min, max) => Math.random() * (max - min) + min;

/* ─── Floating background particle ─── */
function BgParticle({ x, y, size, color, dur, delay }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ left:`${x}%`, top:`${y}%`, width:size, height:size, background:color }}
      animate={{ y:[0,-24,0], opacity:[0.15,0.7,0.15], scale:[1,1.3,1] }}
      transition={{ duration:dur, delay, repeat:Infinity, ease:'easeInOut' }}
    />
  );
}

/* ─── Star (Infinity mode background) ─── */
function Star({ x, y, size, delay }) {
  return (
    <motion.div className="absolute rounded-full bg-white pointer-events-none"
      style={{ left:`${x}%`, top:`${y}%`, width:size, height:size }}
      animate={{ opacity:[0.1,0.9,0.1], scale:[0.8,1.2,0.8] }}
      transition={{ duration: rand(2,4), delay, repeat:Infinity, ease:'easeInOut' }}
    />
  );
}

/* ─── Neural network dot (Infinity mode) ─── */
function NeuralDot({ x, y, size, color }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ left:`${x}%`, top:`${y}%`, width:size, height:size, background:color }}
      animate={{ scale:[1,1.5,1], opacity:[0.3,0.8,0.3] }}
      transition={{ duration: rand(3,6), delay: rand(0,3), repeat:Infinity, ease:'easeInOut' }}
    />
  );
}

/* ─── Vision mode floating cloud ─── */
function Cloud({ x, y, w }) {
  return (
    <motion.div className="absolute pointer-events-none rounded-full"
      style={{ left:`${x}%`, top:`${y}%`, width:w, height:w*0.4,
        background:'rgba(255,255,255,0.6)', filter:'blur(20px)' }}
      animate={{ x:[0,20,0], opacity:[0.4,0.7,0.4] }}
      transition={{ duration: rand(8,14), delay: rand(0,4), repeat:Infinity, ease:'easeInOut' }}
    />
  );
}

/* ─── Countdown light ─── */
function CountdownLight({ active, color }) {
  return (
    <motion.div className="w-4 h-4 rounded-full border border-white/20"
      animate={active ? { backgroundColor:color, boxShadow:`0 0 12px 4px ${color}` }
                      : { backgroundColor:'rgba(255,255,255,0.1)', boxShadow:'none' }}
      transition={{ duration:0.3 }}
    />
  );
}

/* ─── Speed burst particle ─── */
function Burst({ color, angle }) {
  return (
    <motion.div className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{ background:color }}
      initial={{ opacity:1, scale:1 }}
      animate={{ x:Math.cos(angle)*38, y:Math.sin(angle)*38, opacity:0, scale:0 }}
      transition={{ duration:0.55, ease:'easeOut' }}
    />
  );
}

/* ─── Confetti explosion ─── */
function Confetti() {
  const pieces = Array.from({length:32}, (_,i) => ({
    id:i, x:rand(5,95),
    color:['#3b82f6','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ec4899','#f97316'][i%7],
    size:rand(4,10), delay:rand(0,0.5), rot:rand(0,360),
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-20">
      {pieces.map(({ id,x,color,size,delay,rot }) => (
        <motion.div key={id} className="absolute top-0 rounded-sm"
          style={{ left:`${x}%`, width:size, height:size, background:color, rotate:rot }}
          initial={{ y:-10, opacity:1 }}
          animate={{ y:520, opacity:0, rotate:rot+360 }}
          transition={{ duration:2+rand(0,1), delay, ease:'easeIn' }}
        />
      ))}
    </div>
  );
}

/* ─── Car SVGs ─── */
function UserCar({ glow }) {
  return (
    <svg width="40" height="18" viewBox="0 0 40 18" fill="none"
         style={ glow ? { filter:'drop-shadow(0 0 6px #60a5fa)' } : {}}>
      <rect x="4" y="6" width="32" height="8" rx="2.5" fill="#1d4ed8"/>
      <rect x="9" y="2" width="18" height="7" rx="2" fill="#2563eb"/>
      <rect x="11" y="3" width="6" height="4.5" rx="1" fill="#93c5fd" opacity="0.9"/>
      <rect x="19" y="3" width="6" height="4.5" rx="1" fill="#93c5fd" opacity="0.9"/>
      <circle cx="10" cy="15" r="3" fill="#1e3a8a"/>
      <circle cx="10" cy="15" r="1.5" fill="#60a5fa"/>
      <circle cx="30" cy="15" r="3" fill="#1e3a8a"/>
      <circle cx="30" cy="15" r="1.5" fill="#60a5fa"/>
      <rect x="1" y="9" width="3" height="2.5" rx="1" fill="#60a5fa" opacity="0.7"/>
      <rect x="36" y="8" width="3" height="3" rx="1" fill="#fbbf24" opacity="0.9"/>
    </svg>
  );
}
function CpuCar({ glow }) {
  return (
    <svg width="40" height="18" viewBox="0 0 40 18" fill="none"
         style={ glow ? { filter:'drop-shadow(0 0 6px #a78bfa)' } : {}}>
      <rect x="4" y="6" width="32" height="8" rx="2.5" fill="#6d28d9"/>
      <rect x="9" y="2" width="18" height="7" rx="2" fill="#7c3aed"/>
      <rect x="11" y="3" width="6" height="4.5" rx="1" fill="#c4b5fd" opacity="0.9"/>
      <rect x="19" y="3" width="6" height="4.5" rx="1" fill="#c4b5fd" opacity="0.9"/>
      <circle cx="10" cy="15" r="3" fill="#3b0764"/>
      <circle cx="10" cy="15" r="1.5" fill="#a78bfa"/>
      <circle cx="30" cy="15" r="3" fill="#3b0764"/>
      <circle cx="30" cy="15" r="1.5" fill="#a78bfa"/>
      <rect x="1" y="9" width="3" height="2.5" rx="1" fill="#a78bfa" opacity="0.7"/>
      <rect x="36" y="8" width="3" height="3" rx="1" fill="#f97316" opacity="0.9"/>
    </svg>
  );
}

/* ─── Race Track ─── */
function RaceTrack({ raceState, progress, onCountdownDone }) {
  const [countdown, setCountdown] = useState(null);
  const [lights, setLights] = useState([false,false,false]);
  const [bursts, setBursts] = useState([]);
  const cdRef = useRef(null);
  const burstRef = useRef(null);

  useEffect(() => {
    if (raceState === R.RACING) { setCountdown(3); setLights([false,false,false]); }
    if (raceState === R.IDLE || raceState === R.TYPING) {
      setCountdown(null); setLights([false,false,false]); clearTimeout(cdRef.current);
    }
  }, [raceState]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      setLights(p => { const n=[...p]; n[3-countdown]=true; return n; });
      cdRef.current = setTimeout(() => setCountdown(c=>c-1), 700);
    } else {
      setLights([true,true,true]);
      cdRef.current = setTimeout(() => { setLights([false,false,false]); onCountdownDone?.(); }, 500);
    }
    return () => clearTimeout(cdRef.current);
  }, [countdown, onCountdownDone]);

  useEffect(() => {
    if (raceState !== R.RACING) return;
    burstRef.current = setInterval(() => {
      setBursts(p => [...p.slice(-10), {
        id: Date.now()+rand(0,100),
        color: Math.random()>0.5 ? '#60a5fa':'#c084fc',
        angle: rand(0, Math.PI*2),
      }]);
    }, 220);
    return () => clearInterval(burstRef.current);
  }, [raceState]);

  const isActive = raceState !== R.IDLE;
  const isRacing = raceState === R.RACING;
  const isWin    = raceState === R.WIN;
  const isLose   = raceState === R.LOSE;

  const userX = isWin ? '88%' : isLose ? `${Math.min(progress*0.6,52)}%` : `${Math.min(progress*0.76,80)}%`;
  const cpuX  = isLose ? '88%': isWin  ? `${Math.min(progress*0.5,60)}%` : `${progress*0.44}%`;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div className="w-full mt-4 rounded-2xl overflow-hidden border border-white/10"
          initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
          exit={{ opacity:0, height:0 }} transition={{ duration:0.4 }}
          style={{ background:'linear-gradient(180deg,#0f0c29,#1a1040,#0f0c29)' }}>

          {/* Countdown bar */}
          <div className="flex items-center justify-center gap-2 py-2 border-b border-white/5">
            <span className="text-[10px] text-gray-500 font-mono mr-1">LIGHTS</span>
            {lights.map((on,i) => (
              <CountdownLight key={i} active={on} color={countdown===0?'#22c55e':'#ef4444'}/>
            ))}
            <span className="text-[10px] font-mono font-bold ml-1"
              style={{ color: countdown===0 ? '#22c55e' : '#9ca3af' }}>
              {countdown===null ? 'STANDBY' : countdown>0 ? countdown : 'GO!'}
            </span>
          </div>

          {/* Track */}
          <div className="relative h-28 px-3 py-2">
            {/* Lane lines */}
            <div className="absolute inset-x-3 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"/>
            <div className="absolute inset-x-3" style={{top:'33%',height:1,background:'rgba(99,102,241,0.2)'}}/>
            <div className="absolute inset-x-3" style={{top:'67%',height:1,background:'rgba(99,102,241,0.2)'}}/>

            {/* Dashed center */}
            <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex gap-2">
              {Array.from({length:18}).map((_,i) => (
                <motion.div key={i} className="flex-1 h-0.5 rounded-full bg-white/10"
                  animate={isRacing ? {opacity:[0.1,0.5,0.1]} : {}}
                  transition={{duration:0.4, delay:i*0.04, repeat:Infinity}}/>
              ))}
            </div>

            {/* Finish line */}
            <div className="absolute right-3 top-0 bottom-0 w-4 flex flex-col">
              {Array.from({length:8}).map((_,i) => (
                <div key={i} className={`flex-1 ${i%2===0?'bg-white/80':'bg-black/80'}`} style={{width:8}}/>
              ))}
            </div>

            {/* Neon track glow */}
            {isRacing && (
              <motion.div className="absolute inset-x-3 bottom-4 h-px"
                animate={{ background:[
                  'linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)',
                  'linear-gradient(90deg,transparent,rgba(6,182,212,0.6),transparent)',
                  'linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)',
                ]}}
                transition={{duration:1.5, repeat:Infinity}}
              />
            )}

            {/* USER CAR */}
            <motion.div className="absolute top-[20%]"
              animate={{ left:userX }}
              transition={{ duration:isWin?0.6:isLose?0.3:0.5, ease:isRacing?'linear':'easeOut' }}>
              <motion.div
                animate={isRacing?{rotate:[-2,2,-2]}:isLose?{rotate:[0,18,-5,12],x:[0,12,-6]}:{}}
                transition={{duration:0.25, repeat:isRacing?Infinity:0}}>
                <UserCar glow={isRacing||isWin}/>
                {isRacing && (
                  <motion.div className="absolute right-full top-1/2 -translate-y-1/2 flex flex-col gap-0.5"
                    animate={{opacity:[0.5,1,0.5]}} transition={{duration:0.3,repeat:Infinity}}>
                    {[12,18,12].map((w,i)=><div key={i} className="h-px bg-blue-400/60" style={{width:w}}/>)}
                  </motion.div>
                )}
              </motion.div>
              {bursts.map(b=><Burst key={b.id} color={b.color} angle={b.angle}/>)}
            </motion.div>

            {/* CPU CAR */}
            <motion.div className="absolute top-[57%]"
              animate={{ left:cpuX }}
              transition={{ duration:isLose?0.6:isWin?0.3:0.5, ease:isRacing?'linear':'easeOut' }}>
              <motion.div animate={isRacing?{rotate:[-1,1,-1]}:{}} transition={{duration:0.3,repeat:Infinity}}>
                <CpuCar glow={isRacing||isLose}/>
                {isRacing && (
                  <motion.div className="absolute right-full top-1/2 -translate-y-1/2 flex flex-col gap-0.5"
                    animate={{opacity:[0.5,1,0.5]}} transition={{duration:0.35,repeat:Infinity}}>
                    {[9,15,9].map((w,i)=><div key={i} className="h-px bg-purple-400/60" style={{width:w}}/>)}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            {/* Win/Lose overlay */}
            <AnimatePresence>
              {(isWin||isLose) && (
                <motion.div className="absolute inset-0 flex items-center justify-center rounded-xl"
                  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                  style={{background:isWin?'rgba(16,185,129,0.15)':'rgba(239,68,68,0.15)'}}>
                  <div className="text-center">
                    <div className="text-3xl">{isWin?'🏆':'💥'}</div>
                    <p className={`text-xs font-bold mt-1 ${isWin?'text-emerald-400':'text-red-400'}`}>
                      {isWin?'YOU WIN!':'RACE LOST'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="mx-3 mb-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full"
              style={{background:'linear-gradient(90deg,#3b82f6,#8b5cf6,#06b6d4)'}}
              animate={{width:`${Math.min(progress,100)}%`}}
              transition={{duration:0.3}}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Brand panel (left side) ─── */
function BrandPanel({ isLight }) {
  const particles = Array.from({length:16},(_,i)=>({
    id:i, x:rand(5,90), y:rand(5,90),
    size:rand(3,6),
    color:['rgba(59,130,246,0.5)','rgba(139,92,246,0.5)','rgba(6,182,212,0.5)'][i%3],
    dur:rand(3,6), delay:rand(0,3),
  }));
  const stars = Array.from({length:40},(_,i)=>({
    id:i, x:rand(2,98), y:rand(2,98),
    size:rand(1,3), delay:rand(0,4),
  }));
  const clouds = [{x:10,y:15,w:160},{x:55,y:35,w:120},{x:25,y:65,w:180},{x:70,y:80,w:100}];

  return (
    <div className="relative hidden lg:flex flex-col justify-between h-full p-10 overflow-hidden"
      style={isLight ? {background:'linear-gradient(135deg,#eff6ff 0%,#f5f3ff 50%,#ecfdf5 100%)'}
                     : {background:'linear-gradient(135deg,#03000f 0%,#07001c 50%,#030010 100%)'}}>

      {/* Infinity stars */}
      {!isLight && stars.map(s=><Star key={s.id} {...s}/>)}

      {/* Vision clouds */}
      {isLight && clouds.map((c,i)=><Cloud key={i} {...c}/>)}

      {/* Shared particles */}
      {particles.map(p=><BgParticle key={p.id} {...p}/>)}

      {/* Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{backgroundImage:`linear-gradient(${isLight?'rgba(99,102,241,0.12)':'rgba(255,255,255,0.06)'} 1px,transparent 1px),linear-gradient(90deg,${isLight?'rgba(99,102,241,0.12)':'rgba(255,255,255,0.06)'} 1px,transparent 1px)`,backgroundSize:'44px 44px'}}/>

      {/* Logo */}
      <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}>
        <Link to="/" className="flex items-center gap-3 group w-fit">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{background:'linear-gradient(135deg,#3B82F6,#8B5CF6,#06B6D4)',boxShadow:'0 4px 20px rgba(99,102,241,0.4)'}}>
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1" strokeDasharray="28 16" strokeLinecap="round" opacity="0.5"/>
              <path d="M 11.5 5 C 14 5,15 7,13.2 8.5 C 11.4 10,8 9.5,7 11 C 6 12.5,7.2 15,9 15"
                    stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <circle cx="10" cy="10" r="1.8" fill="white"/>
            </svg>
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight"
              style={{background:'linear-gradient(90deg,#3B82F6,#8B5CF6,#06B6D4)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>
              USEMETA
            </span>
            <p className={`text-[10px] tracking-widest uppercase font-semibold ${isLight?'text-slate-400':'text-gray-500'}`}>
              by Santhosh
            </p>
          </div>
        </Link>
      </motion.div>

      {/* Main copy */}
      <motion.div className="space-y-6" initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:0.35}}>
        <motion.div className="text-6xl" animate={{rotate:[0,-5,5,0]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}>
          🏎️
        </motion.div>
        <div>
          <h1 className={`text-4xl font-black leading-tight ${isLight?'text-slate-800':'text-white'}`}>
            Authenticate<br/>
            <span style={{background:'linear-gradient(90deg,#3B82F6,#8B5CF6,#06B6D4)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>
              at Full Speed
            </span>
          </h1>
          <p className={`mt-3 text-sm leading-relaxed max-w-xs ${isLight?'text-slate-500':'text-gray-400'}`}>
            Transform ideas into digital reality. Every login is a race — cross the finish line to unlock your dashboard.
          </p>
        </div>
        <div className="space-y-3">
          {[{icon:'⚡',text:'Lightning-fast authentication'},{icon:'🔒',text:'Military-grade encryption'},{icon:'🏆',text:'Win access to your workspace'}].map(({icon,text},i)=>(
            <motion.div key={text} className="flex items-center gap-3"
              initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.5+i*0.1}}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${isLight?'bg-blue-50 border border-blue-100':'bg-white/5 border border-white/10'}`}>{icon}</div>
              <span className={`text-sm ${isLight?'text-slate-600':'text-gray-400'}`}>{text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div className="grid grid-cols-3 gap-3" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.7}}>
        {[{label:'Active Users',value:'10K+'},{label:'Uptime SLA',value:'99.99%'},{label:'Integrations',value:'500+'}].map(({label,value})=>(
          <div key={label} className={`rounded-xl p-3 text-center ${isLight?'bg-white/70 border border-slate-200/80':'bg-white/5 border border-white/8'}`}>
            <p className="text-lg font-black"
              style={{background:'linear-gradient(90deg,#3B82F6,#06B6D4)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>{value}</p>
            <p className={`text-[10px] mt-0.5 ${isLight?'text-slate-400':'text-gray-500'}`}>{label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────── MAIN LOGIN PAGE ─────────────── */
export default function Login() {
  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname || '/dashboard';
  const isLight   = theme === THEMES.VISION;

  const [form, setForm]         = useState({ email:'', password:'' });
  const [showPass, setShowPass] = useState(false);
  const [fieldErr, setFieldErr] = useState('');
  const [raceState, setRace]    = useState(R.IDLE);
  const [progress, setProgress] = useState(0);
  const [countdownGo, setGo]    = useState(false);
  const [submitting, setSubm]   = useState(false);

  const cardCtrl = useAnimation();
  const progRef  = useRef(null);
  const raceRef  = useRef(null);

  // Progress from typing
  const totalChars = form.email.length + form.password.length;
  useEffect(() => {
    if (raceState === R.TYPING)
      setProgress(Math.min((totalChars/20)*60, 60));
  }, [totalChars, raceState]);

  const handleFocus = () => { if (raceState===R.IDLE) { setRace(R.TYPING); setProgress(0); } };
  const handleChange = e => {
    setForm(f=>({...f,[e.target.name]:e.target.value}));
    setFieldErr('');
    if (raceState===R.IDLE) setRace(R.TYPING);
  };
  const onGo = useCallback(()=>setGo(true),[]);

  // Accelerate after GO
  useEffect(() => {
    if (!countdownGo || raceState!==R.RACING) return;
    clearInterval(progRef.current);
    progRef.current = setInterval(()=>setProgress(p=>{ if(p>=95){clearInterval(progRef.current);return 95;} return p+2.5; }), 80);
    return ()=>clearInterval(progRef.current);
  }, [countdownGo, raceState]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email||!form.password) { setFieldErr('Please enter your email and password.'); return; }
    if (submitting) return;
    setSubm(true); setGo(false); setRace(R.RACING); setProgress(60);

    raceRef.current = setTimeout(async()=>{
      const res = await login(form);
      clearInterval(progRef.current);
      if (res.success) {
        setProgress(100); setRace(R.WIN);
        await cardCtrl.start({
          boxShadow:['0 0 0px rgba(16,185,129,0)','0 0 60px rgba(16,185,129,0.6)','0 0 20px rgba(16,185,129,0.2)'],
          transition:{duration:0.8},
        });
        setTimeout(()=>navigate(from,{replace:true}), 2500);
      } else {
        setProgress(50); setRace(R.LOSE);
        await cardCtrl.start({
          x:[0,-12,12,-8,8,-4,4,0],
          boxShadow:['0 0 0px rgba(239,68,68,0)','0 0 50px rgba(239,68,68,0.5)','0 0 0px rgba(239,68,68,0)'],
          transition:{duration:0.5},
        });
        setFieldErr('Authentication failed — Race lost. Try again.');
        setSubm(false);
      }
    }, 2700);
  }

  function resetRace() {
    clearTimeout(raceRef.current); clearInterval(progRef.current);
    setRace(form.email||form.password ? R.TYPING : R.IDLE);
    setProgress(Math.min((totalChars/20)*60,60)); setGo(false); setSubm(false); setFieldErr('');
  }

  const isWin    = raceState===R.WIN;
  const isLose   = raceState===R.LOSE;
  const isRacing = raceState===R.RACING;

  /* ── card style tokens ── */
  const cardStyle = isLight
    ? { background:'rgba(255,255,255,0.85)', backdropFilter:'blur(28px)', border:'1px solid rgba(226,232,240,0.8)' }
    : { background:'rgba(12,8,38,0.88)',     backdropFilter:'blur(28px)', border:'1px solid rgba(255,255,255,0.08)' };

  const labelColor = isLight ? '#64748b' : '#6b7280';
  const inputStyle = isLight
    ? { background:'rgba(248,250,252,0.9)', border:'1px solid rgba(203,213,225,0.8)', color:'#0f172a' }
    : { background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'white' };
  const phColor = isLight ? '#94a3b8' : '#6b7280';

  return (
    <div className="min-h-screen flex overflow-hidden relative"
      style={isLight
        ? {background:'linear-gradient(135deg,#f0f9ff 0%,#eff6ff 40%,#f5f3ff 100%)'}
        : {background:'linear-gradient(135deg,#050010 0%,#0a0020 50%,#020010 100%)'}}>

      {/* Background effects */}
      {!isLight && <>
        {Array.from({length:50},(_,i)=>(
          <Star key={i} x={rand(1,99)} y={rand(1,99)} size={rand(1,2.5)} delay={rand(0,5)}/>
        ))}
        <motion.div className="absolute w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-20"
          style={{top:'-10%',right:'-5%',background:'radial-gradient(circle,rgba(99,102,241,0.4),transparent)'}}
          animate={{scale:[1,1.2,1],opacity:[0.2,0.35,0.2]}} transition={{duration:10,repeat:Infinity}}/>
        <motion.div className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-15"
          style={{bottom:'-5%',left:'-3%',background:'radial-gradient(circle,rgba(6,182,212,0.3),transparent)'}}
          animate={{scale:[1,1.15,1],opacity:[0.15,0.28,0.15]}} transition={{duration:8,repeat:Infinity}}/>
      </>}
      {isLight && <>
        {[{x:15,y:10,w:280},{x:55,y:5,w:200},{x:80,y:30,w:160},{x:5,y:70,w:220}].map((c,i)=><Cloud key={i} {...c}/>)}
        <motion.div className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{top:'10%',right:'5%',background:'radial-gradient(circle,rgba(99,102,241,0.12),transparent)'}}
          animate={{scale:[1,1.2,1],opacity:[0.15,0.25,0.15]}} transition={{duration:8,repeat:Infinity}}/>
        <motion.div className="absolute w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{bottom:'10%',left:'2%',background:'radial-gradient(circle,rgba(6,182,212,0.1),transparent)'}}
          animate={{scale:[1,1.15,1]}} transition={{duration:10,repeat:Infinity}}/>
      </>}

      {/* LEFT — brand panel */}
      <div className="lg:w-[48%] flex-shrink-0"><BrandPanel isLight={isLight}/></div>

      {/* RIGHT — form card */}
      <div className="flex-1 flex items-center justify-center p-6 min-h-screen relative z-10">
        <motion.div className="w-full max-w-md"
          initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:'easeOut'}}>

          <motion.div animate={cardCtrl} className="relative rounded-3xl overflow-hidden" style={cardStyle}>
            <AnimatePresence>{isWin && <Confetti/>}</AnimatePresence>

            {/* Top line */}
            <div className="h-px w-full" style={{background:'linear-gradient(90deg,transparent,#3B82F6,#8B5CF6,#06B6D4,transparent)'}}/>

            {/* Theme mode badge */}
            <div className="absolute top-4 right-4">
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                isLight ? 'bg-blue-50 border border-blue-100 text-blue-600' : 'bg-white/5 border border-white/10 text-gray-400'
              }`}>
                {isLight ? '☀️ Vision Mode' : '🌙 Infinity Mode'}
              </div>
            </div>

            <div className="p-8">
              {/* Mobile logo */}
              <div className="lg:hidden flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{background:'linear-gradient(135deg,#3B82F6,#8B5CF6,#06B6D4)'}}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1" strokeDasharray="28 16" strokeLinecap="round" opacity="0.5"/>
                    <path d="M 11.5 5 C 14 5,15 7,13.2 8.5 C 11.4 10,8 9.5,7 11 C 6 12.5,7.2 15,9 15"
                          stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                    <circle cx="10" cy="10" r="1.8" fill="white"/>
                  </svg>
                </div>
                <span className="text-lg font-black"
                  style={{background:'linear-gradient(90deg,#3B82F6,#8B5CF6)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>
                  USEMETA
                </span>
              </div>

              {/* Title */}
              <div className="mb-6">
                <motion.h2 className="text-2xl font-black"
                  animate={isWin?{color:'#10b981'}:isLose?{color:'#ef4444'}:{color:isLight?'#0f172a':'#ffffff'}}
                  transition={{duration:0.4}}>
                  {isWin?'🏆 Race Won!':isLose?'💥 Race Lost':'Start Your Race'}
                </motion.h2>
                <p className="text-sm mt-1" style={{color:isLight?'#64748b':'#6b7280'}}>
                  {isWin?'Authentication successful — Redirecting to dashboard…'
                    :isLose?'The challenger won. Fix your credentials and retry.'
                    :isLight?'Welcome To Vision Mode — Sign in with confidence.'
                    :'Welcome To Infinity Mode — Enter the future of innovation.'}
                </p>
              </div>

              {/* Result banners */}
              <AnimatePresence>
                {(isWin||isLose) && (
                  <motion.div className={`mb-5 p-3 rounded-xl border text-sm font-semibold text-center flex items-center justify-center gap-2
                    ${isWin?'bg-emerald-500/10 border-emerald-500/30 text-emerald-500':'bg-red-500/10 border-red-500/30 text-red-500'}`}
                    initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} exit={{opacity:0}}>
                    {isWin?<><span>🏁</span> Authentication Successful — You Won The Race!</>
                          :<><span>🚨</span> Authentication Failed — Race Lost - Try Again</>}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Field error */}
              <AnimatePresence>
                {fieldErr&&!isWin && (
                  <motion.div className="mb-4 p-3 bg-red-500/10 border border-red-500/25 rounded-xl text-xs text-red-500"
                    initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}>
                    {fieldErr}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{color:labelColor}}>Email address</label>
                  <div className="relative">
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" fill="none" stroke={isLight?'#94a3b8':'#6b7280'} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                    </svg>
                    <motion.input name="email" type="email" autoComplete="email"
                      value={form.email} onChange={handleChange} onFocus={handleFocus}
                      placeholder="you@usemeta.com" disabled={isRacing||isWin}
                      whileFocus={{borderColor:'rgba(59,130,246,0.8)',boxShadow:'0 0 0 3px rgba(59,130,246,0.15)'}}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all disabled:opacity-60"
                      style={{...inputStyle,'--placeholder-color':phColor}}
                    />
                    {raceState!==R.IDLE && (
                      <motion.div className="absolute inset-0 rounded-xl pointer-events-none"
                        animate={{boxShadow:['0 0 0px rgba(59,130,246,0)','0 0 8px rgba(59,130,246,0.3)','0 0 0px rgba(59,130,246,0)']}}
                        transition={{duration:2,repeat:Infinity}}/>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{color:labelColor}}>Password</label>
                  <div className="relative">
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" fill="none" stroke={isLight?'#94a3b8':'#6b7280'} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    <motion.input name="password" type={showPass?'text':'password'} autoComplete="current-password"
                      value={form.password} onChange={handleChange} onFocus={handleFocus}
                      placeholder="••••••••" disabled={isRacing||isWin}
                      whileFocus={{borderColor:'rgba(139,92,246,0.8)',boxShadow:'0 0 0 3px rgba(139,92,246,0.15)'}}
                      className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all disabled:opacity-60"
                      style={inputStyle}
                    />
                    <button type="button" onClick={()=>setShowPass(p=>!p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                      style={{color:isLight?'#94a3b8':'#6b7280'}}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d={showPass?"M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                             :"M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"}/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Race Track */}
                <RaceTrack raceState={raceState} progress={progress} onCountdownDone={onGo}/>

                {/* Submit */}
                <motion.button
                  type={isLose?'button':'submit'} onClick={isLose?resetRace:undefined}
                  disabled={isRacing||isWin}
                  whileHover={{scale:isRacing||isWin?1:1.02}} whileTap={{scale:isRacing||isWin?1:0.97}}
                  className="w-full py-3.5 rounded-xl font-bold text-white text-sm relative overflow-hidden mt-2"
                  style={{
                    background:isWin?'linear-gradient(135deg,#059669,#10b981)'
                              :isLose?'linear-gradient(135deg,#dc2626,#ef4444)'
                              :'linear-gradient(135deg,#3B82F6,#8B5CF6,#06B6D4)',
                    boxShadow:isWin?'0 0 30px rgba(16,185,129,0.4)'
                             :isLose?'0 0 30px rgba(239,68,68,0.3)'
                             :'0 0 24px rgba(59,130,246,0.35)',
                  }}>
                  {isRacing && (
                    <motion.div className="absolute inset-0 opacity-30"
                      style={{background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)',width:'40%'}}
                      animate={{x:['-100%','350%']}} transition={{duration:0.75,repeat:Infinity,ease:'linear'}}/>
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isRacing?<><motion.span animate={{rotate:360}} transition={{duration:1,repeat:Infinity,ease:'linear'}}>⚙️</motion.span>Racing…</>
                    :isWin?<>🏆 Entering Dashboard…</>
                    :isLose?<>🔄 Retry Race</>
                    :<>🏁 Start Race — Sign In</>}
                  </span>
                </motion.button>
              </form>

              {/* Links */}
              <div className="mt-5 flex items-center justify-between text-xs" style={{color:isLight?'#94a3b8':'#6b7280'}}>
                <Link to="/register" className="hover:text-blue-500 transition-colors font-medium">Create account →</Link>
                <button className="hover:text-violet-500 transition-colors">Forgot password?</button>
              </div>

              {/* Engine bar */}
              <div className={`mt-5 pt-4 border-t ${isLight?'border-slate-100':'border-white/5'} flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <motion.div className="text-base"
                    animate={isRacing?{scale:[1,1.3,1],rotate:[0,10,-10,0]}:{}} transition={{duration:0.3,repeat:Infinity}}>🔥</motion.div>
                  <div>
                    <p className="text-[10px] font-mono" style={{color:isLight?'#94a3b8':'#4b5563'}}>
                      {isRacing?'ENGINE: FULL THROTTLE':isWin?'ENGINE: VICTORY LAP':isLose?'ENGINE: STALLED':'ENGINE: STANDBY'}
                    </p>
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({length:8}).map((_,i)=>(
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-sm"
                          animate={isRacing?{backgroundColor:i<Math.floor(progress/13)?'#22c55e':'#1f2937',scaleY:i<Math.floor(progress/13)?[1,1.5,1]:1}:{backgroundColor:isLight?'#e2e8f0':'#1f2937'}}
                          transition={{duration:0.3,delay:i*0.05,repeat:isRacing?Infinity:0}}/>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-[10px] font-mono" style={{color:isLight?'#94a3b8':'#4b5563'}}>
                  {Math.round(progress)}% RPM
                </div>
              </div>
            </div>

            {/* Bottom line */}
            <div className="h-px w-full" style={{background:'linear-gradient(90deg,transparent,#8B5CF6,#06B6D4,transparent)'}}/>
          </motion.div>

          {/* Footer note */}
          <motion.p className="text-center text-xs mt-4" style={{color:isLight?'#94a3b8':'#374151'}}
            initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.9}}>
            USEMETA · Transform Ideas Into Digital Reality · 99.99% Uptime
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
