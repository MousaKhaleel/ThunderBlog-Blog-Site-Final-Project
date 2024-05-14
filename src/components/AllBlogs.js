import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import './mainStyle.css'
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

function AllBlogs() {
  const[blogs,setBlogs]=useState(null);
  const[loading,setLoading]=useState(true);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  

  useEffect(() => {
      fetch(`http://localhost:8000/allblogs?page=${page}&limit=5`)
        .then((res) => res.json())
        .then((data) => {setBlogs(data); setLoading(false); setHasNextPage(data.length === 5);})
        .catch((error) => console.error(error));
    }, [page]);

    const handleNextPage = () => {
      if (hasNextPage) {
        setPage(page + 1);
      }
    };

    const handlePreviousPage = () => {
      if (page > 1) {
        setPage(page - 1);
      }
    };

    return ( 
      <div className="allBlogsContainer">
      <main>
      {loading && <h2 style={{textAlign:'center',height:'60vh'}}>Loading...</h2>}
      {blogs && <h1>All Blogs</h1>}
      {blogs && <hr/>}
      {blogs && <BlogList blogs={blogs}/>}
      <div className="pagination">
          {page === 1? <button onClick={handlePreviousPage} style={{ background: 'rgba(0, 167, 204, 0.684)' }} disabled><GrFormPrevious /></button> : <button onClick={handlePreviousPage}><GrFormPrevious /></button>}
          {hasNextPage? <button onClick={handleNextPage}><MdNavigateNext /></button> : <button onClick={handleNextPage} style={{ background: 'rgba(0, 167, 204, 0.684)' }} disabled><GrFormPrevious /></button>}
        </div>
      </main>
      </div>
     );
}

export default AllBlogs;