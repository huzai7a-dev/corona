import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

function App() {
  const [value,setValue] = useState('');
  const [country,setCountry] = useState('');
  const[cases,setCases] = useState()
  const[deaths,setDeaths] = useState()
  const[recovered,setRecovered] = useState();
  const [countryName, setCountryName] = useState();

    useEffect(() => {

      async function fetchData(){
        const apiData = await axios.get('https://api.covid19api.com/summary');
        let countries = await apiData.data.Countries;
        countries.filter((items,index)=>{
          let allCountry = items.Country;
          if (country.toUpperCase() === allCountry.toUpperCase()) {
            setCases(countries[index].TotalConfirmed);
            setDeaths(countries[index].TotalDeaths);
            setRecovered(countries[index].TotalRecovered);
            setCountryName(allCountry);
          }
        })
      }
      fetchData();
    },[country]);

 const getCountry =(e)=>{
    let userValue = e.target.value;
    setValue(userValue);
}
const findCountry = ()=>{
    setCountry(value);
}

  return (
    <div className="container">

    <h1 className="text-center p-3"><span className="text-success">Corona</span> Cases</h1>

      <div className="form-group d-flex">
        <input type="text" className="form-control" placeholder="Enter a Country" onChange={getCountry}/>
        <button className="btn btn-outline-light text-dark py-1 px-4 ml-2" onClick={findCountry}><i class="fa fa-search"></i></button>
      </div>
      <h1 className="text-center my-5">Country: <span className='text-secondary'>{countryName}</span></h1>
      <div className="row mt-5">

        <div className="col-lg-3 box col-12">
          <h3>Total <span className="text-primary">Cases</span></h3>
          <p>{cases}</p>
        </div>

        <div className="col-lg-3 box col-12 mx-lg-auto my-lg-0 my-5">
          <h3>Total <span className="text-danger">Deaths</span></h3>
          <p>{deaths}</p>
        </div>

        <div className="col-lg-3 box col-12">
          <h3>Total <span className="text-success">Recovered</span> </h3>
          <p>{recovered}</p>
        </div>

      </div>
    </div>
    )
}
export default App;
