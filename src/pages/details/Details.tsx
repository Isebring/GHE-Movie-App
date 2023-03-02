import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";
import noImage from "../../assets/noimage.png";
import CastList from "./CastList";

interface MovieDetails {
  id: number;
  title: string;
  name: string;
  genres: { name: string }[];
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
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
          <Backdrop
            backgroundImage={
              item.backdrop_path || item.poster_path
                ? apiConfig.originalImage(
                    item.backdrop_path || item.poster_path
                  )
                : ""
            }
          >
            <MovieContent>
              <Poster
                src={apiConfig.originalImage(
                  item.poster_path || item.backdrop_path || ""
                )}
                alt={`${item.title || item.name} poster`}
                onError={(e) => {
                  e.currentTarget.src = noImage;
                }}
              />

              <Info>
                <div className="title">
                  <h2>{item.title || item.name}</h2>
                  <h3>{item.release_date}</h3>
                  <h3>{"User rating: " + item.vote_average.toFixed(1)}</h3>
                  <h3>{item.vote_count + " votes"}</h3>
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
          </Backdrop>
        </>
      )}
    </>
  );
}

const Backdrop = styled.div<{ backgroundImage: string }>`
  height: 100vh;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  ${({ backgroundImage }) =>
    backgroundImage && `background-image: url(${backgroundImage})`};

  &:before {
    content: "";
    position: absolute;
    top: 3rem;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 0;
    opacity: 0.5;
  }
`;

const MovieContent = styled.div`
  color: white;
  display: flex;
  flex-wrap: row;
  justify-content: center;
  align-items: flex-start;
  z-index: 1;

  @media only screen and (max-width: 920px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Poster = styled.img`
  width: 30%;
  border-radius: 30px;
  margin-top: 1rem;
  z-index: 1;

  @media only screen and (max-width: 920px) {
    width: 50%;
  }
`;

const Info = styled.div`
  width: 90%;
  padding-left: 2rem;
  position: relative;
`;

const Genres = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const GenreItem = styled.span`
  padding: 0.4rem;
  border: 2px solid white;
  border-radius: 30px;
  margin-right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  display: inline-block;
  width: auto;
  margin-bottom: 0.5rem;
`;

const Cast = styled.div`
  margin-top: 1rem;
`;

export default Details;
