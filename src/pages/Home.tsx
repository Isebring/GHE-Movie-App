import { Link } from "react-router-dom";
import OutlineButton from '../components/buttons/Button';

function Home()  {
  return (
    <div>
    <h2>Trending Movies</h2>
    <Link to="/movie">
      <OutlineButton>View more</OutlineButton>
    </Link>
    </div>
  )
}

export default Home