
import { createSlice } from "@reduxjs/toolkit";

interface Product {
  id: number;
  image: string | File;
  name: string;
  price: number;
  rating: string;
}


interface ProductState {
  isFavourite: boolean;
  isAddedToCart: boolean;
  visitProduct: Product | null;
  favoriteList: Product[];
  productList: any[];
  cartList: Product[];
}

const initialState: ProductState = {
  isFavourite: false,
  isAddedToCart: false,
  visitProduct: null,
  productList: [],
  favoriteList: [],
  cartList: [],
};

const productSlice = createSlice({
  name: "productData",
  initialState,
  reducers: {
    setIsFavourite: (state, action) => {
      state.isFavourite = action.payload;
    },
    setIsAddedToCart: (state, action) => {
      state.isAddedToCart = action.payload;
    },
    setVisitProduct: (state, action) => {
      state.visitProduct = action.payload;
    },
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    setFavoriteList: (state, action) => {
      state.favoriteList = [...state.favoriteList, action.payload];
    },
    setCartList: (state, action) => {
      state.cartList = [...state.cartList, action.payload];
    },
  },
});

export const {
  setIsFavourite,
  setIsAddedToCart,
  setVisitProduct,
  setCartList,
  setFavoriteList,
  setProductList
} = productSlice.actions;
export default productSlice.reducer;
