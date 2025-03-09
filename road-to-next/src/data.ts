export const initialTickets = [
  {
    id: "1",
    title: "Ticket 1",
    content: "This is the first ticket.",
    status: "DONE" as const,
  },
  {
    id: "2",
    title: "Ticket 2",
    content: "This is the second ticket.",
    status: "OPEN" as const,
  },
  {
    id: "3",
    title: "Ticket 3",
    content: "Customer reports that computer only works when facing north. Magnetism suspected.",
    status: "IN_PROGRESS" as const,
  },
  {
    id: "4",
    title: "Ticket 4",
    content: "Coffee machine firmware update needed. It's brewing decaf after 3pm regardless of selection.",
    status: "IN_PROGRESS" as const,
  },
  {
    id: "5",
    title: "Ticket 5",
    content: "User claims their code works on the first try. Investigation needed as this violates laws of programming.",
    status: "OPEN" as const,
  },
  {
    id: "6",
    title: "Ticket 6",
    content: "Office plant needs watering. Not IT related but nobody else will do it.",
    status: "DONE" as const,
  },
];
