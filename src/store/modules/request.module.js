import axios from '../../axios/request'
import store from '../index'

export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests
        },
        addRequest(state, request) {
            state.requests.push(requests)
        }
    },
    actions: {
        async create({ commit, dispatch }, payload) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.post(`/requests.json?auth=${token}`, payload)
                commit('addRequest', {...payload, id: data.name})
                console.log(data)
                dispatch('setMessage', {
                    value: 'Заявка успешно создана',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                })
            }
        },
        getters: {
            request(state) {
                return state.request
            }
        }
    }
}