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
                <form @submit.prevent>
                    <div class="mb-3">
                        <NameField v-model="user.name"/>
                    </div>
                    <div class="mb-3">
                        <EmailField v-model="user.email"/>
                    </div>
                    <div class="mb-3">
                        <PasswordField v-model="user.password"/>
                    </div>
                    <div>
                        <button class="btn btn-primary" 
                        :disabled="isButtonDisabled"
                        @click="signUpButtonPressed()">Submit</button>
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
import { reactive } from "vue";
import { useRouter } from 'vue-router'

import logo from '@/assets/logo.png'
import NameField from '@/components/NameField'
import EmailField from '@/components/EmailField'
import PasswordField from '@/components/PasswordField'

import useFormValidation from "@/modules/useFormValidation";
import useSubmitButtonState from "@/modules/useSubmitButtonState";

export default{
    name:'UserRegistration',
     setup() {
        let user = reactive({
            name: "",
            email: "",
            password: "",
        });

        const router = useRouter()
        const { error } = useFormValidation();
        const { isButtonDisabled } = useSubmitButtonState(user, error);

        const signUpButtonPressed = () => {
            ApiService.post('/user', user)
            .then((resp) => {
                localStorage.setItem('cuser',JSON.stringify(resp.data));
                setTimeout(() => {
                    router.push({ name:'dashboard'});
                },1000);
            })
            .catch(() => {
                 this.message = "Failed to register user";
            })
        };
        return { 
            user, 
            signUpButtonPressed,
            isButtonDisabled, 
        };
    },
    components: {
        NameField,
        EmailField,
        PasswordField
    },
    data() {
        return {
            logo,
        }
    },
    mounted() {
        if(localStorage.getItem('cuser')){
            this.$router.push({ name:'dashboard'});
        }
    }
}
</script>
