import { useEffect, useState } from "react"

function UserHistory() {
    const [history,setHistory]=useState();
    const [userId,setUserId]=useState(null)
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
      try {
        setLoading(true)
        fetch('http://localhost:8000/profile',{
          credentials:'include',
          method:'GET'
        }).then(res=>{
          res.json().then(info=>{
            setUserId(info.id)
          })
        },[])
      } catch (error) {
        console.log(error)
      }
      })

    useEffect(()=>{
        try {
          fetch('http://localhost:8000/history'+userId)
          .then(res=>{
            res.json().then(info=>{
              setHistory(info)
            })
            setLoading(false)
          },[])
        } catch (error) {
          console.log(error)
        }
        },[userId])//userId

        console.log(history)

    return ( 
        <div>
        {loading && <h2>Loading...</h2>}
            <p>{history}</p>
        </div>
     );
}

export default UserHistory;