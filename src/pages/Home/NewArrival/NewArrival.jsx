import { ShoppingBag, ShoppingCart } from '@mui/icons-material';
import { Box, Button, Container, Grid, Rating, Typography } from '@mui/material'
import { COLORS } from 'constants/contents/color';
import { NEW_ARRIVALS } from 'constants/contents/data';
import { UseContext } from 'context';
import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import ProductModal from '../ProductModal/ProductModal';


const NewArrival = () => {
    const { inCart, setInCart } = useContext(UseContext)
    const [productModal, setProductModal] = useState(false)
    const handleCart = (item) => {
        if (inCart.find((e) => e.id === item.id)) {
            const removFromCArt = inCart.filter((e) => e.id !== item.id)
            setInCart(removFromCArt)
        } else {
            inCart.push({ ...item, quantity: 1 })
            setInCart(inCart)

        }
        console.log("first")

    }
    return (
        <Box py={{ md: 10 }} px={4}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} py={4}>
                <Typography fontSize={{ md: "2.5em" }} fontWeight={300}>New Arrivals</Typography>
                <Box><Button sx={btnStyle} >SHOP NOW</Button></Box>
            </Box>

            <Grid container spacing={5}>
                {NEW_ARRIVALS.map((item ,index) => (
                    <Grid item md={3} key={index}>
                        <Box 
                        position={"relative"}
                         height={"300px"}
                          width={"100%"} 
                          sx={{ backgroundColor: "rgb(248, 247, 243)" }}
                          onClick={() => setProductModal(!productModal)}
                          >
                            <Poster>
                                <img
                                    width={"100%"}
                                    height={"100%"}
                                    style={{ objectFit: "cover" }}
                                    src={item.poster}
                                    alt={item.name}
                                />
                            </Poster>
                            <Circle />
                            <Icon>
                                <ShoppingCart
                                    sx={IconBtn}
                                    onClick={() => handleCart(item)}
                                />
                            </Icon>


                        </Box>
                        <Box mt={2}>
                            <Typography
                                color={COLORS.gray.light}
                                fontSize={"small"}
                                mb={2}
                            >
                                {item.proName}
                            </Typography>
                            <Typography
                                fontWeight={"lighter"}
                                fontSize={"large"}
                            >
                                {item.title}
                            </Typography>
                            <Rating
                                sx={{ color: COLORS.gray.dark, my: .6 }}
                                name="size-small"
                                defaultValue={item.rating}
                                precision={.5}
                                size="small"
                            />
                            <Typography
                                fontWeight={"bold"}
                                color={COLORS.gray.light}
                            >
                                ${item.price}
                            </Typography>
                        </Box>
                        {productModal &&
                            <ProductModal
                                productModal={productModal}
                                productData={item}
                                onClose={()=>setProductModal(false)}
                            />}
                    </Grid>
                ))}
            </Grid>

        </Box>
    )
}

export default NewArrival;
const btnStyle = {
    color: COLORS.pink.hotPink,
    border: "1px solid rgb(238,44,130)",
    borderRadius: "40px",
    px: 3,
    fontSize: "small",
    "&:hover": { backgroundColor: COLORS.pink.hotPink, color: "white" },
}

const IconBtn = {
    right: 10,
    top: 10,
    fontSize: "1.6em",
    position: "absolute",
    zIndex: 999,
    bgcolor: "white",
    color:COLORS.pink.hotPink,
    borderRadius: "50%",
    p: "5px",
    boxShadow: "2px 3px 4px gray",
    transition: "all .5s ease",
    "&:hover": {
        transform: "scale(1.1)"
    }
}
const Poster = styled.div`
height: 210px;
width:200px;
 z-index: 99;
  position: absolute;
   top:50%;
    left: 50%;
    transform: translate(-50% ,-50%);
   
`
const Circle = styled.div`
    height:210px;
    width:210px;
    position: absolute;
    background-color: white;
    border-radius:50%;
    top:50%;
    left: 50%;
    
    transform: translate(-50%,-50%);
`;
const Icon = styled.div`
height:300px;
width:100%;
position: absolute;
 background-color: rgba(179, 179, 179, 0.3);
z-index:111;
opacity:0;
transition: all .7s ease; &:hover {
    opacity:1;
}
`