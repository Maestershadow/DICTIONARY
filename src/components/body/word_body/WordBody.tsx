import { useDictionary } from '../../../services/useDictionary'
import './WordBody.css'

export default function WordBody() {
    const { searchData } = useDictionary();
    return (<>
        {  searchData?.meanings.filter((value)=>value.partOfSpeech === "noun" || value.partOfSpeech === "verb").map((meaning) =>
                <div key={meaning.partOfSpeech} className='wordbody-container'>
                    <div>
                        <h2>{meaning.partOfSpeech}</h2>
                        <div className='horizontal-line'></div>
                    </div>
                    <div>
                        <h3>Meaning</h3>
                        <ul>
                            {meaning.definitions.map((definition) => 
                            <li>
                                <p>{definition.definition}</p>
                                <p className='example'>{definition.example}</p>
                            </li>)}
                        </ul>
                    </div>
                    <p>Synonyms {meaning.definitions.map((definition) => <> {definition.synonyms.map((synonym) => <span>{synonym} </span>)}</>)}</p>
                </div>
            )
        }
    </>)
}