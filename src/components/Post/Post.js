import React, { useRef, useState, useEffect } from "react";
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
import Comment from '../Comment/Comment';
import CommentForm from "../Comment/CommentForm";

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
  const { title, text, userName, userId, postId, likes } = props;
  const [expanded, setExpanded] = useState(false);
  const [isliked, setIsLiked] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInitialMount = useRef(true);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId, setLikeId] = useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComment();
    console.log(commentList);
  };

  const handleLike = () => {
    if (isliked) {
      deleteLike();
      setLikeCount(likeCount - 1);
    } else {
      saveLike();
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isliked); // Beğeni Butonu
  };

  const saveLike = () => {
    fetch("/likes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
      }),
    })
      .then(response => response.json())
      .then(data => {
        setLikeId(data.id); // API'den dönen likeId'yi ayarlayın
        console.log("Saved Like ID:", data.id); // Hata ayıklama için
      })
      .catch((error) => console.log(error));
  }

  const deleteLike = () => {
    if (likeId) {
      fetch("/likes/" + likeId, {
        method: "DELETE",
      })
        .then(() => {
          setLikeId(null); // Beğeni silindikten sonra likeId'yi null yapın
          console.log("Deleted Like ID:", likeId); // Hata ayıklama için
        })
        .catch((error) => console.log(error));
    } else {
      console.log("Error: likeId is null");
    }
  }

  const refreshComment = () => {
    fetch("/comments?postId=" + postId)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log("API Response:", result); // Hata ayıklama için
          setCommentList(Array.isArray(result) ? result : []); // Gelen sonucun bir dizi olup olmadığını kontrol et
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  const checkLikes = () => {
    fetch("/likes?postId=" + postId + "&userId=" + userId)
      .then(res => res.json())
      .then(
        (result) => {
          const likeControl = result.find(like => like.userId === userId);
          if (likeControl != null) {
            setLikeId(likeControl.id);
            setIsLiked(true);
            console.log("Like ID:", likeControl.id); // Hata ayıklama için ekledim
          } else {
            setLikeId(null);
            setIsLiked(false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      refreshComment();
    }
  }, [commentList]);

  useEffect(() => { checkLikes(); }, []);

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
          <IconButton onClick={handleLike} aria-label="add to favorites">
            <FavoriteIcon style={isliked ? { color: "red" } : null} />
            {likeCount}
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
                <Comment key={comment.id} userId={1} userName={"talha"} text={comment.text}></Comment>
              )) : "Loading..."}
          </Container>
          <CommentForm userId={1} userName={"talha"} postId={postId}></CommentForm>
        </Collapse>
      </Card>
    </Root>
  );
}

export default Post;
