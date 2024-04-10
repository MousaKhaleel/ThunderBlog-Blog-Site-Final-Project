import { useContext, useEffect, useState } from "react"
import BlogList from "./BlogList";
import { UserContext } from "./UserContext";

function UserHistory() {
    const [history,setHistory]=useState([]);
    const[historyBlogs,setHistoryBlogs]=useState([]);
    const [loading,setLoading]=useState(false)

    const {userId}=useContext(UserContext);

      useEffect(() => {
        if (userId) {
          fetch('http://localhost:8000/history/' + userId, {
            credentials: 'include'
          })
            .then(res => {
              res.json().then(hist => {
                setHistory(hist);
              });
            });
        }
        }, [userId]);

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
        </div>
     );
}

export default UserHistory;