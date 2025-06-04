import { Avatar } from "./BlogCard"

const Appbar = () => {
  return (
    <div className="flex justify-between px-10 py-4 border-b">
        <div className="flex flex-col justify-center">
            Medium
        </div>
        <div>
            <Avatar size={"big"} name="harkirat singh"/>
        </div>
    </div>
  )
}

export default Appbar