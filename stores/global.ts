import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', () => {

    const shouldShake = ref(false);

    function shake(){
        shouldShake.value = true;
        resetShake();
    }

    function resetShake(){
        setTimeout(() => {
            shouldShake.value = false;
        }, 500);
    }

    return {
        shouldShake,
        shake,
    }
});