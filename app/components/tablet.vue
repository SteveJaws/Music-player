<template>
    <div class="container" :class="{'tablet-open-anim' : tabletOpen}">
        <div class="top"></div>
        <div class="bottom">
            <div class="home-button"></div>
        </div>
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
            background-color: blue;
        }

        .bottom{
            width: 100%;
            height: 15%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom-left-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
            background-color: red;

            .home-button{
                width: 2rem;
                height: 2rem;
                background-color: pink;
                border-radius: 50%;
            }
        }
    }

    .tablet-open-anim{
        animation: 0.3s open-tablet ease-in forwards;

        @keyframes open-tablet{
            0%{
                left: -55%;
                transform: translate(0, -50%) rotate(-45deg);
            }
            100%{
                left: calc(100% - 13rem);
                transform: translate(0, -50%) rotate(240deg);
            }
        }
        
    }
</style>

<script setup>
import { useGlobalStore } from '~~/stores/global';

const tabletOpen = ref(false);
const globalStore = useGlobalStore();

// Vang de props op in een variabele (meestal 'props' genoemd)
const props = defineProps({
    tabletOpen: Boolean
});

watch(() => props.tabletOpen, (newValue, oldValue) => {
    if(newValue === true && oldValue === false){
        tabletOpen.value = newValue;
        setTimeout(() => {
            globalStore.shake();
        }, 300);
    }
});
</script>