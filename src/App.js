import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css';

let timer = null;
function App() {
  const [name, setName] = useState('')
  const [inpName, setInpName] = useState('')
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('')
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  let filteredUser = useMemo(() => {
    return list.filter(data => {
      if (name === '' && email === '' && username === '' && phone === '') {
        return data
      }
      else if (data.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()) &&
        data.email.toLocaleLowerCase().includes(email.toLocaleLowerCase())
        && data.username.toLocaleLowerCase().includes(username.toLocaleLowerCase())
        && data.phone.toLocaleLowerCase().includes(phone.toLocaleLowerCase())) {
        return data;
      }
    })
  }, [name, username, phone, email, list])

  useEffect(() => {
    async function api() {
      await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json().then(data => setList(data))).catch(err => err)
    }
    api();

    setLoading(false)
  }, [])

  const debouncedChangeHandler = (e) => {
    setInpName(e.target.value);
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => setName(inpName), 500)
  }


  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Name:
              <input placeholder='search...' type='text' value={inpName} onChange={debouncedChangeHandler} />
            </th>
            <th>Username:
              <input placeholder='search...' type='text' onChange={(e) => setUsername(e.target.value)} />
            </th>
            <th>Email:
              <input placeholder='search...' type='text' onChange={(e) => setEmail(e.target.value)} />
            </th>
            <th>Phone:
              <input placeholder='search...' type='text' onChange={(e) => setPhone(e.target.value)} />
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? <tr><td>Loading..............</td></tr>
            :
            filteredUser.map(user => {
              return (<tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>)
            })}
        </tbody>

      </table>
    </div>
  );
}

export default App;
