import React, { useEffect, useState } from "react";
import Blog from "./Blog";

function BlogList({blogs}) {

  
  return (
<div>
  {blogs.map((item, i) => (
    <Blog key={i} Title={item.Title} Preview={item.Preview} id={item._id} />
  ))}
</div>
  );
}

export default BlogList;