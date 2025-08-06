'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'

export default function VerifyOtp() {
    const [otp, setOtp] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [canResend, setCanResend] = useState(false)

    const totalTime = 120 // 2 minutes
    const [secondsLeft, setSecondsLeft] = useState(totalTime)

    // ✅ Handle verify OTP
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        console.log('Verifying OTP:', otp)
    }

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60)
        const s = secs % 60
        return `${m}:${s < 10 ? '0' : ''}${s}`
    }

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (secondsLeft > 0) {
            interval = setInterval(() => {
                setSecondsLeft((prev) => prev - 1)
            }, 1000)
        } else {
            setCanResend(true)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [secondsLeft])

    const progressValue = ((totalTime - secondsLeft) / totalTime) * 100

    const handleresendverification = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            console.log('Resending verification...');

            // const email = localStorage.getItem('email') || '';
            // const data = await resendVerification(email);

            // if (data.status !== 0) {
            //     toast.custom((t) => (
            //         <div className='flex items-center justify-between bg-white px-4 py-2 rounded-lg border md:min-w-md border-s-3 border-s-green-600'>
            //             <p>We’ve sent you an OTP. Please verify your email</p>
            //             <button onClick={() => toast.dismiss(t)}>X</button>
            //         </div>
            //     ));
            // } else {
            //     console.log('Registration successful:', data);
            //     const message = data?.message || '';
            //     setErrors({
            //         otp: message.toLowerCase().includes('otp') ? message : '',
            //     });
            // }
        } catch (error) {
            console.error('Something went wrong:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center md:p-8 w-full mx-auto">
            <h2 className="text-2xl font-bold font-[outfit] text-black mb-2 text-center">VERIFY OTP</h2>
            <p className="text-base text-gray-600 mb-6 text-center">Verify OTP to continue</p>

            <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div>
                    <label htmlFor="otp" className="block text-base font-medium mb-1">OTP</label>
                    <Input
                        id="otp"
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="border-[#515151]"
                        required
                    />
                </div>

                <div className="flex items-center gap-4 justify-center flex-wrap lg:max-w-xl mx-auto">
                    <div className="relative flex-1">
                        <Button
                            onClick={canResend ? handleresendverification : undefined}
                            className=" relative overflow-hidden rounded-none flex flex-col items-center justify-center border border-black gap-1 py-4 w-full"
                        >
                            {/* Black text (default) */}
                            <span className="relative z-10 text-sm font-medium w-full text-black ">
                                {canResend ? 'Resend OTP' : `Resend OTP in ${formatTime(secondsLeft)}`}
                            </span>

                            {/* White text clipped to progress width */}
                            <span
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-full text-center text-sm font-medium text-white pointer-events-none z-20"
                                style={{
                                    clipPath: `inset(0 ${100 - progressValue}% 0 0)`, // show only the part under the progress bar
                                }}
                            >
                                {canResend ? 'Resend OTP' : `Resend OTP in ${formatTime(secondsLeft)}`}
                            </span>

                            {/* Progress bar behind text */}
                            <Progress
                                value={progressValue}
                                className="absolute bottom-0 left-0 w-full h-10 z-0 bg-white rounded-none"
                            />
                        </Button>
                    </div>

                    <Button
                        type="submit"
                        className="rounded-none px-6 flex-1"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'VERIFYING...' : 'SUBMIT'}
                    </Button>
                </div>

            </form>
        </div>
    )
}
