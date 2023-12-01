import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        addUser(state,action){
            // console.log("action>>",action.payload);
            // console.log('state==', state);  
            state.push(action.payload);
            // console.log("state>>>",state);
        },
        removeUser(state,action){
            state.splice(action.payload,1);
        }
    }
})
export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;