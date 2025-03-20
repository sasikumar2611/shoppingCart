import axios from "axios";
import { setCartList, setFavoriteList, setProductList } from "../store/productData";


export const getProductList = () => async (dispatch: any) => {
  try {
    const res = await axios.get("http://localhost:5000/productList");
    dispatch(setProductList(res.data));
  } catch (error) {
    console.error("Error fetching product list:", error);
  }
};


export const addFavouriteList = (data:any) => async (dispatch: any) => {
  try {
    const response = await axios.get("http://localhost:5000/favList");
    const favList = response.data;

    const exists = favList.some((item:any) => item.id === data.id);
    if (exists) {
      console.log("🚫 Product already in favorites, skipping addition.");
      return; 
    }
    // await axios.patch(`http://localhost:5000/productList/${data.categoryId}`, data);
    const res = await axios.post("http://localhost:5000/favList",data);
    dispatch(setFavoriteList(res.data));
  } catch (error) {
    console.error("Error fetching product list:", error);
  }
};


export const addCartList = (data:any) => async (dispatch: any) => {
  try {
    const response = await axios.get("http://localhost:5000/cartList");
    const cartList = response.data;

    const exists = cartList.some((item:any) => item.id === data.id);
    if (exists) {
      console.log("🚫 Product already in Cart, skipping addition.");
      return; 
    }

    const res = await axios.post("http://localhost:5000/cartList",data);
    dispatch(setCartList((prev: any[]) => [...prev, res.data]));
  } catch (error) {
    console.error("Error fetching product list:", error);
  }
};