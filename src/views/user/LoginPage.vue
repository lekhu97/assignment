<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-md-3 pt-5">
                <div class="text-center">
                    <a class="navbar-brand" href="/">
                        <img :src="logo" alt="" class="logo">
                    </a>
                </div>
                <h2 class="text-center">Sign In</h2>
                <form>
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
                        <a href="/signup">Sign up here</a>
                    </div>
                    <p class="text-error">{{message}}</p>
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
        async handleSignup() {
            if(!this.user.email){
                this.message ="Please fill up all inputs";
                return;
            } 
            await ApiService.get('/user?email='+this.user.email+'&password'+this.user.email)
            .then((resp) => {
                if(resp.data.length){
                    localStorage.setItem('cuser',JSON.stringify(resp.data[0]));
                    this.$router.push({name:'dashboard'});
                }else{
                    this.message = "Incorrect email/password";
                }
            })
            .catch((error) => {
                console.log({error});
            })
        }
    }
}
</script>
