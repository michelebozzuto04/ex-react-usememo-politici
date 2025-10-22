import React, { useEffect, useMemo, useState } from 'react'

const PoliticianCard = React.memo(({ name, image, position, biography }) => {
  console.log(`${name} card rendered`)
  return (
    <div className='cardContainer'>
      <img src={image} />

      <div className='infoContainer'>
        <h3>{name}</h3>
        <p>{position}</p>
        <p>{biography}</p>
      </div>
    </div>
  )
});

function App() {

  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');

  const getPoliticians = async () => {
    const response = await fetch('http://localhost:3333/politicians');
    const data = await response.json();
    setPoliticians(data);
  };

  const positions = useMemo(() => {
    const uniquePositions = [];
    politicians.forEach(p => {
      if (!uniquePositions.includes(p.position)) {
        uniquePositions.push(p.position);
      }
    });
    return uniquePositions;
  }, [politicians]);

  console.log(positions)

  const searchResults = useMemo(() => {
    const filteredByPosition = politicians.filter((p) => p.position.toLowerCase().includes(selectedPosition))
    return filteredByPosition.filter((p) =>
      p.name.toLowerCase().includes(search) ||
      p.biography.toLowerCase().includes(search)
    );
  }, [search, politicians, selectedPosition]);

  useEffect(() => {
    getPoliticians();
  }, []);

  console.log(selectedPosition)

  return (
    <div className='container'>
      <div className='listHeader'>
        <h1>Politicians</h1>

        <div className='searchContainer'>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type='text'
            placeholder='Search...'
          />
          <select
            onChange={(e) => setSelectedPosition(e.target.value)}
            value={selectedPosition}
          >
            <option value="">--Select a position--</option>
            {positions.map((position, i) => {
              return (
                <option key={i} value={position.toLowerCase()}>{position}</option>
              )
            })}
          </select>
        </div>
      </div>
      <ul className='list'>
        {searchResults.map((p) => {
          return (
            <PoliticianCard
              key={p.id}
              name={p.name}
              image={p.image}
              position={p.position}
              biography={p.biography}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default App
