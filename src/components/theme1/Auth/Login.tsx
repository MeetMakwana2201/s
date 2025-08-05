'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log('Login submitted:', email, password)
  }

  return (
    <div className="flex flex-col justify-center items-center md:p-8 w-full mx-auto">
      <h2 className="text-2xl font-bold font-[outfit] text-black mb-2 text-center">
        LOG IN WITH <br /> UNITED ACCOUNT
      </h2>
      <p className="text-base text-gray-600 mb-6">Log in to continue shopping</p>

      <form onSubmit={handleLogin} className="w-full space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-base font-medium mb-1" htmlFor="email">
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

        {/* Password Field */}
        <div>
          <label className="block text-base font-medium mb-1" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-[#515151] pr-10"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </span>
          </div>
          <div className="text-right mt-1">
            <Link href="/forgotpassword" className="text-base text-gray-500 hover:underline">
              Forgot Password
            </Link>
          </div>
        </div>

        {/* Login Button */}
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            className="rounded-none md:w-fit w-full px-28 mt-4"
          // disabled={loading}
          >
            {/* {loading ? 'Logging in...' : 'LOG IN'} */}
            LOG IN
          </Button>
        </div>

        <p className="text-base text-center mt-4">
          Don’t have an account?{' '}
          <Link href="/signup" className="font-medium hover:underline">
            Sign Up!
          </Link>
        </p>
      </form>
    </div>
  )
}
