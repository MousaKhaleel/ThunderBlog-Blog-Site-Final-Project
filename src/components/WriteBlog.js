import './mainStyle.css'
import { useState } from 'react';

function WriteBlog() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newBlogObject = {
      Title: title,
      Content: content,
      AuthorID:"temp",//change
      id: Date.now().toString(),
    };
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