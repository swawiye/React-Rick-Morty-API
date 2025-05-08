import { useState, useEffect } from "react";
import axios from "axios";

function Locations() {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(`https://rickandmortyapi.com/api/location?page=${page}`);
        setLocations(res.data.results);
        setPageInfo(res.data.info);
      } catch (error) {
        console.error("Error fetching locations:", error.message);
      }
    };
    fetchLocations();
  }, [page]);

  return (
    <div>
      <h2 className="font-bold text-2xl text-center">Locations</h2>
      <h5 className="font-bold text-center">Page {page}</h5>
      <div className="location-card-container">
        {locations.map((loca) => (
          <div key={loca.id} className="locationCard">
            <div className="locationCard-info">
              <h3>{loca.name}</h3>
              <p>{loca.dimension}</p>
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

export default Locations;
