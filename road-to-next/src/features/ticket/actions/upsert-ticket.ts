'use server';
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {z} from "zod";
import {setCookieByKey} from "@/actions/cookies";
import {ActionState, fromErrorToActionState, toActionState} from "@/components/form/utils/to-action-state";
import {getAuth} from "@/features/auth/actions/queries/get-auth";
import {prisma} from "@/lib/prisma";
import {signInPath, ticketPath, ticketsPath} from "@/paths";
import {toCent} from "@/utils/currency";
import getAuthOrRedirect from "@/features/auth/actions/queries/get-auth-or-redirect";
import { isOwner } from "@/utils/isOwner";

const upsertTicketSchema = z.object(
    {
        title: z.string().min(1).max(191),
        content: z.string().min(1).max(1024),
        deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
        bounty: z.coerce.number().positive(),
    }
)

const upsertTicket = async (id : string | undefined ,
                            _actionState: ActionState,
                            formData :FormData ) => {
        const {user}= await getAuthOrRedirect();

        try {
            if (id) {
                const ticket = await prisma.ticket.findUnique(
                    {
                        where: {
                            id,
                        }
                    }
                );
            if (!ticket || !isOwner( user, ticket)) {
                return toActionState("ERROR","Not authorized to edit this ticket");
            }
            }
        

        const data = upsertTicketSchema.parse({
            title: formData.get("title"),
            content: formData.get("content"),
            deadline: formData.get("deadline"),
            bounty: formData.get("bounty"),
        });

        const dbData = {
            ...data,
            bounty: toCent(data.bounty),
            userId: user.id,
        };

        const ensure_id = id ?? '';

        await prisma.ticket.upsert({
            where: {
                id: ensure_id
            },
            update: dbData,
            create: dbData
        });
    } catch(error) {
        return fromErrorToActionState(error, formData);
    }

    revalidatePath(ticketsPath());

    if (id) {
        await setCookieByKey("toast", "Ticket updated");
        redirect(ticketPath(id));
    }

    return toActionState("SUCCESS", "Ticket created");
}

export { upsertTicket };