

import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();


export const getTickets= async () =>{

    return await prisma.ticket.findMany(
        {
            orderBy:{
                createdAt: "desc",
            }
        }
    );
};