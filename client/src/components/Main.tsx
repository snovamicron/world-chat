import { useEffect, useState } from "react"

// components
import Welcome from "./Main/Welcome"
import Home from "./Main/Home"

const Main = ()=>{
    const [ view, setView ] = useState(true)

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
       {!view && <Home/>}
        </>
    )
}

export default Main