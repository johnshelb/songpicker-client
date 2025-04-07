import React, { useState } from 'react';

export default function AddSong({setNumSongs, setDisplay, instrument}){
  const [text,changeText] = useState("")

  function onChange(e){
    changeText(prev=>e.target.value)
  }
  async function onSubmit(e) {
    e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
    // const inputEl = document.getElementById('addedSong')
    const newSong = {
      name:text,
      instrument,
      count:0,
      owner: localStorage.getItem('songpicker')
    };
    await fetch(`https://songpicker-server.onrender.com/record/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSong),
    })
    .then(response=>response.json())
    .catch(error => {
      window.alert(error);
    });
    changeText("")
    document.getElementById('addedSong').focus()
    setNumSongs(prev=>prev+1)
    setDisplay(true)
  }

  return(
    <div className='addSong'>
      <form className = 'fullwidth' onSubmit = {onSubmit}>
        <input className = 'fullwidth' id='addedSong' type='text' value = {text} onChange = {onChange} placeholder ='Add a song here'/>
        <button className='addButton'>Submit</button>
      </form>
    </div>
  )
}
