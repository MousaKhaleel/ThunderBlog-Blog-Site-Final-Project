import './mainStyle.css'
import { useState,useEffect } from 'react';

function WriteBlog() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [id,setId]=useState(null)

  useEffect(()=>{
    fetch('http://localhost:8000/profile',{
      credentials:'include',
      method:'GET'
    }).then(res=>{
      res.json().then(info=>{
        setId(JSON.stringify(info.id))
      })
    },[])
    console.log(id)
  })

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const res=await fetch('http://localhost:8000/addblog',{
    method:'POST',
    body: JSON.stringify({title, content, id}),
    headers:{'Content-Type':'application/json'}
  })
  }

    return ( 
        <div className="writeContainer">
            <form onSubmit={handleSubmit} >
            <h1>Write a blog</h1>
  <div className="form-group">
    <label htmlFor="title">Title</label>
    <input
      type="text"
      className="form-control"
      id="title"
      value={title} onChange={handleTitleChange}
      placeholder="Be creative"
    />
  </div>
  <div className="form-group">
  <br/>
    <label htmlFor="content">Content</label>
    <textarea
      className="form-control"
      id="content"
      value={content} onChange={handleContentChange}
      rows={14}
      defaultValue={""}
    />
  </div>
  <br/>
        <button type="submit" className="btn w-100" style={{ background: 'rgb(255, 150, 0)', color:'white' }} >Publish</button>
</form>
        </div>
     );
}

export default WriteBlog;