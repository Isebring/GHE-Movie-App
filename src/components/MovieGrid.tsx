import { useEffect, useState } from "react";
import { useParams } from "react-router";
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
            console.log("params for movie:", params);
            response = await tmdbApi.getMoviesList(movieType.upcoming, params);
            break;
          default:
            console.log("params for tv:", params);
            response = await tmdbApi.getTvList(tvType.popular, params);
        }
      } else {
        const params = {
          query: keyword,
        };
        console.log("params for search:", params);
        response = await tmdbApi.search(props.category, params);
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [props.category, keyword]);
  return (
    <div>
      {items.map((item, i) => (
        <MovieCard category={props.category} item={item} key={i} />
      ))}
    </div>
  );
}

export default MovieGrid;
