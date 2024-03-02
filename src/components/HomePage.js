import { useState, useEffect } from "react";
import Blog from "./Blog";
import BlogList from "./BlogList";
import HeroSection from "./HeroSection";

function HomePage() {
  const [id,setId]=useState(null)
  const[blogs,setBlogs]=useState('');
  const[allBlogs,setAllBlogs]=useState('');
  const[name,setName]=useState(null);
  const[loading,setLoading]=useState(false);
  const[allLoading,setAllLoading]=useState(false);

  useEffect(()=>{
    fetch('http://localhost:8000/profile',{
      credentials:'include',
      method:'GET'
    }).then(res=>{
      res.json().then(info=>{
        setId(info.id)
        setName(info.name)
      })
    },[])
    })
useEffect(() => {
if (id) {
  setLoading(true);
  fetch('http://localhost:8000/userblogs/' + id, {
    credentials: 'include'
  })
    .then(res => {
      res.json().then(blo => {
        setLoading(false);
        setBlogs(blo);
      });
    });
}
}, [id]);

useEffect(() => {
  setAllLoading(true)
  fetch("http://localhost:8000/allblogs")
    .then((res) => res.json())
    .then((data) => {setAllBlogs(data); setAllLoading(false)})
    .catch((error) => console.error(error));
}, []);

    return ( 
      <div>
            <HeroSection />
            {!name && <>
              <div className="allBlogsContainer"y>
      <main>
      {allBlogs && <h1>All Blogs, <a href="/login">LogIn</a> to see yours here!</h1>}
       {allLoading && <h2 className="hl">Loading...</h2>}
      {allBlogs && <BlogList blogs={allBlogs}/>}
      </main>
      </div>
            </> }
      <main>{name && <>
      {loading && <h2 className="hl">Loading...</h2>}
      {blogs && <h1>Your Blogs, <a  href="/profiledetails" style={{color:'rgb(0, 166, 204)'}}>{name}</a>.</h1>}
      {blogs && <BlogList blogs={blogs} />}
      </>}
      </main>
      </div>
     );
}

export default HomePage;