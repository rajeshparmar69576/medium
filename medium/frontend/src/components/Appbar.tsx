import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

const Appbar = () => {
  return (
    <div className="flex justify-between px-10 py-4 border-b">
      <Link to={"/blogs"} className="flex flex-col justify-center cursor-pointer">
        Medium
      </Link>
      <div>
        <Avatar size={"big"} name="harkirat singh" />
      </div>
    </div>
  );
};

export default Appbar;
