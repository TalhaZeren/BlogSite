import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { Avatar, Button, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
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

function CommentForm(props) {
  const { userId, userName, postId} = props;
  const [text,SetText] = useState("");


  const handleSubmit = () => {
    saveComment();
    SetText("");
  }

  const handleChange = (value) => {
        SetText(value);
  }

  const saveComment = () => {
    fetch("/comments/create",
    {
        method : "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            postId : postId,
            userId : userId,
            text : text 
        }),
    })
    
    .catch((err) => console.log("error"))

  }
 
  return (
    <StyledCardContent>  
      <OutlinedInput 
        id="outlined-adornment-amount"
        multiline
        placeholder="Text"
        inputProps={{ maxLength: 250 }} 
        fullWidth 
        onChange = { (i) => handleChange(i.target.value)}
        startAdornment={
          <InputAdornment position="start"> 
            <CustomLink to={{ pathname: '/users/' + userId }}>
              <SmallAvatar aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </SmallAvatar>   
            </CustomLink>
          </InputAdornment>
    }
    endAdornment = {
        <InputAdornment position="end">
        <Button
        variant="contained"
        style={{background : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color :'white'}}
        onClick = {handleSubmit}
        >Comment</Button>
    </InputAdornment>
    }
        value = {text}
        style={{ color: 'black', backgroundColor: 'white' }}
      ></OutlinedInput>
    </StyledCardContent>
  );
}

export default CommentForm;
