"use client"

import Link from "next/link"
import { useState } from "react"

export default function HelpPage() {
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // For now we'll just simulate sending a support request.
    setSent(true)
    setMessage("")
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl">
        <h1 className="mb-2 text-2xl font-semibold">Help & Support</h1>
        <p className="mb-6 text-sm text-muted-foreground">If you need assistance with the dashboard, use the resources below or send a quick message to our support team.</p>

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h3 className="mb-1 font-medium">Documentation</h3>
            <p className="mb-2 text-sm text-muted-foreground">Browse the docs for guides and FAQs.</p>
            <Link href="#" className="text-sm font-medium text-blue-600 hover:underline">View Docs</Link>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-1 font-medium">Report a bug</h3>
            <p className="mb-2 text-sm text-muted-foreground">Found an issue? Let us know and we'll investigate.</p>
            <Link href="#" className="text-sm font-medium text-blue-600 hover:underline">Report an issue</Link>
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-2 text-lg font-medium">Contact support</h2>
          {sent ? (
            <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-800">Thanks — your message has been sent. We'll get back to you shortly.</div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block text-sm">
              <span className="text-sm text-muted-foreground">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                rows={5}
                required
              />
            </label>

            <div className="flex items-center gap-2">
              <button type="submit" className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white hover:opacity-95">Send message</button>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:underline">Back to dashboard</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
