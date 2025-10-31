import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const [search] = useSearchParams()
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    async function run() {
      const code = search.get('code')
      const next = search.get('next') || '/'
      if (!code) { setErrorMsg('Missing auth code.'); return }

      // Exchange code for a session (handles magic link/OTP)
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) { setErrorMsg(error.message); return }

      navigate(next, { replace: true })
    }
    run()
  }, [])

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <p>{errorMsg ? `Auth error: ${errorMsg}` : 'Signing you in…'}</p>
    </div>
  )
}
