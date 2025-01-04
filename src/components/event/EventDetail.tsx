import { useEffect, useState } from "react";
import { Event } from "@/api/types";
import { getEvent } from "@/api/endpoints";

type Props = {
    /**clb pro předání id eventu do app */
    onEventLoad: (id: string) => void,
    /**clb pro předání objektu event do app pro google cal */
    onEventUrlData: (event: Event) => void  
  }

/**
 * 
 Componenta zobrazuje detail události
 */

export function EventDetail({onEventLoad, onEventUrlData}: Props) {
    //State pro uložení dat o události
    const [event, setEvent] = useState<Event | undefined>();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {

        try {
            const loadEventData = async () => {

                setLoading(true);
                const data = await getEvent();
                setEvent(data);
                
                if (data.eventId) {
                    // volám setEventId s parametrem eventId vlastnosti na objektu z BE. Zavoláním předám eventId do  Appu.
                    onEventLoad(data.eventId) 
                }
                // předám objekt do Appu, jde o setovací fci setEventUrlData()
                onEventUrlData(data); 

            }
            loadEventData();

            
        }

        catch (err) {
            console.error("loading event data failled", err)
        }

        finally {
            setLoading(false)
        }

    }, []);


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

