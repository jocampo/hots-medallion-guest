import React from 'react';
import ReactDom from 'react-dom';
import store from './redux/create-store';
import { Provider } from 'react-redux';
import HomeComponent from './components/home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WSHandler from './middleware/ws-client';
import './app.scss';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);
const wsHandler = new WSHandler(store);
wsHandler.initialize();
const WebSocketContext = React.createContext(wsHandler);

class App extends React.Component {
    render() {
        return (
            <WebSocketContext.Provider value={wsHandler}>
                <Provider store={store}>
                    <p>:D</p>
                    <HomeComponent />
                    <ToastContainer />
                </Provider>
            </WebSocketContext.Provider>
        );
    }
}

ReactDom.render(<App />, mainElement);
