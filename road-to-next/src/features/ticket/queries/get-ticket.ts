
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const getTicket = async (id:string) => {


    return await prisma.ticket.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    username: true,
                }
            }
        }
    });
};