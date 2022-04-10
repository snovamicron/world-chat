"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const ws_1 = __importDefault(require("ws"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    wsEngine: ws_1.default.Server
});
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'build', 'index.html'));
});
class userDataBase {
    constructor() {
        this.userArray = [];
    }
    saveTheNewUser(user) {
        !this.userArray.some((ele) => ele.id === user.id) && this.userArray.push(user);
    }
    activeUser(id) {
        return this.userArray.some((ele) => ele.socketId === id);
    }
    disconnectUser(id) {
        this.userArray.some((ele) => ele.id === id) && this.userArray.splice(this.userArray.findIndex((ele) => ele.id === id), 1);
    }
}
const database = new userDataBase();
io.on('connection', (socket) => {
    // initial listener
    socket.on('requestToJoinTheChat', ({ name, id }) => {
        database.saveTheNewUser({
            id,
            name,
            socketId: socket.id
        });
        socket.emit('allUserData', database.userArray);
        socket.broadcast.emit('allNewUserData', database.userArray);
    });
    //massage sending
    socket.on('sendMessage', ({ id, socketId, message }) => {
        if (database.activeUser(socketId)) {
            socket.to(socketId).emit('reciveMessage', { message, id });
        }
    });
    // disconnect user from the chat
    socket.on('endTheChat', ({ name, userId }) => {
        database.disconnectUser(userId);
        socket.broadcast.emit('anyUserLeftTheChat', `${name} left the chat id is ${userId}`);
    });
});
httpServer.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map