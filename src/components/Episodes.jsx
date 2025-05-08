import { useState, useEffect } from "react";
import axios from "axios";

function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const res = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`);
        setEpisodes(res.data.results);
        setPageInfo(res.data.info);
      } catch (error) {
        console.error("Error fetching episodes:", error.message);
      }
    };
    fetchEpisodes();
  }, [page]);

  return (
    <div>
      <h2 className="font-bold text-2xl text-center">Episodes</h2>
      <h5 className="font-bold text-center">Page {page}</h5>
      <div className="episode-card-container">
        {episodes.map((epi) => (
          <div key={epi.id} className="episodeCard">
            <div className="episodeCard-info">
              <h3>{epi.name}</h3>
              <p>{epi.episode}</p>
            </div>
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

export default Episodes;
