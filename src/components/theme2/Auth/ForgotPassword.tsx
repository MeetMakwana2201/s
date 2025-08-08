'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 🔐 Add API call here to send reset link
    console.log('Forgot password email submitted:', email)
  }

  return (
    <div className="flex flex-col justify-center items-center md:p-8 w-full max-w-2xl m-auto">
      <h2 className="text-2xl font-bold font-[outfit] text-black mb-2 text-center uppercase">
        Forgot Password
      </h2>
      <p className="text-base text-gray-600 mb-6 text-center">
        Reset your password
      </p>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-base font-medium mb-1">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-[#515151]"
            required
          />
        </div>

        <div className="flex justify-center items-center">
          <Button type="submit" className="rounded-none md:w-fit w-full px-28 mt-4">
            SUBMIT
          </Button>
        </div>
      </form>
    </div>
  )
}
