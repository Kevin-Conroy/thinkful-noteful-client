import axios from 'axios';

export default axios.create({
  baseURL: `https://noteful-api-v1.herokuapp.com/api/`
});