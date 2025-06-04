import { useBlog } from "../hooks"

const Blog = () => {
    const { loading, blog } = useBlog();
    if (loading) {
        return <div>
            loading...
        </div>
    }
  return (
    <div>Blog</div>
  )
}

export default Blog