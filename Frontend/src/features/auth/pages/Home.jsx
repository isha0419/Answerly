import React from 'react'

const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900">Hello, Answerly!</h1>
        <p className="mt-4 text-lg text-slate-600">Welcome to Answerly</p>
        <div className="mt-8 flex gap-4 justify-center">
          <a
            href="/login"
            className="rounded-full bg-slate-900 px-8 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Login
          </a>
          <a
            href="/register"
            className="rounded-full border-2 border-slate-900 px-8 py-3 font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home
