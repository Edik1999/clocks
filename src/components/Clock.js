import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';

const Clock = ({id, name, offset, onRemove}) => {

    const [hour, setHour] = useState();
    const [min, setMin] = useState();
    const [sec, setSec] = useState();

    useEffect(() => {
        const intervalId = setInterval(() => {
            let date = moment().utcOffset(Number(offset))
            setSec(6*date.seconds())
            setMin(6*date.minutes())
            setHour(30*(date.hours()%12) + date.minutes()/2)
        }, 1000);
        return () => clearInterval(intervalId)
    },[offset])    

    return (
        <div className="element" style={{width: '17%',marginRight: 10,marginBottom:10}}>
            <p style={{textAlign: "center", marginBottom: 0}}>{name}</p>
            <span style={{display: "inline-block",width: "100%", textAlign: "right", cursor: "pointer"}} onClick={() => onRemove(id)}>X</span>
            <svg className="clock" viewBox="0 0 100 100">
              <circle className="face" cx="50" cy="50" r="45"/>
              <g className="hands">
                <rect className="hour" style={{transform: `rotate(${hour}deg)`}} x="48.5" y="12.5" width="5" height="40" rx="2.5" ry="2.55" />
                <rect className="min" style={{transform: `rotate(${min}deg)`}} x="48" y="12.5" width="3" height="40" rx="2" ry="2"/>
                <line className="sec" style={{transform: `rotate(${sec}deg)`}} x1="50" y1="50" x2="50" y2="16" />
              </g>
            </svg>
        </div>
    );
}

export default Clock;
