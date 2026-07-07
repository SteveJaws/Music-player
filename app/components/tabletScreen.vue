<template>
    <div class="tablet" :class="{'is-open' : menuOpen, 'is-closed' : !menuOpen && hasOpenedOnce}">
        <div id="slideList" class="slide-list">
            <div class="slide" style="background-color: grey;" id="0">
                <div class="content">
                    <img src="../assets/images/settings-image.png" alt="settings image">
                    <h1>settings</h1>
                </div>
            </div>
            <div v-for="(playList, index) in playLists" :style="{'backgroundColor': playList.color}" :id="index + 1" class="slide">
                <div class="content">
                    <img :src="playList.image" alt="playlist image">
                    <h1>Title</h1>
                </div>
            </div>
        </div>
        <div class="slide-bullets">
            <div class="bullet" :class="{ 'bullet-selected': currentSlide === index }" v-for="(bullet, index) in playLists.length + 1"></div>
        </div>
        <div class="turn-on-overlay-top"></div>
        <div class="turn-on-overlay-bottom"></div>
    </div>
</template>

<style lang="scss" scoped>
    .tablet {
        width: 12rem;
        height: 19rem;
        background-color: $main-color;
        display: flex;
        justify-content: space-between;
        border: 0.5rem solid black;
        border-radius: 1rem;
        position: relative;

        .slide-bullets{
            width: 70%;
            height: 10%;
            display: flex;
            position: fixed;
            justify-content: space-between;
            align-items: center;
            left: 50%;
            transform: translate(-50%, 0);

            .bullet{
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 50%;
                border: 0.1rem black solid;
                transition: 0.2s ease-in-out all;
            }

            .bullet-selected{
                background-color: white;
            }
        }

        .slide-list{
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            position: absolute;
            display: flex;
            overflow-x: hidden;

            .slide{
                min-width: 100%;
                height: 100%;
                overflow: hidden;

                .content{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    img{
                        width: 8rem;
                        border-radius: 1rem;
                    }

                    h1{
                        margin: 0;
                    }

                    rotate: 90deg;
                }
            }
        }

        .turn-on-overlay-top,
        .turn-on-overlay-bottom {
            width: 50%;
            height: 100%;
            background-color: black;
            z-index: 5;
        }

        &.is-open {
            .turn-on-overlay-top {
                animation: turn-on-top 0.4s ease-in forwards, turn-on-open 0.2s ease-in forwards 0.4s;
            }
            .turn-on-overlay-bottom {
                animation: turn-on-bottom 0.4s ease-in forwards, turn-on-open 0.2s ease-in forwards 0.4s;
            }
        }

        &.is-closed {
            .turn-on-overlay-top {
                width: 0; 
                animation: turn-off-close 0.2s ease-out forwards, turn-off-top 0.4s ease-out forwards 0.2s;
            }
            .turn-on-overlay-bottom {
                width: 0;
                animation: turn-off-close 0.2s ease-out forwards, turn-off-bottom 0.4s ease-out forwards 0.2s;
            }
        }

        // --- CRT TV FILTER CONFIGURATIE ---
        &::after {
            content: " ";
            display: block;
            position: absolute;
            top: 0; left: 0; bottom: 0; right: 0;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
                        linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
            background-size: 100% 4px, 6px 100%;
            z-index: 10;
            pointer-events: none;
            box-shadow: inset 0 0 2rem rgba(0, 0, 0, 0.7);
            animation: crt-lines 6s linear infinite, crt-flicker 0.15s infinite;
        }
    }

    @keyframes turn-on-top {
        0% { opacity: 1; }
        100% { border-right: 0.2rem solid white; opacity: 1; }
    }
    @keyframes turn-on-bottom {
        0% { opacity: 1; }
        100% { border-left: 0.2rem solid white; opacity: 1; }
    }
    @keyframes turn-on-open {
        100% { width: 0; opacity: 0; visibility: hidden; }
    }
    @keyframes turn-off-close {
        0% { width: 0; opacity: 0; }
        100% { width: 50%; opacity: 1; }
    }
    @keyframes turn-off-top {
        0% { background-color: white; border-right: 0.2rem solid white; }
        20% { background-color: white; }
        100% { background-color: black; border: none; }
    }
    @keyframes turn-off-bottom {
        0% { background-color: white; border-left: 0.2rem solid white; }
        20% { background-color: white; }
        100% { background-color: black; border: none; }
    }
    @keyframes crt-lines {
        0% { background-position: 0 0, 0 0; }
        100% { background-position: 0 100%, 0 0; }
    }
    @keyframes crt-flicker {
        0% { opacity: 0.95; }
        50% { opacity: 1; }
        100% { opacity: 0.97; }
    }
</style>

<script setup>
import { computed } from 'vue';
import { useGlobalStore } from '~~/stores/global';
import { useSongStore } from '~~/stores/song';

const globalStore = useGlobalStore();
const songStore = useSongStore();

const menuOpen = computed(() => globalStore.menuFocus);

const playLists = computed(() => songStore.getAllPlayLists());

const currentSlide = ref(0);

// Nieuw: hiermee onthouden we of de tablet ooit open is geweest
const hasOpenedOnce = ref(false);

var xDown = null;                                                        
var yDown = null;

onMounted(() => {
    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);
    console.log(playLists.value);
});

onUnmounted(() => {
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchmove', handleTouchMove);
});

// Luister naar menuOpen. Zodra die 1x true is, blijft hasOpenedOnce true.
watch(menuOpen, (newValue) => {
    if (newValue === true) {
        hasOpenedOnce.value = true;
    }
});

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    const slideList = document.getElementById("slideList");

    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
        //   swipe left
        } else {
        //   swipe right
        }                       
    } else {
        const slideWidth = slideList.clientWidth;
        if ( yDiff > 0 ) {
            if(menuOpen.value && currentSlide.value < songStore.getAllPlayLists().length){
                currentSlide.value += 1;

                slideList.scrollTo({
                    left: currentSlide.value * slideWidth,
                    behavior: 'smooth'
                });
            }
        } else {
            if(menuOpen.value && currentSlide.value > 0){
                currentSlide.value -= 1;

                slideList.scrollTo({
                    left: currentSlide.value * slideWidth,
                    behavior: 'smooth'
                });
            }
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
}
</script>