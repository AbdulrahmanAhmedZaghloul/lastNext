'use client'

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const Context = createContext(0);

export default function UserContext({ children }: any) {

    let router = useRouter()

    const [userToken, setUserToken] = useState<any>(null);

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            setUserToken(localStorage.getItem('userToken'))
        } else {
            router.push('/login')
        }
    }, [userToken])

    return (
        <Context.Provider value={{ userToken, setUserToken }}>
            {children}
        </Context.Provider>
    );
}