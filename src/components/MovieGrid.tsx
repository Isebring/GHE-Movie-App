import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import tmdbApi, { category, movieType, tvType } from "../api/tmdbApi";
import MovieCard from "./MovieCard";

interface Props {
  category: any;
}

function MovieGrid(props: Props) {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, params);
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, params);
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(props.category, params);
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [props.category, keyword]);
  return (
    <Grid>
      {items.map((item, i) => (
        <MovieCard category={props.category} item={item} key={i} />
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
  gap: 20px;
  margin-bottom: 3rem;
`;

export default MovieGrid;
