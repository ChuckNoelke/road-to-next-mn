import {notFound} from "next/navigation";
import {CardCompact} from "@/components/card-compact";
import { getAuth } from "@/features/auth/actions/queries/get-auth";
import {TicketUpsertForm} from "@/features/ticket/components/ticket-upsert-form";
import {getTicket} from "@/features/ticket/queries/get-ticket";
import { isOwner } from "@/utils/isOwner";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { homePath, ticketPath } from "@/paths";

type TicketEditPageProps = {
    params: Promise<{
        ticketId: string;
    }>;
};

const TicketEditPage = async ({params} : TicketEditPageProps) => {
    const {user} = await getAuth();
    const {ticketId} = await params;
    const ticket = await getTicket(ticketId);
    const isTicketOwner = isOwner(user,ticket);
    const isTicketFound = !ticket;

    if (isTicketFound||!isTicketOwner) {
        notFound();
    }
    return (
    <div className="flex-1 flex flex-col gap-y-8 pl-4">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: homePath() },
          { title: ticket.title,href: ticketPath(ticket.id) },
          { title: "Edit"},
        ]}
      />

      <Separator />
        <div className="flex-1 flex flex-col justify-center items-center">
            <CardCompact title="Edit Ticket" description ="Change content here" content={<TicketUpsertForm ticket={ticket} />} className="w-full max-w-[420px] animate-fade-from-top" />
        </div>
        </div>
    )
};



export default TicketEditPage;