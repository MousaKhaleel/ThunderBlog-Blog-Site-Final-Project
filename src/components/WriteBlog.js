import './mainStyle.css'
import { useState,useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function WriteBlog() {

  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [content, setContent] = useState('');
  const [id,setId]=useState(null)
  const [loading, setLoading]=useState(false);
  const [redirect, setRedirect]=useState(false);

  useEffect(()=>{
    fetch('http://localhost:8000/profile',{
      credentials:'include',
      method:'GET'
    }).then(res=>{
      res.json().then(info=>{
        setId(info.id)
      })
    },[])
    console.log(id)
  })

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handlePreviewChange(e) {
    setPreview(e.target.value);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const res=await fetch('http://localhost:8000/addblog',{
    method:'POST',
    body: JSON.stringify({title, preview, content, id}),
    headers:{'Content-Type':'application/json'}
  })
  if(res.ok){
    setLoading(false)
  setRedirect(true)
  }
  }

  if(redirect){
    return <Navigate to={'/'} />
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
  <br/>
  <div className="form-group">
    <label htmlFor="title">Preview</label>
    <input
      type="text"
      className="form-control"
      id="title"
      value={preview} onChange={handlePreviewChange}
      placeholder="This should grab the user attention"
    />
  </div>
  <div className="form-group">
  <br/>
    <label htmlFor="content">Content</label>
    <textarea
      className="form-control"
      id="content"
      value={content} onChange={handleContentChange}
      rows={12}
      defaultValue={""}
    />
  </div>
  <br/>
        {!loading && <button type="submit" className="btn w-100" style={{ background: 'rgb(0, 166, 204)', color:'white' }} >Publish</button>}
        {loading && <button type="submit" className="btn w-100" style={{ background: 'rgb(0, 166, 204)', color:'white' }} >Loading...</button>}
</form>
        </div>
     );
}

export default WriteBlog;