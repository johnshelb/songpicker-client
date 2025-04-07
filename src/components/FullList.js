import React, { useEffect } from 'react';

export default function FullList({allSongs, setAllSongs, display, setDisplay, numSongs, setNumSongs, instrument, changeInstrument}){
    useEffect(()=>{
    fetch(`http://localhost:5000/record?owner=${localStorage.getItem('songpicker')}`)
      .then(response=>{
        if(!response.ok){
          window.alert(`An error occurred: ${response.statusText}`)
          return []
          }         
          return response.json()
      })
        .then(result => {
          setAllSongs(result);
        })
          .catch(error => console.error("Fetch error:", error));
    },[numSongs])

  async function deleteSong(i){
    await fetch(`http://localhost:5000/${instrumentSongs[i]._id}`,{
    method:"DELETE"
  })
    setNumSongs(prev=>prev - 1) 
    setDisplay(true)
  }
  
  const instrumentSongs = allSongs.filter(song=>song.instrument === instrument)

  
  instrumentSongs.sort((a,b)=>{
    return a.name.trim().toLowerCase() < b.name.trim().toLowerCase() ? -1 :a.name.trim().toLowerCase()>b.name.trim().toLowerCase()? 1 : 0;
  })
  const nl = instrumentSongs.map((n,i)=><li key ={i}>{`${n.name} : ${n.count}`}
    <button className = 'delete' onClick = {()=>deleteSong(i)}>Delete</button></li>)
  
  return(
    <>
      <div id = 'listDiv' style= {{marginTop:'2em'}} >
      <button id="changePage" onClick={()=>changeInstrument()}>Go to {instrument==="guitar"?"harp":"guitar"} page</button> 
        {display?<button id = 'listToggle' onClick =  {()=>{setDisplay(false)} }>Hide List</button>:<button id = 'listToggle' onClick={ ()=>{setDisplay(true)} }>See them all</button>}
        <br/>
        {display && <ul id="fullList">{nl}</ul>}
      </div>
    </>
  )
}
