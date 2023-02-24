import { Link } from 'react-router-dom';
import apiConfig from '../api/apiConfig';
import { category } from '../api/tmdbApi';

interface Props {
  item: {
    id: number;
    title: string;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  category: string;
}

function MovieCard(props: Props) {
  const item = props.item;
  const link = '/' + category[props.category] + '/' + item.id;

  // Get background for MovieCard
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div style={{ backgroundImage: `url(${bg})` }}>
        <button>
          <i>Play</i>
        </button>
      </div>
      {/* Display title of Movie or TV Show */}
      <h3>{item.title || item.name}</h3>
    </Link>
  );
}

export default MovieCard;
