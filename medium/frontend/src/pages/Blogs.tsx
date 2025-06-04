import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard"


const Blogs = () => {
    return (
        <div>
            <Appbar/>
        <div className="flex justify-center">
          <div className="max-w-full">
            <BlogCard
              authorName={"Harkirat Singh"}
              title={"How an ugly website making $500 per month?"}
              content={
                "When we think of websites making money, our minds jump to sleek designs, perfect UI, fancy animations, and pixel-perfect perfection. But what if I told you there's an ugly, outdated-looking website pulling in $500 per month — and its not a flukeIn this post, lets dive into why design isnt everything, how this “ugly” site is winning the internet game, and what lessons you can apply to your own projects — especially if you’re just starting out."
              }
              publishedDate={"2nd feb 2025"}
            />
            <BlogCard
              authorName={"Rajesh Parmar"}
              title={"What is Data Science?"}
              content={
                "We’re living in the Information Age, and data is the new oil. But raw oil isn’t useful until it’s refined — and that’s where Data Science comes in.So what exactly is Data Science? Is it just crunching numbers? Running code? Or predicting what Netflix show you'll like next?Let’s break it down in a simple, beginner-friendly way."
              }
              publishedDate={"04 june 2025"}
            />
            <BlogCard
              authorName={"Divyansh Parmar"}
              title={
                "How to Spend Money to Truly Enjoy Life (Without Wasting It)"
              }
              content={
                "Money doesn’t buy happiness? Not exactly true.When spent right, money can absolutely buy joy, freedom, peace of mind — and unforgettable memories.The problem? Most people spend money chasing short-term dopamine instead of long-term satisfaction.Let’s flip the script. Here’s how to spend your money in ways that actually add value to your life."
              }
              publishedDate={"3rd june 2025"}
            />
          </div>
        </div>
      </div>
    );
};

export default Blogs;
