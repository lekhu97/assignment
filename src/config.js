import Axios from "axios";
const ApiService = Axios.create({
    baseURL: 'http://localhost:3000'
});

export { ApiService }