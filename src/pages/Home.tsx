import { Link } from 'react-router-dom';
import { category, movieType } from '../api/tmdbApi';
import OutlineButton from '../components/buttons/Button';
import MovieList from '../components/Movielist';

function Home() {
  return (
    <div>
      <h2>Trending Movies</h2>
      <MovieList category={category.movie} type={movieType.popular} />
      <Link to="/movie">
        <OutlineButton>View more</OutlineButton>
      </Link>
    </div>
  );
}

export default Home;
