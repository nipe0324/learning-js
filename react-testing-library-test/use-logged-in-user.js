import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useLoggedInUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/user')
      .then((data) => {
        setUser(data)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      });
  }, []);

  return {
    isLoading,
    user,
  };
};
