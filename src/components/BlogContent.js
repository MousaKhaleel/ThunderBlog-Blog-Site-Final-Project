import './mainStyle.css'

import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from './UserContext';

function BlogContent() {
    const {id}=useParams()
    const[content,setContent]=useState('');
    const[loading,setLoading]=useState(false);
    const[loadingDelete,setLoadingDelete]=useState(false);
  const [redirect, setRedirect]=useState(false);

    const {userId}=useContext(UserContext);

    useEffect(()=>{
        if(userId){
            setLoading(true)
            fetch(process.env.REACT_APP_API_URL+'/content/'+id+'/'+userId)
            .then(res=>{
                res.json().then(con=>{
                    setLoading(false)
                    setContent(con)
                })
            })
    } else{
    setLoading(true)
    fetch(process.env.REACT_APP_API_URL+'/content/'+id)
    .then(res=>{
        res.json().then(con=>{
            setLoading(false)
            setContent(con)
        })
    })
}
    },[userId])

    
  async function HandleDeleteBlog(){
    setLoadingDelete(true)
    const res= await fetch(process.env.REACT_APP_API_URL+'/deleteBlog/'+ id,{
      method:'DELETE',
      headers:{'Content-Type':'application/json'}
  })
  if(res.ok){
    setLoadingDelete(false)
    setRedirect(true);
  }
  }

  if(redirect){
    return <Navigate to={'/'} />
}

    return ( 
        <main>
        <div className="contentContainer">
        {loading && <h2 className='hl'>loading...</h2>} 
            <h2>{content.Title}</h2>
        {content.AuthorID==userId && !loadingDelete && <button type="submit" className="btn" onClick={HandleDeleteBlog} style={{ background: 'rgb(0, 166, 204)', color:'white' }} >Delete Blog</button>}
        {loadingDelete && <button type="submit" className="btn" onClick={HandleDeleteBlog} style={{ background: 'rgb(0, 166, 204)', color:'white' }} disabled>Delete Blog</button>}
            <p>{content.Content}</p>
        </div>
        </main>
     );
}

export default BlogContent;