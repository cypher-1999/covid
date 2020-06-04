import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changableUrl = url;
    
    if (country && country !== 'global'){
        changableUrl = `${url}/countries/${country}`;
    }

    try {
        const {data :{confirmed,recovered,deaths,lastUpdate}} = await axios.get(changableUrl);
        return { confirmed, recovered, deaths, lastUpdate, };
       
    } catch (error) {

    }
}

export const fetchDailyData = async () =>{
    try{
        const {data} = await axios.get(`${url}/daily`);
        const modifiedData = data.map((data) => ({
            confirmed:data.confirmed.total,
            deaths:data.deaths.total,
            date:data.reportDate,
        }));
        //console.log(modifiedData);
        return modifiedData;
        //console.log(data)
    }catch(error){

    }
}

export const fetchCountries = async () => {
    try{
        const { data :{countries} } = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name );
        //console.log(response);
    } catch(error){
        console.log(error);
    }
}