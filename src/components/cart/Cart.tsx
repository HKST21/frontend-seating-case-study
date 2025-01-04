import { useState } from "react";
import { TicketType } from "@/api/types";
import { Button } from "@/components/ui/button";
import { User } from "@/api/types";
import { Login } from "../login/Login";
import { createOrder } from "@/api/endpoints";

type CartProps = {
    selectedSeats: {
        ticketTypeId: string,
        seatId: string
    }[];
    ticketTypes: TicketType[];
    eventId: string | undefined;
}

export function Cart({ selectedSeats, ticketTypes, eventId }: CartProps) {
    // Spočítáme celkovou cenu
    const totalPrice = selectedSeats.reduce((sum, seat) => {
        const ticketType = ticketTypes.find(t => t.id === seat.ticketTypeId);
        return sum + (ticketType?.price || 0);
    }, 0);

    const [showLogin, setShowLogin] = useState(false);

    const handleLoginSuccess = async (user: User) => { // voláme funkci na vytvoření order na BE
        console.log('handleLoginSuccess called with user:', user);

        try {
            if (eventId) {
                console.log('Creating order with:', { eventId, tickets: selectedSeats, user });
                await createOrder({
                    eventId: eventId,
                    tickets: selectedSeats,
                    user: user
                });
                setShowLogin(false)
            }            

        }
        catch (err) {
            console.error('Order failed', err)
        }

    }

    return (
        <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
            <div className="flex flex-col">
                <span>Total for {selectedSeats.length} tickets</span>
                <span className="text-2xl font-semibold">{totalPrice} CZK</span>
            </div>
            <Login onLoginSuccess={handleLoginSuccess} onGuestCheckout={handleLoginSuccess} />
        </div>
     );
    }