import { useEffect, useState } from "react"

function UserHistory() {
    const [history,setHistory]=useState();
    const [userId,setUserId]=useState(null)

    useEffect(()=>{
      try {
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
          fetch('http://localhost:8000/history'+userId,{
            credentials:'include',
            method:'GET'
          }).then(res=>{
            res.json().then(info=>{
              setHistory(info.History)
            })
          },[])
        } catch (error) {
          console.log(error)
        }
        },[])

        console.log(history)

    return ( 
        <div>
            <p>{history}</p>
        </div>
     );
}

export default UserHistory;