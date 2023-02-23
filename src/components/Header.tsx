import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

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
}
];

interface NavItemProps {
  active: boolean;
}


function Header()  {
  const {pathname} = useLocation();
  const headerRef = useRef(null);
  const active = headerNav.findIndex(e => e.path === pathname);

  return (
    <div ref={headerRef}>
      <Nav>
        {
          headerNav.map((e, i) => (
            <NavItem key={i} active={i === active}>
              <Link to={e.path}>
                {e.display}
                </Link>
            </NavItem> 
          )
          )
        }
      </Nav>
      </div>
  )
}


const Nav = styled.ul`
  display: flex;
  list-style: none;
  justify-content: right;
  font-size: 1.5rem;
`;

const NavItem = styled.li<NavItemProps>`
  font-family: system-ui, Arial, sans-serif;
  margin: 0 0.5rem;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  border-bottom: ${({ active }) => (active ? '3px solid red' : 'normal')};
  

  & a {
    text-decoration: none;
    color: ${({ active }) => (active ? 'red' : 'black')};
  }
  
  & a:hover {
    color: red
    
  }

  }
`;



export default Header;