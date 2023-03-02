import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import logoImage from "../assets/imgs/GHEDb.png";

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  {
    display: "TV Series",
    path: "/tv",
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
    <div ref={headerRef}>
      <Nav>
        <LogoStyle>
          <img src={logoImage} alt="GHEDb logotype" />
        </LogoStyle>
        <JustifyRight>
          {headerNav.map((e, i) => (
            <NavItem key={i} active={i === active}>
              <Link to={e.path}>{e.display}</Link>
            </NavItem>
          ))}
        </JustifyRight>
      </Nav>
    </div>
  );
}

const JustifyRight = styled.div`
  display: flex;
`;

const LogoStyle = styled.div`
  width: 8rem;
  display: flex;
  padding: 0.18rem;

  @media (max-width: 500px) {
    display: none;
  }
`;

const Nav = styled.div`
  display: flex;
  list-style: none;
  justify-content: space-between;
  font-size: 1.7rem;
  background: #000000;

  @media (max-width: 370px) {
    font-size: 1.4rem;
  }
`;

const NavItem = styled.li<NavItemProps>`
  font-family: "Poppins", system-ui, Arial, sans-serif;
  margin: 0 0.5rem;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  border-bottom: ${({ active }) => (active ? "5px solid white" : "normal")};

  & a {
    text-decoration: none;
    color: ${({ active }) => (active ? "orange" : "white")};
  }

  & a:hover {
    color: orange;
  }
`;
export default Header;
