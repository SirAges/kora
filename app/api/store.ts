import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setupListeners } from "@reduxjs/toolkit/query";

import globalReducer from "@/redux/globalSlice";
import { apiSlice } from "./apiSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";

// Persist configuration
const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    blacklist: ["global"]
};

// Root reducer combining all slices
const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    global: globalReducer
});

// Wrapped reducer with reset functionality
const appReducer = (state: undefined, action: { type: string }) => {
    if (action.type === "RESET") {
        // Reset all state (except persisted states)
        state = undefined;
    }
    return rootReducer(state, action);
};

// Apply persist to the wrapped reducer
const persistedReducer = persistReducer(persistConfig, appReducer);

// Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false, // Disable immutable check for redux-persist compatibility
            serializableCheck: false
        }).concat(apiSlice.middleware), // Add RTK Query middleware
    devTools: process.env.NODE_ENV !== "production" // Enable Redux DevTools only in development
});

// Persistor for redux-persist
export const persistor = persistStore(store);

// Redux Toolkit Query listeners
setupListeners(store.dispatch);

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const PersistorStore = persistor;
export default PersistorStore;
