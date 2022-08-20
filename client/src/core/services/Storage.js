class Storage {

    static setToken(token) {
        localStorage.setItem('token', token)
    }

    static getToken(token) {
        return localStorage.getItem(token)
    }

    static setUser(user) {
        localStorage.setItem('user', JSON.stringify(user))
    }
}

export default Storage;