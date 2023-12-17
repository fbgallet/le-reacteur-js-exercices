import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function User({ userName }) {
  return (
    <div className="user">
      <div className="name">{userName}</div>
      <div>
        <FontAwesomeIcon icon={faUser} />
      </div>
    </div>
  );
}

export default User;
