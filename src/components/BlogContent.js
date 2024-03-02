import './mainStyle.css'

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogContent() {
    const [userId,setUserId]=useState(null)
    const {id}=useParams()
    const[content,setContent]=useState('');
    const[loading,setLoading]=useState(false);

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
        setLoading(true)
        fetch('http://localhost:8000/content/'+id)
        .then(res=>{
            res.json().then(con=>{
                setLoading(false)
                setContent(con)
            })
        })
    },[])

        // trying server    app.get('/content/:id/:userId', async(req,res)=>{
    //     const id = new ObjectId(req.params.id);
    //     const viewedBlogs=await blogCollection.findOne({'_id':id})
    //     if(viewedBlogs){
    //     const upUser= await userCollection.findOneAndUpdate({ '_id': new ObjectId(req.params.userId) }, { $push: { 'History': id }})
    //     }
    //     res.json(viewedBlogs)
    //   })
    //   // app.get('/history/:userId', async(req,res)=>{
    //   //   const hist= await userCollection.findOne({ '_id': new ObjectId(req.params.userId)})
    //   //   console.log(hist)
    //   //   res.json(hist)
    //   // })
      

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