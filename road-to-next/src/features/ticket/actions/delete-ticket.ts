'use server';
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {setCookieByKey} from "@/actions/cookies";
import {fromErrorToActionState} from "@/components/form/utils/to-action-state";
import {prisma} from "@/lib/prisma";
import {ticketsPath} from "@/paths";


const deleteTicket= async (id: string)=>{

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