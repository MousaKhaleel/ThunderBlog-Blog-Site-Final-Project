import React, { useEffect, useState } from "react";
import Blog from "./Blog";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/allBlogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  return (
    <div>
      {blogs && blogs.map((blog) => (
        <Blog key={blog._id} blog={blog.Title} />
      ))}
    </div>
  );
}

export default BlogList;