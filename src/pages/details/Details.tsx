import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';
import CastList from './CastList';

interface MovieDetails {
  id: number;
  title: string;
  name: string;
  genres: { name: string }[];
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
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
              <div className="title">
                <h2>{item.title || item.name}</h2>
              </div>
              <Genres>
                {item.genres &&
                  item.genres
                    .slice(0, 5)
                    .map((genre, i) => (
                      <GenreItem key={i}>{genre.name}</GenreItem>
                    ))}
              </Genres>
              <p className="overview">{item.overview}</p>
              <Cast>
                <div>
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </Cast>
            </Info>
          </MovieContent>
        </>
      )}
    </>
  );
}

const Banner = styled.div`
  height: 100vh;
  position: relative;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }

  text-align: center;
`;

const MovieContent = styled.div`
  color: white;
  display: flex;
  flex-wrap: row;
  justify-content: center;
  align-items: flex-start;
  max-width: 90%
  margin: 0 auto;
  padding: 0 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const PosterContainer = styled.div`
  width: 40%;
  height: auto;
  margin: 1rem;
`;

const Poster = styled.div`
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  border-radius: 30px;
  padding-top: 150%;
`;

const Info = styled.div`
  width: 60%;
  max-width: 800px;
  padding-left: 2rem;
  position: relative;
`;

const Genres = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
`;

const GenreItem = styled.span`
  padding: 0.4rem;
  border: 2px solid white;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.5);
`;

const Cast = styled.div`
  margin-top: 2rem;
`;

export default Details;
