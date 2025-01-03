import { Tickets, Seat as SeatType, TicketType } from "@/api/types";  // Přidáme Seat typ a přejmenujeme ho na SeatType
import { useState, useEffect } from "react";
import { getEventTix } from "@/api/endpoints";
import { Seat } from "../Seat";
import React from "react";

/*
* Poznámka:
* API vrací při každém volání - refreshi stránky různá data sedadel. Pravděpodobně je o záměr a nebudu to řešit.
*/

type Props = {
    eventId: string | undefined;
    selectedSeats: {
        ticketTypeId: string,
        seatId: string
    }[];
    onSelectSeats: (callback: (prev: {
        ticketTypeId: string,
        seatId: string
    }[]) => {
        ticketTypeId: string,
        seatId: string
    }[]) => void;
    onTicketTypesLoad: (types: TicketType[]) => void;
}
export function SeatingMap({ eventId, selectedSeats, onSelectSeats, onTicketTypesLoad }: Props) {

    const [tix, setTix] = useState<Tickets>();



    const handleSeatSelection = (seat: SeatType) => {
        onSelectSeats(selectedSeats => {
            if (selectedSeats.some(s => s.seatId === seat.seatId)) {
                return selectedSeats.filter(s => s.seatId !== seat.seatId);
            } else {
                return [...selectedSeats, {
                    seatId: seat.seatId,
                    ticketTypeId: seat.ticketTypeId
                }];
            }
        });
    };



    useEffect(() => {

        if (eventId) {

            const loadTix = async () => {
                try {
                    const data = await getEventTix(eventId);

                    setTix(data);
                    onTicketTypesLoad(data.ticketTypes)
                }

                catch (err) {
                    console.error("failed to load tix", err);
                }
            }
            loadTix();
            ;
        };

    }, [eventId])




    console.log("loaded tickets data", tix)

    return (
        <>
            <div className="bg-white rounded-md grow grid p-3 self-stretch shadow-sm" style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
                gridAutoRows: '40px'
            }}>
                {tix?.seatRows.map((row) => (
                    <React.Fragment key={row.seatRow}>
                        {row.seats.map((seat) => (
                            <Seat
                                key={seat.seatId}
                                isSelected={selectedSeats.some(s => s.seatId === seat.seatId)}
                                onClick={() => handleSeatSelection(seat)}
                                seatNumber={seat.place}
                                ticketType={tix.ticketTypes.find(ticket => ticket.id === seat.ticketTypeId)}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}

