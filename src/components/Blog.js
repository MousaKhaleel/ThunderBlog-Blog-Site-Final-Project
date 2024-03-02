import './mainStyle.css';
import './blogStyle.css'

function Blog(blog) {
  const id=blog.id
  return (<span className='link'>
    <a href={`/blogcontent/${id}`}>
    <div className="blogPreviewContainer">
      {/* <img src="https://picsum.photos/200" /> */}
      <div>
        <h2>{blog.Title}</h2>
        <p>{blog.Preview}</p>
      </div>
    </div>
    </a>
    </span>
  );
}

export default Blog;