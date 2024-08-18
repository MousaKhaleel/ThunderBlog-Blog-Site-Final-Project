import './mainStyle.css'

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from './UserContext';

function BlogContent() {
    const {id}=useParams()
    const[content,setContent]=useState('');
    const[loading,setLoading]=useState(false);

    const {userId}=useContext(UserContext);

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

    return ( 
        <main>
        <div className="contentContainer">
        {loading && <h2 className='hl'>loading...</h2>} 
            <h2>{content.Title}</h2>
            <p>{content.Content}</p>
        </div>
        </main>
     );
}

export default BlogContent;