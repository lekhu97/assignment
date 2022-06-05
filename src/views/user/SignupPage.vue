<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-md-3 pt-5">
                <div class="text-center">
                    <a class="navbar-brand" href="/">
                        <img :src="logo" alt="" class="logo">
                    </a>
                </div>
                <h2 class="text-center">User Registration</h2>
                <form>
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="name" v-model="user.name" class="form-control" id="name">
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" v-model="user.email" class="form-control" id="email">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" v-model="user.password" class="form-control" id="password">
                    </div>
                    <div>
                        <button class="btn btn-primary" @click.prevent="handleSignup()">Submit</button>
                    </div>
                     <div>
                        <a href="/">Login here</a>
                    </div>
                    <p class="text-success">{{message}}</p>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { ApiService } from '@/config'
import logo from '@/assets/logo.png'
export default{
    name:'User Registration',
    data() {
        return {
            logo,
            message:'',
            user: {
                name:'',
                email:'',
                password:''
            }
        }
    },
    mounted() {
        if(localStorage.getItem('cuser')){
            this.$router.push({ name:'dashboard'});
        }
    },
    methods: {
        handleSignup() {
            if(!this.user.name) return;
            ApiService.post('/user', this.user)
            .then((resp) => {
                this.user = {
                    name:'',
                    email:'',
                    password:''
                };
                localStorage.setItem('cuser',JSON.stringify(resp.data));
                this.message = "User registered successfully";
                setTimeout(() => {
                    this.message = "";
                    this.$router.push({ name:'dashboard'});
                },1000);
            })
            .catch((error) => {
                console.log({error});
            })
        }
    }
}
</script>
