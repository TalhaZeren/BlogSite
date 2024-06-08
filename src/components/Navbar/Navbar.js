import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { style, styled } from '@mui/system';

const useStyles = styled((theme) => ({
    root:{
        flexGrow:1,
    },
    menuButton:{
        marginRight: theme.spacing(2),
    },
    title:{
        flexGrow:1,
        textAlign : "left"
    },
    link:{
        textDecoration :"none",
        boxShadow : "none",
        color :"white"
    }
}));

function Navbar(){
    let userId = 5;
    const classes = useStyles();
    return(
        <AppBar position="static">
        <Toolbar>
          <IconButton
          className={classes.menuButton}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{flexGrow:1, textAlign : "left"}}>
            <Link to="/" style={{ textDecoration :"none", boxShadow : "none",  color :"white"}}>Home</Link>
          </Typography>
          <Typography variant="h6">
         <Link to={{pathname : '/users/' +userId}} style={{ textDecoration :"none",boxShadow : "none", color :"white"}}>User</Link>
         </Typography>
        </Toolbar>
      </AppBar>
    )
}
export default Navbar;