// redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './authSlice'

// Cấu hình persist
const persistConfig = {
  key: 'auth',
  storage,
}

// Gói reducer với persist
const persistedAuthReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
})

export const persistor = persistStore(store)
