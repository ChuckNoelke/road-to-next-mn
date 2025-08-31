

import {PrismaClient} from '@prisma/client';
import { SearchParams } from '../search-params';

const prisma = new PrismaClient();


export const getTickets= async (userId: string|undefined,searchParams:SearchParams) =>{

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