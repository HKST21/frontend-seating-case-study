import { useEffect, useState } from "react";
import { Event } from "@/api/types";
import { getEvent } from "@/api/endpoints";


export function EventDetail() {

    const [event, setEvent] = useState<Event | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        try {
            const loadEventData = async () => {

                setLoading(true);
                const data = await getEvent();
                setEvent(data);

            }
            loadEventData();
        }

        catch (err) {
            console.error("loading event data failled", err)
        }

        finally {
            setLoading(false)
        }



    }, [])




    return (
        <div>
            {loading ? <div>Loading...</div> :
                <>
                    <div className="bg-zinc-100 rounded-md h-32" >
                        <img src={event?.headerImageUrl}
                            alt={event?.namePub}
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>
                    <h1 className="text-xl text-zinc-900 font-semibold">{event?.namePub}</h1>
                    <p className="text-sm text-zinc-500">{event?.description}</p>
                    <div className="text-sm text-zinc-500">
                        <p>Místo: {event?.place}</p>
                        <p>Datum: {event?.dateFrom ? new Date(event.dateFrom).toLocaleString('cs') : ''} - {event?.dateTo ? new Date(event.dateTo).toLocaleString('cs') : ''}</p>
                        <p>Měna akce: {event?.currencyIso}</p>
                    </div>
                </>}
        </div>
    )
}

