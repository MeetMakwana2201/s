import { Mail, MapPin, Phone } from "lucide-react"

const contactData = {
    address: "3068 Roane Avenue Suitland, MD 20746",
    phone: "301-225-4587",
    email: "loremipsum.dolorsit@gmail.com",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur  "
}

export default function ContactInfo() {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl lg:text-4xl font-black font-[outfit] uppercase">REACH US OUT AT</h2>
            <p className="text-sm lg:text-lg">{contactData.description}</p>
            <div className="flex items-center gap-2 text-sm lg:text-lg">
                <div className="border border-[#515151] rounded p-2.5">
                    <MapPin size={18} />
                </div>
                {contactData.address}
            </div>
            <div className="flex items-center gap-2 text-sm lg:text-lg">
                <div className="border border-[#515151] rounded p-2.5">
                    <Phone size={18} />
                </div>
                {contactData.phone}
            </div>
            <div className="flex items-center gap-2 text-sm lg:text-lg">
                <div className="border border-[#515151] rounded p-2.5">
                    <Mail size={18} />
                </div>
                {contactData.email}
            </div>
        </div>
    )
}
