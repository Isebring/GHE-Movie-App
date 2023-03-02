import { Link } from "react-router-dom";
import styled from "styled-components";
import apiConfig from "../api/apiConfig";
import { category } from "../api/tmdbApi";
import noImage from "../assets/noimage.png";

interface Props {
  item: Movie;
  category: string;
}

interface Movie {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  backdrop_path: string;
  vote_average?: number;
  vote_count?: number;
}

function MovieCard(props: Props) {
  const item = props.item;
  const link = "/" + category[props.category] + "/" + item.id;

  // Get background for MovieCard
  let bg = "";
  if (item.poster_path || item.backdrop_path) {
    bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
  } else {
    bg = noImage;
  }

  return (
    <Link style={{ textDecoration: "none" }} to={link}>
      <Card
        item={item}
        category={props.category}
        style={{ backgroundImage: `url(${bg})` }}
      />
      {/* <button>
          <i>Play</i>
        </button> */}
      {/* Display title of Movie or TV Show */}
      <MediaTitle>
        <h3>{item.title || item.name}</h3>
      </MediaTitle>
    </Link>
  );
}

const MediaTitle = styled.div`
  font-family: "Inter", system-ui, Arial, sans-serif;
  color: white;
`;

const Card = styled.div<Props>`
  position: relative;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 160%;
  border-radius: 30px;
  margin-bottom: 1 rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 30px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    background-color: rgba(0, 0, 0, 0.6);
  }

  &:hover::before {
    opacity: 1;
  }

  &::after {
    content: "User rating: ${(props) => props.item.vote_average}";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4rem;
    font-weight: 600;
    color: white;
    opacity: 0;
    transition: opacity 0.4s;
    font-family: "Poppins", system-ui, Arial, sans-serif;

    @media (max-width: 1600px) {
      font-size: 3rem;
    }

    @media (max-width: 1200px) {
      font-size: 2.5rem;
    }

    @media (max-width: 1024px) {
      font-size: 3.5rem;
    }

    @media (max-width: 600px) {
      font-size: 2.8rem;
    }
  }

  &:hover::after {
    opacity: 1;
  }
`;
export default MovieCard;
