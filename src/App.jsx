import React, { useEffect, useState } from 'react'

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

  const getPoliticians = async () => {
    const response = await fetch('http://localhost:3333/politicians');
    const data = await response.json();
    setPoliticians(data);
  };

  useEffect(() => {
    getPoliticians();
  }, []);

  return (
    <div className='container'>
      <h1>Politicians</h1>
      <ul className='list'>
        {politicians.map((p) => {
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
