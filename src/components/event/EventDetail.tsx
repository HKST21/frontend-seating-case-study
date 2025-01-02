import React, { useEffect, useState } from "react";
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


        
    },[])




    return(
        <div>
            {loading ? <div>Loading...</div> :
            <div> 
                <h1>{event?.namePub}</h1>
                <p>{event?.description}</p>
                <p>{event?.place}</p>
                <p>{event?.dateFrom} - {event?.dateTo}</p>
            </div>}
        </div>
    )
}

