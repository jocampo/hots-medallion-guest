/* eslint-disable @typescript-eslint/no-explicit-any */
import SockJS, { OPEN } from 'sockjs-client';

enum WS_ROUTES {
    ROOMS = 'rooms',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AbstractPayloadData {}

interface WsPayload {
    msgType: string;
    data: AbstractPayloadData;
}

const WS_PORT = 8080;

const roomsWebSocket = new SockJS(`http://${location.hostname}:${WS_PORT}/${WS_ROUTES.ROOMS}`);

roomsWebSocket.onmessage = (msg) => processWSMessage(JSON.parse(msg as any));
roomsWebSocket.onopen = () => console.log('holi');
roomsWebSocket.onclose = () => console.log('yikes, rip');

const processWSMessage = (payload: WsPayload) => {
    console.log('Received payload from ws', JSON.stringify(payload));
};

const wsHandler = {
    sendMessage: (payload: WsPayload) => {
        // checks
        const requestData = JSON.stringify(payload);
        console.log('Sending payload to ws', requestData);
        roomsWebSocket.send(requestData);
    },
    isConnected: (): boolean => roomsWebSocket.readyState === OPEN,
};
export default wsHandler;
