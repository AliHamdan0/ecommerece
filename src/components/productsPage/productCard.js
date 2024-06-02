import { useState } from "react";
import Image from "next/image";
import { Box, Typography, IconButton, CircularProgress, Grid, TextField, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import style from "../../styles/product.module.css";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "@/utilities/useFetch";
import { addItemToCart } from "@/utilities/apiconfing";
import { cartSlice } from "@/utilities/reduxt-toolkit/slices/cartSlice";
import { AlertMessage } from "../general/alertMessage";
import { CustomModal } from "../general/customModal";
import { ProductInfo } from "./productInfo";

export const ProductCard = ({ product, index }) => {
  const items = useSelector((state) => state.cartSlice.cart);
  const dispatch = useDispatch();
  const [getFetch, postFetch] = useFetch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const addItem = async () => {
    setLoading(true);
    const res = await postFetch(addItemToCart, {
      productId: product._id,
      quantity: 1,
    });
    // if (res.status == 200) {
    dispatch(cartSlice.actions.addItem({ ...product, quantity: 1 }));
    //}
    setLoading(false);
    setSuccess(true);
  };
  return (
    <Box>
      {success && <AlertMessage msg="Adding a new item to the cart successfully" />}
      <Box className={style.card}>
        <Box sx={{ p: 1, backgroundColor: "primary.main" }} className={style.categoryBox}>
          <Typography
            as="h6"
            className={style.mainFont}
            sx={{
              color: "myText.primary.main",
            }}
          >
            {product?.category}
          </Typography>
        </Box>
        <Image src={`/images/products/p${index + 1}.png`} alt="product" width={220} height={220} />

        <Box className={style.productIcons}>
          {items?.findIndex((i) => i._id == product._id) > -1 ? (
            <IconButton
              sx={{
                "&:hover": { backgroundColor: "inherit" },
              }}
            >
              <Box
                className={style.cartIconContainer}
                sx={{
                  color: "#000000",
                  "&:hover": { backgroundColor: "primary.main", color: "#fff" },
                }}
              >
                <CheckIcon sx={{ color: "inherit", width: "20px", height: "20px" }} />
              </Box>
            </IconButton>
          ) : (
            <IconButton
              sx={{
                "&:hover": { backgroundColor: "inherit" },
              }}
              onClick={() => addItem()}
            >
              <Box
                className={style.cartIconContainer}
                sx={{
                  color: "#000000",
                  "&:hover": { backgroundColor: "primary.main", color: "#fff" },
                }}
              >
                {loading ? <CircularProgress size="20px" color="inherit" /> : <ShoppingCartIcon sx={{ color: "inherit", width: "20px", height: "20px" }} />}
              </Box>
            </IconButton>
          )}
          <IconButton
            sx={{
              "&:hover": { backgroundColor: "inherit" },
            }}
            onClick={() => setOpen(true)}
          >
            <Box
              className={style.cartIconContainer}
              sx={{
                color: "#000000",
                "&:hover": { backgroundColor: "primary.main", color: "#fff" },
              }}
            >
              <VisibilityIcon sx={{ color: "inherit", width: "20px", height: "20px" }} />
            </Box>
          </IconButton>
        </Box>
      </Box>
      <Typography
        as="h6"
        className={style.mainFont}
        sx={{
          textAlign: "center",
          mt: 2,
          color: "myText.primary.main",
          "&:hover": { color: "primary.main" },
        }}
      >
        {product.name}
      </Typography>
      <Box className="flexRow">
        {product?.offer && (
          <Typography
            as="h6"
            sx={{
              my: 1,
              color: "#000000",
              fontSize: "16px",
              fontWeight: "700",
              textDecoration: "line-through",
            }}
          >
            ${product.old_price}
          </Typography>
        )}
        <Typography
          as="h6"
          sx={{
            my: 1,
            color: "primary.main",
            fontSize: "18px",
            fontWeight: "700",
          }}
        >
          ${product.price}
        </Typography>
      </Box>
      <CustomModal maxW="80vw" open={open} setOpen={setOpen}>
        <ProductInfo product={product} setOpen={setOpen} index={index} />
      </CustomModal>
    </Box>
  );
};
