<template>
    <div class="field">
        <div>
            <label for="password" class="form-label">Password</label>
            <input
                type="password"
                v-model="input"
                class="form-control"
                id="password"
                @input="$emit('update:modelValue', $event.target.value)"
                @keyup="validateInput"
                autocomplete="off"/>
                <div class="text-danger" v-if="errors.password">
                {{ errors.password }}
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from "vue";
import useFormValidation from "@/modules/useFormValidation";
export default {
    setup() {
        let input = ref("");
        const { validatePasswordField, errors } = useFormValidation();
        const validateInput = () => {
            validatePasswordField("password", input.value);
        };
        return { input, errors, validateInput };
    },
};
</script>