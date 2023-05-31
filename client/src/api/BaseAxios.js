import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:4000/api",
})