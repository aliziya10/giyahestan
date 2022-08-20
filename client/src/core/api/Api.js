import axios from 'axios';
import config from '../../config';
import Storage from "../services/Storage";

class Api {
    url = config.baseUrl;
    _token = Storage.getToken();

    constructor() {
    }

    setPoint(url) {
        this.url = config.baseUrl + url;
    }

    send(type, data = null) {
        let headers = this._token ? {'Authorization': 'Token ' + this._token} : null

        switch (type) {
            case'get':
                return axios.get(
                    this.url,
                    {
                        headers: headers,
                        params: data
                    },
                );
            case'post':
                return axios.post(
                    this.url,
                    data,
                    {headers: headers}
                );
            case'put':
                return axios.put(
                    this.url,
                    data,
                    {headers: headers}
                );
            case'delete':
                return axios.delete(
                    this.url,
                    {
                        headers: headers,
                        data: data
                    }
                );
        }
    }
}


export default Api;
