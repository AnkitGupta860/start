import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name : 'product',
    initialState: [],
    reducers : {
        AdddProduct(state, action){
            // console.log("....",action.payload);
            state.push(action.payload);
            // console.log(state);
        },
        removeProduct(state, action){

        }
    }

})

export default productSlice.reducer;

export const { AdddProduct ,removeProduct} = productSlice.actions;