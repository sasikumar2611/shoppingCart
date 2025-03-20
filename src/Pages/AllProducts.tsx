import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { CentralizedCard } from "../CentralizedComponents/Card/CentralizedCard";
import { Productcard } from "../CentralizedComponents/Card/Productcard";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import SwipeableViews from "react-swipeable-views";
import {
  handleCartChange,
  handleFavouriteChange,
  handleVisit,
} from "../common/commonMethods";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/Store";
import { getProductList } from "../store/action/product";

const AllProducts = () => {
  const dispatch=useDispatch<AppDispatch>()
 const products=useSelector((state:RootState)=> state.product.productList)
console.log(products);

  const [pageIndexes, setPageIndexes] = useState(
    products.map(() => 0) // Separate index for each category
  );
  const cardsPerView = 4; // Show only 4 items at a time

  const handlePrev = (categoryIndex: number) => {
    setPageIndexes((prev) =>
      prev.map((val, i) => (i === categoryIndex ? Math.max(val - 1, 0) : val))
    );
  };

  const handleNext = (categoryIndex: number, totalItems: number) => {
    setPageIndexes((prev) =>
      prev.map((val, i) =>
        i === categoryIndex
          ? Math.min(val + 1, Math.ceil(totalItems / cardsPerView) - 1)
          : val
      )
    );
  };

useEffect(()=>{
  dispatch(getProductList())
},[dispatch])

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Grid container spacing={2}>
        {products.map((product, categoryIndex) => (
          <Grid size={{ xs: 12 }} key={product.category}>
            <CentralizedCard
              title={product.category}
              bodyContent={
                <Grid container spacing={3} alignItems="center">
                  {/* Left Navigation Button */}
                  <Grid size={{ xs: 0.5 }} key={product.category}>
                    <IconButton onClick={() => handlePrev(categoryIndex)}>
                      <ChevronLeft />
                    </IconButton>
                  </Grid>

                  {/* Swipeable Product View */}
                  <Grid size={{ xs: 11 }}>
                    <SwipeableViews
                      index={pageIndexes[categoryIndex]}
                      onChangeIndex={(index) =>
                        setPageIndexes((prev) =>
                          prev.map((val, i) =>
                            i === categoryIndex ? index : val
                          )
                        )
                      }
                      enableMouseEvents
                      autoPlay={false}
                      animateHeight={false}
                    >
                      {Array.from({
                        length: Math.ceil(product.items.length / cardsPerView),
                      }).map((_, pageIndex) => (
                        <div key={pageIndex}>
                          <Grid container spacing={2}>
                            {product.items
                              .slice(
                                pageIndex * cardsPerView,
                                (pageIndex + 1) * cardsPerView
                              )
                              .map((item:any) => (
                                <Grid size={{ xs: 3 }} key={item.id}>
                                  <Productcard
                                    categoryId={product.id}
                                    category={product.category}
                                    handleVisit={handleVisit}
                                    handleCartChange={handleCartChange}
                                    handleFavouriteChange={
                                      handleFavouriteChange
                                    }
                                    item={item}

                                  />
                                </Grid>
                              ))}
                          </Grid>
                        </div>
                      ))}
                    </SwipeableViews>
                  </Grid>

                  {/* Right Navigation Button */}
                  <Grid size={{ xs: 0.5 }} justifyContent="center">
                    <IconButton
                      onClick={() =>
                        handleNext(categoryIndex, product.items.length)
                      }
                      disabled={
                        pageIndexes[categoryIndex] ===
                        Math.ceil(product.items.length / cardsPerView) - 1
                      }
                    >
                      <ChevronRight />
                    </IconButton>
                  </Grid>
                </Grid>
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllProducts;
