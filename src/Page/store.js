import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist'; 
import userReducer from './Reducers/userReducers';
import cartReducer from './Reducers/cartReducers';

// Cấu hình persist
const persistConfig = {
  key: 'store',
  storage: AsyncStorage,
  whitelist: ['user', 'cart'], 
};

// Kết hợp các reducers
const rootReducer = combineReducers({
  user: userReducer, 
  cart: cartReducer,  
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
    })
});

store.subscribe(() => {
  console.log('Cart State:', store.getState().cart.cartItems);
});


export default store;
