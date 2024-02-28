function WriteBlog() {
    return ( 
        <div>
            <form>
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
    <label htmlFor="exampleFormControlTextarea1">Content</label>
    <textarea
      className="form-control"
      id="exampleFormControlTextarea1"
      rows={3}
      defaultValue={""}
    />
  </div>
</form>
        </div>
     );
}

export default WriteBlog;