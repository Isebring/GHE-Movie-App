import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FooterImage from '../assets/imgs/searchandfind.svg';

function Footer() {
  return (
    <FlexFooter style={{ marginTop: '1rem' }}>
      <Link to="https://www.themoviedb.org/" target="_blank">
        <StyledImg
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
          alt="image of the TMDB logotype"
        />
      </Link>
      <img
        src={FooterImage}
        alt="Slogan for GHEDb, Search and find, find out if it fits you. Discover what's new"
      />
    </FlexFooter>
  );
}

const FlexFooter = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledImg = styled.img`
  height: 1.5rem;

  & :hover {
    filter: brightness(0.9);
  }
`;

export default Footer;
