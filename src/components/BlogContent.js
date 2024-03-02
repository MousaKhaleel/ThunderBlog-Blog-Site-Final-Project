import './mainStyle.css'

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogContent() {
    const {id}=useParams()
    const[content,setContent]=useState('');
    const[loading,setLoading]=useState(false);
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