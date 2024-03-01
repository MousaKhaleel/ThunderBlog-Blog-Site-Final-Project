import React, { useEffect, useState } from "react";
import Blog from "./Blog";

function BlogList({blogs}) {

  console.log(blogs)
  
  return (
<div>
  {blogs.map((item, i) => (
    <Blog key={i} Title={item.Title} />
  ))}
</div>
  );
}

export default BlogList;