import { useState, useEffect} from "react";
import axios from "axios";
function FetchCharacters() {
    const [characters, setCharacters] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        const fetchMultiple = async () => {
            try {
                const [charactersRes, episodesRes, locationsRes] = await Promise.all([
                    axios.get("https://rickandmortyapi.com/api/character"),
                    axios.get("https://rickandmortyapi.com/api/episode"),
                    axios.get("https://rickandmortyapi.com/api/location")
                ]);
                setCharacters(charactersRes.data.results);
                setEpisodes(episodesRes.data.results);
                setLocations(locationsRes.data.results);
            } catch (error) {
                if (error.response) {
                    console.error("Server responded with error", error.response.status)
                } else if (error.request) {
                    console.error("No response received.", error.request)
                } else {
                    console.error("Data not found", error.message)
                }
            }
        }
            fetchMultiple();
        },[]);
        return (
            <div>
               <h2>Fetched Characters</h2>
            {//loading ? (
                   //<p>Loading Data...</p>
   //
           // ) :
            (
                   <div>
                       {characters.map((char) => (
                           <div key={char.id}>
                            <img src={char.image} alt={char.name}/>
                               <h3>Name:{char.name}</h3>
                            <p>Gender: {char.gender}</p>
                            <p>Species: {char.species}</p>
                        </div>
                    ))}
                </div>
            )}
            <h2>Fetched Episodes</h2>
            <ul>
                   {episodes.map((epi) => (
                       <li key={epi.id}>
                           <span>{epi.name}</span> <br />{epi.episode}
                       </li>
                   ))}
                   </ul>
            <h2>Fetched Locations</h2>
            <ul>
                   {locations.map((loca) => (
                       <li key={loca.id}>
                           <span>{loca.name}</span><br /> {loca.dimension}
                       </li>
                   ))}
            </ul>
            </div>
            );
   };
export default FetchCharacters;