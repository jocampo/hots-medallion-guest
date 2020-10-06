import { Container } from 'bloomer/lib/layout/Container';
import { inject, injectable } from 'inversify';
import React from 'react';
import { TYPES } from '../inversify/container-types';
import { MessageTypes, WsPayload } from '../middleware/message-types';
import { WSHandlerI } from '../middleware/ws-client';
import '../styles/home.scss';

interface HomeState {
    userName: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
class HomeComponent extends React.Component<{}, HomeState> {
    @inject(TYPES.WsHandler)
    private wsHandler: WSHandlerI;

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        };

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.isUserNameValid = this.isUserNameValid.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
        this.createRoom = this.createRoom.bind(this);
    }

    handleUserNameChange(event) {
        // TODO: Validations and whatnot
        this.setState({ userName: event?.target?.value });
    }

    joinRoom() {
        console.log(this.context);
    }

    createRoom() {
        this.wsHandler.sendMessage({
            msgType: MessageTypes.BOOK_ROOM,
            data: {
                userName: this.state.userName,
            },
        } as WsPayload);
        // TODO: fixme
    }

    isUserNameValid(userName?: string): boolean {
        let name = userName;
        if (!name) {
            name = this.state.userName;
        }
        return name.length > 0;
    }

    render() {
        return (
            <Container className="home-wrapper">
                <div className="section-wrapper">
                    <div className="title">
                        <span className="text large">HotS Medallion</span> <br />
                        <span className="text xlarge">Tracker</span>
                    </div>
                </div>
                <div className="section-wrapper form-wrapper">
                    <span className="text small">BattleTag / Name</span>
                    <input type="text" value={this.state.userName} onChange={this.handleUserNameChange} />
                    <input
                        type="button"
                        value="Create Room"
                        disabled={!this.isUserNameValid.call(this)}
                        onClick={this.createRoom}
                    />
                    <input
                        type="button"
                        value="Join Room"
                        disabled={!this.isUserNameValid.call(this)}
                        onClick={this.joinRoom}
                    />
                </div>
            </Container>
        );
    }
}
export default HomeComponent;
