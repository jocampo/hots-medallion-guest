import './reset.css';
import 'bulma/css/bulma.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import HomeComponent from './components/home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import FooterComponent from './components/footer';
import appContainer from './inversify/inversify.config';
import { Store } from 'redux';
import { IGuestState } from './redux/guest-state';
import { TYPES } from './inversify/container-types';
import { IWSHandler } from './middleware/ws-client';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const store = appContainer.get<Store<IGuestState>>(TYPES.ReduxStore);

// TODO: While I fix the @injected properties not resolving, we're going to pass this down as a prop
const wsHandler = appContainer.get<IWSHandler>(TYPES.WsHandler);
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <HomeComponent wsHandler={wsHandler} />
                <FooterComponent />
                <ToastContainer />
            </Provider>
        );
    }
}

ReactDom.render(<App />, mainElement);
