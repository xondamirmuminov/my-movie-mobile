import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loadingReducer from './Loading/reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['loading'],
};

const rootReducer = combineReducers({
  loading: loadingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk, logger));

const persistor = persistStore(store);

export {store as default, persistor};
