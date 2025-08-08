



"use server";


import {TicketStatus} from "@prisma/client";
import {revalidatePath} from "next/cache";
import {fromErrorToActionState, toActionState} from "@/components/form/utils/to-action-state";
import {prisma} from "@/lib/prisma";
import {ticketsPath} from "@/paths";
import getAuthOrRedirect from "@/features/auth/actions/queries/get-auth-or-redirect";
import { isOwner } from "@/utils/isOwner";

export const  updateTicketStatus = async (id: string, status:TicketStatus)=> {
    const {user} = await getAuthOrRedirect();
    
    const ticket = await prisma.ticket.findUnique(
                        {
                            where: {
                                id,
                            }
                        }
                    );
    if (!ticket || !isOwner( user, ticket)) {
        return toActionState("ERROR","Not authorized to update this ticket status");
    }

    try {
        await prisma.ticket.update( {
            where: {id:id
            },
            data: {status},
        });
    } catch (error) {
        return fromErrorToActionState(error);
    }



    revalidatePath(ticketsPath());
    return toActionState("SUCCESS","Status updated");
}

