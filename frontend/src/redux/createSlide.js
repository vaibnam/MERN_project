import { createSlice } from '@reduxjs/toolkit'

const initialState={
    productList:[]
}
export const ProductSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
        setDataProduct:(state,action)=>{
            console.log(action)
            state.productList=[...action.payload]
        }
    }
})
export const {setDataProduct}=ProductSlice.actions

export default ProductSlice.reducer;
