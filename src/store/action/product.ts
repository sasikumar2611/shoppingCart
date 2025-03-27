
import {
  setCartList,
  setDeleteFavourite,
  setFavoriteList,
  setIsAddedToCart,
  setIsFavourite,
  setProductList,
} from "../store/productData";
import { ref, get, set } from "firebase/database";
import { toast } from "sonner";
import { db } from "../../firbase";

export const getProductList = () => async (dispatch: any) => {
  try {
    dispatch(setIsFavourite(true));
    dispatch(setIsAddedToCart(true));
    
    const productListRef = ref(db, "productList"); // Path in database
    const snapshot = await get(productListRef);
    if (snapshot.exists()) {
      dispatch(setProductList(snapshot.val()));
    } else {
      console.log("No product data available");
    }
  } catch (error) {
    console.error("Error fetching product list:", error);
  } finally {
    dispatch(setIsFavourite(false));
    dispatch(setIsAddedToCart(false));
  }
};

export const getFavouriteList = () => async (dispatch: any) => {
  try {
    dispatch(setIsFavourite(true));
    
    const favListRef = ref(db, `favList`); 
    const snapshot = await get(favListRef);

    if (snapshot.exists()) {
      dispatch(setFavoriteList(snapshot.val()));
    } else {
      console.log("No product data available");

    }
  } catch (error) {
    console.error("Error fetching product list:", error);
  } finally {
    dispatch(setIsFavourite(false));
  }
};

export const getCartList = () => async (dispatch: any) => {
  try {
    dispatch(setIsAddedToCart(true));
    
    const cartListRef = ref(db, "cartList");
    const snapshot = await get(cartListRef);

    if (snapshot.exists()) {
      dispatch(setCartList(snapshot.val()));
    } else {
      console.log("No product data available");

    }
  } catch (error) {
    console.error("Error fetching product list:", error);
  } finally {
    dispatch(setIsAddedToCart(false));
  }
};

export const addFavouriteList = (data: any) => async (dispatch: any) => {
  try {
    dispatch(setIsFavourite(true));
    
    const favListRef = ref(db, `favList`);
    const snapshot = await get(favListRef);
    let favList = snapshot.exists() ? snapshot.val() : [];

    const exists = favList.some(
      (item: any) => item.id === data.id && item.category === data.category
    );

    if (exists) {
      console.log("🚫 Product already in favorites, skipping addition.");
      toast.error("Product already in favorites");
      return;
    }
    favList.push(data);

    await set(favListRef, favList);
    dispatch(setFavoriteList(favList));
    toast.success("Product added to Favorite List");
  } catch (error) {
    console.error("Error fetching product list:", error);
  } finally {
    dispatch(setIsFavourite(false));
  }
};

export const deleteFavouriteList =
(data: any) => async (dispatch: any) => {
     dispatch(setDeleteFavourite(true));
     dispatch(setIsFavourite(true));

    try {
      const favListRef = ref(db, `favList`);

    const snapshot = await get(favListRef);
    let favList = snapshot.exists() ? snapshot.val() : [];

    const updatedFavList = favList.filter(
      (item: any) => !(item.id === data.id && item.category === data.category)
    );

    if (favList.length === updatedFavList.length) {
      console.log("🚫 Product not found in favorites.");
      toast.error("Product not found in favorites.");
      return;
    }

    await set(favListRef, updatedFavList);

      dispatch(setFavoriteList(updatedFavList));
      toast.success("Product removed from favorites.");
      dispatch(getFavouriteList()); 

    } catch (error) {
      console.error("Error fetching product list:", error);
    }
    finally {
      dispatch(setDeleteFavourite(false));
    }
  };

export const addCartList = (data: any) => async (dispatch: any) => {
  try {
    dispatch(setIsAddedToCart(true));
    
    const cartListRef = ref(db, `cartList`);
    const snapshot = await get(cartListRef);
    let cartList = snapshot.exists() ? snapshot.val() : [];

    const exists = cartList.some(
      (item: any) => item.id === data.id && item.category === data.category
    );
    if (exists) {
      console.log("🚫 Product already in Cart, skipping addition.");
      toast.error("Product already in the Cart");
      return;
    }
    
    cartList.push(data);
    await set(cartListRef, cartList);
    dispatch(setCartList(cartList));
    toast.success("Product added in the Cart");
    
  } catch (error) {
    console.error("Error fetching product list:", error);
  } finally {
    dispatch(setIsAddedToCart(false));
  }
};
