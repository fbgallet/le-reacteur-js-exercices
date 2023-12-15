import Title from "./Title";

function Header(props) {
  return (
    <div className="header">
      <Title title={props.title} />
    </div>
  );
}

export default Header;
