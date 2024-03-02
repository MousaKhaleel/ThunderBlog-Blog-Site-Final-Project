import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import './mainStyle.css'

function MyBlogs() {
    const [id,setId]=useState(null)
    const[blogs,setBlogs]=useState('');
    const[name,setName]=useState(null);
    const[loading,setLoading]=useState(false);

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

    //   {{...blogs}}

    return ( 
        <div className="myBlogsContainer">
        <main>
        {loading && <h2 className="hl">Loading...</h2>}
        {blogs && <h1 className="h">Blogs written by {name}</h1>}
        {blogs && <BlogList blogs={blogs} />}
        </main>
        </div>
     );
}

export default MyBlogs;