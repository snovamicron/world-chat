import { useEffect, useState, useContext } from "react"


// components
import Welcome from "./Main/Welcome"
import Home from "./Main/Home"
import UserDialog from "./Main/Home/UserDialog"


// context
import { DataContext } from "../context/DataContext"


const User = UserDialog as React.JSXElementConstructor<{
    open: boolean,
    handleClose: () => void
   }>

const Main = ()=>{
    const [ view, setView ] = useState<boolean>(true)
    const [open, setOpen] = useState<boolean>(false)
    const {socket, messageSender} = useContext(DataContext)
    const handleClickOpen = ():void => {
      setOpen(true);
    }
    const handleClose = ():void => {
      setOpen(false);
    }
    const welcomeStopper = ()=>{
        setTimeout(() => {
            setView(false)
        }, 4500);
    } 
    const removeUser = ():void =>{
        socket.current.emit('endTheChat',{name: messageSender.name, id: messageSender.id})
    }
    useEffect(()=>{
        handleClickOpen()
        welcomeStopper()
        window.onload = function() {
            var reloading = sessionStorage.getItem("reloading");
            if (reloading) {
                sessionStorage.removeItem("reloading");
                removeUser();
            }
        }
    },[])
    
    return (
        <>
       {view &&  <Welcome/>}
       {
       !view &&
       <>
       <User open={open} handleClose={handleClose}/>
       <Home/>
       </>
       }
        </>
    )
}

export default Main