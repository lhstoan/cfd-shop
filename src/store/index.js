import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import counterReducer from "./reducers/counterReducer";
import featuredReducer from "./reducers/featuredReducer";

const reducers = combineReducers({
	counter: counterReducer,
	featured: featuredReducer,
});

const thunkMiddleware = (store) => (next) => (action) => {
	if (typeof action === "function") {
		action(store.dispatch);
		return;
	}
	next(action);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, undefined, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;