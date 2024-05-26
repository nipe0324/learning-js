import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorite } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    // https://next-auth.js.org/getting-started/rest-api
    // The CSRF token returned by this endpoint must be passed as form variable named csrfToken in all POST submissions to any API endpoint.
    const csrfResponse = await axios.get('/api/auth/csrf');
    const csrfToken = csrfResponse?.data?.csrfToken;

    let response;
    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId, csrfToken }});
    } else {
      const csrfResponse = await axios.get('/api/auth/csrf');
      const csrfToken = csrfResponse?.data?.csrfToken;
      response = await axios.post('/api/favorite', { movieId, csrfToken });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    })

    mutateFavorite();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorite]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-netural-300'
      onClick={toggleFavorites}
    >
      <Icon className='text-white' size={25} />
    </div>
  )
};

export default FavoriteButton
