import React, { createContext, useState, useEffect } from 'react';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userName,setUserName]=useState(null)
const [userEmail, setUserEmail]=useState('');
const [userPassword, setUserPassword]=useState('');

useEffect(()=>{
    try {
    //   setLoading(true)
      fetch('http://localhost:8000/profile',{
        credentials:'include',
        method:'GET'
      }).then(res=>{
        res.json().then(info=>{
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
      <UserContext.Provider value={{ userName, setUserName, userEmail, setUserEmail, userPassword, setUserPassword}}>
        {children}
      </UserContext.Provider>
    );
  };