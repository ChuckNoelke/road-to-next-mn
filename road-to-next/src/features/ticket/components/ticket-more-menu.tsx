'use client';

import {$Enums, Ticket} from "@prisma/client";
import { LucideTrash} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {TICKET_ICONS_LABELS} from "../constants"
import TicketStatus = $Enums.TicketStatus;
import {toast} from "sonner";
import {useConfirmDialog} from "@/components/confirm-dialog";
import {deleteTicket} from "@/features/ticket/actions/delete-ticket";
import {updateTicketStatus} from "@/features/ticket/actions/update-ticket-status";


type TicketMoreMenuProps = {
    ticket: Ticket,
    trigger: React.ReactNode,
}

const TicketMoreMenu =({ticket, trigger} : TicketMoreMenuProps) => {

    const [deleteButton, deleteDialog] = useConfirmDialog(
        {
            action: deleteTicket.bind(null, ticket.id),
            trigger: (
                <DropdownMenuItem>
                    <LucideTrash className="mr-2 h-4 w-4"/>
                    <span>Delete</span>
                </DropdownMenuItem>
            ),
        });



    const handleUpdateTicketStatus = async (value : string) =>{

        const promise = updateTicketStatus(ticket.id, value as TicketStatus);

        toast.promise(promise, {loading: "Updating status..."});

        const result = await promise;

        if (result.status==="ERROR"){
            toast.error(result.message)
        } else {
            toast.success(result.message)
        }
    }

    const TicketStatusRadioGroupItems = <DropdownMenuRadioGroup value={ticket.status} onValueChange={handleUpdateTicketStatus}>
        {(Object.keys(TICKET_ICONS_LABELS) as Array<TicketStatus>).map((label)=>
            (<DropdownMenuRadioItem key={label} value={label}>{TICKET_ICONS_LABELS[label]}</DropdownMenuRadioItem>))}
    </DropdownMenuRadioGroup>

    return (
        <>
            {deleteDialog}
            <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {trigger}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" className="w-56">
                        {TicketStatusRadioGroupItems}
                        <DropdownMenuSeparator />
                        {deleteButton}
                    </DropdownMenuContent>

            </DropdownMenu>
        </>
    );
};

export {TicketMoreMenu};