import { toast } from 'react-toastify';
import { Store } from 'redux';
import SockJS, { OPEN, OpenEvent } from 'sockjs-client';
import GuestState from '../redux/guest-state';
import { WsPayload } from './message-types';
import { injectable } from 'inversify';

const WS_PORT = 8080;
enum WS_ROUTES {
    ROOMS = 'rooms',
}

export interface WSHandlerI {
    roomsWebSocket: WebSocket | null;
    store: Store<GuestState> | null;
    initialize();
    sendMessage(payload: WsPayload);
    isConnected(): boolean;
    handleWSMessage(payload: WsPayload);
    handleOnOpen(openEvent: OpenEvent);
    handleOnClose(closeEvent: CloseEvent);
}

@injectable()
class WSHandler implements WSHandlerI {
    roomsWebSocket: WebSocket | null = null;

    // Redux store ref
    store: Store<GuestState> | null = null;

    hasConnectionBeenEstablished = false;

    constructor(store: Store<GuestState>) {
        this.store = store;
    }

    initialize() {
        if (!this.roomsWebSocket) {
            try {
                this.roomsWebSocket = new SockJS(`http://${location.hostname}:${WS_PORT}/${WS_ROUTES.ROOMS}`);
                this.roomsWebSocket.onmessage = (msg) => this.handleWSMessage(JSON.parse(msg as any));
                this.roomsWebSocket.onclose = this.handleOnClose.bind(this);
                this.roomsWebSocket.onopen = this.handleOnOpen.bind(this);
            } catch (e) {
                console.info(e);
                toast.error('Failed to connect to server...');
            }
        } else {
            console.error('WebSocket state is invalid for initialization', this.roomsWebSocket.readyState);
        }
    }

    // Use promises so caller can know if their message was sent?
    sendMessage(payload: WsPayload) {
        if (!this.isConnected()) {
            toast.error('You must reconnect to the server first.');
            return;
        }
        const requestData = JSON.stringify(payload);
        console.log('Sending payload to ws', requestData);
        this.roomsWebSocket?.send(requestData);
    }

    isConnected(): boolean {
        return this.roomsWebSocket !== null && this.roomsWebSocket.readyState === OPEN;
    }

    handleWSMessage(payload: WsPayload) {
        console.log('Received payload from ws', JSON.stringify(payload));
        console.log(this);
    }

    handleOnOpen(openEvent: OpenEvent) {
        this.hasConnectionBeenEstablished = true;
        toast.info('Connected successfully!');
    }

    handleOnClose(closeEvent: CloseEvent) {
        if (!this.hasConnectionBeenEstablished) {
            toast.error('Unable to reach server');
            this.hasConnectionBeenEstablished = false;
        } else {
            toast.error('Connection with the server lost!');
        }

        // TODO: Should we attempt to reconnect after X delay?
    }
}

export default WSHandler;
