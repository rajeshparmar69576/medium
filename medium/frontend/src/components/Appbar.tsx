import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'

interface MyJwtPayload{
    name: string;
    email: string;
    password: string;
}

const Appbar = () => {
    const token = localStorage.getItem("token")
    let user:MyJwtPayload|null = null;

    if (token) {
        try {
            user = jwtDecode<MyJwtPayload>(token)
            console.log("Decoded user:", user)
        } catch (err) {
            console.log("invalid token", err);
            user = null;
        }
        
    }
  return (
    <div className="flex justify-between px-10 py-4 border-b">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center cursor-pointer"
      >
        Medium
      </Link>
      <div>
        <Link to={'/publish'}>
          <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2" >New</button>
        </Link>
        {user ? (
                  <Avatar size={"big"} name={user.name || "U"} />
        ):(
          <Link to="/signin" className="text-sm text-blue-500">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Appbar;
