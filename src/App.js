import './App.css';
import { useState } from 'react';
import Clock from './components/Clock';

function App() {

  const [clocks, setClocks] = useState([])
  const [name, setName] = useState('')
  const [offset, setOffset] = useState('')

  const onChangeNameHandler = (e) => {
    setName(e.target.value)
  }

  const onChangeOffsetHandler = (e) => {
    setOffset(e.target.value)
  }

  const onClickHandler = (e) => {
    e.preventDefault();
    setClocks(prev => [...prev, {id: clocks.length, name: name, offset: offset}])
    setName('')
    setOffset('')
  }

  const removeHandler = (id) => {
    setClocks(prev => prev.filter(filtered => filtered.id !== id))
  }  

  return (
    <div className="App">
      <form>
        <label htmlFor="name">
          Название
        </label>
        <input type="text" id="name" onChange={onChangeNameHandler} value={name}/>
        <label htmlFor="offset">
          Временная зона
        </label>
        <input type="number" id="offset" onChange={onChangeOffsetHandler} value={offset}/>
        <button type="submit" onClick={onClickHandler}>Добавить</button>
      </form>
      {clocks.map((item) => <Clock key={item.id} id={item.id} name={item.name} offset={item.offset} onRemove={removeHandler}/>)}
    </div>  
  ); 
}

export default App;