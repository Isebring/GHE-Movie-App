import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import tmdbApi, { category } from '../../api/tmdbApi';
import MovieCard from '../MovieCard';

interface Props {
  category: string;
  type: string;
  id: number;
}

function Movielist(props: Props) {
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
        response = await tmdbApi.similar(props.category, props.id);
      }
      setItems(response.results);
    };
    getList();
  }, []);

  return (
    <div>
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
        {items.map((item: Movie, i: number) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Movielist;
