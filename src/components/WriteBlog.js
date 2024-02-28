import './mainStyle.css'

function WriteBlog() {
    return ( 
        <div className="writeContainer">
            <form>
            <h1>Write a blog</h1>
  <div className="form-group">
    <label htmlFor="exampleFormControlInput1">Title</label>
    <input
      type="email"
      className="form-control"
      id="exampleFormControlInput1"
      placeholder="Be creative"
    />
  </div>
  <div className="form-group">
  <br/>
    <label htmlFor="exampleFormControlTextarea1">Content</label>
    <textarea
      className="form-control"
      id="exampleFormControlTextarea1"
      rows={14}
      defaultValue={""}
    />
  </div>
  <br/>
        <button type="submit" className="btn w-100" style={{ background: 'rgb(255, 150, 0)', color:'white' }} >LogIn</button>
</form>
        </div>
     );
}

export default WriteBlog;