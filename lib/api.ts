import { metadata } from './../app/layout';
import { de } from "zod/v4/locales";
import fetchHandler from "./fetchHandler"

const API_BASE_URL = "http://localhost:3000/api";

export const api = {
    users :{
        getAll:() => fetchHandler(API_BASE_URL + "/users"),
        create: (data: {name: string, email: string, username: string,image: string}) => fetchHandler(API_BASE_URL + "/users",{
            method: "POST",
            body: JSON.stringify(data)
        }),
        getById: (id: string) => fetchHandler(API_BASE_URL + `/users/${id}`),
        update: (id: string, data: {name?: string, email?: string, username?: string,image?: string}) => fetchHandler(API_BASE_URL + `/users/${id}`,{
            method: "PUT",
            body: JSON.stringify(data)
        }),
        delete: (id: string) => fetchHandler(API_BASE_URL + `/users/${id}`,{
            method: "DELETE"
        }),
        getByEmail: (email: string) => fetchHandler(API_BASE_URL + `/users/email`,{
            method: "POST",
            body: JSON.stringify({email})   
        }),
    },
    accounts: {
        getAll: () => fetchHandler(API_BASE_URL + "/accounts"),
        create: (data: {userId: string, name: string, image?: string, password?: string, provider: string, providerAccountId: string}) => fetchHandler(API_BASE_URL + "/accounts", {
            method: "POST",
            body: JSON.stringify(data)
        }),
        getAccountById: (id: string) => fetchHandler(API_BASE_URL + `/accounts/${id}`),
        update: (id: string, data: {userId?: string, name?: string, image?: string, password?: string, provider?: string, providerAccountId?: string}) => fetchHandler(API_BASE_URL + `/accounts/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        }),
        delete: (id: string) => fetchHandler(API_BASE_URL + `/accounts/${id}`, {
            method: "DELETE"
        }),
        getByProviderAccountId: (providerAccountId: string) => fetchHandler(API_BASE_URL + "/accounts/provider", {
            method: "POST",
            body: JSON.stringify({providerAccountId})
        }),
    },
    auth :{
        oauthSignIn: ({provider,providerAccountId,user}:{
            provider: string,
            providerAccountId: string,
            user: {
                email: string,
                username: string,
                name: string,
                image?: string
            }
        }) => fetchHandler(API_BASE_URL + "/auth/signin-with-oath", {
            method: "POST",
            body: JSON.stringify({provider, providerAccountId, user})
        }),
    }
}