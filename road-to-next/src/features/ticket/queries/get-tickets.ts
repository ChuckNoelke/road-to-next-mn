

import {PrismaClient} from '@prisma/client';
import { ParsedSearchParams } from '../search-params';

const prisma = new PrismaClient();


export const getTickets= async (userId: string|undefined,searchParams:ParsedSearchParams) =>{

    return await prisma.ticket.findMany(
        {
            where: {
                userId,
                ...(searchParams.search &&{
                title: {
                    contains: searchParams.search,
                    mode: 'insensitive',
                }}),
            },
            orderBy:{
                
                ...(searchParams.sort === "newest" &&{createdAt: "desc"}),
                ...(searchParams.sort === "bounty" &&{bounty: "desc"}),
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