import logo from './logo.svg';
import { useEffect, useState } from 'react'
import './App.css';

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function api() {
      await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json().then(data => setList(data))).catch(err => err)
    }
    api();
  }, [])
  return (
    <div className="App">
      {list.map(data => <p key={data.id}>{data.name}</p>)}
    </div>
  );
}

export default App;
