import { Box, Button, Grid, LinearProgress, MenuItem, Rating, TextField, Typography } from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { UseContext } from 'context'
import React, { useContext, useState } from 'react'
import ProductModal from '../ProductModal/ProductModal'
import { ShoppingCart } from '@mui/icons-material'
import { COLORS } from 'constants/contents/color'
import styled from 'styled-components'

const AllProducts = () => {
    const { inCart, setInCart, handleKey } = useContext(UseContext)
    const [productId, setProductId] = useState()
    const [productModal, setProductModal] = useState(false)
    const [skip, setSkip] = useState(0)
    const [prodctCategory, setProdctCategory] = useState("")

    const fecthProducts = async () => {
        let url = `https://dummyjson.com/products?limit=8&skip=${skip}`
        if (prodctCategory && prodctCategory !== "All Options") {
            url = `https://dummyjson.com/products/category/${prodctCategory}?limit=8&skip=${skip}`
        }
        const res = await fetch(url)
        const data = await res.json()
        return data?.products

    }



    const { isLoading, error, data: products } = useQuery({
        queryKey: ["products", skip, prodctCategory],
        queryFn: fecthProducts,
        placeholderData: keepPreviousData,

    })
    const { data: categories } = useQuery({
        queryKey: ["categories", skip],
        queryFn: async () => {
            return await fetch(`https://dummyjson.com/products/categories`)
                .then((res) => res.json())
        },
        placeholderData: keepPreviousData

    })

    const handleCart = (item) => {
        if (inCart.find((e) => e.id === item.id)) {
            const removFromCArt = inCart.filter((e) => e.id !== item.id)
            setInCart(removFromCArt)
        } else {
            inCart.push({ ...item, quantity: 1 })
            setInCart(inCart)

        }
        handleKey();
    }

    if (isLoading) {
        return (
            <Box sx={{ width: '40%', m: "auto", mt: 4 ,}}>
                <Typography textAlign={"center"}>Fetching...</Typography>
                <LinearProgress sx={{
                    bgcolor: "white",
                    mt: 2,
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: COLORS.pink.hotPink,
                    },
                    p: .2
                }} />
            </Box>
        )
    }

    return (
        <Box px={4}>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                pb={5}
            >
                <Typography variant="h4">All Categories</Typography>
                <TextField
                    select
                    defaultValue={"All Options"}
                    onChange={(e) => setProdctCategory(e.target.value)}
                >
                    <MenuItem value={'All Options'}>
                        All Options
                    </MenuItem>
                    {categories?.map((category, i) => (
                        <MenuItem key={i} value={category}>
                            {category}
                        </MenuItem>

                    ))}
                </TextField>
            </Box>
            <Grid container spacing={5}>
                {error &&
                    <Typography
                        fontSize="samll"
                        color={"red"}
                        width={"96%"}
                        ml={"auto"}
                    >
                        {error?.message}
                    </Typography>
                }
                {products?.map((item, index) => (

                    <Grid item md={3} key={index}>
                        <Box
                            position={"relative"}
                            height={"300px"}
                            width={"100%"}
                            sx={{ backgroundColor: "rgb(248, 247, 243)" }}
                            onClick={() => {
                                setProductId(item?.id)
                                setProductModal(!productModal)
                            }}
                        >
                            <Poster>
                                <img
                                    width={"100%"}
                                    height={"100%"}
                                    style={{ objectFit: "cover" }}
                                    src={item.thumbnail}
                                    alt={item.brand}
                                />
                            </Poster>
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
                                {item.brand}
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
                        {productModal && productId === item?.id && (

                            < ProductModal
                                productModal={productModal}
                                productData={item}
                                onClose={() => setProductModal(false)}
                            />
                        )
                        }
                    </Grid>
                ))}
            </Grid>
            <Box display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                mt={3}
            >
                <Button
                    sx={btnStyle}
                    onClick={() => setSkip((prev) => prev - 8)}
                    disabled={skip === 0}
                >
                    Prev
                </Button>
                <Button
                    sx={btnStyle}
                    onClick={() => setSkip((prev) => prev + 8)}
                    disabled={ (8 + skip) >= 100}
                >
                    Next
                </Button>
            </Box>
        </Box>
    )
}

export default AllProducts;
const btnStyle = {
    color: COLORS.pink.hotPink,
    border: "1px solid rgb(238,44,130)",
    borderRadius: "40px",
    px: 3,
    mx: 2,
    fontSize: "small",
    "&:hover": { backgroundColor: COLORS.pink.hotPink, color: "white" },
}

const IconBtn = {
    right: 6,
    top: 6,
    color: COLORS.pink.hotPink,
    fontSize: "1.6em",
    position: "absolute",
    zIndex: 999,
    bgcolor: "white",
    borderRadius: "50%",
    p: "5px",
    boxShadow: "2px 3px 4px gray",
    transition: "all .5s ease",
    "&:hover": {
        transform: "scale(1.1)",
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

const Icon = styled.div`
height:300px;
width:100%;
position: absolute;
 background-color: rgba(179, 179, 179, 0.3);
z-index:111;
opacity:0;
transition: all .7s ease; 
&:hover {
    opacity:1;
}
`