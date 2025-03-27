import {
  addCartList,
  addFavouriteList,
  deleteFavouriteList,
} from "../store/action/product";

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
    dispatch(deleteFavouriteList(item));
   
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
