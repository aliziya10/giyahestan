import config from "../../config";
import Api from "./Api";
import Config from "../../config";
import fa from "../../lang/fa";

class BaseApi {

    api = new Api();

    // point = this.getLanguage() + '/' + this.getModule() + '/' + this.getVersion() + '/' + this.getResource();

    constructor() {

    }

    find(data = {}, url) {
        this.api.setPoint(url);

        return this.api.send('get', data).then((response) => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        }).catch((error) => {
            return new Promise((resolve, reject) => {
                reject(error.response.data);
            });
        });
    }

    create(data = {}, url) {
        this.api.setPoint(url);

        return this.api.send('post', data).then((response) => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        }).catch((error) => {
            return new Promise((resolve, reject) => {
                reject(error.response.data);
            });
        });

    }

    update(data = null, url) {
        this.api.setPoint(url);

        return this.api.send('put', data).then((response) => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        }).catch((error) => {
            return new Promise((resolve, reject) => {
                reject(error.response.data);
            });
        });
    }

    delete(data = null, url) {
        this.api.setPoint(url);

        return this.api.send('delete', data).then((response) => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        }).catch((error) => {
            return new Promise((resolve, reject) => {
                reject(error.response.data);
            });
        });
    }

    getVersion() {
        return 1;
    }

    getModule() {
        return null;
    }

    getResource() {
        return null;
    }

    getLanguage() {
        switch (Config.lang) {
            case 'fa':
                return 'fa_IR'
            default:
                return 'fa_IR';
        }
    }

}

export default BaseApi;