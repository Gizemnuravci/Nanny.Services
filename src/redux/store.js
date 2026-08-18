import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { nanniesReducer } from "./nannies/nanniesSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Vite 8 / rolldown ile redux-persist/lib/storage uyumsuz olduğu için
// localStorage'ı doğrudan saran custom storage kullanıyoruz
const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["nannies"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  nannies: nanniesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
