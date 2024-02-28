import React, { useEffect, useState } from "react";
import Blog from "./Blog";

function BlogList({blogs}) {

  console.log(blogs)

  // useEffect(() => {
  //   fetch("http://localhost:8000/allblogs")
  //     .then((res) => res.json())
  //     .then((data) => setBlogs(data))
  //     .catch((error) => console.error(error));
  // }, []);
  

  
  return (
<div>
  {blogs.map((item, i) => (
    <Blog key={i} Title={item.Title} />
  ))}
</div>
  );
}

export default BlogList;