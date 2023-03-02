import { Link } from "react-router-dom";
import styled from "styled-components";
import { category, movieType, tvType } from "../api/tmdbApi";
import OutlineButton from "../components/Button";
import HeroSlide from "../components/HeroSlide";
import MovieList from "../components/MovieList";

function Home() {
  return (
    <div>
      <HeroSlide />
      <SpaceBetween>
        <h2>Trending Movies</h2>
        <Link to="/movie">
          <OutlineButton>View more</OutlineButton>
        </Link>
      </SpaceBetween>
      <MovieList category={category.movie} type={movieType.popular} />

      <SpaceBetween>
        <h2>Top Rated Movies</h2>
        <Link to="/movie">
          <OutlineButton>View more</OutlineButton>
        </Link>
      </SpaceBetween>
      <MovieList category={category.movie} type={movieType.top_rated} />

      <SpaceBetween>
        <h2>Trending TV Shows</h2>
        <Link to="/tv">
          <OutlineButton>View more</OutlineButton>
        </Link>
      </SpaceBetween>
      <MovieList category={category.tv} type={tvType.popular} />

      <SpaceBetween>
        <h2>Top Rated TV Shows</h2>
        <Link to="/tv">
          <OutlineButton>View more</OutlineButton>
        </Link>
      </SpaceBetween>
      <MovieList category={category.tv} type={tvType.top_rated} />
    </div>
  );
}

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  color: white;
  font-family: "Poppins", system-ui, Arial, sans-serif;
  align-items: center;
  @media (max-width: 850px) {
    flex-direction: column;
  }
`;
export default Home;
