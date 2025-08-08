import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { MessageSquareDot } from "lucide-react"

type Ticket = {
    id: string
    content: string
    status: "UNRESOLVED" | "RESOLVED"
}

const tickets: Ticket[] = [
    {
        id: "934642340",
        content:
            "I would like to return my recent order #123456. Please guide me through the return process and let me know if any further information is required.",
        status: "UNRESOLVED"
    },
    {
        id: "934642341",
        content:
            "My package was delayed and I would like to understand the cause. Please advise when I can expect delivery.",
        status: "UNRESOLVED"
    }
]

export default function ActiveTickets() {
    return (
        <div className="mt-12 px-4 xl:px-12">
            <h2 className="text-2xl lg:text-4xl font-black font-[outfit] uppercase mb-4">ACTIVE TICKETS</h2>
            <div className="space-y-4">
                {tickets.map((ticket) => (
                    <Card key={ticket.id}
                        className="flex justify-between gap-4 p-5 border border-[#515151] rounded-md"
                    >
                        <div className="flex gap-3 items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-semibold text-base">Ticket ID:</span> #{ticket.id}
                                </p>
                            </div>
                            <Badge className="bg-yellow-600 text-white text-base px-4 py-2.5">
                                {ticket.status}
                            </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="mt-2 text-base max-w-3xl">{ticket.content}</p>

                            <div className="border border-[#515151] rounded p-2.5 cursor-pointer">
                                <MessageSquareDot size={16} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
