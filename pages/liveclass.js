import { Poster, useLivepeerProvider } from '@livepeer/react'
import { useCreateStream } from '@livepeer/react';
import { useState } from 'react';
import { Player } from '@livepeer/react';
import Link from 'next/link';


export default function LiveClass() {
  const provider = useLivepeerProvider();
  const [playbackId, setPlaybackId] = useState();

  var view = false;
  
  const watchLive = (id) =>{
    console.log(id)
    return id;
  }



  return (
    <>
    <div>
    
    
    <div className='text-center'>
        <p>Livepeer HAck- {provider.getConfig().name}</p>

   

     </div>
     
         <><input onChange={(e) => watchLive(e.target.value)}
                      className='p-2 mt-4 text-field' placeholder='Please Enter ID provided by Lecturer' />
                      <button onClick={() => watchLive} className='p-2 mx-3 btn btn-success '>
                          Watch Live Stream
                      </button>
                      {}
                      <Player
                          title='lecture'
                          playbackId='9e8e2rga4gwae96i'
                          showPipButton /></>
     
    </div>
   
      </>
    
      
  )
}
