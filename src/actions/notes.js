import axios from 'axios';

export default axios.create({
    baseURL:'https://fake-server-for-todoapp.herokuapp.com'
})