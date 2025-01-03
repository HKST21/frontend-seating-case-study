import type {
    Event, Tickets, TicketType, SeatRow, Seat,
    TestLoginReq, TestLoginRes,
    OrderReq, OrderRes, User
} from "./types";

const API_BASE = 'https://nfctron-frontend-seating-case-study-2024.vercel.app';

export const getEvent = async (): Promise<Event> => {

    try {

        const response = await fetch(`${API_BASE}/event`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
    }

    catch (err) {
        console.error('Error fetching event', err);
        throw err
    }

};

export const getEventTix = async (eventId: string): Promise<Tickets> => {
    try {
        const response = await fetch(`${API_BASE}/event-tickets?eventId=${eventId}`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();


    }

    catch (err) {
        console.error('Error fetching tix and seatings', err);
        throw err
    }
};

export const testLogin = async (): Promise<TestLoginRes> => {
    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: "frontend@nfctron.com",
                password: "Nfctron2025"
            })

        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }

        return response.json();

    }

    catch (err) {
        console.error('Error fetching tix and seatings', err);
        throw err
    }
};

export const createOrder = async (order: OrderReq): Promise<OrderRes> => {
    try {
        const response = await fetch(`${API_BASE}/order`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json()

    }
    catch (err) {
        console.error('Error fetching tix and seatings', err);
        throw err
    }
};

