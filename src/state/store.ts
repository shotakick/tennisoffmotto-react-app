import { applyMiddleware, createStore } from 'redux';
// import { createLogger } from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reduxSaga from 'redux-saga';
import { rootReducer, rootSaga } from './ducks';

export function configureStore() {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = reduxSaga();
  // const logger = createLogger({
  //   diff: true,
  //   collapsed: true
  // });

  const store = createStore(
    rootReducer,
    // composeEnhancers(applyMiddleware(sagaMiddleware, logger))
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
