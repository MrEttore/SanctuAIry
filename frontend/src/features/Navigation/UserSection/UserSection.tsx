import { MoreVertical } from "lucide-react";
import "./UserSection.scss";

export function UserSection() {
  return (
    <div className="user-section">
      <img
        className="avatar"
        src="https://avatar.iran.liara.run/public/4"
        alt=""
      />

      <div className="info">
        <div className="user-data">
          <span className="name">John Doe</span>
          <span className="username">john.doe@gmail.com</span>
        </div>
        <MoreVertical size={25} />
      </div>
    </div>
  );
}
