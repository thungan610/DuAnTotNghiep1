import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist'; 
import userReducer from './Reducers/userReducers';
import cartReducer from './Reducers/cartReducers';
import notificationSlice from './Reducers/notificationSlice'

// Cấu hình persist
const persistConfig = {
  key: 'store',
  storage: AsyncStorage,
  whitelist: ['user', 'cart', 'notification'],
};

// Kết hợp các reducers
const rootReducer = combineReducers({
  user: userReducer, 
  cart: cartReducer,
  notification: notificationSlice,
});

// Tạo persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store và cấu hình middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

// Theo dõi trạng thái cart để debug
store.subscribe(() => {
});

export default store;
