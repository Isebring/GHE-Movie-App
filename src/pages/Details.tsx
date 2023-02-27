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

          <MovieContent>
            <PosterContainer>
              <Poster
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path || ''
                  )})`,
                }}
              ></Poster>
            </PosterContainer>

            <Info>
              <div className="title">{item.title || item.name}</div>
            </Info>
          </MovieContent>
        </>
      )}
    </>
  );
}

const Banner = styled.div`
  height: 60vh;
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const MovieContent = styled.div`
display: flex;
justify-content: flex-start;
align-items: flex-start;
max-width: 1260px
margin-left: auto;
margin-right; auto;
margin-top: -200px;
position: relative;
padding: 0 2rem;
`;

const PosterContainer = styled.div`
  flex: 1;
`;

const Poster = styled.div`
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 30px;
  padding-top: 165%;
`;

const Info = styled.div`
  width: 70%;
  padding-left: 2rem;
  position: relative;
`;

export default Details;
