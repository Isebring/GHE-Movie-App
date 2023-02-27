import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import tmdbApi, { category, movieType, tvType } from "../api/tmdbApi";
import Input from "./Input";
import MovieCard from "./MovieCard";

interface Props {
  item: {
    id: number;
    title: string;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  category: string;
  keyword?: string;
}

function MovieGrid(props: Props) {
  const [items, setItems] = useState<Props["item"][]>([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    async function getList() {
      let response = null;
      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, params);
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(props.category, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    }
    getList();
  }, [props.category, keyword]);

  useEffect(() => {
    function handleIntersection(entries: IntersectionObserverEntry[]) {
      const target = entries[0];
      if (target.isIntersecting) {
        loadMore();
      }
    }

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.1,
    });

    const sentinel = document.getElementById("sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [loadMore]);

  async function loadMore() {
    let response = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, params);
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbApi.search(props.category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  }

  return (
    <>
      <MovieSearch
        category={props.category}
        keyword={keyword}
        item={{
          id: 0,
          title: "",
          name: "",
          poster_path: "",
          backdrop_path: "",
        }}
      />
      <Grid>
        {items.map((item, i) => (
          <MovieCard category={props.category} item={item} key={i} />
        ))}
      </Grid>
      <div id="sentinel" />
    </>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
  gap: 1.25rem;
  margin-bottom: 3rem;
`;
function MovieSearch(props: Props) {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (keyword.trim().length > 0) {
        navigate(`/${props.category}/search/${keyword}`);
        setKeyword("");
      }
    },
    [keyword, props.category, navigate]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default MovieGrid;
