import { useState, useEffect } from "react";
import Blog from "./Blog";
import BlogList from "./BlogList";
import HeroSection from "./HeroSection";

function HomePage() {
    const[blogs,setBlogs]=useState(null);
    const[loading,setLoading]=useState(true);
    
    // useEffect( ()=> {
    //     fetch('http://localhost:8000/allblogs')
    //       .then(res => res.json())
    //       .then(data => setBlogs(data))
    //       .catch(error => console.error(error))
    // },[])
    // console.log(blogs)

    useEffect(() => {
        fetch("http://localhost:8000/allblogs")
          .then((res) => res.json())
          .then((data) => {setBlogs(data); setLoading(false)})
          .catch((error) => console.error(error));
      }, []);

    return ( 
        <div>
        <HeroSection />
        <main>
        {loading && <h2>Loading...</h2>}
        {blogs && <BlogList blogs={blogs}/>}
        </main>
        </div>
     );
}

export default HomePage;