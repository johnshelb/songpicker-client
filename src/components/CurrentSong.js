import React, { useState, useEffect } from 'react';
export default function CurrentSong({allSongs, instrument, setDisplay}){
  const [title,newTitle] = useState('')
  
  useEffect(()=>{
    newTitle("What now...")
  }, [instrument])

  async function chooseSong(){
    const instrumentSongs = allSongs.filter(song=>song.instrument === instrument );
    const eligibleSongs = instrumentSongs.filter(song=>song.count < 4)
    if(instrumentSongs.length === 0){
      newTitle(`No songs in the database for ${instrument}`)
    }else if(eligibleSongs.length > 0){
      let index = Math.floor(Math.random() * eligibleSongs.length)
      let ti = eligibleSongs[index].name +" (" + (eligibleSongs[index].count + 1) +")"
      eligibleSongs[index].count+=1;
      fetch(`https://songpicker-server.onrender.com/record/update/${eligibleSongs[index]._id}`,{
        method:'POST',
        body:JSON.stringify(eligibleSongs[index]),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(newTitle(ti))
    }else{
      for(let song in instrumentSongs){
        instrumentSongs[song].count = 0
        await fetch(`https://songpicker-server.onrender.com/record/update/${instrumentSongs[song]._id}`,{
          method:'POST',
          body:JSON.stringify(instrumentSongs[song]),
          headers: {
            'Content-Type': 'application/json'
          },
        })
      }
      newTitle('resetting...')
      chooseSong()
    }
    setDisplay(false);
  }
  return(
    <>
      <div className = 'next'>
        <button id='getSong' onClick = { chooseSong }>What Song to Play Next?</button>
        <h1 id="title">
          {/* only include link if a song has been selected */}
          {title !== "What now..."?
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(title + " lyrics")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </a>
            :
            title
           } 
        </h1>
      </div>
    </>

  )
}
