interface layoutChildren{
    children: React.ReactNode,
}

export default function AuthLayout({children} : layoutChildren){
return(
    <>
    {children}
    </>
)
}