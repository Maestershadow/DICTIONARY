import './SearchBar.css'
import { useDictionary } from '../../../services/useDictionary';


export default function SearchBar() {



    const { search, setSearch, wordCallback } = useDictionary();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if(search.length > 0)
                wordCallback(search)
        }
      };

    return <div className='searchbar-container'>
        <input onKeyDown={handleKeyDown}   type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={() => search.length > 0 ? wordCallback(search) : {}}>
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path fill="none" stroke="var(--clr-primary-100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"/></svg>
        </button>
    </div>
}