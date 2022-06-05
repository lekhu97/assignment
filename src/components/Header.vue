<template>
    <div class="container">
        <div class="row">
           <div class="col-md-10 offset-md-1">
                <div class="d-flex align-items-center justify-content-between pt-4" v-if="is_loggedin">
                    <div>
                        <a class="navbar-brand" href="/">
                            <img src="../assets/logo.png" alt="" class="logo">
                        </a>
                    </div>
                    <div >
                        <button class="btn btn-outline-success" @click.prevent="handleLogout">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    data() {
        return {
            is_loggedin:false,
        }
    },
    mounted() {
        this.is_loggedin = localStorage.getItem('cuser') ? true: false;
    },
    setup() {
        const router = useRouter()
        const handleLogout = () => {
            localStorage.clear();
            router.push({name:'login'})
        } 
        return  { handleLogout };
    },
})
</script>
<style>
.logo{
    height: 60px;
}
</style>
