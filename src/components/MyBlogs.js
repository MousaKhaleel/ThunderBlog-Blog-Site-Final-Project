import { useEffect, useState } from "react";
import BlogList from "./BlogList";

function MyBlogs() {
    const [id,setId]=useState(null)
    const[blogs,setBlogs]=useState('');
    const[loading,setLoading]=useState(false);

    useEffect(()=>{
      fetch('http://localhost:8000/profile',{
        credentials:'include',
        method:'GET'
      }).then(res=>{
        res.json().then(info=>{
          setId(info.id)
        })
      },[])
      })
console.log(blogs)
      useEffect(()=>{
          setLoading(true)
          fetch('http://localhost:8000/userblogs/'+id,{
            credentials:'include'
          })
          .then(res=>{
              res.json().then(blo=>{
                  setLoading(false)
                  setBlogs(blo)
              })
          })
      },[])

    //   {{...blogs}}

    return ( 
        <div>
        {blogs && <BlogList blogs={blogs} />}
        </div>
     );
}

export default MyBlogs;