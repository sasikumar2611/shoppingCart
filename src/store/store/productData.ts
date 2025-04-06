import { createSlice } from "@reduxjs/toolkit";

interface Product {
  id: number;
  image: string | File;
  name: string;
  price: number;
  rating: string;
  category: string;
  categoryId: number;
}

interface ProductState {
  color: string;
  isFavourite: boolean;
  deleteFavourite: boolean;
  isAddedToCart: boolean;
  deleteAddedToCart: boolean;
  visitProduct: Product | null;
  favoriteList: Product[];
  productList: any[];
  cartList: Product[];
  amount: number;
  confirmOrder: boolean;
  orders: any[];
  ordersHisoryList: any[];
  finalAmount: number;
  drawerOpen: {
    open: boolean;
    list: string;
  };
  user: any;
}

const initialState: ProductState = {
  color: "#7d4dfa",
  isFavourite: false,
  deleteAddedToCart: false,
  confirmOrder: false,
  deleteFavourite: false,
  isAddedToCart: false,
  visitProduct: null,
  productList: [],
  favoriteList: [],
  cartList: [],
  amount: 0,
  orders: [],
  ordersHisoryList: [],
  finalAmount: 0,
  drawerOpen: {
    open: false,
    list: "",
  },
  user: null,
};

const productSlice = createSlice({
  name: "productData",
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
    },
   
    setIsFavourite: (state, action) => {
      state.isFavourite = action.payload;
    },
    setOrdersHisoryList: (state, action) => {
      state.ordersHisoryList = action.payload;
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
    setFinalAmount: (state, action) => {
      state.finalAmount = action.payload;
    },
    setDrawerOpen: (state, action) => {
      state.drawerOpen = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setConfirmOrder: (state, action) => {
      state.confirmOrder = action.payload;
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
  setDeleteAddedToCart,
  setOrders,
  setFinalAmount,
  setDrawerOpen,
  setUser,
  setColor,
  setConfirmOrder,
  setOrdersHisoryList
} = productSlice.actions;
export default productSlice.reducer;
