import React, { useRef, useState, useEffect,useCallback } from "react";
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import CommentIcon from '@mui/icons-material/Comment';
import Container from '@mui/material/Container';
import Comment from '../Comment/Comment'; // Comment bileşenini yerel dosyadan içe aktarıyoruz

const Root = styled('div')({
  width: 800,
  textAlign: 'left',
  margin: 10,
});

const Media = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
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

function Post(props) {
  const { title, text, userName, userId, postId } = props; // Post için çekilecek veriler.
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInitialMount = useRef(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComment();
    console.log(commentList);
  };

  const clickLike = () => {
    setLiked(!liked); // Beğeni Butonu
  };

  const refreshComment = () => {
    fetch("/comments?postId=" + postId)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          console.log(error)
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      refreshComment();
    }
  }, [commentList]);

  return (
    <Root>
      <Card>
        <CardHeader
          avatar={
            <CustomLink to={{ pathname: '/users/' + userId }}>
              <CustomAvatar aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </CustomAvatar>
            </CustomLink>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" textAlign="left">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={clickLike} aria-label="add to favorites">
            <FavoriteIcon style={liked ? { color: "red" } : null} />
          </IconButton>
          <Expand
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon />
          </Expand>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Container sx={{ padding: '16px' }}>
            {error ? "Error" :
              isLoaded ? commentList.map(comment => (
                <Comment userId={1} userName={"talha"} text={comment.text}></Comment>
              )) : "Loading..."}
          </Container>
        </Collapse>
      </Card>
    </Root>
  );
}

export default Post;
