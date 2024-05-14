import React, { useEffect, useState } from "react";
import Blog from "./Blog";

function BlogList({blogs}) {

  
  return (
<div>
  {blogs?.map((item, i) => (
    <Blog key={i} Title={item.Title??'no data found'} Preview={item.Preview??'no data found'} id={item._id?? i} />
  ))}
</div>
  );
}

export default BlogList;