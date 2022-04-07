import { useEffect, useState, useContext } from "react"


// components
import Welcome from "./Main/Welcome"
import Home from "./Main/Home"
import UserDialog from "./Main/UserDialog"

// context
import { DataContext } from "../context/DataContext"



const User = UserDialog as React.JSXElementConstructor<{
    open: boolean,
    handleClose: () => void
   }>

const Main = ()=>{
    const [ view, setView ] = useState<boolean>(true)
    const [open, setOpen] = useState<boolean>(false)
    const {socket} = useContext(DataContext)
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
    
    const removeUser = (user:string):void => {
            let userInfo = JSON.parse(user)
            socket.current.emit('endTheChat', {name:userInfo.name, userId:userInfo.id})
            localStorage.removeItem("user")
    }
    
    useEffect(()=>{
        handleClickOpen()
        welcomeStopper()
        window.onload = function() {
            var reloading = localStorage.getItem("user");
            if (reloading) {
                removeUser(reloading);
            }
        }
         // eslint-disable-next-line
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