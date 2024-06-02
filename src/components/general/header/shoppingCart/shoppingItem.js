import { IconButton, Box, Typography, CircularProgress } from "@mui/material";
import Image from "next/image";
import style from "../../../../styles/header.module.css";
import useFetch from "@/utilities/useFetch";
import { deleteCartItem } from "@/utilities/apiconfing";
import { useDispatch } from "react-redux";
import { cartSlice } from "@/utilities/reduxt-toolkit/slices/cartSlice";
import { useState } from "react";
import { AlertMessage } from "../../alertMessage";

export const ShoppingItem = ({ item, index }) => {
  const [getFetch, postFetch, putFetch] = useFetch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    setLoading(true);
    let res = await putFetch(deleteCartItem, { productId: item._id });
    // if (res.status == 200) {
    dispatch(cartSlice.actions.deleteItem(item._id));
    setSuccess(true);
    // }
    setLoading(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        width: "100%",
      }}
    >
      {success && <AlertMessage msg="Deleting the item cart successfully" />}
      <Image alt="" src={`/images/products/p${index + 1}.png`} width={50} height={50} className={style.cartImage} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography component="h6" className={style.cartFont}>
          {item?.name}
        </Typography>
        <Typography component="p" sx={{ fontSize: "14px", fontWeight: "600", mt: "0px" }}>
          {item?.quantity} x
          <Typography
            component="span"
            sx={{
              color: "primary.main",
              fontSize: "15px",
              fontWeight: "600",
              mx: 1,
            }}
          >
            ${item?.price}
          </Typography>
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
        {loading ? (
          <CircularProgress size="16px" color="secondary" />
        ) : (
          <IconButton
            sx={{
              color: "secondary.main",
              width: "16px",
              height: "16px",
              fontSize: "12px",
            }}
            onClick={() => handleDelete()}
          >
            X
          </IconButton>
        )}
      </Box>
    </Box>
  );
};
