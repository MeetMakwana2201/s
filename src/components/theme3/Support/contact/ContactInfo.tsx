import { Mail, MapPin, Phone } from "lucide-react"

const contactData = {
    address: "3068 Roane Avenue Suitland, MD 20746",
    phone: "301-225-4587",
    email: "loremipsum.dolorsit@gmail.com",
    description: "Lorem ipsum dolor sit amet..."
}

export default function ContactInfo() {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">REACH US OUT AT</h2>
            <p>{contactData.description}</p>
            <div className="flex items-start gap-2"><MapPin size={18} /> {contactData.address}</div>
            <div className="flex items-start gap-2"><Phone size={18} /> {contactData.phone}</div>
            <div className="flex items-start gap-2"><Mail size={18} /> {contactData.email}</div>
        </div>
    )
}
