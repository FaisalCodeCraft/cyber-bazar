import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
    return (
        <React.Fragment>
            <Box bgcolor={"black"}
                position={"relative"}
                width={"100%"}
                height={{ md: "580px", xs: '300px', sm: "400px" }} 
                px={0}
                >
                <Box
                    position={"absolute"}
                    sx={{ opacity: .53, objectFit: "cover" }}
                    width={"100%"}
                    height={"100%"}
                    src='https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    component='img'
                >

                </Box >
                <Box color={"white"} width={{ md: "45%" }}
                    position={"absolute"}
                    px={4}
                    top={"50%"}
                    sx={{ transform: "translateY(-50%)" }}
                    mt={4}
                >
                    <Typography>
                        WELCOME TO CYBER BAZAAR
                    </Typography>
                    <Typography fontSize={{ md: "2.5em" }}
                        fontWeight={300}
                        lineHeight={"50px"}
                        py={{ md: 5.5 }}
                    >
                        Unveil Your Radiance: Dive into Beauty with CYBER BAZAAR Skincare Marvels!
                    </Typography>
                    <Button sx={btnStyle} >SHOP NOW</Button>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Header;
const btnStyle = {
    color: "white",
    border: "1px solid white",
    borderRadius: "55px",
    px: 3,
    fontSize: "small",
    "&:hover": { backgroundColor: "white", color: "rgb(238,44,130)" },
}