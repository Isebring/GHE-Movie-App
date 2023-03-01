import styled from "styled-components";

function Footer() {
  return (
    <StyledImg
      src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
      alt="image of the TMDB logotype"
    />
  );
}

const StyledImg = styled.img`
  height: 1.5rem;
`;

export default Footer;
