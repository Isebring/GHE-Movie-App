import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import apiConfig from '../../api/apiConfig';
import tmdbApi, { category } from '../../api/tmdbApi';



function Movielist(props) {
    const [items, setItems] = useState([]);

    interface MovielistProps {
        category: string;
        type: string;
        id?: number;
    }
    

    interface Movie {
        poster_path: string;
    }
    

    useEffect(() => {
        const getList = async () => {
            let response = null;

            if (props.type !== 'similar') {
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, {params});
                        break;
                        default:
                            response = await tmdbApi.getTvList(props.type, {params});
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItems(response.results);
        }
        getList();
    }, []);

    return(
        <div>
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
                >
                {
                items.map((item: Movie, i: number) => (
                    <SwiperSlide>
                        <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                    </SwiperSlide>

                ))
                }   
            </Swiper>
        </div>
    );
}

Movielist.propTypes = {
category: PropTypes.string.isRequired,
type: PropTypes.string.isRequired
}

export default Movielist;