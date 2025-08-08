

import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();


export const getTickets= async (userId: string|undefined) =>{

    return await prisma.ticket.findMany(
        {
            where: {
                userId,
            },
            orderBy:{
                createdAt: "desc",
            },
            include: {
                user: {
                    select: {
                        username: true,
                    }
                }
            }
        }
    );
};