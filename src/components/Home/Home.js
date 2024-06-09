import Post from "../Post/Post";
import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import { styled } from '@mui/system';  
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PostForm from "../Post/PostForm";

const CustomContainer = styled(Container)(({ theme }) => ({
  justifyContent: "center",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  backgroundColor: "#e8f5e9",
  height: "100vh",
  overflow: "auto",
  padding: theme.spacing(2)
}));

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPost = () => {
    fetch("/posts")
      .then(res => res.json())
      .then(
        (result) => {
          setTimeout(() => {
            setIsLoaded(true);
            console.log("API Response:", result); // Hata ayıklama için
            setPostList(Array.isArray(result) ? result : []); // Gelen sonucun bir dizi olup olmadığını kontrol et
          }, 1000); // 1 saniyelik gecikme
        },
        (error) => {
          setTimeout(() => {
            setIsLoaded(true);
            setError(error);
          }, 2000); // 2 saniyelik gecikme
        }
      )
  }

  useEffect(() => {
    refreshPost();
  }, [postList]); // Sadece bileşen yüklendiğinde çağır

  if (error) {
    return <div>Error!</div>;
  } else if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <CustomContainer>
        <PostForm userId={6} userName={"Talha Zeren"} refreshPost={refreshPost} />
        {postList.map(post => (
          <Post key={post.id} likes={post.postLikes} postId={post.id} userName={post.userName} 
          userId={post.userId} title={post.title} text={post.text} />
        ))}
      </CustomContainer>
    );
  }
}

export default Home;
