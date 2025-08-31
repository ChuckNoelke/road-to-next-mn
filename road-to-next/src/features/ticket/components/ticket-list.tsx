import { SearchInput } from "@/components/search-input";
import {TicketItem} from "@/features/ticket/components/ticket-item";
import {getTickets} from "@/features/ticket/queries/get-tickets";
import { SearchParams } from "../search-params";

type TicketListProps = {
    userId?: string;
    searchParams: SearchParams;
}
const TicketList = async ({ userId,searchParams }: TicketListProps) =>{

    const tickets = await getTickets(userId,searchParams);
    
    return (
        <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
            <div className="w-full max-w-[420px]">
            
            <SearchInput placeholder="Search tickets ..." />
            
            </div>
            {tickets.map((ticket) => (
                <TicketItem key={ticket.id} ticket={ticket}/>
            ))}
        </div>
    );
}

export {TicketList};