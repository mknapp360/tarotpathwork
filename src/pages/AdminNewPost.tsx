import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Session } from '@supabase/supabase-js'

export default function AdminNewPost() {
  const navigate = useNavigate()
  const [session, setSession] = useState<Session | null>(null)

  // auth state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        // Already logged in, redirect to dashboard
        navigate('/admin/dashboard', { replace: true })
      }
      setSession(data.session)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s)
      if (s) {
        // Successful login, redirect to dashboard
        navigate('/admin/dashboard', { replace: true })
      }
    })
    
    return () => sub.subscription.unsubscribe()
  }, [navigate])

  async function signInWithPassword() {
    setLoading(true)
    setErrorMsg(null)
    
    const { error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    })
    
    setLoading(false)
    
    if (error) {
      setErrorMsg(error.message)
    }
    // No need for else block - the onAuthStateChange will handle redirect
  }

  // If already logged in, show loading while redirecting
  if (session) {
    return (
      <div className="mx-auto max-w-md px-4 py-10">
        <p className="text-center text-muted-foreground">Redirecting to dashboard...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Admin Sign In</h1>
      <div className="grid gap-3">
        <label className="grid gap-2">
          <span>Email</span>
          <input
            type="email"
            className="border rounded-xl px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && email && password) {
                signInWithPassword()
              }
            }}
          />
        </label>
        <label className="grid gap-2">
          <span>Password</span>
          <input
            type="password"
            className="border rounded-xl px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && email && password) {
                signInWithPassword()
              }
            }}
          />
        </label>
        <button
          onClick={signInWithPassword}
          disabled={loading || !email || !password}
          className="px-5 py-2 rounded-xl border hover:bg-slate-50 disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
        <p className="text-sm text-slate-500">Only the admin account can access this page.</p>
      </div>
    </div>
  )
}