import React,{Component} from 'react';


import {Cards,Chart,CountryPicker} from './components';
import styles from './App.module.css';
import {fetchData} from './api';
import coronaImage from './images/image.png';
class App extends Component {
    state = {
        data:{},
        country : '',
    }
    async componentDidMount(){
        const fetchedData = await fetchData();
        
        this.setState({data:fetchedData});
    }
    handleCountryChange = async (c) => {
        const fetchedData = await fetchData(c);
       
        this.setState({data : fetchedData , country:c});
    }
    render(){
        const {data , country}  = this.state;
        return(
            <div className={styles.container}>
                <img className={styles.images}src={coronaImage}/>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        );
    }
}

export default App;