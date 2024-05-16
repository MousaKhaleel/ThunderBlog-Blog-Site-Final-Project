import './mainStyle.css'
import { useState,useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function WriteBlog() {

  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading]=useState(false);
  const [redirect, setRedirect]=useState(false);
  const [tags, setTags] = useState([]);

  const {userId}=useContext(UserContext);
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handlePreviewChange(e) {
    setPreview(e.target.value);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
  }

  function handleTagChange(tag) {
    const tagIndex = tags.indexOf(tag);
    if (tagIndex === -1) {
      setTags(prevTags => [...prevTags, tag]);
    } else {
      setTags(prevTags => prevTags.filter(item => item !== tag));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const res=await fetch(process.env.REACT_APP_API_URL+'/addblog',{
    method:'POST',
    body: JSON.stringify({title, preview, content, userId, tags}),
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
      placeholder="Be creative!"
      required
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
  <div className="mb-3 form-check-inline">
  Tags:
            <input type="checkbox" className="form-check-input" id="finance" checked={tags.includes('finance')} onChange={() => handleTagChange('finance')}/>
            <label className="form-check-label" htmlFor="finance">
            Finance
            </label>
            <input type="checkbox" className="form-check-input" id="lifestyle" checked={tags.includes('lifestyle')} onChange={() => handleTagChange('lifestyle')}/>
            <label className="form-check-label" htmlFor="lifestyle">
              Lifestyle
            </label>
            <input type="checkbox" className="form-check-input" id="music" checked={tags.includes('music')} onChange={() => handleTagChange('music')}/>
            <label className="form-check-label" htmlFor="music">
              Music
            </label>
            <input  type="checkbox"  className="form-check-input"  id="health"  checked={tags.includes('health')}  onChange={() => handleTagChange('health')}/>
            <label className="form-check-label" htmlFor="health">
              Health
            </label>
          </div>
          <br/>
    <label htmlFor="content">Content</label>
    <textarea
      className="form-control"
      id="content"
      value={content} onChange={handleContentChange}
      rows={12}
      defaultValue={""}
      required
    />
  </div>
  <br/>
        {!loading && <button type="submit" className="btn w-100" style={{ background: 'rgb(0, 166, 204)', color:'white' }} >Publish</button>}
        {loading && <button type="submit" className="btn w-100" style={{ background: 'rgb(0, 166, 204)', color:'white' }} disabled>Loading...</button>}
</form>
        </div>
     );
}

export default WriteBlog;