<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useState } from "react"
import BlogList from "./BlogList";

function UserHistory() {
    const [history,setHistory]=useState([]);
    const[historyBlogs,setHistoryBlogs]=useState([]);
    const [id,setId]=useState(null)
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
      try {
        setLoading(true)
        fetch('http://localhost:8000/profile',{
          credentials:'include',
          method:'GET'
        }).then(res=>{
          res.json().then(info=>{
            setId(info.id)
          })
        },[])
      } catch (error) {
        console.log(error)
      }
      },[])

      useEffect(() => {
        if (id) {
          fetch('http://localhost:8000/history/' + id, {
            credentials: 'include'
          })
            .then(res => {
              res.json().then(hist => {
                setHistory(hist);
              });
            });
        }
        }, [id]);

        useEffect(() => {
            const fetchHistoryBlogs = async () => {
              const blogs = [];
              for (let i = 0; i < history.length; i++) {
                try {
                  const res = await fetch(
                    "http://localhost:8000/historyblogs/" + history[i],
                    { credentials: "include" }
                  );
                  const blog = await res.json();
                  blogs.push(blog);
                } catch (error) {
                  console.log(error);
                }
              }
              setHistoryBlogs(blogs.reverse());
              setLoading(false)
            };
        
            if (history.length > 0) {
              setLoading(true);
              fetchHistoryBlogs();
            }
          }, [history]);

    return ( 
        <div>
        <main>
          {loading && <h2 className="hl">Loading...</h2>}
          <h1>History</h1>
          <hr/>
          <BlogList blogs={historyBlogs} />
          </main>
=======
function UserHistory() {
    return ( 
        <div>
            <p>temp</p>
>>>>>>> parent of 596882f (Merge branch 'main' into Back-End-Blog-Site)
=======
function UserHistory() {
    return ( 
        <div>
            <p>temp</p>
>>>>>>> parent of 596882f (Merge branch 'main' into Back-End-Blog-Site)
        </div>
     );
}

export default UserHistory;