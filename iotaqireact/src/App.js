import './App.css';
import { RadialGauge } from 'react-canvas-gauges';
import { useEffect, useState } from 'react';

function App() {

  const [value, setvalue] = useState(0)

  useEffect(() => {
    fetch('https://dweet.io/get/latest/dweet/for/7008765628_AQI')
    .then(res=>{
      return res.json()
    }).then(result=>{
      if(result.with !== 404){
        setvalue(result.with[0].content?.AQI)
      }
      console.log(result)
    }).catch(err=>{
      console.log(err)
    })
  }, [])

  return (
    <div className="App">
       <h2>IOT AQI SENSOR READING</h2>
       <RadialGauge
        units='°C'
        title='Temperature'
        value={value}
        minValue={0}
        maxValue={500}
        majorTicks={['0','50','100', '150',  '200',  '250', '300','350','400','450','500']}
      />
      <label>Air Quality Index Reading</label>
    </div>
  );
}

export default App;
