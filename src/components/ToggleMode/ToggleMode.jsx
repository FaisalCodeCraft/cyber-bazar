import React, { useContext } from 'react'
import { DarkMode, LightMode } from '@mui/icons-material'
import { Box, Fade, ListItem } from '@mui/material'
import { UseContext } from '../../context'

const ToggleMode = (props) => {
    const { color } =  props;
    const { mode, toggleMode } = useContext(UseContext)

    return (
        <ListItem sx={{ cursor: "pointer", color:color && mode === "dark" ? "black" : "white" }} onClick={toggleMode}>

            {
                mode === "light" ? <DarkMode /> : <LightMode />
            }
        </ListItem>
    )
}

export default ToggleMode;