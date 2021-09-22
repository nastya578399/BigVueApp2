import axios from 'axios'
import {error} from '../../utils/error'
const TOkEN_KEY = 'jwt-token'

export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOkEN_KEY )
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOkEN_KEY , token)
        },
        logout(state) {
            state.token = null
            localStorage.removeItem(TOkEN_KEY )
        }
    },
    actions: {
        async login({ commit }, payload) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url, {...payload, returnSecureToken: true})
                commit('setToken', data.idToken)
            } catch (e) {
                console.log(error(e.responce.data.error.message))
            }
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        isAuthenticated(_, getters) {
            return !!getters.token //привожу токен к boolean
        }
    }
}