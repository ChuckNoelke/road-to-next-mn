'use server';
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {setCookieByKey} from "@/actions/cookies";
import {fromErrorToActionState, toActionState} from "@/components/form/utils/to-action-state";
import {prisma} from "@/lib/prisma";
import {ticketsPath} from "@/paths";
import getAuthOrRedirect from "@/features/auth/actions/queries/get-auth-or-redirect";
import { isOwner } from "@/utils/isOwner";


const deleteTicket= async (id: string)=>{


    const {user} = await getAuthOrRedirect();
        
    const ticket = await prisma.ticket.findUnique(
                        {
                            where: {
                                id,
                            }
                        }
                    );
    if (!ticket || !isOwner( user, ticket)) {
        return toActionState("ERROR","Not authorized to delete this ticket status");
    }

    await new Promise(resolve => setTimeout(resolve,1000) );
    try {
        await prisma.ticket.delete({
            where: {id,
            }
        });
    } catch (error) {
        return fromErrorToActionState(error);
    }
    revalidatePath(ticketsPath());
    await setCookieByKey("toast","Ticket deleted");
    redirect(ticketsPath());
};


export {deleteTicket};