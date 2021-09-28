import axios from 'axios';

const GlobalVariables = {
    baseURL : "https://localhost:5001/api",
    axios : axios.create({baseURL: "https://localhost:5001/api"}) 
}

export default GlobalVariables;