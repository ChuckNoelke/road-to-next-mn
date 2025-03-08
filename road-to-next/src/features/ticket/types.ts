
export type Ticket = {
    id:string,
    title: string,
    content: string,
    status: TicketStatus
}

export type TicketStatus= "OPEN" | "DONE" | "IN_PROGRESS"
