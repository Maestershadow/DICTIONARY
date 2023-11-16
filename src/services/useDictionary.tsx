import { useContext } from "react";
import { DictionaryContext } from "./DictionaryStore";



export function useDictionary() {
    return useContext(DictionaryContext);
}
