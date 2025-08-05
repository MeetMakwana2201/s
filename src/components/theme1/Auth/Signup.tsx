'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        console.log('Signup successful:', fullName, email, password)
        setLoading(false)

    }

    return (
        <div className="flex flex-col justify-center items-center md:p-8 w-full">
            <h2 className="text-2xl font-bold font-[outfit] text-black mb-2 text-center">
                SIGN UP WITH <br /> UNITED ACCOUNT
            </h2>
            <p className="text-base text-gray-600 mb-6 text-center">Sign Up to start your journey</p>

            <form onSubmit={handleSignup} className="w-full space-y-4">
                {/* Full Name */}
                <div>
                    <label htmlFor="name" className="block text-base font-medium mb-1">
                        Full Name
                    </label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="border-[#515151]"
                        required
                    />
                </div>

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

                {/* Password with toggle */}
                <div>
                    <label htmlFor="password" className="block text-base font-medium mb-1">
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
                </div>

                {/* Sign Up Button */}
                <div className="flex justify-center items-center">
                    <Button
                        type="submit"
                        className="rounded-none md:w-fit w-full px-28 mt-4"
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'SIGN UP'}
                    </Button>
                </div>

                {/* Sign In Link */}
                <p className="text-sm text-center mt-4">
                    Already a user?{' '}
                    <Link href="/login" className="font-medium hover:underline">
                        Sign In!
                    </Link>
                </p>
            </form>
        </div>
    )
}
