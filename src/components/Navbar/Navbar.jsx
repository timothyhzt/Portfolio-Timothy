import logo from '../../assets/TimLogo.png';
import { usePuzzleTransition } from '../Transition/PuzzleTransitionProvider';

function Navbar() {
  const { route, navigate } = usePuzzleTransition();
  const homeHref = route ? '#/' : '#top';
  const puzzleLinks = [
    ['About', '#about', 'about'],
    ['Background', '#/background', 'background'],
    ['Skills', '#/skills', 'skills'],
    ['Projects', '#/projects', 'projects'],
    ['Next', '#/next', 'next']
  ];

  return (
    <nav className="site-navbar" aria-label="Main navigation">
      <a className="navbar-logo" href={homeHref} onClick={(event) => { event.preventDefault(); navigate(); }} aria-label="Timothy Tu home">
        <img src={logo} alt="" />
        <span>Timothy Tu</span>
      </a>
      <div className="site-nav">
        {puzzleLinks.map(([label, href, target]) => (
          <a
            href={href}
            key={label}
            onClick={(event) => {
              event.preventDefault();
              if (target === 'about') {
                if (route) {
                  navigate();
                } else {
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                }
                return;
              }
              navigate(target);
            }}
          >
            {label}
          </a>
        ))}
      </div>
      <a className="navbar-link" href={route ? '#/next' : '#footer'} onClick={(event) => {
        event.preventDefault();
        if (route) navigate('next');
        else document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' });
      }}>
        Contact <span aria-hidden="true">↗</span>
      </a>
    </nav>
  );
}

export default Navbar;
