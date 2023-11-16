
import { useMemo, useRef, useState } from 'react';
import { useDictionary } from '../../../services/useDictionary';
import './WordHeading.css'

export default function WordHeading() {
    const { searchData } = useDictionary();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
  
    const togglePlay = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    const audio = useMemo((
        ()=>searchData.phonetics.filter((value)=>'audio' in value )[0].audio
    ),[searchData.phonetics]);

    return (<div className="word-heading-container">
        <div>
            <h1>{searchData.word}</h1>
            <strong>{searchData.phonetic}</strong>
        </div>
       <audio ref={audioRef} src={`${audio}`}></audio>
    { (audio.length > 0 && 
    <button onClick={togglePlay}>
        <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="var(--clr-primary-100)" fillRule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/><path d="M29 27v21l21-10.5z"/></g></svg>
    </button>)} 
    </div>)
}