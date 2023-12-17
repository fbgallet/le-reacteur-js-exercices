import Logo from "./Logo";
import User from "./User";

function Header({ userName }) {
  return (
    <header>
      <Logo />
      <User userName={userName} />
    </header>
  );
}

export default Header;
