import React, { createContext, useState, useEffect } from 'react';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
const [userId,setUserId]=useState(null)
const [userName,setUserName]=useState(null)
const [userEmail, setUserEmail]=useState('');
const [userPassword, setUserPassword]=useState('');

useEffect(()=>{
    try {
    //   setLoading(true)
      fetch(process.env.REACT_APP_API_URL+'/profile',{
        credentials:'include',
        method:'GET'
      }).then(res=>{
        res.json().then(info=>{
          setUserId(info.id)
          setUserName(info.name)
          setUserEmail(info.email)
          setUserPassword(info.password)
        })
      },[])
    //   setLoading(false)
    } catch (error) {
      console.log(error)
    }
    })

    // const [user, setUser] = useState(storedUser);
  
    // const [userEmail, setUserEmail] = useState(storedUserEmail);
  
    // const [userPassword, setUserPassword] = useState(storedUserPassword);
  
    useEffect(() => {
    //   localStorage.setItem('user', JSON.stringify(user));
    //   localStorage.setItem('userEmail', JSON.stringify(userEmail));
    //   localStorage.setItem('userPassword', JSON.stringify(userPassword));
    }, [userName]);
  
    return (
      <UserContext.Provider value={{userId, setUserId, userName, setUserName, userEmail, setUserEmail, userPassword, setUserPassword}}>
        {children}
      </UserContext.Provider>
    );
  };