import { createStore, applyMiddleware, compose, } from 'redux';
import middlewares from './middlewares';
import reducers from './reducers';




const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

export const configureStore = (services) =>
    createStore(reducers, composeEnhancers(applyMiddleware(...middlewares.map(f => f(services)))
    )
    );

// export default store;
