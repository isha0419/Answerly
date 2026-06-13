import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  const [showVerificationModal, setShowVerificationModal] = useState(false)

  const navigate = useNavigate();
  const { handleRegister } = useAuth();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await handleRegister({ 
        username: formData.username, 
        email: formData.email, 
        password: formData.password 
      })
      setShowVerificationModal(true)
    } catch (err) {
      console.error('Registration error:', err)
    }
  }


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
        <h1 className="mb-8 text-center text-3xl font-light tracking-widest text-white">register</h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white placeholder-white/50 outline-none transition focus:border-white/60 focus:ring-1 focus:ring-white/20"
              placeholder="username"
            />
          </div>

          <div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white placeholder-white/50 outline-none transition focus:border-white/60 focus:ring-1 focus:ring-white/20"
              placeholder="email"
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

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-full bg-white py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'register'}
          </button>

          {error && (
            <div className="mt-4 rounded-lg bg-red-500/20 border border-red-500 p-3 text-sm text-red-200">
              {error}
            </div>
          )}
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-xs text-white/80">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-white transition hover:text-white/80">
              login
            </a>
          </p>
        </div>
      </div>

      {/* Email Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-lg bg-slate-900 p-8 border border-white/20 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setShowVerificationModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition"
            >
              ✕
            </button>

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Message */}
            <h2 className="text-center text-2xl font-bold text-white mb-3">
              Registration Successful!
            </h2>
            
            <p className="text-center text-white/80 mb-2">
              A verification email has been sent to:
            </p>
            <p className="text-center text-white font-semibold mb-6">
              {formData.email}
            </p>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-200">
                <span className="font-semibold">📧 Next Step:</span> Click the verification link in your email to verify your account. Then you can log in!
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowVerificationModal(false)}
                className="flex-1 rounded-full bg-white py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
              >
                Get Started
              </button>
              <button
                onClick={() => setShowVerificationModal(false)}
                className="flex-1 rounded-full border border-white/20 bg-white/10 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Register
