import { Button } from '@/components/ui/button.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { cn } from '@/lib/utils.ts';
import React from 'react';
import { TicketType } from '@/api/types';

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
    seatNumber?: number;
    isSelected?: boolean;
    onClick?: () => void;
    ticketType?: TicketType;
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>(({
    seatNumber,
    isSelected,
    onClick,
    ticketType,
    ...props
}, ref) => {
    return (
        <Popover>
            <PopoverTrigger>
                <div 
                    className={cn(
                        'size-8 rounded-full transition-colors',
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-zinc-100 hover:bg-zinc-200',
                        props.className
                    )}
                    onClick={onClick}
                    ref={ref}
                >
                    <span className="text-xs font-medium">
                        {seatNumber || '[n]'}
                    </span>
                </div>
            </PopoverTrigger>
            <PopoverContent>
                {ticketType ? (
                    <>
                        <div className="mb-2">
                            <div>{ticketType.name}</div>
                            <div className="font-semibold">{ticketType.price} CZK</div>
                        </div>
                        <footer className="flex flex-col">
                            {isSelected ? (
                                <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={onClick}
                                >
                                    Remove from cart
                                </Button>
                            ) : (
                                <Button 
                                    variant="default" 
                                    size="sm"
                                    onClick={onClick}
                                >
                                    Add to cart
                                </Button>
                            )}
                        </footer>
                    </>
                ) : (
                    <pre>{JSON.stringify({ seatData: null }, null, 2)}</pre>
                )}
            </PopoverContent>
        </Popover>
    );
});