import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';

interface Props {
  id: number;
}

interface Cast {
  id: number;
  name: string;
  profile_path: string | null;
}

function CastList(props: Props) {
  const { category } = useParams<{ category: string }>();

  const [casts, setCasts] = useState<Cast[]>([]);

  useEffect(() => {
    const getCredits = async () => {
      if (category) {
        const response = await tmdbApi.credits(category, props.id);
        setCasts(response.cast.slice(0, 5));
      }
    };
    getCredits();
  }, [category, props.id]);

  return (
    <CastFlex>
      {casts.map((item) => (
        <CastItem key={item.id}>
          <CastItemImage
            style={{
              backgroundImage: item.profile_path
                ? `url(${apiConfig.w500Image(item.profile_path)})`
                : '',
            }}
          />
          <CastItemName>{item.name}</CastItemName>
        </CastItem>
      ))}
    </CastFlex>
  );
}
const CastFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  width: 300px;
  margin-right: 0.3rem;
`;

const CastItemImage = styled.div`
  width: 100%;
  height: 75%;
  margin-bottom: 8px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
`;

const CastItemName = styled.p`
  margin: 0;
  font-size: 14px;
  max-width: 100%;
  text-align: center;
`;

export default CastList;
