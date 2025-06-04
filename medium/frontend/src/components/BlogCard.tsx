

interface BlogCardProps{
    authorName: string,
    publishedDate: string,
    title: string,
    content:string
}

const BlogCard = ({ authorName, publishedDate, title, content }:BlogCardProps) => {
    return (
        <div className="border-b border-slate-200 pb-4 p-4">
            <div className="flex">
                <Avatar size="small" name={authorName} />
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                    {authorName}.
                </div>
                <div className="flex justify-center flex-col pl-2">
                    <Circle/>
                </div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-sm text-slate-400 font-thin pt-2">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
      </div>
    );
}

function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-600 ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span className="font-extralight text-xs text-gray-100 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}
  

export default BlogCard