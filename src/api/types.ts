interface Event {
    eventId: string,
    namePub: string,
    description: string,
    currencyIso: string,
    dateFrom: string,
    dateTo: string,
    headerImageUrl: string,
    place: string
};

interface Tickets {
    ticketTypes: TicketType[],
    seatRows: SeatRow[],

};

type TicketType = {
    id: string,
    name: string,
    price: number
}

type SeatRow = {
    seatRow: number,
    seats: Seat[]
}

type Seat = {
    seatId: string,
    place: number,
    ticketTypeId: string
}

interface TestLoginReq {
    email: string,
    password: string
};

interface TestLoginRes {
    message: string,
    user: {
        firstName: string,
        lastName: string,
        email: string
    }

};

interface OrderReq {
    eventId: string,
    tickets: 
        {
            ticketTypeId: string,
            seatId: string
        }[],
    user: User
};

type User = {
    email: string,
    firstName: string,
    lastName: string
};

interface OrderRes {
    message: string,
    orderId: string,
    tickets:         {
        ticketTypeId: string,
        seatId: string
    }[],
    user: User,
    totalAmount: number
};

export type {
    Event, Tickets, TicketType, SeatRow, Seat,
    TestLoginReq, TestLoginRes,
    OrderReq, OrderRes, User
  };