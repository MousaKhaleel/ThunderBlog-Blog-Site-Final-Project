import './mainStyle.css';
import './blogStyle.css'
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

function Blog(blog) {

  const {isDark}=useContext(ThemeContext)
  const [bg, setBg]=useState()
  const [col, setCol]=useState()
  useEffect(()=>{
      if(localStorage.getItem('theme') === 'dark'){
      setBg('#595959')
      setCol('#fff')
      }
  else
  {
  setBg('#fff')
  setCol('#333')
  }
  },[isDark])

  const id=blog.id
  return (<span className='link'>
    <Link to={`/blogcontent/${id}`}>
    <div style={{background: bg, color: col}} className="blogPreviewContainer">
      <div>
        <h2>{blog.Title}</h2>
        <hr/>
        <br/>
        <p>{blog.Preview}</p>
      </div>
    </div>
    </Link>
    </span>
  );
}

export default Blog;