import './mainStyle.css'

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogContent() {
    const [userId,setUserId]=useState(null)
    const {id}=useParams()
    const[content,setContent]=useState('');
    const[loading,setLoading]=useState(false);
<<<<<<< HEAD

    useEffect(()=>{
        try {
          fetch('http://localhost:8000/profile',{
            credentials:'include',
            method:'GET'
          }).then(res=>{
            res.json().then(info=>{
              setUserId(info.id)
            })
          },[])
        } catch (error) {
          console.log(error)
        }
        })

    useEffect(()=>{
        if(userId){
            setLoading(true)
            fetch('http://localhost:8000/content/'+id+'/'+userId)
            .then(res=>{
                res.json().then(con=>{
                    setLoading(false)
                    setContent(con)
                })
            })
    } else{
    setLoading(true)
    fetch('http://localhost:8000/content/'+id)
    .then(res=>{
        res.json().then(con=>{
            setLoading(false)
            setContent(con)
        })
    })
}
    },[userId])

=======
    useEffect(()=>{
        setLoading(true)
        fetch('http://localhost:8000/content/'+id)
        .then(res=>{
            res.json().then(con=>{
                setLoading(false)
                setContent(con)
            })
        })
    },[])
>>>>>>> parent of 596882f (Merge branch 'main' into Back-End-Blog-Site)
    return ( 
        <main>
        <div className="contentContainer">
        {loading && <p>loading...</p>}
            <h2>{content.Title}</h2>
            <p>{content.Content}</p>
        </div>
        </main>
     );
}

export default BlogContent;