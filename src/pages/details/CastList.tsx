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
            src={
              item.profile_path ? apiConfig.w500Image(item.profile_path) : ''
            }
            alt={`${item.name} profile`}
          />
          <CastItemName>{item.name}</CastItemName>
        </CastItem>
      ))}
    </CastFlex>
  );
}
const CastFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  padding: 8px;
`;

const CastItemImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 8px;
  object-fit: cover;
  border-radius: 30px;
`;

const CastItemName = styled.p`
  font-size: 0.8rem;
  max-width: 100%;
  text-align: center;
`;

export default CastList;
