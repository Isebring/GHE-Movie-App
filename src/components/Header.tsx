import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

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

function Header()  {
  const {pathname} = useLocation();
  const headerRef = useRef(null);
  const active = headerNav.findIndex(e => e.path === pathname);

  return (
    <div ref={headerRef}>
      <ul>
        {
          headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? 'active' : ''}`}>
              <Link to={e.path}>
                {e.display}
                </Link>
            </li> 
          )
          )
        }
      </ul>
      </div>
  )
}

export default Header;