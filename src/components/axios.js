import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL:  "https://us-central1-challenge-5f414.cloudfunctions.net/api",
});

export default instance;