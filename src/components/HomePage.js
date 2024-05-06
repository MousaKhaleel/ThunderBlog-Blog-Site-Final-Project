import { useState, useEffect, useContext } from "react";
import Blog from "./Blog";
import BlogList from "./BlogList";
import HeroSection from "./HeroSection";
import Blogger from '../assets/pexels-andrea-piacquadio-3760378.jpg'
import Blogger2 from '../assets/pexels-canvastudio-3194523.jpg'
import './mainStyle.css'
import { MdOutlineSecurity } from "react-icons/md";
import { SiFlyway } from "react-icons/si";
import { GiStrong } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { UserContext } from "./UserContext";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

function HomePage() {
  const[blogs,setBlogs]=useState('');
  const[allBlogs,setAllBlogs]=useState('');
  const[loading,setLoading]=useState(false);
  const[allLoading,setAllLoading]=useState(false);

  const {userName, userId}=useContext(UserContext);

useEffect(() => {
if (userId) {
  setLoading(true);
  fetch('http://localhost:8000/userblogs/' + userId, {
    credentials: 'include'
  })
    .then(res => {
      res.json().then(blo => {
        setLoading(false);
        setBlogs(blo);
      });
    });
}
}, [userId]);

const [page, setPage] = useState(1);
const [hasNextPage, setHasNextPage] = useState(true);


useEffect(() => {
    fetch(`http://localhost:8000/allblogs?page=${page}&limit=5`)
      .then((res) => res.json())
      .then((data) => {setAllBlogs(data); setAllLoading(false); setHasNextPage(data.length === 5);})
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
      <div>
            <HeroSection />
            {!userName && <>
              <div className="allBlogsContainer">
      <main>
      {allBlogs && <h1>All Blogs, <Link to="/login">LogIn</Link> to see yours here!</h1>}
       {allLoading && <h2 className="hl">Loading...</h2>}
       {blogs && <hr/>}
      {allBlogs && <BlogList blogs={allBlogs}/>}
      <div className="pagination">
          {page === 1? <button onClick={handlePreviousPage} style={{ background: 'rgba(0, 167, 204, 0.684)' }} disabled><GrFormPrevious /></button> : <button onClick={handlePreviousPage}><GrFormPrevious /></button>}
          {hasNextPage? <button onClick={handleNextPage}><MdNavigateNext /></button> : <button onClick={handleNextPage} style={{ background: 'rgba(0, 167, 204, 0.684)' }} disabled><MdNavigateNext /></button>}
        </div>
      </main>
      </div>
            </> }
      <main>{userName && <>
      {loading && <h2 className="hl">Loading...</h2>}
      {blogs && <h1>Your Blogs, <Link  to="/profiledetails" style={{color:'rgb(0, 166, 204)'}}>{userName}</Link>.</h1>}
      {blogs && <hr/>}
      {blogs.length>0 || !loading && <h3 style={{minHeight:'10vh'}}>Looks like you don't have any blogs, start writing some!</h3>}
      {blogs && <BlogList blogs={blogs} />}
      </>}
      <br/>
        <div class="separator">What to share your experience?</div>
        <br/>
      <div className="flexedContainer">
      <div className="imageContainer">
        <img src={Blogger} alt="Blogger" width={'300px'}/></div>
        <div className="textContainer">
        <h4>We all have interesting things in our lives, so why don't we share them?</h4>
        <p>Do you want to share interesting things but are concerned about your privacy? Fear not; here we provide our bloggers with the ability to share anonymously.</p>
      </div>
      </div>
      <br/>
      <div className="flexedContainer">
        <div className="textContainer" style={{border:'none',borderRight:"1px solid gray"}}>
        <h4>Looking to get the attention of businesses looking for talente?</h4>
        <p>By Writing blogs you can build a personal brand and promote your services and skills online. Show your passion, skills, and knowledge here.</p>
      </div>
      <div className="imageContainer" style={{marginLeft: "6%"}}>
        <img src={Blogger2} alt="Blogger" width={'300px'}/></div>
      </div>
      <br/>
        <div class="separator">Why choose us?</div>
        <br/>
        <div className="whyUs">
        <div><h5 style={{textAlign:'center'}}>We provide you with:</h5> <br/></div>
        <div className="features">
          <p><SiFlyway /> Freedom</p>
          <p><MdOutlineSecurity /> Security</p>
          <p><GiStrong /> Reliability</p>
          </div>
        </div>
      </main>
      </div>
     );
}

export default HomePage;