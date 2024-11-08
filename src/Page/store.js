import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist'; 
import userReducer from './Reducers/userReducers'; // Đảm bảo bạn nhập đúng đường dẫn

// Cấu hình persist
const persistConfig = {
  key: 'store',
  storage: AsyncStorage,
  whitelist: ['user'], // Chỉ lưu trữ dữ liệu của user
};

// Kết hợp các reducers
const rootReducer = combineReducers({
  user: userReducer, // Reducer của user
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

export default store;
