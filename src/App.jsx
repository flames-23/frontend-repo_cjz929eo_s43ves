import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Menu, CheckCircle, Circle, Search, LogIn, UserPlus, Moon, Sun, BookOpen, ClipboardList, Bell, FileDown, Shield, Sparkles, Globe } from 'lucide-react'
import Spline from '@splinetool/react-spline'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function useDarkMode() {
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === '1')
  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    localStorage.setItem('dark', dark ? '1' : '0')
  }, [dark])
  return [dark, setDark]
}

function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useDarkMode()
  return (
    <nav className="fixed top-0 left-0 right-0 z-20 backdrop-blur bg-white/70 dark:bg-black/40 border-b border-black/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2" onClick={() => setOpen(v=>!v)}><Menu className="w-5 h-5"/></button>
          <Link to="/" className="font-semibold tracking-tight text-lg">Work in Taiwan Guide</Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/guide" className="hover:opacity-80">Guide</Link>
          <Link to="/checklist" className="hover:opacity-80">Checklist</Link>
          <Link to="/faq" className="hover:opacity-80">FAQ</Link>
          <Link to="/admin" className="hover:opacity-80">Admin</Link>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={()=>setDark(d=>!d)} className="p-2 rounded hover:bg-black/5 dark:hover:bg-white/10" aria-label="Toggle theme">{dark? <Sun className="w-5 h-5"/>:<Moon className="w-5 h-5"/>}</button>
          {user ? (
            <button onClick={onLogout} className="px-3 py-1.5 rounded bg-black text-white dark:bg-white dark:text-black">Logout</button>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-3 py-1.5 rounded border border-black/10 dark:border-white/20 flex items-center gap-1"><LogIn className="w-4 h-4"/> Login</Link>
              <Link to="/signup" className="px-3 py-1.5 rounded bg-black text-white dark:bg-white dark:text-black flex items-center gap-1"><UserPlus className="w-4 h-4"/> Sign up</Link>
            </div>
          )}
        </div>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
          <Link to="/guide" onClick={()=>setOpen(false)} className="py-2">Guide</Link>
          <Link to="/checklist" onClick={()=>setOpen(false)} className="py-2">Checklist</Link>
          <Link to="/faq" onClick={()=>setOpen(false)} className="py-2">FAQ</Link>
          <Link to="/admin" onClick={()=>setOpen(false)} className="py-2">Admin</Link>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
      <Spline scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/20 to-white dark:to-black"/>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white drop-shadow-xl">
          <h1 className="text-3xl md:text-5xl font-bold">Plan your journey to work in Taiwan</h1>
          <p className="mt-3 text-sm md:text-base text-white/90 max-w-2xl mx-auto">A step-by-step companion with checklists, timelines, and resources to go from passport to your first day on the job.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/guide" className="px-4 py-2 rounded bg-white text-black font-medium">Explore the Guide</Link>
            <Link to="/checklist" className="px-4 py-2 rounded bg-white/20 border border-white/30 text-white font-medium">Open Checklist</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Landing() {
  return (
    <div className="pt-16">
      <Hero/>
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
        {[{icon:BookOpen,title:'Structured Steps',desc:'Clear phases: passport, job search, permits, arrival, and life admin.'},{icon:ClipboardList,title:'Interactive Checklist',desc:'Track progress and pick up where you left off.'},{icon:Bell,title:'Smart Reminders',desc:'Never miss a deadline with lightweight reminders.'}].map((c,i)=> (
          <div key={i} className="rounded-xl p-6 border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900">
            <c.icon className="w-6 h-6"/>
            <h3 className="mt-3 font-semibold text-lg">{c.title}</h3>
            <p className="text-sm text-black/70 dark:text-white/70">{c.desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

function Guide() {
  const steps = [
    { key:'passport', title:'Passport Application', desc:'Documents, links, and timelines.', resources:[{label:'Your country DFA', url:'https://www.dfa.gov.ph/'},{label:'Sample form (PDF)', url:'#'}], estimate_days:30, cost:'$60-120'},
    { key:'job-search', title:'Job Search', desc:'Boards, recruiters, and tips.', resources:[{label:'104 Job Bank', url:'https://www.104.com.tw/'},{label:'LinkedIn Jobs', url:'https://www.linkedin.com/jobs/'}], estimate_days:21, cost:'Varies'},
    { key:'work-permit', title:'Work Permit & Visa', desc:'Requirements and processing.', resources:[{label:'Ministry of Labor', url:'https://www.mol.gov.tw/'},{label:'BOCA Visa', url:'https://www.boca.gov.tw/'}], estimate_days:30, cost:'$100-200'},
    { key:'arrival', title:'Arrival & ARC', desc:'ARC, housing, banking, SIM.', resources:[{label:'NIA ARC', url:'https://www.immigration.gov.tw/'},{label:'Taiwan Bank List', url:'https://www.banking.gov.tw/'}], estimate_days:14, cost:'$200-600+'},
    { key:'taxes-insurance', title:'Taxes & NHI', desc:'Taxes, health, social security.', resources:[{label:'Taiwan NHI', url:'https://www.nhi.gov.tw/'},{label:'MOF Tax', url:'https://www.mof.gov.tw/'}], estimate_days:7, cost:'$0-100'},
    { key:'mandarin-culture', title:'Mandarin & Culture (Optional)', desc:'Learn language and local etiquette.', resources:[{label:'Taiwan Mandarin Institute', url:'https://www.taiwanmandarininstitute.com/'}], estimate_days:60, cost:'Varies'}
  ]
  const [query, setQuery] = useState('')
  const filtered = steps.filter(s=> (s.title+s.desc).toLowerCase().includes(query.toLowerCase()))
  return (
    <div className="pt-20 max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-2 p-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900">
        <Search className="w-4 h-4"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the guide..." className="w-full bg-transparent outline-none py-2"/>
      </div>
      <div className="mt-6 space-y-4">
        {filtered.map(step=> <StepCard key={step.key} step={step}/>) }
      </div>
    </div>
  )
}

function StepCard({ step }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 overflow-hidden">
      <button onClick={()=>setOpen(o=>!o)} className="w-full text-left px-5 py-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{step.title}</h3>
          <p className="text-sm text-black/70 dark:text-white/70">{step.desc}</p>
        </div>
        <span className="text-sm text-black/60 dark:text-white/60">Est. {step.estimate_days} days • {step.cost}</span>
      </button>
      {open && (
        <div className="px-5 pb-5">
          <ul className="list-disc pl-5 text-sm space-y-2">
            {step.resources.map((r,i)=> (
              <li key={i}><a className="text-blue-600 dark:text-blue-400 underline" href={r.url} target="_blank" rel="noreferrer">{r.label}</a></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function useAuth() {
  const [user, setUser] = useState(()=>{
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })
  const login = async (email, password) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email, password})})
    if(!res.ok) throw new Error('Login failed')
    const data = await res.json(); setUser(data); localStorage.setItem('user', JSON.stringify(data))
  }
  const signup = async (email, password, name) => {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email, password, name})})
    if(!res.ok) throw new Error('Signup failed')
    const data = await res.json(); setUser(data); localStorage.setItem('user', JSON.stringify(data))
  }
  const logout = ()=> { setUser(null); localStorage.removeItem('user') }
  return { user, login, signup, logout }
}

function Checklist() {
  const { user } = useAuthContext()
  const [items, setItems] = useState({
    passport:false,
    'job-search':false,
    'work-permit':false,
    arrival:false,
    'taxes-insurance':false,
    'mandarin-culture':false,
  })
  // load
  useEffect(()=>{(async()=>{
    if(!user) return
    const res = await fetch(`${API_BASE}/api/progress/${user.user_id}`)
    if(res.ok){ const data = await res.json(); if(data.items) setItems(prev=>({...prev, ...data.items})) }
  })()},[user])
  // save
  useEffect(()=>{(async()=>{
    if(!user) return
    await fetch(`${API_BASE}/api/progress`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({user_id: user.user_id, items})})
  })()},[items, user])

  const toggle = (k)=> setItems(prev=> ({...prev, [k]: !prev[k]}))

  const exportPdf = () => {
    const text = Object.entries(items).map(([k,v])=> `${v? '[x]':'[ ]'} ${k}`).join('\n')
    const blob = new Blob([`Work in Taiwan Checklist\n\n${text}`], {type: 'text/plain'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href=url; a.download='work-in-taiwan-checklist.txt'; a.click(); URL.revokeObjectURL(url)
  }

  const steps = Object.keys(items)
  return (
    <div className="pt-20 max-w-3xl mx-auto px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Interactive Checklist</h2>
        <button onClick={exportPdf} className="px-3 py-1.5 rounded border flex items-center gap-1"><FileDown className="w-4 h-4"/> Export</button>
      </div>
      <div className="space-y-2">
        {steps.map(key=> (
          <label key={key} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer bg-white dark:bg-zinc-900 border-black/10 dark:border-white/10">
            <input type="checkbox" checked={items[key]} onChange={()=>toggle(key)} />
            <span className="capitalize">{key.replace('-', ' ')}</span>
          </label>
        ))}
      </div>
      {!user && <p className="mt-3 text-sm text-black/70 dark:text-white/70">Login to auto-save your progress across devices.</p>}
    </div>
  )
}

function FAQ() {
  const faqs = [
    {q:'How long does a work permit take?', a:'Typically 7-14 business days after employer submission, but allow 30 days with visa.'},
    {q:'Do I need an ARC?', a:'Yes, if you plan to stay longer than 180 days. Apply within 15 days of arrival.'},
    {q:'Can I change jobs on a work permit?', a:'You need a new work permit tied to the new employer.'}
  ]
  return (
    <div className="pt-20 max-w-3xl mx-auto px-4">
      <h2 className="text-xl font-semibold mb-4">FAQ</h2>
      <div className="space-y-3">
        {faqs.map((f,i)=> (
          <details key={i} className="rounded-lg border p-4 bg-white dark:bg-zinc-900 border-black/10 dark:border-white/10">
            <summary className="font-medium cursor-pointer">{f.q}</summary>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}

function Admin() {
  const [steps, setSteps] = useState([])
  const [form, setForm] = useState({ key:'', title:'', description:'', estimate_days:0, cost_estimate:'' })
  const load = async()=>{
    const res = await fetch(`${API_BASE}/api/steps`)
    if(res.ok){ const data = await res.json(); setSteps(data) }
  }
  useEffect(()=>{ load() },[])
  const create = async()=>{
    const res = await fetch(`${API_BASE}/api/steps`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({
      key: form.key, title: form.title, description: form.description, content:'', resources:[], estimate_days: Number(form.estimate_days)||0, cost_estimate: form.cost_estimate, order: steps.length
    })})
    if(res.ok){ setForm({ key:'', title:'', description:'', estimate_days:0, cost_estimate:'' }); load() }
  }
  return (
    <div className="pt-20 max-w-5xl mx-auto px-4">
      <h2 className="text-xl font-semibold mb-4">Admin: Manage Guide Steps</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-2 p-4 rounded-lg border bg-white dark:bg-zinc-900 border-black/10 dark:border-white/10">
          {['key','title','description','estimate_days','cost_estimate'].map(k=> (
            <input key={k} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} placeholder={k} className="w-full px-3 py-2 rounded border bg-transparent"/>
          ))}
          <button onClick={create} className="w-full px-3 py-2 rounded bg-black text-white dark:bg-white dark:text-black">Add Step</button>
        </div>
        <div className="md:col-span-2 space-y-3">
          {steps.map(s=> (
            <div key={s.id} className="rounded-lg border p-4 bg-white dark:bg-zinc-900 border-black/10 dark:border-white/10">
              <div className="font-medium">{s.title}</div>
              <div className="text-sm text-black/70 dark:text-white/70">{s.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}

function Login() {
  const nav = useNavigate();
  const { login } = useAuthContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const submit = async(e)=>{
    e.preventDefault(); setError('')
    try { await login(email, password); nav('/checklist') } catch(err){ setError('Invalid email or password') }
  }
  return (
    <div className="pt-20 max-w-md mx-auto px-4">
      <form onSubmit={submit} className="space-y-3 rounded-lg border p-4 bg-white dark:bg-zinc-900 border-black/10 dark:border-white/10">
        <h2 className="text-xl font-semibold">Login</h2>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 rounded border bg-transparent"/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 rounded border bg-transparent"/>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full px-3 py-2 rounded bg-black text-white dark:bg-white dark:text-black">Login</button>
      </form>
    </div>
  )
}

function Signup() {
  const nav = useNavigate();
  const { signup } = useAuthContext()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const submit = async(e)=>{
    e.preventDefault(); setError('')
    try { await signup(email, password, name); nav('/checklist') } catch(err){ setError('Unable to sign up') }
  }
  return (
    <div className="pt-20 max-w-md mx-auto px-4">
      <form onSubmit={submit} className="space-y-3 rounded-lg border p-4 bg-white dark:bg-zinc-900 border-black/10 dark:border-white/10">
        <h2 className="text-xl font-semibold">Create account</h2>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full px-3 py-2 rounded border bg-transparent"/>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 rounded border bg-transparent"/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 rounded border bg-transparent"/>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full px-3 py-2 rounded bg-black text-white dark:bg-white dark:text-black">Sign up</button>
      </form>
    </div>
  )
}

const AuthContext = React.createContext(null)
function AuthProvider({ children }){
  const auth = useAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
function useAuthContext(){
  return React.useContext(AuthContext)
}

function AppShell(){
  const { user, logout } = useAuthContext()
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-100 dark:from-black dark:to-zinc-950 text-black dark:text-white">
      <Navbar user={user} onLogout={logout}/>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/guide" element={<Guide/>} />
        <Route path="/checklist" element={<Checklist/>} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
      <footer className="mt-20 py-8 text-center text-sm text-black/60 dark:text-white/60">Resources link to official agencies: MOL, BOCA, NIA. This is a community guide.</footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppShell/>
      </AuthProvider>
    </Router>
  )
}

export default App
