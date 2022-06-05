<template>
    <div class="card">
        <div class="card-body">
            <div class="d-flex d-inline-flex justify-content-between" style="width:100%">
                <div>
                    <h5>List of Department</h5>
                    <div class="d-flex">     
                        <input type="text" v-model="query" class="form-control mr-2" placeholder="Search">
                        <button class="btn btn-success" @click.prevent="handleSearch()">Search</button>
                    </div>
                </div>
                <div>
                    <router-link class="btn btn-success" to="/employee-add">Add Employee</router-link>
                </div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" @click="handleSort('name')">Name</th>
                        <th scope="col" @click="handleSort('address')">Address</th>
                        <th scope="col" @click="handleSort('departmentId')">Department</th>
                        <th scope="col" @click="handleSort('role')">Role</th>
                        <th scope="col" @click="handleSort('joining_date')">Joining Date</th>
                        <th scope="col" class="text-right">Action</th>
                    </tr>
                </thead>
                <tbody v-if="employees.length">
                    <tr v-for="(employee,index) in employees" :key="index">
                        <th scope="row">{{index+1}}</th>
                        <td class="text-capitalize">{{employee.name}}</td>
                        <td class="text-capitalize">{{employee.address}}</td>
                        <td class="text-capitalize">{{employee.department.name}}</td>
                        <td class="text-capitalize">{{employee.role}}</td>
                        <td>{{employee.joining_date}}</td>
                        <td class="text-capitalize" style="text-align:right">
                            <router-link class="btn btn-success m-2" :to="'/employee/'+employee.id">View</router-link>
                            <router-link class="btn btn-warning m-2" :to="'/employee-edit/'+employee.id">Edit</router-link>
                            <button class="btn btn-danger m-2" @click.prevent="handleDelete(employee.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="6">No record found</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { ApiService } from '../../config'

export default {
    setup() {
       
    },
    data() {
        return {
            query:'',
            employees:[],
            sort_param:'name',
        }
    },
    mounted() {
        this.getEmployees();
    },
    methods: {
        handleSort(param) {
            this.sort_param = param;
            this.getEmployees();
        },
        handleSearch(){
            this.getEmployees();
        },
        async getEmployees() {
            await ApiService.get('/employees?_sort='+this.sort_param+'&_expand=department&q='+this.query)
            .then((resp) => {
                this.employees = resp.data;
            })
            .catch((error) => {
                console.log(error);
            })
        },
        async handleDelete(id){
            await ApiService.delete('/employees/'+id)
            .then((resp) => {
                this.getEmployees();
                console.log(resp);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}
</script>
<style scoped>
tr th{
    cursor: pointer;
}
</style>