import Axios from './../lib/ConfigAxios';

class Report extends Axios {
    constructor(header) {
        super(header)
        this.uri = '/countries'
    }

    getContries() {
        return this.Axios.get(this.uri)
    }
    fetchDataCovid(country) {
        return this.Axios.get((!!country) ? this.uri+'/'+country.name : '')
    }
}

export default Report;