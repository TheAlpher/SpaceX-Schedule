import React from 'react'
import Header from 'components/Header/Header';
import SubHeader from 'components/SubHeader/SubHeader';
import Table from 'components/Table/Table';
import axios from 'axios';
export default function Home(props) {

    React.useEffect(()=>{
        // axios.get('https://api.spacexdata.com/v3/launches').then(res=>{
        //     console.log(res.data);
        // })  
    })
    return (
        <div>
            <Header/>
            <SubHeader/>
            <Table location={props.location}/>
        </div>
    )
}
