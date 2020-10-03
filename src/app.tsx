import React from 'react';
import ReactDom from 'react-dom';
import store from './redux/create-store';
import { Provider } from 'react-redux';
import HomeComponent from './components/home';
import wsHandler from './middleware/ws-client';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const WebSocketContext = React.createContext(wsHandler);

class App extends React.Component {
    render() {
        return (
            <WebSocketContext.Provider value={wsHandler}>
                <Provider store={store}>
                    <p>:D</p>
                    <HomeComponent />
                </Provider>
            </WebSocketContext.Provider>
        );
    }
}

ReactDom.render(<App />, mainElement);
