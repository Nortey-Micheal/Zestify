import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";

const persistConfig = {
    key: "root",
    storage,
};
  
const persistedReducer = persistReducer(persistConfig, rootReducer);
  
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, //Required for redux-persist
    }),
});
  
const persistor = persistStore(store);

export { persistor }
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch