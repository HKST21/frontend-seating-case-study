import React, { useState } from "react";
import { testLogin } from "@/api/endpoints";
import { User, TestLoginRes } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type LoginProps = {
    onLoginSuccess: (user: User) => Promise<void>;
    onGuestCheckout: (user: User) => Promise<void>;
}

export function Login({ onLoginSuccess, onGuestCheckout }: LoginProps) {

    const [userType, setUsertype] = useState<'initial' | 'login' | 'guest'>('initial');
    const [logResMess, setLogResMess] = useState<'succes' | 'failed'>();
    const [isOpen, setIsOpen] = useState(false);


    const handleLogin = async () => {
        try {
            const response = await testLogin();
            onLoginSuccess(response.user); // zavolá se v Cart, řeší co se stane po úspěšném přihlášení
            setLogResMess('succes')
        } catch (error) {
            console.error('Login failed:', error);
            setLogResMess('failed')
        }
    };
    console.log('Login render, open:', open);

    const handleCreateOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        onGuestCheckout({
            firstName: formData.get('firstname') as string,
            lastName: formData.get('lastname') as string,
            email: formData.get('email') as string
        });

    }

    return (
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
                        <form onSubmit={handleCreateOrder}>
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
                        <form onClick={handleLogin}>
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
    );
}
