
'use server';
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {z} from "zod";
import {setCookieByKey} from "@/actions/cookies";
import {ActionState, fromErrorToActionState, toActionState} from "@/components/form/utils/to-action-state";
import {prisma} from "@/lib/prisma";
import {ticketPath, ticketsPath} from "@/paths";


const upsertTicketSchema = z.object(
    {
        title: z.string().min(1).max(191),
        content: z.string().min(1).max(1024),
    }
)



const upsertTicket = async (id : string | undefined ,
                            _actionState: ActionState,
                            formData :FormData ) => {
    try {
        const data = upsertTicketSchema.parse({
            title: formData.get("title"),
            content: formData.get("content"),
        });

        const ensure_id = id ?? '';

        await prisma.ticket.upsert({
            where: {
                id: ensure_id
            },
            update: data,
            create: data
        });
    } catch(error) {

            return fromErrorToActionState(error,formData);
               /* message: "Something happened",
                payload: formData,*/

    }

    revalidatePath(ticketsPath());

    if (id){
        await setCookieByKey("toast","Ticket updated");

        redirect(ticketPath(id));}

    return toActionState("SUCCESS","Ticket created");


}

export {upsertTicket};