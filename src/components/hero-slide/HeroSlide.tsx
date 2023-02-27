import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import apiConfig from "../../api/apiConfig";
import axiosClient from "../../api/axiosClient";
import tmdbApi, { movieType } from "../../api/tmdbApi";
import Button, { OutlineButton } from "../buttons/Button";


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
        setMovieItems(response.results.slice(1, 4));
        console.log('response:', response);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    getMovies();
  }, []);

  return(
    <div>
      <SwiperContainer>
      <Swiper modules={[Autoplay]} grabCursor={true} spaceBetween={0} slidesPerView={1} autoplay={{ delay: 3000 }} >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({isActive}) => (
              <SwiperItem>
              <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
              {/* // <img src={apiConfig.originalImage(item.backdrop_path)} /> */}
              </SwiperItem>
            )}
          </SwiperSlide>
        ))
            }
      </Swiper>
      </SwiperContainer>
    </div>
  );
}

// interface HeroSlideItemProps {
//   item: {
//     backdrop_path: string ;
//     poster_path: string;
//     title: string;
//     overview: string;
//     id: number;
//   };
//   className: string;
// }

  const HeroSlideItem = (props: any) => {
  const navigate = useNavigate();
  const item = props.item;

  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

  return (
    <div
      className={`${props.className}`}
      style={{backgroundImage: `url(${background})`}}>

    <div>
      <div>
        <H2Title>{item.title}</H2Title>
        <div>{item.overview}</div>
        <Button onClick={() => navigate('/movie/' + item.id)}>
          Watch now
        </Button>
        <OutlineButton onClick={() => console.log('trailer')}>
          Watch Trailer
        </OutlineButton>
      </div>
      <div></div>
      <W500Image src={apiConfig.w500Image(item.poster_path)} alt="" />
      </div>
    </div>
  )

}

const originalImage = styled.img`
height: 100%;
width: 100%;
`;

const W500Image = styled.img`
 height: 500px;
`;

const H2Title = styled.h2`
  font-size: 5rem;
  font-weight: 700;
  line-height: 1;
  color: white;
  position: relative;
  display: flex;
  justify-content: center;
  font-family: system-ui, Arial, sans-serif;
`;

const SwiperContainer = styled.div`
  height: 100%;
  display: flex;
`;

const SwiperItem = styled.div`
    img {
      height: 100vh;
    }
      
  }
`;


export default HeroSlide;