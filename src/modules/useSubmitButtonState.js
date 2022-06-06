import { computed } from "vue";

export default function useSubmitButtonState(user, errors) {
    const isButtonDisabled = computed(() => {
        let disabled = true;
        for (let prop in user) {
            if (!user[prop] || (errors && errors[prop])) {
                disabled = true;
                break;
            }
            disabled = false;
        }
        return disabled;
    });

    return { isButtonDisabled }
}