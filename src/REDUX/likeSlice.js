import { createSlice } from "@reduxjs/toolkit";
const likeSlice = createSlice({
  name: "like",
  initialState: false,
  reducers: {
    //collection of functions to setState
    changeState(state) {
      //when called change the state
      return !state;
    },
  },
});

export const likeAction = likeSlice.actions;

//in reducer we have all the necessary data to connect with the big pie
export default likeSlice.reducer;
