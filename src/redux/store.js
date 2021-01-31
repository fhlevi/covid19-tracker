import { createStore, combineReducers } from 'redux'
import dashboard from './modules/dashboard';

const rootStore = combineReducers({
    dashboardReduce: dashboard
});

const store = createStore(rootStore)
export default store