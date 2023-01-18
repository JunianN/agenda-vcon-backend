import * as dotenv from 'dotenv';
import exit from "process";

dotenv.config();

const getenv = (name) => {
    const env = process.env[name];
    if (!env) {
        console.error(`Environment variable ${name} is missing!`);
        exit(1);
    }
    return env;
};
 
export default getenv;


