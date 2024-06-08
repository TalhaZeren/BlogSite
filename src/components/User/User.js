import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );
}

function User() {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <div>
      User Page. Welcome! {userId}
    </div>
  );
}

export default User;
