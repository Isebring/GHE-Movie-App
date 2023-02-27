import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import tmdbApi, { category } from '../api/tmdbApi';
import MovieCard from './MovieCard';

interface Props {
  category: string;
  type: string;
  id?: number;
}

function MovieList(props: Props) {
  const [items, setItems] = useState([]);

  interface Movie {
    id: number;
    title: string;
    name: string;
    poster_path: string;
    backdrop_path: string;
  }

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (props.type !== 'similar') {
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
    <MovielistWrapper>
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
        {items.map((item: Movie, i: number) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </MovielistWrapper>
  );
}

const MovielistWrapper = styled.div`
  .swiper-slide {
    width: 15%;
  }

  @media screen and (max-width: 768px) {
    width: 30%;
  }

  @media screen and (max-width: 480px) {
    width: 40%;
  }
`;

export default MovieList;
