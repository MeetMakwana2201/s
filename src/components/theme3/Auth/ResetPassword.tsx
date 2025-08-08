'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'

export default function ResetPassword() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        console.log('Signup successful:', password)
        setLoading(false)

    }

    return (
        <div className="flex flex-col justify-center items-center md:p-8 w-full max-w-2xl m-auto">
            <h2 className="text-2xl font-bold font-[outfit] text-black mb-2 text-center">
                RESET PASSWORD
            </h2>
            <p className="text-base text-gray-600 mb-6 text-center">Reset your password</p>

            <form onSubmit={handleReset} className="w-full space-y-4">
                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-base font-medium mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="New Password"
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

                {/* Confirm Password */}
                <div>
                    <label htmlFor="confirmPassword" className="block text-base font-medium mb-1">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border-[#515151] pr-10"
                            required
                        />
                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm cursor-pointer"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </span>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex justify-center items-center">
                    <Button
                        type="submit"
                        className="rounded-none md:w-fit w-full px-28 mt-4"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'UPDATE'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
