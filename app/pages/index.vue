<template>
    <SongBubble />
    <div class="container">
        <div></div>
        <div class="text-top">
            Welcome back username
        </div>
        <div class="text-bottom">
            Swipe up for current song!
        </div>
    </div>
</template>

<style lang="scss" scoped>
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

<script setup>
import BackgroundEffect from '~/components/backgroundEffect.vue';
import SongBubble from '~/components/songBubble.vue';
</script>