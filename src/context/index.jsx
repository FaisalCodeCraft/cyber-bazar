import { Box } from '@mui/material'
import React, { createContext, useState } from 'react'


export const UseContext = createContext()
const ContextProvider = ({ children }) => {
    const [inCart, setInCart] = useState([])
    const [key, setKey] = React.useState(0)

    const [mode, setMode] = useState("light")
    const toggleMode = () => {
        setMode(mode === "light" ? "dark" : "light")
    }
    const handleKey = () => {
        setKey((prev) => prev + 1)
    }
    return (
        <UseContext.Provider value={{ inCart, setInCart, mode, setMode, toggleMode ,handleKey,key}}>
            <Box bgcolor={mode === "light" ? "rgb(248, 248, 255)" : "#212121"}
                color={mode === "light" ? "black" : "white"}
                sx={{ transition: "all .7s ease" }}
            >
                {children}
            </Box>
        </UseContext.Provider>
    )
}

export default ContextProvider