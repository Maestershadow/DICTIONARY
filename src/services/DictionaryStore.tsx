import axios, { AxiosError } from "axios";
import { createContext, useCallback, useReducer } from "react";

// Define the interfaces representing the dictionary query response
interface Phonetic {
  text: string;
  audio: string;
}

interface Definition {
  partOfSpeech: string;
  definitions: Array<{
    definition: string;
    example: string;
    synonyms: string[];
    antonyms: string[];
  }>;
}

interface DictionaryQueryInterface {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  origin: string;
  meanings: Definition[];
}

// Define the actions and state for the reducer
type WordState = {
  search: string;
  searchData: DictionaryQueryInterface ;
  loading: boolean;
  error: string;
};

type WordAction =
  | { type: "setSearch"; payload: string }
  | { type: "searchWord"; payload: DictionaryQueryInterface }
  | { type: "setLoading"; payload: boolean }
  | { type: "setError"; payload: string };

// Define the reducer function
const reducer = (state: WordState, action: WordAction): WordState => {
  switch (action.type) {
    case "setSearch":
      return { ...state, search: action.payload };
    case "searchWord":
      return { ...state, searchData: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setError":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

function useDictionarySource() {
  const [{ search, searchData, loading, error }, dispatch] = useReducer(reducer, {
    search: "",
    searchData:{
      "word": "",
      "phonetic": "",
      "phonetics": [
        {
          "text": "",
          "audio": ""
        },
      ],
      "origin": "",
      "meanings": [
        {
          "partOfSpeech": "",
          "definitions": [
            {
              "definition": "",
              "example": "",
              "synonyms": [],
              "antonyms": []
            }
          ]
        },
        {
          "partOfSpeech": "",
          "definitions": [
            {
              "definition": "",
              "example": "",
              "synonyms": [],
              "antonyms": []
            }
          ]
        }
      ]
    } as DictionaryQueryInterface,
    loading: false,
    error: "",
  });

  const setSearch = useCallback((search: string) => {
    dispatch({
      type: "setSearch",
      payload: search,
    });
  }, []);

  const wordCallback = useCallback(async (search: string) => {
    dispatch({ type: "setLoading", payload: true });
    dispatch({ type: "setError", payload: "" });

    try {
      const { data } = await axios.get<DictionaryQueryInterface[]>(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
      );

      const payloadData = data[0];

      dispatch({
        type: "searchWord",
        payload: payloadData,
      });
    } catch (error) {
      const err = error as AxiosError;

      dispatch({
        type: "setError",
        payload: err.response?.status === 400
          ? "No Definitions Found"
          : err.message || "An error occurred",
      });
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  }, []);

  return {
    errorType: error,
    isLoading: loading,
    search,
    setSearch,
    searchData,
    wordCallback,
  };
}

export const DictionaryContext = createContext<ReturnType<typeof useDictionarySource>>(
    {} as unknown as ReturnType<typeof useDictionarySource>
);


export function DictionaryProvider({ children }: { children: React.ReactNode }) {
  return (
    <DictionaryContext.Provider value={useDictionarySource()}>
      {children}
    </DictionaryContext.Provider>
  );
}
