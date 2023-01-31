//yarn add request-promise to install the package and also add the type\
import { gql } from "graphql-request";
//import rp from "request-promise"
import axios from "Axios"
 
export class testClient {
    url: string; 
    options: {json: boolean; withCredentials: boolean; };

    constructor(url: string) {
        this.url = url
        this.options = {
            json: true,
            withCredentials: true,
        }
    }

    async register(email: string, password: string) {
        return axios.post(this.url, {
            ...this.options,
            body: {
                query: gql`
                mutation {
                    register(email: "${email}", password: "${password}") {
                        path
                        message
                        }
                    } `
            }
        })
    }

    async login(email: string, password: string) {
        return axios.post(this.url, {
            ...this.options,
            body: {
                query: gql`
                mutation {
                    login(email: "${email}", password: "${password}") {
                    path
                    message
                    }
                } `
            }
        })
    }

    async me() {
        return axios.post(this.url, {
            ...this.options,
            body: {
                query: gql`
                     query {
                        me {
                            email,
                            id
                        }
                    } `
            }
        })
    }

    async logout() {
        return axios.post(this.url, {
            ...this.options,
            body: {
                query: gql`
                     mutation {
                        logout
                    }`
            }
        })
    }

    async forgotPasswordChange(newPassword: string, key: string) {
        return axios.post(this.url, {
            ...this.options,
            body: {
                query: gql`
                mutation {
                    forgotPasswordChange(newPassword: "${newPassword}", key: "${key}") {
                    path
                    message
                    }
                } `
            }
        })
    }


}