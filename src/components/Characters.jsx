import { useState, useEffect } from "react";
import axios from "axios";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
        setCharacters(res.data.results);
        setPageInfo(res.data.info);
      } catch (error) {
        console.error("Error fetching characters:", error.message);
      }
    };
    fetchCharacters();
  }, [page]);

  return (
    <div>
      <h2 className="font-bold text-2xl text-center">Characters</h2>
      <h5 className="font-bold text-center">Page {page}</h5>
      <div className="card-container">
        {characters.map((char) => (
          <div key={char.id} className="card card-info">
            <img src={char.image} alt={char.name}/>
            <h3>{char.name}</h3>
            <p>Gender: {char.gender}</p>
            <p>Species: {char.species}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button disabled={!pageInfo.prev} onClick={() => setPage((p) => p - 1)}>Previous</button>
        <button disabled={!pageInfo.next} onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}

export default Characters;
