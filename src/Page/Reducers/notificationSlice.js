import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
    lastNotificationTime: 0,
  },
  reducers: {
    addNotification: (state, action) => {
      const currentTime = Date.now();
      if (currentTime - state.lastNotificationTime > 10000) {
        state.notifications.push(action.payload);
        state.lastNotificationTime = currentTime;

        if (state.notifications.length > 20) {
          state.notifications.shift(); 
        }
      }
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload; // Gán danh sách thông báo mới
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.lastNotificationTime = 0;
    },
  },
});

export const { addNotification, removeNotification, setNotifications, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
