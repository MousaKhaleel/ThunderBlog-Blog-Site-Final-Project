import './mainStyle.css';
import './blogStyle.css'

function Blog(blog) {
  return (
    <a href='/blogcontent'>
    <div className="blogPreviewContainer">
      <img src="https://picsum.photos/200" />
      <div>
        <h2>{blog.Title}</h2>
        <p>Click to read more</p>
      </div>
    </div>
    </a>
  );
}

export default Blog;