import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import apiConfig from "../../api/apiConfig";
import axiosClient from "../../api/axiosClient";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import Buttons, { OutlineButton } from "../buttons/Button";
import Modal, { ModalContent } from "../modal";

interface MoviesResponse {
  results: { backdrop_path: string }[];
}

function HeroSlide() {
  SwiperCore.use([Autoplay]);
  const [movieItems, setMovieItems] = useState<{ backdrop_path: string }[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        console.log("axiosClient:", axiosClient);
        console.log("params:", params);
        const response: MoviesResponse = await tmdbApi.getMoviesList(
          movieType.popular,
          { params }
        );
        setMovieItems(response.results.slice(0, 5));
        console.log("response:", response);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getMovies();
  }, []);

  return (
    <div>
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
                    className={`${isActive ? "active" : ""}`}
                  />
                  {/* // <img src={apiConfig.originalImage(item.backdrop_path)} /> */}
                </SwiperItem>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
    {
      movieItems.map((item, i) => <TrailerModal key={i} item={item} />
    }
    </div>
  );
}

const HeroSlideItem = (props: any) => {
  const navigate = useNavigate();
  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    const videos = await tmdbApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0) {
      const videoSrc = "https://www.youtube.com/embed/"
     + videos.results[0].key;
     modal.querySelector(".modal__content > iframe")?.setAttribute('src', videoSrc);
    } else {
      modal.querySelector('.modal__content').innerHTML = "No Trailer";
    }
    modal?.classList.toggle('active');
  }

  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <Flex>
        <Center>
          <H2Title>{item.title}</H2Title>
          <Overview>{item.overview}</Overview>
          <ButtonFlex>
            <Buttons onClick={() => navigate("/movie/" + item.id)}>
              Watch now
            </Buttons>
            <OutlineButton onClick={() => console.log("trailer")}>
              Watch Trailer
            </OutlineButton>
          </ButtonFlex>
        </Center>
        <W500Image src={apiConfig.w500Image(item.poster_path)} alt="" />
      </Flex>
    </div>
  );
};

const TrailerModal = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
  <Modal active={false} id={`modal_${item.id}`}>
    <ModalContent onClose={onClose}>
      <iframe ref={iframeRef} width="100%" height="500px" title="trailer"</iframe>
    </ModalContent>
  </Modal>;
  )
};

const Flex = styled.div`
  display: flex;
  backdrop-filter: brightness(0.4);
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
  font-family: "Inter", system-ui, Arial, sans-serif;
  text-align: center;
  padding: 0.5rem;
  font-weight: 500;
`;

const W500Image = styled.img`
  display: flex;
  padding: 1.2rem;
  border-radius: 2rem;
  filter: brightness(1);
`;

const H2Title = styled.h2`
  font-size: 4.2rem;
  font-weight: 700;
  color: white;
  display: flex;
  font-family: "Poppins", system-ui, Arial, sans-serif;
  padding: 0.2rem;
  text-align: center;
`;

const SwiperContainer = styled.div``;

const SwiperItem = styled.div``;

export default HeroSlide;
