import React,{useState,useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line,Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';
const Chart = ({data:{confirmed,recovered,deaths} , country}) => {
    const [dailyData,setDailyData] = useState([]);//setting state in hooks <=> like class compo

    useEffect(() => {
        const fetchAPI = async () => {
           setDailyData(await  fetchDailyData());
           
        }

        
        
        fetchAPI();
        //console.log(dailyData);
    },[]);
    const barChart = (
        confirmed 
        ?(
            <Bar
                data={
                    {
                        labels:['Infected','Recovered','Deaths'],
                        datasets:[{
                        label:'people',
                        backgroundColor: ['rgba(255,0,0,0.5)', 'rgba(0,255,0,0.5)','rgba(0,0,255,0.5)'],
                        data:[confirmed.value,recovered.value,deaths.value],
                        }]
                    }
                }
                options ={{
                    legend:{display:false},
                    title :{display:true , text:`The Current Data is for ${country}`}
                }}
            />
        )
        :null
    );
    const lineChart = (
      dailyData.length ?
        (  
        
            <Line
            data={//for making dynamic
                {//data is an object
                    labels:dailyData.map((data) => data.date),
                    datasets:[{
                        data: dailyData.map((data) => data.confirmed),
                        label:'Infected',
                        borderColor:'#3333ff',
                        fill:true,
                    }, 
                    {
                        data:dailyData.map((data) => data.deaths),
                        label: 'Deaths',
                        borderColor:'red',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill: true,
                    }],
                }
            }/>
        ):null
    );

    
    return (
        <div className={styles.container}>
           {country && country!=='global'?barChart:lineChart}
        </div>
    );
}

export default Chart;