
import { Cart } from './components/cart/Cart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx';
import { EventDetail } from './components/event/EventDetail';
import './App.css';
import { useState } from 'react';
import { SeatingMap } from './components/seating/SeatingMap';
import { TicketType } from './api/types';
import { Event } from './api/types';

/* Hlavní komponenta pro rezervační systém vstupenek, spravuje stav přihlášení, sedadel a událostí*/

function App() {
    const isLoggedIn = false;
	// States pro správu eventů, tix a seats
    const [eventId, setEventId] = useState<string>();
    const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<{
        ticketTypeId: string,
        seatId: string
    }[]>([]);
	// State pro data eventu pro Google cal
	const [eventUrlData, setEventUrlData] = useState<Event | undefined>();

	/**
	 * funkce pro načtení typů vstupenek
	 * @param types Pole dostupných typů vstupenek
	 */
    const handleTicketTypesLoad = (types: TicketType[]) => {
        setTicketTypes(types);
    };

	/**
	 * Generuje url pro přidání eventu do google cal
	 * @param event data z EventDetail comp obsahují název, datum, popis, místo konání
	 * @returns url pro google calendar api
	 */
	const generateGoogleCalendarUrl = (event: Event) => {
		const formatDate = (date: string) => {
			return date.replace(/[-:]/g, '').replace(' ', 'T') + 'Z';
		};
	
		return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.namePub)}&dates=${formatDate(event.dateFrom)}/${formatDate(event.dateTo)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.place)}`;
	};
	/**
	 * handler pro otevření nového okna s daty ze stavu eventUrlData
	 */

	const handleAddToGoogleCal = () => {

		if (eventUrlData) {
			window.open(generateGoogleCalendarUrl(eventUrlData), '_blank');
		}
		
	}
	
	return (
		<div className="flex flex-col grow">
			{/* header (wrapper) */}
			<nav className="sticky top-0 left-0 right-0 bg-white border-b border-zinc-200 flex justify-center">
				{/* inner content */}
				<div className="max-w-screen-lg p-4 grow flex items-center justify-between gap-3">
					{/* application/author image/logo placeholder */}
					<div className="max-w-[250px] w-full flex">
						<div className="bg-zinc-100 rounded-md size-12" />
					</div>
					{/* app/author title/name placeholder */}
					<div className="bg-zinc-100 rounded-md h-8 w-[200px]" />
					{/* user menu */}
					<div className="max-w-[250px] w-full flex justify-end">
						{
							isLoggedIn ? (
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost">
											<div className="flex items-center gap-2">
												<Avatar>
													<AvatarImage src={`https://source.boringavatars.com/marble/120/<user-email>?colors=25106C,7F46DB`} />
													<AvatarFallback>CN</AvatarFallback>
												</Avatar>
												
												<div className="flex flex-col text-left">
													<span className="text-sm font-medium">John Doe</span>
													<span className="text-xs text-zinc-500">john.doe@nfctron.com</span>
												</div>
											</div>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-[250px]">
										<DropdownMenuLabel>John Doe</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuGroup>
											<DropdownMenuItem disabled>
												Logout
											</DropdownMenuItem>
										</DropdownMenuGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							) : (
								<Button disabled variant="secondary">
									Login or register
								</Button>
							)
						}
					</div>
				</div>
			</nav>
			
			{/* main body (wrapper) */}
			<main className="grow flex flex-col justify-center">
                <div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
                    <SeatingMap 
                        eventId={eventId}
                        selectedSeats={selectedSeats}
                        onSelectSeats={setSelectedSeats}
                        onTicketTypesLoad={handleTicketTypesLoad}
                    />
                    
                    <aside className="w-full max-w-sm bg-white rounded-md shadow-sm p-3 flex flex-col gap-2">
                        <EventDetail onEventLoad={setEventId} onEventUrlData={setEventUrlData}/>
                        <Button variant="secondary" onClick={handleAddToGoogleCal}>Add to calendar</Button>
                    </aside>
                </div>
            </main>
            
            <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
                <Cart
                    selectedSeats={selectedSeats}
                    ticketTypes={ticketTypes}
					eventId={eventId}
                />
            </nav>
        </div>
    );
}

export default App;
