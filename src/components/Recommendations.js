import { useContext, useEffect, useState } from "react";
import BlogList from "./BlogList";
import { UserContext } from "./UserContext";
import './mainStyle.css';

function Recommendations() {
  const [history, setHistory] = useState([]);
  const [historyBlogs, setHistoryBlogs] = useState([]);
  const [topTags, setTopTags] = useState([]);
  const [recommendedBlogs, setRecommendedBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { userId } = useContext(UserContext);

  useEffect(() => {
    if (userId) {
      fetch('http://localhost:8000/history/' + userId, {
        credentials: 'include'
      })
      .then(res => res.json())
      .then(hist => {
        setHistory(hist || []);
      })
      .catch(error => console.error('Error fetching history:', error));
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
      setLoading(false);
    };

    if (history.length > 0) {
      setLoading(true);
      fetchHistoryBlogs();
    }
  }, [history]);

useEffect(() => {
  if (historyBlogs.length > 0) {
    const allTags = historyBlogs.reduce((tags, blog) => {
      return [...tags, ...blog.Tags || []];
    }, []);

    const tagCounts = {};
    allTags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });

    const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);

    const topTwoTags = sortedTags.slice(0, 2);

    setTopTags(topTwoTags);
  }
}, [historyBlogs]);

console.log(topTags)

  console.log(topTags)

  useEffect(() => {
    const fetchRecommendedBlogs = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/recommendedblogs/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ topTags }),
          }
        );
        const fetchedBlogs = await res.json();
        setRecommendedBlogs(fetchedBlogs.reverse());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (topTags.length > 0) {
      setLoading(true);
      fetchRecommendedBlogs();
    }
  }, [topTags]);
  

  return (
    <div>
      <main>
        {!loading && <h1>Recommended Blogs based on your history</h1>}
        {!loading && <hr/>}
        {topTags.length>0 || !loading && <h3 style={{minHeight:'30vh'}}>View some Blogs to get Recommendations</h3>}
        {recommendedBlogs && <BlogList blogs={recommendedBlogs} />}
        {loading && <h2 className="hl">Loading...</h2>}
      </main>
    </div>
  );
}

export default Recommendations;
