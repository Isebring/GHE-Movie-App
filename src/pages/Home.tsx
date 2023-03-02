import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { category, movieType, tvType } from '../api/tmdbApi';
import OutlineButton from '../components/buttons/Button';
import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/MovieList';

function Home() {
  return (
    <div>
      <HeroSlide />
      <SpaceBetween>
        <h2>Trending Movies</h2>
        <OutlineButton>View more</OutlineButton>
      </SpaceBetween>
      <MovieList category={category.movie} type={movieType.popular} />
      <Link to="/movie"></Link>

      <SpaceBetween>
        <h2>Top Rated Movies</h2>
        <OutlineButton>View more</OutlineButton>
      </SpaceBetween>
      <MovieList category={category.movie} type={movieType.top_rated} />
      <Link to="/movie"></Link>

      <SpaceBetween>
        <h2>Trending TV Shows</h2>
        <OutlineButton>View more</OutlineButton>
      </SpaceBetween>
      <MovieList category={category.tv} type={tvType.popular} />
      <Link to="/tv"></Link>

      <SpaceBetween>
        <h2>Top Rated TV Shows</h2>
        <OutlineButton>View more</OutlineButton>
      </SpaceBetween>
      <MovieList category={category.tv} type={tvType.top_rated} />
      <Link to="/tv"></Link>
    </div>
  );
}

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  color: white;
  font-family: 'Poppins', system-ui, Arial, sans-serif;
  align-items: center;
  @media (max-width: 850px) {
    flex-direction: column;
  }
`;
export default Home;
