import React from 'react';
import './index.scss';
import {Collection} from './Collection';

const cats = [
  { "name": "All" },
  { "name": "Sea" },
  { "name": "Mountains" },
  { "name": "Architecture" },
  { "name": "City" }
]

function App() {

const [categoryId, setCategoryId] = React.useState(0);
const [page, setPage] = React.useState(1);
const [isLoading, setIsLoading] = React.useState(true);
const [searchValue, setSearchValue] = React.useState('');
const [collections, setCollection] = React.useState([]);

React.useEffect(() => {
  setIsLoading(true);
  const category = categoryId ? `categoryId=${categoryId}` : '';
  fetch(`https://631a261c8e51a64d2bf73b8b.mockapi.io/NatureFoto?page=${page}&limit=3&${category}`)
  .then((res) => res.json())
  .then((json) => {
    setCollection(json);
  }).catch((err) => {
    console.warn(err);
    alert('Error data');
  }).finally(() => setIsLoading(false))
},[categoryId, page]);  
  return (
    <div className="App">
      <h1>My photo collection</h1>
      <div className="top">
        <ul className="tags">
         {cats.map((obj, index) => <li 
         onClick={() => setCategoryId(index)}
         className={categoryId === index ? 'active' : ''}
         key={obj.name}> {obj.name} </li>)}
        </ul>
        <input 
        value={searchValue} 
        onChange={e => setSearchValue(e.target.value)} 
        className="search-input" 
        placeholder="Search by name" />
      </div>
      <div className="content">
       {isLoading ? (<h2>Loading...</h2>) :
       (
        collections.filter((obj) => obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
        ).map((obj, index) => (
         <Collection
          key={index}
          name={obj.name}
          images={obj.photos}
        />
        ))
       )} 
               
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
        )) }
      </ul>
    </div>
  );
}

export default App;
