import React, { useEffect, useMemo, useState } from 'react'

function PoliticianCard({ name, image, position, biography }) {
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
}

function App() {

  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState('');

  const getPoliticians = async () => {
    const response = await fetch('http://localhost:3333/politicians');
    const data = await response.json();
    setPoliticians(data);
  };

  const searchResults = useMemo(() => {
    return politicians.filter((p) => p.name.toLowerCase().includes(search) || p.biography.toLowerCase().includes(search));
  }, [search, politicians])

  useEffect(() => {
    getPoliticians();
  }, []);

  return (
    <div className='container'>
      <div className='listHeader'>
        <h1>Politicians</h1>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type='text'
          placeholder='Search...'
        />
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
