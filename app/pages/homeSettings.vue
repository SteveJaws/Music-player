<template>
    <div class="container">
        <div></div>
        <div class="text-top">
            Welcome back username
        </div>
        <div></div>
        <div class="text-bottom">
            Scroll down for the settings
        </div>
    </div>
</template>

<style lang="scss">
    .container{
        height: 100vh;
        display: flex;
        flex-direction: column;

        div{
            flex-grow: 1;
        }

        .text-top{
            display: flex;
            align-items: start;
            justify-content: center;
        }

        .text-bottom{
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>

<script setup lang="ts">
import BackgroundEffect from '~/components/backgroundEffect.vue';

</script>