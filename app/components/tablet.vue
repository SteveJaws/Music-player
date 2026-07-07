<template>
    <div class="container" v-on:animationend="globalStore.shake" :class="{'tablet-open-anim' : tabletOpen, 'tablet-close-anim' : tabletClose}">
        <TabletScreen />
    </div>
</template>

<style lang="scss" scoped>
    .container{
        width: 13rem;
        height: 20rem;
        position: fixed;
        top: 50%;
        left: -13rem;
        transform: translate(0, -50%) rotate(-45deg);

        .top{
            width: 100%;
            height: 85%;
            border-top-left-radius: 0.5rem;
            border-top-right-radius: 0.5rem;
        }
    }

    .tablet-open-anim{
        animation: 0.3s open-tablet ease-in forwards;

        @keyframes open-tablet{
            0%{
                left: -13rem;
                transform: translate(0, -50%) rotate(-45deg);
            }
            100%{
                left: calc(100% - 13rem);
                transform: translate(0, -50%) rotate(240deg);
            }
        }
    }

    .tablet-close-anim{
        animation: 0.3s close-tablet ease-in forwards;

        @keyframes close-tablet{
            0%{
                left: calc(100% - 13rem);
                transform: translate(0, -50%) rotate(240deg);
            }
            100%{
                left: -13rem;
                transform: translate(0, -50%) rotate(-45deg);
            }
        }
    }
</style>

<script setup>
import TabletScreen from '~/pages/tabletScreen.vue';
import { useGlobalStore } from '~~/stores/global';

const tabletOpen = ref(false);
const tabletClose = ref(false);
const globalStore = useGlobalStore();

// Vang de props op in een variabele (meestal 'props' genoemd)
const props = defineProps({
    tabletOpen: Boolean
});

watch(() => props.tabletOpen, (newValue, oldValue) => {
    if(newValue === true && oldValue === false){
        tabletClose.value = false;
        tabletOpen.value = newValue;
    }
    else if(newValue === false && oldValue === true){
        tabletOpen.value = newValue;
        tabletClose.value = true;
    }
});
</script>