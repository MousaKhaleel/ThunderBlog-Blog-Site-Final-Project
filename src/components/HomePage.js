import { useState, useEffect } from "react";
import Blog from "./Blog";
import BlogList from "./BlogList";
import HeroSection from "./HeroSection";

function HomePage() {
    const[blogs,setBlogs]=useState(null);
    
    // useEffect( ()=> {
    //     fetch('http://localhost:8000/allblogs')
    //       .then(res => res.json())
    //       .then(data => setBlogs(data))
    //       .catch(error => console.error(error))
    // },[])
    // console.log(blogs)
    return ( 
        <div>
        <HeroSection />
        <main>
        <BlogList blogs={blogs}/>
        </main>
        </div>
     );
}

export default HomePage;