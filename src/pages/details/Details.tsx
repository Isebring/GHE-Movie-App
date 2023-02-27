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
              <div className="cast">
                <div>
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
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
  background-image: linear-gradient(
    to left,
    rgba(255, 0, 0, 0),
    rgba(255, 0, 0, 1)
  );
`;

const MovieContent = styled.div`
background-color: rgba(0, 0, 0, 0.7);
color: white;
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

const Genres = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
`;

const GenreItem = styled.span`
  padding: 0.1rem 0.1rem;
  border: 2px solid white;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.8);
`;

export default Details;
