import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Session } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'

export default function AdminNewPost() {
  const [session, setSession] = useState<Session | null>(null)

  // editor state
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [cover, setCover] = useState('')
  const [tags, setTags] = useState('')
  const [content, setContent] = useState(`# Heading\n\nWrite your post in **Markdown**.`)
  const [status, setStatus] = useState<'draft'|'published'>('draft')

  // auth state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  function slugify(s: string) {
    return s.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') || nanoid(8)
  }
  useEffect(() => { setSlug(slugify(title)) }, [title])

  async function save() {
    setLoading(true); setErrorMsg(null)
    const { error } = await supabase.from('posts').insert({
      title,
      slug,
      excerpt: excerpt || null,
      content_md: content,
      cover_image_url: cover || null,
      tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      status,
      published_at: status === 'published' ? new Date().toISOString() : null
    })
    setLoading(false)
    if (error) { setErrorMsg(error.message); return }
    alert('Saved!')
    setTitle(''); setSlug(''); setExcerpt(''); setCover(''); setTags(''); setContent(''); setStatus('draft')
  }

  async function signInWithPassword() {
    setLoading(true); setErrorMsg(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setErrorMsg(error.message)
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  if (!session) {
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

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">New Post</h1>
        <button onClick={signOut} className="px-4 py-2 rounded-xl border hover:bg-slate-50">Sign out</button>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2">
          <span>Title</span>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="border rounded-xl px-3 py-2" />
        </label>
        <label className="grid gap-2">
          <span>Slug</span>
          <input value={slug} onChange={e=>setSlug(e.target.value)} className="border rounded-xl px-3 py-2" />
        </label>
        <label className="grid gap-2">
          <span>Excerpt</span>
          <textarea value={excerpt} onChange={e=>setExcerpt(e.target.value)} className="border rounded-xl px-3 py-2" />
        </label>
        <label className="grid gap-2">
          <span>Cover Image URL</span>
          <input value={cover} onChange={e=>setCover(e.target.value)} className="border rounded-xl px-3 py-2" />
        </label>
        <label className="grid gap-2">
          <span>Tags (comma separated)</span>
          <input value={tags} onChange={e=>setTags(e.target.value)} className="border rounded-xl px-3 py-2" />
        </label>
        <label className="grid gap-2">
          <span>Content (Markdown)</span>
          <textarea rows={14} value={content} onChange={e=>setContent(e.target.value)} className="border rounded-xl px-3 py-2 font-mono" />
        </label>
        <label className="grid gap-2">
          <span>Status</span>
          <select value={status} onChange={e=>setStatus(e.target.value as any)} className="border rounded-xl px-3 py-2">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>

        <div className="flex gap-3">
          <button
            onClick={save}
            disabled={loading}
            className="px-5 py-2 rounded-xl border hover:bg-slate-50 disabled:opacity-60"
          >
            {loading ? 'Saving…' : 'Save'}
          </button>
        </div>

        {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
      </div>
    </div>
  )
}
