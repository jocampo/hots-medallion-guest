import { toast } from 'react-toastify';
import { Store } from 'redux';
/* eslint-disable @typescript-eslint/no-explicit-any */
import SockJS, { OPEN } from 'sockjs-client';
import GuestState from '../redux/guest-state';

const WS_PORT = 8080;
enum WS_ROUTES {
    ROOMS = 'rooms',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AbstractPayloadData {} // TODO: Temporary: does this make sense? can we actually reuse request data?

interface WsPayload {
    msgType: string;
    data: AbstractPayloadData;
}

class WSHandler {
    roomsWebSocket: WebSocket | null = null;

    // Redux store ref
    store: Store<GuestState> | null = null;

    constructor(store: Store<GuestState>) {
        this.store = store;
    }

    initialize() {
        if (!this.roomsWebSocket) {
            try {
                this.roomsWebSocket = new SockJS(`http://${location.hostname}:${WS_PORT}/${WS_ROUTES.ROOMS}`);
                this.roomsWebSocket.onmessage = (msg) => this.handleWSMessage(JSON.parse(msg as any));
                this.roomsWebSocket.onopen = this.handleOnOpen;
                this.roomsWebSocket.onclose = this.handleOnClose;
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

    handleOnOpen(wut) {
        toast.info('Connected successfully!');
    }

    handleOnClose(wat) {
        toast.error('Connected closed!');
    }
}

export default WSHandler;