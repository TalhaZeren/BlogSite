import React from "react";
import { styled } from '@mui/material/styles';
import { Avatar, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
}));

const CustomLink = styled(RouterLink)({
  textDecoration: 'none',
  boxShadow: 'none',
  color: 'white',
});

function Comment(props) {
  const { text, userId, userName } = props;

  return (
    <StyledCardContent>  
      <OutlinedInput 
        disabled
        id="outlined-adornment-amount"
        multiline
        placeholder="Text"
        inputProps={{ maxLength: 250 }} 
        fullWidth 
        value={text}
        startAdornment={
          <InputAdornment position="start"> 
            <CustomLink to={{ pathname: '/users/' + userId }}>
              <SmallAvatar aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </SmallAvatar>   
            </CustomLink>
          </InputAdornment>
        }
        style={{ color: 'black', backgroundColor: 'white' }}
      ></OutlinedInput>
    </StyledCardContent>
  );
}

export default Comment;
