<template>
    <div class="pt-4">
        <DepartmentList/>
        <EmployeeList/>
    </div>
</template>
<script>
import DepartmentList  from './DepartmentList.vue'
import EmployeeList  from './EmployeeList.vue'
export default {
    name:'DashboardPage',
    data() {
        return {
            employees:[],
        }
    },
    setup() {
        
    },
    mounted() {
        if(!localStorage.getItem('cuser')){
            this.$router.push({ name:'login'});
        }
    },
    components:{
        DepartmentList,
        EmployeeList
    },
 
   
}
</script>