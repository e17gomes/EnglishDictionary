'use client'
import axios from "axios"
import { useState, ChangeEvent, useEffect  } from "react"
import { ApiResponse } from "./Types"

export const Input = ()=>{ 
    const baseURL = `https://api.dictionaryapi.dev/api/v2/entries/en/`
    const [info, setInfo] = useState<ApiResponse|null>()
    const [error, setError] = useState<string|null>(null)
    const [word, setWord] = useState('')
    

    const handleSearchClick = async ()=>{
        try{
            const response = await axios.get(baseURL+word)
            response.data && response.data.length>0?(setInfo(response.data), setError(null)) : (setInfo([]),setError ("No definitions found for the word.") )
        }
        catch (error) {
            console.error('Error fetching word information:', error);
            setInfo([]);
            setError("Error fetching word information. Please try again later.");
        }
    }

    useEffect(()=>{
        handleSearchClick
    },[word])

    const handleSearchWord = (e:ChangeEvent<HTMLInputElement>) => { setWord(e.target.value) }


    return(
    <>


    
    <div className='text-center text-7xl min-h-32 p-5 font-extrabold ' > {word == '' &&(<p className="text-fuchsia-900 text-2xl font-bold dark:text-fuchsia-600">
        Write a word below <br />
        !
    </p>)} {word}</div>

    <div className="relative w-96 flex m-auto items-center">
    <input className="w-full p-2 rounded shadow-md dark:shadow-purple-600 dark:bg-transparent" onChange={handleSearchWord} type="text" placeholder="Write anything here" />
    <button onClick={handleSearchClick} className="absolute right-0 px-4 py-2  text-slate-400 rounded-r shadow-md">Search</button>
    </div>

   
    <div className="text-center p-5">
    {error && <p>Error: {error}</p>}

    {info && (
            <>
              
                
                {info[0]?.meanings.slice(0,1).map((meaning, index) => (
                    <div key={index}>
                        <h4>Part of Speech: {meaning.partOfSpeech}</h4>
                        <ul>
                            {meaning.definitions.map((definition, index) => (
                                <li key={index}>
                                   <span>{definition.definition}</span>
                                    {definition.example && <p><strong>Example:</strong> {definition.example}</p>}
                                    {definition.synonyms.length > 0 && <p><strong>Synonyms:</strong> {definition.synonyms.join(', ')}</p>}
                                    {definition.antonyms.length > 0 && <p><strong>Antonyms:</strong> {definition.antonyms.join(', ')}</p>}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </>
        )}
    </div>     

    
    

    
    </>
    
      
    
    )
}