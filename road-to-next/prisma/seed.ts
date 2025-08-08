import {PrismaClient} from "@prisma/client";
import { hash } from "@node-rs/argon2";

const prisma = new PrismaClient();

const users = [
    {
        username: "marnoelke",
        email: "marnoelke@gmail.com",
    }
    
];



export const initialTickets = [
    {

        title: "Ticket 1",
        content: "This is the first ticket.",
        status: "DONE" as const,
        bounty: 499,
        deadline: new Date().toISOString().split("T")[0],
    },
    {

        title: "Ticket 2",
        content: "This is the second ticket.",
        status: "OPEN" as const,
        bounty: 499,
        deadline: new Date().toISOString().split("T")[0],
    },
    {

        title: "Ticket 3",
        content: "Customer reports that computer only works when facing north. Magnetism suspected.",
        status: "IN_PROGRESS" as const,
        bounty: 499,
        deadline: new Date().toISOString().split("T")[0],
    },
    {

        title: "Ticket 4",
        content: "Coffee machine firmware update needed. It's brewing decaf after 3pm regardless of selection.",
        status: "IN_PROGRESS" as const,
        bounty: 499,
        deadline: new Date().toISOString().split("T")[0],
    },
    {

        title: "Ticket 5",
        content: "User claims their code works on the first try. Investigation needed as this violates laws of programming.",
        status: "OPEN" as const,
        bounty: 499,
        deadline: new Date().toISOString().split("T")[0],
    },
    {

        title: "Ticket 6",
        content: "Office plant needs watering. Not IT related but nobody else will do it.",
        status: "DONE" as const,
        bounty: 499,
        deadline: new Date().toISOString().split("T")[0],
    },
];


const seed = async () => {

    /*const promises = initialTickets.map((ticket) => {
        prisma.ticket.create({
            data: ticket,
        });
    })
    await Promise.all(promises);*/
    const t0 = performance.now();

    

    console.log('Db seeding started at: ',t0);
    
    await prisma.user.deleteMany();
    await prisma.ticket.deleteMany();
   
    const passwordHash = await hash("geheimnis");

    const dbUsers = await prisma.user.createManyAndReturn({
        data: users.map((user)=> ({
            ...user,
            passwordHash: passwordHash

        })),
    })

    await prisma.ticket.createMany({
        data: initialTickets.map((ticket)=>({
            ...ticket,
            userId: dbUsers[0].id,
        }))
    });

    const t1 = performance.now();
    console.log('Db seeding ended at: ',t1-t0);
};

seed();


