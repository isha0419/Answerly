import React, { useState, useEffect } from 'react'
import {Link , useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../hook/useAuth';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [rememberMe, setRememberMe] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setShouldRedirect(true)
    await handleLogin({ email: formData.email, password: formData.password })
  }

  useEffect(() => {
    if (shouldRedirect && !loading && user) {
      navigate('/dashboard')
    }
  }, [shouldRedirect, user, loading, navigate])

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center px-4 py-8"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1600&h=900&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Form Box */}
      <div className="relative z-10 w-full max-w-md rounded-lg border border-white/40 bg-slate-900/40 p-8 backdrop-blur-sm">
        <h1 className="mb-8 text-center text-3xl font-light tracking-widest text-white">login</h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white placeholder-white/50 outline-none transition focus:border-white/60 focus:ring-1 focus:ring-white/20"
              placeholder="username"
            />
          </div>

          <div>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white placeholder-white/50 outline-none transition focus:border-white/60 focus:ring-1 focus:ring-white/20"
              placeholder="password"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between px-2 text-xs font-medium text-white/70">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-white/30 bg-white/10 accent-white"
              />
              <span>remember me</span>
            </label>
            <a href="#" className="transition hover:text-white">
              forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-full bg-white py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'login'}
          </button>

          {error && (
            <div className="mt-4 rounded-lg bg-red-500/20 border border-red-500 p-3 text-sm text-red-200">
              <p className="font-semibold mb-1">❌ Login Failed</p>
              <p>{error}</p>
              {error.includes('verify') && (
                <p className="mt-2 text-xs text-red-100">
                  Please check your email for the verification link and verify your account.
                </p>
              )}
            </div>
          )}
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-xs text-white/80">
            Don&apos;t have an account?{' '}
            <a href="/register" className="font-semibold text-white transition hover:text-white/80">
              register
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
