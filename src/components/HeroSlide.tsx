import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import apiConfig from '../api/apiConfig';
import tmdbApi, { movieType } from '../api/tmdbApi';
import { Movie } from '../types';
import Buttons, { OutlineButton } from './Button';

interface MoviesResponse {
  results: Movie[];
}

function HeroSlide() {
  SwiperCore.use([Autoplay]);
  const [movieItems, setMovieItems] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response: MoviesResponse = await tmdbApi.getMoviesList(
          movieType.popular,
          params
        );
        setMovieItems(response.results.slice(0, 4));
      } catch (error) {}
    };
    getMovies();
  }, []);

  return (
    <SwiperWrapper>
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3500 }}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <SwiperItem>
                <HeroSlideItem
                  item={item}
                  className={`${isActive ? 'active' : ''}`}
                />
              </SwiperItem>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperWrapper>
  );
}

interface Props {
  item: Movie;
  className: string;
}

const HeroSlideItem = (props: Props) => {
  const navigate = useNavigate();
  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  return (
    <HeroSlideContainer style={{ backgroundImage: `url(${background})` }}>
      <Flex>
        <Center>
          <H2Title>{item.title}</H2Title>
          <Overview>{item.overview}</Overview>
          <ButtonFlex>
            <Buttons onClick={() => navigate('/movie/' + item.id)}>
              Read more
            </Buttons>
            <Link to="/movie">
              <HoverButton>
                <OutlineButton>More movies</OutlineButton>
              </HoverButton>
            </Link>
          </ButtonFlex>
        </Center>
        <W500Image src={apiConfig.w500Image(item.poster_path)} alt="" />
      </Flex>
    </HeroSlideContainer>
  );
};

const HeroSlideContainer = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
`;

const SwiperWrapper = styled.div`
  height: 100%;
`;

const HoverButton = styled.div`
  & :hover {
    background: #ff5733;
  }
`;

const Flex = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.6);
  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const ButtonFlex = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Overview = styled.div`
  color: white;
  font-family: 'Inter', system-ui, Arial, sans-serif;
  padding: 0.8rem;
  font-weight: 500;
`;

const W500Image = styled.img`
  display: flex;
  padding: 1.5rem;
  border-radius: 2.2rem;
  filter: brightness(1.1);
  @media (max-width: 850px) {
    width: 75%;
    height: 70%;
  }
`;

const H2Title = styled.h2`
  font-size: 4.2rem;
  font-weight: 700;
  color: white;
  display: flex;
  font-family: 'Poppins', system-ui, Arial, sans-serif;
  padding: 0.2rem;
  text-align: center;
  @media (max-width: 850px) {
    font-size: 3rem;
  }

  @media (max-width: 840px) {
    font-size: 2rem;
  }

  @media (max-width: 570px) {
    font-size: 1.7rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }

  @media (max-width: 430px) {
    font-size: 1.2rem;
  }
`;

const SwiperItem = styled.div`
  img {
    height: 100%;
  }
  @media (max-width: 850px) {
  }
`;

export default HeroSlide;
