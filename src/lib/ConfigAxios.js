import AxiosREST from 'axios';

class ConfigAxios {
    constructor(header = {}) {
        this.Axios = AxiosREST.create({
            baseURL: process.env.REACT_APP_API_URL,
            header: {
                'Content-Type': 'application/json'
            }
        })
    }
}

export default ConfigAxios;