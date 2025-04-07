import React, {useState, useEffect} from 'react';
import CurrentSong from './components/CurrentSong';
import AddSong from './components/AddSong';
import FullList from './components/FullList';

export default function App(){  
  const [display, setDisplay] = useState(false)
  const [numSongs, setNumSongs] = useState(0)
  const [allSongs,setAllSongs] = useState([])
  const [instrument, setInstrument] = useState('guitar')
  const [username, setUsername] = useState(localStorage.getItem('songpicker') || '');
  const [newUser, setNewUser] = useState('')
  const [loggedIn, setLoggedIn] = useState(username !== '');

  useEffect(() => {
    document.body.className = instrument;
  }, [instrument]);

  function changeInstrument(){
    setInstrument(prev=>prev === 'guitar' ? 'harp' : 'guitar')
    setDisplay(false)
  }
  function logIn(e){
    e.preventDefault();
    console.log('logging in')
    fetch(`https://songpicker-server.onrender.com/record/logIn?username=${username}`)
    .then(response => {
      if (response.ok) {
        // response.json()
        // .then(data=>alert(data.message))
        localStorage.setItem('songpicker', username);
        setLoggedIn(true);
      } else {
         response.json()
        .then(data=>alert(data.message))
        alert('Log in failed: username does not exist');
      }
    }
  )}  

  async function signUp(e){
    e.preventDefault();
    await fetch(`https://songpicker-server.onrender.com/record/signUp`,
    {
        method:'POST',
        body: JSON.stringify({username: newUser}),
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    .then(response => {
      if (response.ok) {
        response.json()
        .then(data=>alert(data.message))
        localStorage.setItem('songpicker', newUser);
        setLoggedIn(true);
      } else {
        alert('Sign up failed: username already exists');
      }
    }
  )}

  function handleUserChange(e){
    setUsername(e.target.value)
  }
  function handleNewUserChange(e){
    setNewUser(e.target.value)
  }

  return(
   loggedIn ? (<>
      <CurrentSong allSongs = {allSongs} instrument={instrument} />
      <AddSong setDisplay={setDisplay} setAllSongs = {setAllSongs} setNumSongs = {setNumSongs} instrument = {instrument}/>
      <button id ="logout" onClick = {()=>{localStorage.removeItem('songpicker'); setLoggedIn(false)}}>Log Out</button>
      <FullList allSongs = {allSongs} setAllSongs = {setAllSongs} display = {display} setDisplay={setDisplay} numSongs = {numSongs} setNumSongs = {setNumSongs} instrument={instrument} changeInstrument={changeInstrument}/>
    </>):
  
    (<>
      <h1>Please log in or sign up to access the song picker.</h1>
      <form onSubmit={logIn}>     
        <input onChange = {handleUserChange} value = {username} type="text" placeholder="Username" />
        <button >Log In</button>
      </form>
      <p>Don't have an account? Sign up here!</p>
      <form onSubmit={signUp}>
        <input onChange={handleNewUserChange} value = {newUser} type="text" placeholder="Username" />
        <button >Sign Up</button>
      </form>
    </>)
    
  )
}
