import Image from "next/image";
import { Box, IconButton, Container } from "@mui/material";
import style from "../../../styles/header.module.css";
import { MenuMemo } from "./pageMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { HeaderCartMenu } from "./shoppingCart/headerCartMenu";
import { useState, useEffect, createContext, memo } from "react";
import { MobileHeader } from "./mobile/mobileHeader";
import MenuIcon from "@mui/icons-material/Menu";
import { HeaderProfileMenu } from "./profileMenu";
import { CartNumberItems } from "./shoppingCart/cartNumberItems";

export const OpenDrawer = createContext();
export const Header = () => {
  const [cartMenu, setCartMenu] = useState(null);
  const [profileMenu, setProfileMenu] = useState(null);
  const [scroll, setScroll] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const handleButtonClick = (event, setAnchorEl) => {
    setAnchorEl(event?.currentTarget);
  };
  function handleScroll() {
    if (window.scrollY >= 120) {
      setScroll(true);
    } else setScroll(false);
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Container
      maxWidth="100vw"
      sx={{
        position: "fixed",
        zIndex: "1000",
        backgroundColor: !scroll ? "#fff" : "#9a8a8a",
        transition: "0.8s",
        boxShadow: "0px 1px 8px #8080805e",
      }}
    >
      <Box className={style.headerContainer}>
        <Image src="/images/logo.png" alt="" width={146} height={39} />
        <Box
          sx={{ display: { xs: "none", md: "flex" } }}
          className={style.menuContainer}
        >
          <MenuMemo />
          <Box sx={{ position: "relative" }}>
            <CartNumberItems />
            <IconButton
              sx={{ "&:hover": { backgroundColor: "inherit" } }}
              onClick={(e) => handleButtonClick(e, setCartMenu)}
            >
              <Box className={style.cartIconContainer}>
                <ShoppingCartIcon
                  sx={{
                    "&:hover": { color: "primary.main" },
                    transition: "0.4s",
                  }}
                />
              </Box>
            </IconButton>
            <HeaderCartMenu anchorEl={cartMenu} setAnchorEl={setCartMenu} />
            <IconButton
              sx={{ "&:hover": { backgroundColor: "inherit" } }}
              onClick={(e) => handleButtonClick(e, setProfileMenu)}
            >
              <Box className={style.cartIconContainer}>
                <PersonIcon
                  sx={{
                    "&:hover": { color: "primary.main" },
                    transition: "0.4s",
                  }}
                />
              </Box>
            </IconButton>
            <HeaderProfileMenu
              anchorEl={profileMenu}
              setAnchorEl={setProfileMenu}
            />
          </Box>
        </Box>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <MenuIcon
            fontSize="large"
            sx={{
              color: "grey.white",
            }}
            onClick={(e) => handleButtonClick(e, setOpenMobileMenu)}
          />
          <OpenDrawer.Provider value={setOpenMobileMenu}>
            <MobileHeader
              cart={["sadasd", "dada", "das"]}
              profile={["dasd", "sdas", "dasd"]}
              anchorEl={openMobileMenu}
              setAnchorEl={setOpenMobileMenu}
            />
          </OpenDrawer.Provider>
        </Box>
      </Box>
    </Container>
  );
};
