import './mainStyle.css';
import './blogStyle.css'
import { Link } from 'react-router-dom';

function Blog(blog) {
  const id=blog.id
  return (<span className='link'>
    <Link to={`/blogcontent/${id}`}>
    <div className="blogPreviewContainer">
      <div>
        <h2>{blog.Title}</h2>
        <p>{blog.Preview}</p>
      </div>
    </div>
    </Link>
    </span>
  );
}

export default Blog;