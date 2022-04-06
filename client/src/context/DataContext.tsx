import React, { ReactNode, createContext, useState, useEffect, useRef } from "react";
import { io } from 'socket.io-client'

export interface userInfoType{
    name:string,
    id:string,
    socketId:any
}

interface userInfoTypeForSend{
    name: string,
    id: string
}

interface contextType {
    userData:userInfoType[],
    setUserData:React.Dispatch<React.SetStateAction<userInfoType[]>>,
    messageReciver:userInfoType,
    setMessageReciver:React.Dispatch<React.SetStateAction<userInfoType>>,
    messageSender:userInfoTypeForSend,
    setMessageSender:React.Dispatch<React.SetStateAction<userInfoTypeForSend>>,
    socket: any
}

export const DataContext = createContext<contextType | null>(null)

type Props = {
    children: ReactNode
}



export default function DataContextProvider ({children}:Props){
    const [userData, setUserData] = useState<Array<userInfoType>>([])
    const [messageReciver, setMessageReciver] = useState<userInfoType>()
    const [messageSender, setMessageSender] = useState<userInfoTypeForSend>()
    const socket = useRef<any>(null)
    useEffect(()=>{
         socket.current = io('http://localhost:4000')
    },[])
    return (
        <DataContext.Provider value={{userData, setUserData, messageReciver, setMessageReciver, socket, messageSender, setMessageSender}}>
            {
                children
            }
        </DataContext.Provider>
    )
}