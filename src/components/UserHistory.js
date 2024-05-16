import { useContext, useEffect, useState } from "react"
import BlogList from "./BlogList";
import { UserContext } from "./UserContext";
import './mainStyle.css'

function UserHistory() {
    const [history,setHistory]=useState([]);
    const[historyBlogs,setHistoryBlogs]=useState([]);
    const [loading,setLoading]=useState(false)
    const[loadingDelete,setLoadingDelete]=useState(false);


    const {userId}=useContext(UserContext);

      useEffect(() => {
        if (userId) {
          fetch(process.env.REACT_APP_API_URL+'/history/' + userId, {
            credentials: 'include'
          })
            .then(res => {
              res.json().then(hist => {
                setHistory(hist || []);
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
                    process.env.REACT_APP_API_URL+"/historyblogs/" + history[i],
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

          async function HandleDeleteHistory(){
            setLoadingDelete(true)
            const res= await fetch(process.env.REACT_APP_API_URL+'/deleteHistory/'+ userId,{
              method:'DELETE',
              headers:{'Content-Type':'application/json'}
          })
          if(res.ok){
            setLoadingDelete(false)
            window.location.reload();
          }
        }

    return ( 
        <div>
        <main>
          {loading && <h2 className="hl">Loading...</h2>}
          <div style={{display:"flex",alignItems:"center", justifyContent:"space-between"}}>
          {!loading && <h1>History</h1>}
          {!loading && !loadingDelete && <button type="submit" className="btn" onClick={HandleDeleteHistory} style={{ background: 'rgb(0, 166, 204)', color:'white' }} >Delete History</button>}
          {!loading && loadingDelete && <button type="submit" className="btn" onClick={HandleDeleteHistory} style={{ background: 'rgb(0, 166, 204)', color:'white' }} disabled>Loading...</button>}
          </div>
          {!loading && <hr/>}
          {!loading && <BlogList blogs={historyBlogs} />}
          {historyBlogs.length>0 || !loading && <h3 style={{minHeight:"20vh"}}>No history to show</h3>}
          </main>
        </div>
     );
}

export default UserHistory;