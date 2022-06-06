import useValidators from '@/modules/Validators'
import { reactive } from "@vue/reactivity";
const errors = reactive({});
const { isEmpty, minLength, isEmail, validPassword } = useValidators();
export default function useFormValidation() {
    const validateNameField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 4)
    }
    const validateEmailField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isEmail(fieldName, fieldValue)
    }
    const validatePasswordField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? validPassword(fieldName, fieldValue) : validPassword(fieldName, fieldValue)
    }
    return { errors, validateNameField, validateEmailField,validatePasswordField }
}