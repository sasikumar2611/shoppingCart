
import { createSlice } from "@reduxjs/toolkit";

interface Product {
  id: number;
  image: string | File;
  name: string;
  price: number;
  rating: string;
  category:string;
  categoryId:number;
}


interface ProductState {
  isFavourite: boolean;
  deleteFavourite: boolean;
  isAddedToCart: boolean;
  deleteAddedToCart: boolean;
  visitProduct: Product | null;
  favoriteList: Product[];
  productList: any[];
  cartList: Product[];
  amount:number;
  orders:any[];
  
}

const initialState: ProductState = {
  isFavourite: false,
  deleteAddedToCart: false,
  deleteFavourite: false,
  isAddedToCart: false,
  visitProduct: null,
  productList: [],
  favoriteList: [],
  cartList: [],
  amount:0,
  orders:[]
};

const productSlice = createSlice({
  name: "productData",
  initialState,
  reducers: {
    setIsFavourite: (state, action) => {
      state.isFavourite = action.payload;
    },
    setDeleteFavourite: (state, action) => {
      state.deleteFavourite = action.payload;
    },
    setDeleteAddedToCart: (state, action) => {
      state.deleteAddedToCart = action.payload;
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
      state.favoriteList = action.payload;
    },
    setCartList: (state, action) => {
      state.cartList = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const {
  setIsFavourite,
  setIsAddedToCart,
  setVisitProduct,
  setCartList,
  setFavoriteList,
  setProductList,
  setAmount,
  setDeleteFavourite,
  setDeleteAddedToCart
} = productSlice.actions;
export default productSlice.reducer;
