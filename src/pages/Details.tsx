import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import apiConfig from '../api/apiConfig';
import tmdbApi from '../api/tmdbApi';

interface MovieDetails {
  id: number;
  title: string;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

function Details() {
  const { category, id } = useParams<{ category: string; id: string }>();

  const [item, setItem] = useState<MovieDetails | null>(null);

  useEffect(() => {
    const getDetail = async () => {
      if (category) {
        const response = await tmdbApi.detail(category, Number(id), {
          params: {},
        });
        setItem(response);
        window.scrollTo(0, 0);
      }
    };
    getDetail();
  }, [category, id]);
  return (
    <>
      {item && (
        <>
          <Banner
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path || ''
              )})`,
            }}
          ></Banner>
          <div className="movie-content"></div>
        </>
      )}
    </>
  );
}

const Banner = styled.div`
  height: 50vh;
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export default Details;
