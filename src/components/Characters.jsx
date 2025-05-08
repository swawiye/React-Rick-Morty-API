import { useState, useEffect } from "react";
import axios from "axios";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await axios.get(`https://rickandmortyapi.com/api/character`, {
          params: {
            page,
            gender: gender || undefined,
            species: species || undefined,
          },
        });
        setCharacters(res.data.results);
        setPageInfo(res.data.info);
      } catch (error) {
        console.error("Error fetching characters:", error.message);
        setCharacters([]);
        setPageInfo({});
      }
    };
    fetchCharacters();
  }, [page, gender, species]);

  return (
    <div>
      <h2 className="font-bold text-2xl text-center">Characters</h2>

      {/* Filters */}
      <div className="flex justify-center gap-4 my-4">
        <select value={gender} onChange={(e) => { setPage(1); setGender(e.target.value); }}>
          <option value="">All Genders</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>

        <select value={species} onChange={(e) => { setPage(1); setSpecies(e.target.value); }}>
          <option value="">All Species</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="robot">Robot</option>
          <option value="animal">Animal</option>
          <option value="mythological creature">Mythological Creature</option>
          <option value="unknown">Unknown</option>
          {/* Add more species as needed */}
        </select>
      </div>

      <h5 className="font-bold text-center">Page {page}</h5>

      {/* Characters */}
      <div className="card-container">
        {characters.length > 0 ? (
          characters.map((char) => (
            <div key={char.id} className="card card-info">
              <img src={char.image} alt={char.name} />
              <h3>{char.name}</h3>
              <p>Gender: {char.gender}</p>
              <p>Species: {char.species}</p>
            </div>
          ))
        ) : (
          <p className="text-center">No characters found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={!pageInfo.prev} onClick={() => setPage((p) => p - 1)}>Previous</button>
        <button disabled={!pageInfo.next} onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}

export default Characters;
