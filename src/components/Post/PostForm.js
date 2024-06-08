import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, json } from 'react-router-dom';
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const Root = styled('div')({
  width: 800,
  textAlign: 'left',
  margin: 10,
});

const Media = styled(CardMedia)({
  height: 0,
  paddingTop: '5.25%', // 16:9
});

const Expand = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CustomAvatar = styled(Avatar)({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
});

const CustomLink = styled(Link)({
  textDecoration: 'none',
  boxShadow: 'none',
  color: 'white',
});



function PostForm(props) {
  const {userName, userId,refreshPost} = props; // Post için çekilecek veriler.
  const [expanded, setExpanded] = useState(false);
  const [text , SetText] = useState("");
  const [title ,setTitle] = useState("");
  const [isSent,setIsSent] = useState(false);
  const [open, setOpen] = React.useState(false);

    const savePost = () => {
        fetch("/posts/create",
        {
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                title : title,
                userId : userId,
                text : text 
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log("error"))

    }


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        SetText("");
        refreshPost();
    };

    const handleTitle = (value) =>{
        setTitle(value);
        setIsSent(false);
    }

    const handleText = (value) =>{
        SetText(value);
        setIsSent(false);
    } 

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
    
    return (
    <Root>
        <div>

        <Snackbar open={isSent} autoHideDuration={600} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
         Posting is successful!
        </Alert>
      </Snackbar>

      <Card>
        <CardHeader
          avatar={
            <Link to={{ pathname: '/users/' + userId }} style={{ textDecoration: "none", boxShadow: "none", color: "white" }}>
              <CustomAvatar aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </CustomAvatar>
            </Link>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
          <OutlinedInput
          id="outlined-adornment-amount"
          multiline
          placeholder="Title"
          inputProps = {{maxLength : 25}} 
          fullWidth
          value={title}
          onChange = { (i) => handleTitle(i.target.value)}
          >
            </OutlinedInput>
            }
        />
        <Media
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" textAlign="left">         
          <OutlinedInput
          id="outlined-adornment-amount"
          multiline
          placeholder="Text"
          inputProps = {{maxLength : 250}} 
          fullWidth 
          value={text}
          onChange = { (i) => handleText(i.target.value)}
          endAdornment = {
            <InputAdornment position="end">
                <Button
                variant="contained"
                style={{background : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color :'white'}}
                onClick = {handleSubmit}
                >Post</Button>
            </InputAdornment>
          }
          > </OutlinedInput>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>   
          <Expand
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
           
          </Expand>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
           
          </CardContent>
        </Collapse>
      </Card>
      </div>
    </Root>
  );
}

export default PostForm;
