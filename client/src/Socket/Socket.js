import { io } from 'socket.io-client';

// const socket = io('localhost:4000');
const socket = io('https://price-ticker-service.herokuapp.com/');

export default socket;
