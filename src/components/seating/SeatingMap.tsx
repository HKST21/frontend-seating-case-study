import { Tickets } from "@/api/types";
import { useState, useEffect } from "react";
import { getEventTix } from "@/api/endpoints";

type Props = {
    eventId: string | undefined
  }
export function SeatingMap({eventId}: Props) {

    const [tix, setTix] = useState<Tickets>();

    if (eventId) {

        useEffect(() => {

            const loadTix = async () => {
                try {
                    const data = await getEventTix(eventId);
    
                    setTix(data)
                }
    
                catch (err) {
                    console.error("failed to load tix", err);
                }
            }
            loadTix();   
    
        },[eventId])

    }




    return (
        <div></div>
    )
}