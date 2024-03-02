import './mainStyle.css';
import './blogStyle.css'

function Blog(blog) {
  const id=blog.id
  return (
    <a href={`/blogcontent/${id}`}>
    <div className="blogPreviewContainer">
      {/* <img src="https://picsum.photos/200" /> */}
      <div>
        <h2>{blog.Title}</h2>
        <p>Click to read the content.</p>
      </div>
    </div>
    </a>
  );
}

export default Blog;