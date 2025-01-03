import React from "react";
import { TicketType } from "@/api/types";
import { Button } from "@/components/ui/button";

type CartProps = {
    selectedSeats: {
        ticketTypeId: string,
        seatId: string
    }[];
    ticketTypes: TicketType[];
}

export function Cart({ selectedSeats, ticketTypes }: CartProps) {
    // Spočítáme celkovou cenu
    const totalPrice = selectedSeats.reduce((sum, seat) => {
        const ticketType = ticketTypes.find(t => t.id === seat.ticketTypeId);
        return sum + (ticketType?.price || 0);
    }, 0);

    return (
        <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
            <div className="flex flex-col">
                <span>Total for {selectedSeats.length} tickets</span>
                <span className="text-2xl font-semibold">{totalPrice} CZK</span>
            </div>
            
            <Button 
                disabled={selectedSeats.length === 0}
                variant="default"
            >
                Checkout now
            </Button>
        </div>
    );
}