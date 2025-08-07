"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ContactForm() {
    const [form, setForm] = useState({ fullName: "", email: "", subject: "", message: "" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify(form)
        })
        alert("Message sent!")
        setForm({ fullName: "", email: "", subject: "", message: "" })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 border rounded-2xl border-[#515151] p-6 ">
            <h2 className="text-2xl font-black font-[outfit]">CONTACT US</h2>

            <div>
                <label htmlFor="fullName" className="text-base font-medium font-[outfit]" >
                    Full Name
                </label>
                <Input
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="border border-[#515151] mt-2.5"
                />
            </div>

            <div>
                <label htmlFor="email" className="text-base font-medium font-[outfit]">
                    Email Address
                </label>
                <Input
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="border border-[#515151] mt-2.5"
                />
            </div>

            <div>
                <label htmlFor="subject" className="text-base font-medium font-[outfit]">
                    Subject
                </label>
                <Textarea
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="border border-[#515151] mt-2.5"
                />
            </div>

            <div>
                <label htmlFor="message" className="text-base font-medium font-[outfit]">
                    Message
                </label>
                <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="border border-[#515151] mt-2.5"
                />
            </div>

            <div className="flex justify-center">
                <Button type="submit" className="w-full lg:w-fit px-25 py-4 rounded-none text-sm font-bold uppercase">Submit</Button>
            </div>
        </form>
    )
}
