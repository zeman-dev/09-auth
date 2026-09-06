'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react";

interface LayoutChildren{
    children: React.ReactNode,
}

export default function AuthLayout({children} : LayoutChildren){
 const router = useRouter();
 
 useEffect(()=>{
    router.refresh()
 },[])

return(
    <>
    {children}
    </>
)
}