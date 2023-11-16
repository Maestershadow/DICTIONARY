import { useDictionary } from "../../../services/useDictionary";
import SearchBar from "../searchbar/SearchBar";
import WordBody from "../word_body/WordBody";
import WordHeading from "../word_heading/WordHeading";
import LoadingSpinner from "./LoadingSpinner";


export default function MainBody() {
    const { isLoading,errorType } = useDictionary();

    return (
        <main className="container">
            <SearchBar />
            { errorType.length > 0 ? 
            <div className="error-container">
                <img src="error.svg" alt="" />
                <h3>OH NO ...</h3>
                <p>We encountered an unexpected problem.</p>
                <p>{`(${errorType})`}</p>
            </div>
            
            : (isLoading ? <div className="spinner-div"><LoadingSpinner /> </div>   : <div>
                <WordHeading />
                <WordBody />
            </div>)}
        </main>
    )
}