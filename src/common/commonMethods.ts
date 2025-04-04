import {
  addCartList,
  addFavouriteList,
  addOrderList,
  deleteCartList,
  deleteFavouriteList,
} from "../store/action/product";
import { setColor, setDrawerOpen } from "../store/store/productData";

export const handleVisit = ({ item, category, navigate }: any) => {
  navigate(`/Pages/${category}/${item.id}/${item.name}`);
  // const product = {
  //   category: category,
  //   categoryId:categoryId,
  //   ...item,
  // };
};

export const handleFavouriteChange = ({
  item,
  category,
  categoryId,
  dispatch,
}: any) => {
  const product = {
    category: category,
    categoryId: categoryId,
    ...item,
  };
  dispatch(addFavouriteList(product));
};

export const handleDelete = (item: any, list: string, dispatch: any) => {
  if (list === "favouriteList") {
    dispatch(deleteFavouriteList(item));
  }
  if (list === "cartList") {
    dispatch(deleteCartList(item));
  }
};

export const handleCartChange = ({
  item,
  category,
  categoryId,
  dispatch,
}: any) => {
  const product = {
    category: category,
    categoryId: categoryId,
    ...item,
  };
  dispatch(addCartList(product));
};

export const handleBuy = (
  item: any,
  navigate: any,
  dispatch: any
) => {
  navigate("/Pages/Payment");
console.log(item);

  dispatch(addOrderList(item));
};

export const toggleDrawer = (open: boolean, list: string)=>(dispatch:any) => {
  dispatch(setDrawerOpen({ open: open, list: list }));
};

export const handleColorChange = ( color: string)=>(dispatch:any) => {
  dispatch(setColor(color));
};

