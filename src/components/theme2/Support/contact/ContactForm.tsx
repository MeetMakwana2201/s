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
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold">CONTACT US</h2>
            <Input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
            <Input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
            <Input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
            <Textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} />
            <Button type="submit">Submit</Button>
        </form>
    )
}
