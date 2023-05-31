import axios from "axios";

export default axios.create({
    baseURL: process.env.SERVER_URL || "http://localhost:4000/api",
})