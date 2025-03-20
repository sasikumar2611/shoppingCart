
import { addCartList, addFavouriteList } from "../store/action/product";


export const handleVisit = ({ item, category,navigate }: any) => {
    navigate(`/Pages/${category}/${item.id}/${item.name}`);
  // const product = {
  //   category: category,
  //   categoryId:categoryId,
  //   ...item,
  // };
};

export const handleFavouriteChange = ({  item, category ,categoryId,dispatch}: any) => {
  const product = {
    category: category,
    categoryId:categoryId,
    ...item,
  };
  console.log("⭐ Added to Favourites:", product);
  dispatch(addFavouriteList(product))
};

export const handleCartChange = ({  item, category ,categoryId,dispatch}: any) => {

  const product = {
    category: category,
    categoryId:categoryId,
    ...item,
  };
  dispatch(addCartList(product))
  console.log("🛒 Added to Cart:", product);
};
