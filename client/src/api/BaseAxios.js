import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default axios.create({
    baseURL: SERVER_URL || "http://localhost:5005/api",
})