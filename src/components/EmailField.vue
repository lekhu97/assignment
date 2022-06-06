<template>
    <div class="field">
        <div>
            <label for="emailField" class="form-label">Email</label>
            <input
                type="email"
                v-model="input"
                class="form-control"
                id="emailField"
                @input="$emit('update:modelValue', $event.target.value)"
                @keyup="validateInput"
                autocomplete="off"/>
              <div class="text-danger" v-if="errors.email">
                {{ errors.email }}
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
		const { validateEmailField, errors } = useFormValidation();
		const validateInput = () => {
		validateEmailField("email", input.value);
		};
		return { input, errors, validateInput };
	},
};
</script>