import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Link, Typography } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import ToggleMode from "../../../components/ToggleMode/ToggleMode";
import CartModal from "../../../components/CartModal/CartModal";
import { UseContext } from "../../../context";


const Navbar = () => {

  const { mode ,key} = React.useContext(UseContext)
  // console.log(cartLenght)
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [bgColor, setBgColor] = React.useState(false)
  const [color, setColor] = React.useState(false)

  const changeBgColor = () => {
    if (window.scrollY >= 5) {
      setBgColor(true)
    } else (
      setBgColor(false)
    )
  }
  window.addEventListener("scroll", changeBgColor)
  const changeColor = () => {
    if (window.scrollY >= 5) {
      setColor(true)
    } else (
      setColor(false)
    )
  }
  window.addEventListener("scroll", changeColor)


  const handleDrawerToggle = (_) => setMobileOpen((prevState) => !prevState);
 




  const drawer = (
    // toggle for small screen
    <Box
      onClick={() => handleDrawerToggle()}
      sx={{ textAlign: "center" }}
      px={3}
    >
      <List>
        <ListItem>
          <Link

            href="/Home"
            sx={{ color: "black", textDecoration: "none" }}
          >
            Home
          </Link>
        </ListItem>
        <ListItem>
          <Link href="#about" sx={{ color: "black", textDecoration: "none" }}>
            About
          </Link>
        </ListItem>
        <ListItem>
          <Link href="#courses" sx={{ color: "black", textDecoration: "none" }}>
            Courses
          </Link>
        </ListItem>
        <ListItem>
          <Link href="#whyUS" sx={{ color: "black", textDecoration: "none" }}>
            WhyUs
          </Link>
        </ListItem>
        <ListItem>
          <Link href="#services" sx={{ color: "black", textDecoration: "none" }}>
            Services
          </Link>
        </ListItem>
        <ListItem>
          <Link href="#contact" sx={{ color: "black", textDecoration: "none" }}>
            Contact
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box  key={key}>

      <AppBar component="nav" sx={{
        bgcolor: mode === "light" && bgColor ? "rgba(72, 72, 72, 0.638)"
          : mode === "dark" && bgColor ? "white" : "transparent",
        boxShadow: "none",
        transition: "all .3s ease"
      }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{display:{md:"none"}}}
          >
            <MenuIcon />
          </IconButton>
          <List
            variant="h6"
            component="div"
            sx={{
              display: { xs: "none", sm: "none", md: "block" },

            }}
            width={"100%"}
          >

            <ListItem>
              <Link
                href="/Home"
                sx={{ display: "flex", alignItems: "center", color: color && mode === "dark" ? "black" : "white", textDecoration: "none", }}
              >
                <Typography fontWeight={700}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}>
                  <ShoppingBag sx={{
                    fontSize: "35px",
                    color: "rgba(160, 160, 160)"
                  }}
                  />CYBER BAZAAR</Typography>
              </Link>
            </ListItem>
          </List>
          <List
            sx={{
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          >

            <ListItem>
              <Link
                href="/home"
                sx={{ color: color && mode === "dark" ? "black" : "white", textDecoration: "none" }}
              >
                Home
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="#about"
                sx={{ color: color && mode === "dark" ? "black" : "white", textDecoration: "none" }}
              >
                About
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="/shop"
                sx={{ color: color && mode === "dark" ? "black" : "white", textDecoration: "none" }}
              >
                Shop
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="#whyUs"
                sx={{ color: color && mode === "dark" ? "black" : "white", textDecoration: "none" }}
              >
                WhyUs
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="#services"
                sx={{ color: color && mode === "dark" ? "black" : "white", textDecoration: "none" }}
              >
                Services
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="#contact"
                sx={{ color: color && mode === "dark" ? "black" : "white", textDecoration: "none" }}
              >
                Contact
              </Link>
            </ListItem>
            <Box>
              <ToggleMode color={color} />
            </Box>
          </List>
          <CartModal color={color} />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },

            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, }
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Toolbar />
    </Box>
  );
};
export default Navbar;

const drawerWidth = 200;

