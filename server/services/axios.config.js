import axios from "axios";

export const varCodeDev = axios.create({
  baseURL: "http://deltadev.mymdfile.com/ws/Service.asmx",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});
export const authServer = axios.create({
  baseURL: "https://auth.varcode.com",
});
