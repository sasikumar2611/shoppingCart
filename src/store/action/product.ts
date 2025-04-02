import {
  setCartList,
  setDeleteAddedToCart,
  setDeleteFavourite,
  setFavoriteList,
  setFinalAmount,
  setIsAddedToCart,
  setIsFavourite,
  setOrders,
  setProductList,
  setUser,
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

export const updateImage = async (data: any, type: string) => {
  try {
    const userListRef = ref(db, `userList`);
    const snapshot = await get(userListRef);
    const userList = snapshot.exists() ? snapshot.val() : []; // Get users as an object
    console.log(userList);

    const userIndex = userList.findIndex(
      (user: any) =>
        user.Email === data.Email && user.Password === data.Password
    );
    console.log(userIndex);

    if (userIndex === -1) {
      console.log("Cannot upload image");
      toast.error("Cannot upload image");
      return { status: 404 };
    }
    if (type === "save") {
      userList[userIndex] = { ...userList[userIndex], Image: data.Image };
      await set(userListRef, userList);
      toast.success("Image uploaded successfully");
    }
    if (type === "delete") {
      userList[userIndex] = { ...userList[userIndex], Image: "" };
      await set(userListRef, userList);
      toast.success("Image deleted successfully");
    }


    return { status: 200 };
  } catch (error) {
    console.error("Error fetching product list:", error);
  }
};

export const getSignedUpUser = () => async (dispatch: any) => {
  try {
    let userEmail = localStorage.getItem("userEmail");
    const userListRef = ref(db, `userList`);
    const snapshot = await get(userListRef);
    const userList = snapshot.exists() ? snapshot.val() : []; // Get users as an object
    console.log(userList);

    const userObj = userList.find((user: any) => user.Email === userEmail);
    console.log(userObj);

    dispatch(setUser(userObj));
  } catch (error) {
    console.error("Error fetching product list:", error);
  }
};

export const signUpUser = async (data: any) => {
  try {
    const userListRef = ref(db, `userList`);
    const snapshot = await get(userListRef);
    const userList = snapshot.exists() ? snapshot.val() : []; // Get users as an object
    console.log(userList);

    const userIndex = userList.findIndex(
      (user: any) =>
        user.Email === data.email && user.Password === data.password
    );

    if (userIndex === -1) {
      console.log("User not found");
      toast.error("User not found");
      return { success: false, message: "User not found", user: null };
    }
    localStorage.setItem("userEmail", data.email);

    userList[userIndex] = { ...userList[userIndex], isLoggedin: true };

    await set(userListRef, userList);

    toast.success("Signin successful");

    return { status: 200 };
  } catch (error) {
    console.error("Error fetching product list:", error);
  }
};

export const addUserList = async (data: any) => {
  try {
    const userListRef = ref(db, `userList`);
    const snapshot = await get(userListRef);

    const userList = snapshot.exists() ? snapshot.val() : []; // Get users as an object
    console.log(userList);

    // Check if user already exists by email
    const exist = userList.some(
      (item: any) =>
        item.Email === data.Email &&
        item.Username === data.Username &&
        item.Password === data.Password
    );

    if (exist) {
      console.log("User already exists");
      toast.error("User already exists");
      return;
    }
    userList.push(data);

    await set(userListRef, userList);

    toast.success("Signup successful");

    return { status: 200 };
  } catch (error) {
    console.error("Error fetching product list:", error);
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

export const deleteCartList = (data: any) => async (dispatch: any) => {
  dispatch(setDeleteAddedToCart(true));
  dispatch(setIsAddedToCart(true));

  try {
    const cartListRef = ref(db, `cartList`);

    const snapshot = await get(cartListRef);
    let cartList = snapshot.exists() ? snapshot.val() : [];

    const updatedCartList = cartList.filter(
      (item: any) => !(item.id === data.id && item.category === data.category)
    );

    if (cartList.length === updatedCartList.length) {
      console.log("🚫 Product not found in favorites.");
      toast.error("Product not found in favorites.");
      return;
    }

    await set(cartListRef, updatedCartList);

    dispatch(setFavoriteList(updatedCartList));
    toast.success("Product removed from favorites.");
    dispatch(getCartList());
  } catch (error) {
    console.error("Error fetching product list:", error);
  } finally {
    dispatch(setDeleteFavourite(false));
  }
};

export const deleteFavouriteList = (data: any) => async (dispatch: any) => {
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
  } finally {
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

export const addOrderList =
  (data: any, amount: number) => async (dispatch: any) => {
    try {
      const orderListRef = ref(db, `orders`);
      const snapshot = await get(orderListRef);
      let orderList = snapshot.exists() ? snapshot.val() : [];

      if (Array.isArray(data)) {
        
        orderList = [...data]; // Merge new products into existing orders
        console.log(orderList);
      } else {
        console.error("Invalid data format: Expected an array of products");
        return;
      }

      await set(orderListRef, orderList);
      // dispatch(setOrders(orderList));
      dispatch(setFinalAmount(amount));
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

export const getOrderedProductList = () => async (dispatch: any) => {
  try {
    const orderListRef = ref(db, `orders`);
    const snapshot = await get(orderListRef);
    let orderList = snapshot.exists() ? snapshot.val() : [];

    console.log("Fetched Orders:", orderList);

    if (orderList && Object.keys(orderList).length > 0) {
      dispatch(setOrders(orderList)); // Corrected data passing
    } else {
      console.log("No product data available");
      dispatch(setOrders([])); // Dispatch empty array if no data
    }
  } catch (error) {
    console.error("Error fetching product list:", error);
  }
};
