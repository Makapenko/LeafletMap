import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import routerReducer from './reducers/routerSlice';
import mapReducer from './reducers/mapSlice';
import routerSaga from './sagas/routerSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  routerReducer,
  mapReducer,
});

export const setupStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  });

  sagaMiddleware.run(routerSaga);
  return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
