import logo from '../assets/TimLogo.png';

function Navbar() {
  return (
    <nav className="site-navbar" aria-label="Main navigation">
      <a className="navbar-logo" href="#top" aria-label="Timothy Tu home">
        <img src={logo} alt="" />
        <span>Timothy Tu</span>
      </a>
      <div className="site-nav">
        <a href="#about">About</a>
        <a href="#lessons">Lessons</a>
        <a href="#projects">Projects</a>
        <a href="#hobbies">Hobbies</a>
        <a href="#skills">Skills</a>
      </div>
      <a className="navbar-link" href="#footer">
        Contact <span aria-hidden="true">↗</span>
      </a>
    </nav>
  );
}

export default Navbar;
