import { useEffect, useState } from "react";
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import apiConfig from "../../api/apiConfig";
import axiosClient from "../../api/axiosClient";
import tmdbApi, { movieType } from "../../api/tmdbApi";


interface MoviesResponse {
  results: { backdrop_path: string }[];
}

function HeroSlide() {
  SwiperCore.use([Autoplay]);
  const [movieItems, setMovieItems] = useState<{ backdrop_path: string }[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = {page: 1};
      try {
        console.log('axiosClient:', axiosClient);
        console.log('params:', params);
        const response: MoviesResponse = await tmdbApi.getMoviesList(movieType.popular, {params});
        setMovieItems(response.results.slice(0, 4));
        console.log('response:', response);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    getMovies();
  }, []);

  return(
    <div>
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({isActive}) => (
              <img src={apiConfig.originalImage(item.backdrop_path)} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroSlide;