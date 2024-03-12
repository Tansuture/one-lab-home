import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    list: JSON.parse(localStorage.getItem('users')) || []
  },
  reducers: {
    addUser: (state, action) => {
      state.list.push(action.payload);
    },
    removeUser: (state, action) => {
      console.log({ action });
      state.list = state.list.filter((user) => user.id !== action.payload);
    },
    editUser: (state, action) => {
      const index = state.list.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { addUser, removeUser, editUser } = userSlice.actions;

export default userSlice.reducer;
