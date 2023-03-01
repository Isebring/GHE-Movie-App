import { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi, { category } from "../api/tmdbApi";
import MovieCard from "./MovieCard";

interface Props {
  category: string;
  type: string;
  id?: number;
}

interface Movie {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
}

function MovieList(props: Props) {
  const [items, setItems] = useState([]);


  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id || 0);
      }
      setItems(response.results);
    };
    getList();
  }, []);

  return (
    <MovieListWrapper>

      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>

        {items.map((item: Movie, i: number) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </MovieListWrapper>
  );
}

const MovieListWrapper = styled.div`
  .swiper-slide {
    width: 15%;
  }
  .swiper-slide {
  @media (max-width: 1024px) {
    width: 30%;
  }
    @media (max-width: 850px) {
      width: 40%;
    }

    @media (max-width: 500px) {
      width: 50%;
    }

    @media (max-width: 400px) {
      width: 60%;
    }
`;



export default MovieList;
