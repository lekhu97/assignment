<template>
    <div class="pt-4">
        <div class="d-flex justify-content-between mb-4">
            <router-link class="btn btn-success" to="/employee-add">Add Employee</router-link>
            <router-link class="btn btn-success" to="/dashboard">Back</router-link>
        </div>
        <div class="card">
            <div class="card-body" v-if="employee && Object.keys(employee).length">
                <h5>Name</h5>
                <p>{{employee.name}}</p>
                <h5>Address</h5>
                <p>{{employee.address}}</p>
                <h5>Department</h5>
                <p>{{employee.department.name}}</p>
                <h5>Manager</h5>
                <p>{{manager ? manager.name :''}}</p>
                <h5>Role</h5>
                <p>{{employee.role}}</p>
                <h5>Joining Date</h5>
                <p>{{employee.joining_date}}</p>
                <div v-if="employee.role == 'manager'">
                    <h5>Member Employees</h5>
                    <p>(Joined 5 years 3 months ago, Joined before 2017-03-01)</p>
                    <div v-if="members.length">
                        <div class="row">
                            <div v-for="(member, index) in members" :key="index" class="d-flex col-6">
                                <div class="item-wrapper">
                                    <div>{{index+1}}. &nbsp;</div>
                                    <div>
                                        <p>Name: {{member.name}}</p>
                                        <p>Address: {{member.address}}</p>
                                        <p>Role: {{member.role}}</p>
                                        <p>Department: {{member.department.name}}</p>
                                        <p>Joining Date: {{member.joining_date}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p>no members joined</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ApiService } from '../../config'

export default {
    name:'EmployeeDetailPage',
    data() {
        return {
            employee:{},
            members:[],
            manager:null,
        }
    },
    setup() {
        
    },
    mounted() {
        this.getEmployee();
    },
    methods: {
        async getEmployee() {
            await ApiService.get('/employees/'+this.$route.params.id+'?_expand=department')
            .then((resp) => {
                this.employee = resp.data;
                if(this.employee.role=='manager'){
                    this.fetchEmployees(this.employee.id);
                }
                if(this.employee.managerId){
                    this.fetchManager(this.employee.managerId);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        },
        async fetchEmployees(id){
            await ApiService.get('/employees?_expand=department&managerId='+id+'&joining_date_lte=2017-03-01')
            .then((resp) => {
               this.members = resp.data;
            })
            .catch(() => {
            })
        },
        async fetchManager(id){
            await ApiService.get('/employees/'+id)
            .then((resp) => {
               this.manager = resp.data ? resp.data :null;
            })
            .catch(() => {
            })
        },
       
    }
   
}
</script>
<style scoped lang="scss">
.card-body{
    p,
    h5{
        text-transform: capitalize;
    }
}
.item-wrapper{
    display: flex;
    width: 100%;
    border:1px solid #dadada;
    padding:10px;
    margin-bottom:20px;
}
</style>