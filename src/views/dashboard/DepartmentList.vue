<template>
    <div class="card mb-4">
        <div class="card-body">
            <h5>List of Department</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(department,index) in departments" :key="index">
                        <td scope="col">{{index+1}}</td>
                        <td scope="col" class="text-capitalize">{{ department.name}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
    setup() {
        const store = useStore();
        const departments = computed(() => store.state.departments);
        return {
            departments
        }
    },
    mounted() {
        this.$store.dispatch("fetchDepartments");
    },
}
</script>