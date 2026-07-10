import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import remarkGfm from 'remark-gfm'

const Dashboard = () => {
  const chat = useChat()
  const [ chatInput, setChatInput ] = useState('')
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  const handleSubmitMessage = (event) => {
    event.preventDefault()

    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) {
      return
    }

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats)
  }

  const activeChat = chats?.[currentChatId]
  const chatList = Object.values(chats || {})

  return (
    <main className='relative min-h-screen w-full overflow-hidden bg-[#0b0906] p-3 text-white md:p-5'>
      {/* ambient background glow */}
      <div className='pointer-events-none fixed -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-amber-500/15 blur-[140px]' />
      <div className='pointer-events-none fixed -bottom-40 right-0 h-[26rem] w-[26rem] rounded-full bg-orange-600/10 blur-[140px]' />
      <div className='pointer-events-none fixed left-1/3 top-1/4 h-64 w-64 rounded-full bg-amber-400/5 blur-[120px]' />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Sora', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .scroll-thin::-webkit-scrollbar { width: 6px; }
        .scroll-thin::-webkit-scrollbar-track { background: transparent; }
        .scroll-thin::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 999px; }
        .scroll-thin::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        .glass { background: rgba(255,255,255,0.035); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
      `}</style>

      <section className='relative z-10 mx-auto flex h-[calc(100vh-1.5rem)] w-full max-w-7xl gap-4 md:h-[calc(100vh-2.5rem)] md:gap-6'>

        {/* Sidebar */}
        <aside className='glass hidden h-full w-72 shrink-0 flex-col rounded-3xl border border-white/[0.07] p-5 shadow-[0_8px_40px_rgba(0,0,0,0.35)] md:flex'>
          <div className='mb-7 flex items-center gap-3 px-1'>
            <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_0_24px_rgba(245,158,11,0.45)]'>
              <span className='font-display text-lg font-bold text-white'>A</span>
            </div>
            <div>
              <h1 className='font-display text-xl font-semibold leading-tight tracking-tight text-white'>Answerly</h1>
              <p className='font-body text-xs text-white/40'>AI Assistant</p>
            </div>
          </div>

          <p className='mb-3 px-1 font-body text-xs font-semibold uppercase tracking-wider text-amber-400/90'>
            Conversations
          </p>

          <div className='scroll-thin flex-1 space-y-1.5 overflow-y-auto pr-1'>
            {chatList.length === 0 && (
              <p className='px-2 py-4 font-body text-sm text-white/30'>
                No conversations yet.
              </p>
            )}
            {chatList.map((c, index) => {
              const isActive = c.id === currentChatId
              return (
                <button
                  onClick={() => { openChat(c.id) }}
                  key={index}
                  type='button'
                  className={`group relative flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left font-body text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'glass border border-amber-400/20 text-white shadow-[0_0_20px_rgba(245,158,11,0.08)]'
                      : 'border border-transparent text-white/55 hover:bg-white/[0.04] hover:text-white/85'
                  }`}
                >
                  {isActive && (
                    <span className='absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-amber-400 to-orange-500' />
                  )}
                  <svg width='15' height='15' viewBox='0 0 24 24' fill='none' className={`shrink-0 ${isActive ? 'text-amber-400' : 'text-white/30'}`}>
                    <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>
                  <span className='truncate'>{c.title}</span>
                </button>
              )
            })}
          </div>
        </aside>

        {/* Chat panel */}
        <section className='relative mx-auto flex h-full min-w-0 flex-1 flex-col'>

          <div className='scroll-thin messages flex-1 space-y-6 overflow-y-auto px-1 pb-32 pt-1'>
            {(!activeChat || activeChat.messages.length === 0) && (
              <div className='flex h-full flex-col items-center justify-center gap-2 text-center'>
                <div className='mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 ring-1 ring-white/10'>
                  <span className='font-display text-lg font-semibold text-white/70'>A</span>
                </div>
                <p className='font-body text-white/40'>Ask Answerly anything to get started.</p>
              </div>
            )}

            {activeChat?.messages.map((message) => {
              const isUser = message.role === 'user'
              return (
                <div key={message.id} className={isUser ? 'flex justify-end' : 'relative pl-4'}>
                  {isUser ? (
                    <div className='max-w-[70%] w-fit rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3 font-body text-sm font-medium text-white shadow-[0_6px_24px_rgba(245,158,11,0.3)] md:text-base'>
                      {message.content}
                    </div>
                  ) : (
                    <>
                      <div className='glass relative max-w-[85%] w-fit rounded-3xl border border-white/[0.08] px-6 py-5 font-body text-sm leading-relaxed text-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:text-base'>
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
                            ul: ({ children }) => <ul className='mb-2 list-disc pl-5'>{children}</ul>,
                            ol: ({ children }) => <ol className='mb-2 list-decimal pl-5'>{children}</ol>,
                            code: ({ children }) => <code className='rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-amber-200'>{children}</code>,
                            pre: ({ children }) => <pre className='mb-2 overflow-x-auto rounded-xl border border-white/[0.06] bg-black/40 p-3'>{children}</pre>
                          }}
                          remarkPlugins={[remarkGfm]}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                      <div className='absolute -bottom-3 left-0 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 font-display text-sm font-bold text-white shadow-[0_0_16px_rgba(245,158,11,0.5)] ring-4 ring-[#0b0906]'>
                        A
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          <footer className='glass absolute bottom-0 w-full rounded-3xl border border-white/[0.08] p-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] md:p-4'>
            <form onSubmit={handleSubmitMessage} className='flex items-center gap-2.5'>
              <input
                type='text'
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder='Type your message...'
                className='w-full rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-3 font-body text-base text-white outline-none transition placeholder:text-white/30 focus:border-amber-400/50 focus:bg-white/[0.05]'
              />
              <button
                type='submit'
                disabled={!chatInput.trim()}
                aria-label='Send message'
                className='flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 px-5 py-3 font-body font-semibold text-white shadow-[0_4px_16px_rgba(245,158,11,0.4)] transition-all duration-150 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none'
              >
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M4 12L20 4L13 20L11 13L4 12Z' stroke='currentColor' strokeWidth='2' strokeLinejoin='round' strokeLinecap='round' />
                </svg>
              </button>
            </form>
          </footer>
        </section>
      </section>
    </main>
  )
}

export default Dashboard