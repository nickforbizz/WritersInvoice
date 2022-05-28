import axios, { Axios } from 'axios';
import React from 'react'

 const SelectField =  ({url}) => {
    let select_data = tt(url); 
    console.log(select_data);
  return ( 
    <div>select</div> 
  )
}

async function tt(url) {
    const target_url = process.env.BACKEND_URL+url;
    const select_data =  await axios.get(target_url)
    .then((response) => {
        if(response && response.data && response.data.data){
            return response.data.data;
        }
        return null  
    })
    .catch((err)=> console.error(err))
    return select_data;
}



export default SelectField;