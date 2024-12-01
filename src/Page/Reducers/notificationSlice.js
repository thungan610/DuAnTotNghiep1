import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  lastNotificationTime: 0, // Thêm biến lưu thời gian của thông báo cuối
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const currentTime = Date.now();
      
      // Kiểm tra nếu thời gian giữa các thông báo quá gần nhau (ví dụ: 30 giây)
      if (currentTime - state.lastNotificationTime > 10000) {
        state.notifications.push(action.payload);  // Thêm thông báo vào Redux
        state.lastNotificationTime = currentTime;  // Cập nhật thời gian của thông báo mới
      }
    },

    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
