import { Container } from 'inversify';
import { Store } from 'redux';
import WSHandler, { IWSHandler } from '../middleware/ws-client';
import store from '../redux/create-store';
import { TYPES } from './container-types';

const appContainer = new Container();

appContainer.bind<Store>(TYPES.ReduxStore).toConstantValue(store);

const wsHandler = new WSHandler(store);
wsHandler.initialize();

appContainer.bind<IWSHandler>(TYPES.WsHandler).toConstantValue(wsHandler);

export default appContainer;
