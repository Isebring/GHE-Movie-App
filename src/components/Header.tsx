import { Container } from '@mantine/core';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from '../assets/imgs/GHEDb.png';

const headerNav = [
  {
    display: 'Home',
    path: '/',
  },
  {
    display: 'Movies',
    path: '/movie',
  },
  {
    display: 'TV Series',
    path: '/tv',
  },
];

interface NavItemProps {
  active: boolean;
}

function Header() {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const active = headerNav.findIndex((e) => e.path === pathname);

  return (
    <Container fluid>
      <HeaderStyle ref={headerRef}>
        <Nav>
          <Link to="/.">
            <LogoStyle>
              <img src={logoImage} alt="GHEDb logotype" />
            </LogoStyle>
          </Link>
          <JustifyRight>
            {headerNav.map((e, i) => (
              <NavItem key={i} active={i === active}>
                <Link to={e.path}>{e.display}</Link>
              </NavItem>
            ))}
          </JustifyRight>
        </Nav>
      </HeaderStyle>
    </Container>
  );
}

const HeaderStyle = styled.header``;

const JustifyRight = styled.div`
  display: flex;
`;

const LogoStyle = styled.div`
  width: 8rem;
  height: 3rem;
  display: flex;
  padding: 0.3rem;

  @media (max-width: 500px) {
    display: none;
  }

  & :hover {
    filter: brightness(0.9);
  }
`;

const Nav = styled.div`
  display: flex;
  list-style: none;
  justify-content: space-between;
  font-size: 1.7rem;

  @media (max-width: 501px) {
    justify-content: center;
  }

  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`;

const NavItem = styled.li<NavItemProps>`
  font-family: 'Poppins', system-ui, Arial, sans-serif;
  margin: 0 0.5rem;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  border-bottom: ${({ active }) => (active ? '5px solid white' : 'normal')};

  & a {
    text-decoration: none;
    color: ${({ active }) => (active ? '#5c77c9' : 'white')};
  }

  & a:hover {
    color: #5c77c9;
  }
`;
export default Header;
