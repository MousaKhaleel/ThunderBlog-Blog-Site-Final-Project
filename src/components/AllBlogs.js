import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import './mainStyle.css'

function AllBlogs() {
  const[blogs,setBlogs]=useState(null);
  const[loading,setLoading]=useState(true);
  

  useEffect(() => {
      fetch("http://localhost:8000/allblogs")
        .then((res) => res.json())
        .then((data) => {setBlogs(data); setLoading(false)})
        .catch((error) => console.error(error));
    }, []);

    return ( 
      <div className="allBlogsContainer">
      <main>
      {loading && <h2 style={{textAlign:'center',height:'60vh'}}>Loading...</h2>}
      {blogs && <h1>All Blogs</h1>}
      {blogs && <hr/>}
      {blogs && <BlogList blogs={blogs}/>}
      </main>
      </div>
     );
}

export default AllBlogs;