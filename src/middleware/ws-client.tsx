import { toast } from 'react-toastify';
import { Store } from 'redux';
import SockJS, { OPEN, OpenEvent } from 'sockjs-client';
import GuestState from '../redux/guest-state';
import { MessageTypes, WsPayload } from './message-types';
import { injectable } from 'inversify';
import { ActionCreators } from '../redux/action-creators';

const WS_PORT = 8080;
enum WS_ROUTES {
    ROOMS = 'rooms',
}

export interface IWSHandler {
    roomsWebSocket: WebSocket | null;
    store: Store<GuestState> | null;
    initialize();
    sendMessage(payload: WsPayload);
    isConnected(): boolean;
    handleWSMessage(payload: MessageEvent);
    handleOnOpen(openEvent: OpenEvent);
    handleOnClose(closeEvent: CloseEvent);
}

@injectable()
class WSHandler implements IWSHandler {
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
                this.roomsWebSocket.onmessage = this.handleWSMessage.bind(this);
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

    handleWSMessage(event: MessageEvent) {
        const payload: WsPayload = JSON.parse(event.data);
        console.log(`Received message with the following payload`, payload);
        const state = this.store?.getState();
        switch (payload.msgType) {
            case MessageTypes.USER_JOINED_ROOM:
                this.store?.dispatch(ActionCreators.userJoinedRoom(payload.data.user, payload.data.room));
                break;
            case MessageTypes.USER_LEFT_ROOM:
                this.store?.dispatch(ActionCreators.userLeftRoom(payload.data.user));
                break;
            case MessageTypes.ERROR_OCCURRED:
                toast.error(`Error code ${payload.data.code}! ${payload.data.message}`);
                break;
            case MessageTypes.HERO_ADDED:
                const roomCode = payload.data.roomCode;
                if (state?.room?.code === roomCode) {
                    this.store?.dispatch(ActionCreators.addHero(payload.data.hero, payload.data.team));
                }
                break;
            case MessageTypes.HERO_REMOVED:
                if (state?.room?.code === payload.data.roomCode) {
                    this.store?.dispatch(ActionCreators.removeHero(payload.data.hero, payload.data.team));
                }
                break;
            case MessageTypes.MEDALLION_USED:
                break;
            case MessageTypes.MEDALLION_OFF_CD:
                break;
            case MessageTypes.CANCEL_MEDALLION:
                break;
            default:
                toast.error(`Received unrecognized event ${payload.msgType}`);
        }
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
