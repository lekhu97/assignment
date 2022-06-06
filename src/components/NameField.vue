<template>
	<div class="field">
		<div>
		<label for="nameField" class="form-label">Name</label>
		<input
			type="text"
			v-model="input"
			class="form-control"
			id="nameField"
			@input="$emit('update:modelValue', $event.target.value)"
			@keyup="validateInput"
			autocomplete="off"
		/>
		<div class="text-danger" v-if="errors.name">
			{{ errors.name }}
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
		const { validateNameField, errors } = useFormValidation();
		const validateInput = () => {
		validateNameField("name", input.value);
		};
		return { input, errors, validateInput };
	},
};
</script>