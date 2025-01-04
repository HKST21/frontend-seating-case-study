import React, { useState } from "react";
import { testLogin } from "@/api/endpoints";
import { User } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type LoginProps = {
    // clb fce  po přihlášení uživatele
    onLoginSuccess: (user: User) => Promise<void>;
    // clb fce při objednávce jako host
    onGuestCheckout: (user: User) => Promise<void>;
}
/**
Componenta řeší přihlášení jako host nebo login reg useru
 */
export function Login({ onLoginSuccess, onGuestCheckout }: LoginProps) {

    // state pro uživatele kvůli vykreslení elementů
    const [userType, setUsertype] = useState<'initial' | 'login' | 'guest'>('initial');
    // state pro stav objednávky
    const [orderStatus, setOrderStatus] = useState<'succes' | 'failed'>();
    // state pro popover
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Zpracování přihlášeného uživatele
     * @param event z inputů
     */
    const handleOrderLoggedUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            console.log('Calling testLogin');
            const response = await testLogin();
            console.log('testLogin response:', response);
            // zavolá se v Cart, řeší vytvoření order na základě dat o uživateli
            onLoginSuccess(response.user); 
            setOrderStatus('succes')
            setIsOpen(false);
        } catch (error) {
            console.error('Login failed:', error);
            setOrderStatus('failed')

        }
    };


    const handleOrderHostUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            const formData = new FormData(e.currentTarget);

            const userData = {
                firstName: formData.get('firstname') as string,
                lastName: formData.get('lastname') as string,
                email: formData.get('email') as string

            };
            console.log('userData', userData);
            // zavolá se v Cart, řeší vytvoření order na základě dat o uživateli
            onGuestCheckout(userData);
            setIsOpen(false);
            setOrderStatus('succes')

        }
        catch (err) {
            console.error('Creating order failed:', err);
            setOrderStatus('failed')
        }




    }

    return (
        <>
            <Popover open={isOpen} onOpenChange={(state: boolean) => setIsOpen(state)}>
                {/*open={isOpen} je prop který říká Popoveru, zda má být viditelný nebo ne. Reaguje na stav isOpen, který je řízen pomocí useState výše*/}
                <PopoverTrigger> {/* propojeno s button checkout now, otevírá PopoverContent díkyopen a onOpenChange, open a onOpenChange jsou props z PopoverPrimitive.Root v popover.tsx */}
                    <span>
                        <Button variant="default">
                            Checkout now
                        </Button>
                    </span>

                </PopoverTrigger>
                <PopoverContent>
                    {userType === 'guest' ? (
                        <div className="space-y-4">
                            <form onSubmit={handleOrderHostUser}>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="křestní jméno"
                                        name="firstname"
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="přijímení"
                                        name="lastname"
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        placeholder="email"
                                        name="email"
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <Button type="submit" variant="default" className="w-full">
                                    Potvrdit objednávku
                                </Button>
                            </form>
                        </div>
                    ) : userType === 'initial' ? (
                        <div className="space-y-4">
                            <Button onClick={() => setUsertype('login')} className="w-full">
                                Přihlásit se
                            </Button>
                            <Button variant="outline" onClick={() => setUsertype('guest')}>
                                Pokračovat jako host
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <form onSubmit={handleOrderLoggedUser}>
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        value="frontend@nfctron.com"
                                        className="w-full p-2 border rounded"
                                        disabled />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        value="Nfctron2025"
                                        disabled />
                                </div>
                                <Button type="submit" variant="default" className="w-full">
                                    Potvrdit objednávku
                                </Button>
                            </form>
                        </div>

                    )}
                </PopoverContent>
            </Popover>
            {orderStatus === 'succes' ? (
                <div className="mt-4 p-2 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
                ✅Objednávka byla úspěšná
                </div>) : null}
            
            {orderStatus === 'failed' ? (
                <div className="mt-4 p-2 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                ❌Objednávka byla neúspěšná
                </div>) : null}
        </>
    );
}
