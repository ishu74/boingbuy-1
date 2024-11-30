import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import ui from "./uiReducer";
// import ui from './uiReducer';

export default combineReducers({
    // ui,
    ui,
    cartReducer,
    orderReducer,

  
})