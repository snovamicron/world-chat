import React, { ReactNode, createContext, useState, useEffect, useRef } from "react";
import { io } from 'socket.io-client'

export interface userInfoType{
    id:string,
    name:string,
    socketId:any
}

interface userObj {
    message: string,
    id: string,
    connectorId:string
}

interface contextType {
    userData:userInfoType[],
    setUserData:React.Dispatch<React.SetStateAction<userInfoType[]>>,
    messageReciver:userInfoType,
    setMessageReciver:React.Dispatch<React.SetStateAction<userInfoType>>,
    textMessagesStore:userObj[],
    setTextMessagesStore:React.Dispatch<React.SetStateAction<userObj[]>>,
    socket: any
}

export const DataContext = createContext<contextType | null>(null)

type Props = {
    children: ReactNode
}



export default function DataContextProvider ({children}:Props){
    const [userData, setUserData] = useState<Array<userInfoType>>([])
    const [messageReciver, setMessageReciver] = useState<userInfoType>()
    const [textMessagesStore, setTextMessagesStore] = useState<Array<userObj>>([])
    const socket = useRef<any>(null)
    useEffect(()=>{
         socket.current = io('http://localhost:4000')
    },[])
    return (
        <DataContext.Provider value={{userData, setUserData, messageReciver, setMessageReciver, textMessagesStore, setTextMessagesStore, socket}}>
            {
                children
            }
        </DataContext.Provider>
    )
}