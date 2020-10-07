import { Container } from 'inversify';
import { Store } from 'redux';
import WSHandler, { WSHandlerI } from '../middleware/ws-client';
import store from '../redux/create-store';
import { TYPES } from './container-types';

const appContainer = new Container();

appContainer.bind<Store>(TYPES.ReduxStore).toConstantValue(store);

const wsHandler = new WSHandler(store);
wsHandler.initialize();

appContainer.bind<WSHandlerI>(TYPES.WsHandler).toConstantValue(wsHandler);

export default appContainer;
