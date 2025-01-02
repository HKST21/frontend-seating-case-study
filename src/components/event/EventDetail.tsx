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
                    <div className="bg-zinc-100 rounded-md h-32" />
                    <h1 className="text-xl text-zinc-900 font-semibold">{event?.namePub}</h1>
                    {/* event description */}
                    <p className="text-sm text-zinc-500">{event?.description}</p>
                </>}
        </div>
    )
}

