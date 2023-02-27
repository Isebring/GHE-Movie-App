import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
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
    <div className="casts">
      {casts.map((item, i) => (
        <div key={item.id} className="casts-item">
          <div
            className="casts-item-img"
            style={{
              backgroundImage: item.profile_path
                ? `url(${apiConfig.w500Image(item.profile_path)})`
                : '',
            }}
          ></div>
          <p className="casts-item-name">{item.name}</p>
        </div>
      ))}
    </div>
  );
}

export default CastList;
