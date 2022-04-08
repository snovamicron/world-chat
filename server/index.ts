import http from 'http'
import { Server } from 'socket.io'
import ws from 'ws'

const PORT = process.env.PORT || 4000
const httpServer = http.createServer()
const io = new Server(httpServer,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET', 'POST']
    },
    wsEngine: ws.Server
})



interface userInfo{
    id:string,
    name:string,
    socketId:any
}
class userDataBase{
    userArray:userInfo[] = []
    
    saveTheNewUser (user:userInfo):void{
        !this.userArray.some((ele) => ele.id === user.id) && this.userArray.push(user)
    }
    
    activeUser (id:any):boolean{
        return this.userArray.some((ele)=> ele.socketId === id)
    }
    
    disconnectUser (id:string):void{
        this.userArray.some((ele) => ele.id === id ) && this.userArray.splice(this.userArray.findIndex((ele)=> ele.id === id), 1)
    }

}

const database = new userDataBase()

io.on('connection',(socket)=>{

    // initial listener
    socket.on('requestToJoinTheChat', ({ name, id })=>{
        database.saveTheNewUser({
            id,
            name,
            socketId:socket.id
        })
        socket.emit('allUserData', database.userArray)
        socket.broadcast.emit('allNewUserData', database.userArray)
    })

    //massage sending
    socket.on('sendMessage' ,({ id, socketId, message })=>{
        if(database.activeUser(socketId)){
            socket.to(socketId).emit('reciveMessage', {message, id})
        }   
    })

    // disconnect user from the chat
    socket.on('endTheChat', ({ name, userId })=>{
        database.disconnectUser(userId)
        socket.broadcast.emit('anyUserLeftTheChat',`${name} left the chat id is ${userId}`)
    })

})


httpServer.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`)
})