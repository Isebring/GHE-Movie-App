import { Link } from 'react-router-dom';
import { category, movieType, tvType } from '../api/tmdbApi';
import OutlineButton from '../components/buttons/Button';
import MovieList from '../components/MovieList';

function Home() {
  return (
    <div>
      <h2>Trending Movies</h2>
      <MovieList category={category.movie} type={movieType.popular} />
      <Link to="/movie">
        <OutlineButton>View more</OutlineButton>
      </Link>

      <h2>Top Rated Movies</h2>
      <MovieList category={category.movie} type={movieType.top_rated} />
      <Link to="/movie">
        <OutlineButton>View more</OutlineButton>
      </Link>

      <h2>Trending TV Shows</h2>
      <MovieList category={category.tv} type={tvType.popular} />
      <Link to="/tv">
        <OutlineButton>View more</OutlineButton>
      </Link>

      <h2>Top Rated TV Shows</h2>
      <MovieList category={category.tv} type={tvType.top_rated} />
      <Link to="/tv">
        <OutlineButton>View more</OutlineButton>
      </Link>
    </div>
  );
}

export default Home;
