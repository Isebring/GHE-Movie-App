import { Link } from 'react-router-dom';
import styled from 'styled-components';
import apiConfig from '../api/apiConfig';
import { category } from '../api/tmdbApi';
import noImage from '../assets/noimage.png';

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
}

function MovieCard(props: Props) {
  const item = props.item;
  const link = '/' + category[props.category] + '/' + item.id;

  // Get background for MovieCard
  let bg = '';
  if (item.poster_path || item.backdrop_path) {
    bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
  } else {
    bg = noImage;
  }

  return (
    <Link to={link}>
      <Card style={{ backgroundImage: `url(${bg})` }}>
        <button>
          <i>Play</i>
        </button>
      </Card>
      {/* Display title of Movie or TV Show */}
      <h3>{item.title || item.name}</h3>
    </Link>
  );
}

const Card = styled.div`
  position: relative;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 160%;
  border-radius: 30px;
  margin-bottom: 1 rem;
`;

export default MovieCard;
