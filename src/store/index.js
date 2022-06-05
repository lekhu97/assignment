import { createStore } from 'vuex'
import { ApiService } from '../config'
const store = createStore({
    state: {
        employees:[],
        departments:[],
        managers:[],
        employe_detail:null,
    },
    mutations: {
        SET_EMPLOYEES(state, payload){
            state.employees = payload;
        },
        SET_DEPARTMENTS(state, payload){
            state.departments = payload;
        },
        SET_MANAGERS(state, payload){
            state.managers = payload;
        },
        SET_EMPLOYE_DETAIL(state, payload){
            state.employe_detail = payload;
        },
    },

    actions: {
        async fetchDepartments({ commit }) {
            await ApiService.get('/departments')
            .then((response) => {
                commit("SET_DEPARTMENTS",response.data);
            })
        },
        async fetchManagers({ commit }, param) {
            await ApiService.get('/employees?departmentId='+ param.departmentId +'&role=manager')
            .then((response) => {
                commit("SET_MANAGERS",response.data);
            })
        },
        async fetchEmployeeDetail({ commit }, param) {
            await ApiService.get('/employees/'+ param.id +'?_expand=department')
            .then((response) => {
                commit("SET_EMPLOYE_DETAIL",response.data);

            })
        },
        async fetchMembers({ commit }, param){
            await ApiService.get('/employees?_expand=department&managerId='+param.id+'&joining_date_lte=2017-03-01')
            .then((resp) => {
                commit("SET_EMPLOYE_MEMBERS",resp.data);
            })
            .catch(() => {
            })
        }
    },
})

export default store;