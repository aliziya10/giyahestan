import BaseApi from "../BaseApi";

class Account extends BaseApi {

    async signUpOrLogin(input) {
        const data = {
            email: input.email,
        };
        return this.create(data, 'account/signupLogin/');
    }

    async signUpLogin(input) {
        const data = {
            email: input.email,
            password: input.password,
        };
        return this.create(data, 'account/signupLogin/');
    }

    getResource() {
        return 'login';
    }

}


export default Account;