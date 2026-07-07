import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', () => {

    const shouldShake = ref(false);

    const menuFocus = ref(false);
    const bubbleFocus = ref(false);

    const loadPage = ref("");

    function openBubble(){
        bubbleFocus.value = true;
    }

    function closeBubble(){
        bubbleFocus.value = false;
    }

    function openMenu(){
        menuFocus.value = true;
    }

    function closeMenu(){
        menuFocus.value = false;
    }

    function shake(){
        shouldShake.value = true;
        resetShake();
    }

    function resetShake(){
        setTimeout(() => {
            shouldShake.value = false;
        }, 500);
    }

    function page(page: string){
        console.log(page);
        loadPage.value = page;
    }

    return {
        shouldShake,
        shake,
        menuFocus,
        bubbleFocus,
        openMenu,
        closeMenu,
        openBubble,
        closeBubble,
        page,
        loadPage
    }
});