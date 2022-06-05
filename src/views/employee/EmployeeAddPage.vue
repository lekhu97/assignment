<template>
    <div>
        <div class="card mt-4">
            <div class="card-body">
                <div class="d-flex justify-content-between mb-4">
                    <h2>Add Employee</h2>
                    <div>
                        <router-link class="btn btn-success" to="/dashboard">Back</router-link>
                     </div>
                </div>
                <form>
                    <div class="row">
                        <div class="col-12">
                            <div class="mb-4">    
                                <label for="name" class="form-label">Name</label>
                                <input type="name" v-model="employee.name" class="form-control" id="name">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-4">    
                                <label for="name" class="form-label">Address</label>
                                <input type="name" v-model="employee.address" class="form-control" id="name">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-4">    
                                <label for="department" class="form-label">Department</label>
                                <select class="form-select text-capitalize" v-model="employee.departmentId">
                                    <option value="" selected disabled>Select</option>
                                    <option :value="department.id" v-for="(department,index) in departments" :key="index" class="text-capitalize">{{ department.name}}</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="col-6">
                            <div class="mb-4">    
                                <label for="manager" class="form-label">Manager</label>
                                <select class="form-select text-capitalize" v-model="employee.managerId">
                                    <option value="" selected disabled>Select</option>
                                    <option :value="manager.id" v-for="(manager,index) in managers" :key="index" class="text-capitalize">{{ manager.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-4">    
                                <label for="role" class="form-label">Role</label>
                                    <select class="form-select text-capitalize" v-model="employee.role" aria-label="Default select example">
                                    <option value="" selected disabled>Select</option>
                                    <option value="employee">Employee</option>
                                    <option value="manager">Manager</option>
                                    </select>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-4">    
                                <label for="joining_date" class="form-label">Joining Date</label>
                                <input type="date" v-model="employee.joining_date" class="form-control" id="joining_date">
                            </div>
                        </div>
                        <div class="col-12">
                            <div>    
                                <button class="btn btn-primary" @click.prevent="handleAddEmployee()">Submit</button>
                            </div>
                            <p class="text-success">{{message}}</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { ApiService } from '../../config'

import { computed } from 'vue'
import { useStore } from 'vuex'

import moment from 'moment'
export default{
    name:'RegisterEmployee',
    setup() {
        const store = useStore();
        const managers = computed(() => store.state.managers);
        const departments = computed(() => store.state.departments);

        return {
            managers, departments
        }
    },
    data() {
        return {
            moment,
            message:'',
            employee: {
                name:'',
                address:'',
                departmentId:'',
                managerId:'',
                role:'',
                joining_date:''
            },
        }
    },
    watch:{
        'employee.departmentId'(val){
            this.$store.dispatch("fetchManagers",{'departmentId': val});
        }
    },
    mounted() {
       this.$store.dispatch("fetchDepartments");
    },
    methods: {
        handleAddEmployee() {
            if(!this.employee.name) return;
            ApiService.post('/employees', this.employee)
            .then((resp) => {
                this.employee = {
                    name:'',
                    address:'',
                    departmentId:'',
                    role:'',
                    managerId:'',
                    joining_date:''
                };
                localStorage.setItem('cuser',JSON.stringify(resp.data));
                this.message = "Employee registered successfully";
                setTimeout(() => {
                    this.message = "";
                    this.$router.push({ name:'dashboard'});
                },1000);
            })
            .catch((error) => {
                console.log({error});
            })
        },
    }
}
</script>
