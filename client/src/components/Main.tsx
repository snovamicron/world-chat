import { useEffect, useState } from "react"


// components
import Welcome from "./Main/Welcome"
import Home from "./Main/Home"

// context provider
import DataContextProvider from "../context/DataContext"

const Main = ()=>{
    const [ view, setView ] = useState<boolean>(true)

    const welcomeStopper = ()=>{
        setTimeout(() => {
            setView(false)
        }, 4500);
    }

    useEffect(()=>{
        welcomeStopper()
    },[])
    return (
        <>
       {view &&  <Welcome/>}
       <DataContextProvider>
       {!view && <Home/>}
       </DataContextProvider>
        </>
    )
}

export default Main