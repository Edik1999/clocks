import './App.css';
import moment from 'moment-timezone';
import { useState, Fragment } from 'react';

function App() {

  const [time, setTime] = useState([{ id: null, name: '', offset: null}])
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
    setTime(prev => [...prev, {id: time.length + 1,name: name, offset: offset}])
    setName('')
    setOffset('')
    let currentClockNumber = time.length
    window['interval' + (time.length + 1)] = setInterval(() => {
      clocks(currentClockNumber)
    }, 1000)
  }
  console.log(time)
  const removeHandler = (id) => {
    clearInterval(window['interval' + id])
    setTime(prev => prev.filter(filtered => filtered.id !== id))
  }

  const clocks = (number) => {

      const sec = document.querySelector(`#sec${number}`),
      min = document.querySelector(`#min${number}`),
      hour = document.querySelector(`#hour${number}`)

      const r = (el, deg) => {
        el.setAttribute('transform', 'rotate('+ deg +' 50 50)')
      }
      
      let currentOffset = time[number - 1].offset,
          numCurrentOffset = Number(currentOffset)

      let d = moment().utcOffset(numCurrentOffset)
      r(sec, 6*d.seconds())
      r(min, 6*d.minutes())
      r(hour, 30*(d.hours()%12) + d.minutes()/2)

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

      {time.map((item,index) => { return <Fragment key={index}>{index > 0 
        ?
          <div className="element" style={{width: '17%',marginRight: 10,marginBottom:10}}>
            <p style={{textAlign: "center", marginBottom: 0}}>{item.name}</p>
            <span style={{display: "inline-block",width: "100%", textAlign: "right", cursor: "pointer"}} onClick={() => removeHandler(item.id)}>X</span>
            <svg id={`clock${index}`} className="clock" viewBox="0 0 100 100">
              <circle id={`face${index}`} className="face" cx="50" cy="50" r="45"/>
              <g id={`hands${index}`} className="hands">
                <rect className="hour" id={`hour${index}`} x="48.5" y="12.5" width="5" height="40" rx="2.5" ry="2.55" />
                <rect className="min" id={`min${index}`} x="48" y="12.5" width="3" height="40" rx="2" ry="2"/>
                <line className="sec" id={`sec${index}`} x1="50" y1="50" x2="50" y2="16" />
              </g>
            </svg>
          </div>
        : <></>
        }</Fragment>
      })}

    </div>  
  ); 
}

export default App;
