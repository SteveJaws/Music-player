<template>
  <BackgroundEffect />
  <PageTransition v-show="transition" />
  <div class="app" :class="{'shake' : shouldShake}">
    <NuxtPage />
  </div>
  <Tablet :tablet-open="tabletOpen" />

</template>

<style lang="scss">
html, body{
  padding: 0;
  margin: 0;
}

body{
  background-color: $bg-color;
  color: $text-color;
}

.app{
  width: 100vw;
  height: 100vh;
}

@media (max-width: 380px) {
  body{
    font-size: 20px;
  }
}

@media (min-width: 390px) and (max-width: 412px) {
  body{
    font-size: 21px;
  }
}

@media (min-width: 413px) {
  body{
    font-size: 22px;
  }
}

span, p, h1, h2, h3, h4, h5, h6{
  padding: 0 1rem;
}

.container{
  position: absolute;
  top: 0;
  max-width: 700px;
  margin: 0 auto;
}

.shake{
  animation: shake-effect 0.2s ease-in-out;
}

@keyframes shake-effect{
  0% { transform: translate(0, 0) rotate(0deg); }
  10% { transform: translate(-5px, 2px) rotate(-1deg); }
  20% { transform: translate(4px, -2px) rotate(1deg); }
  30% { transform: translate(-3px, 3px) rotate(0deg); }
  40% { transform: translate(3px, 1px) rotate(1deg); }
  50% { transform: translate(-2px, -3px) rotate(-1deg); }
  60% { transform: translate(2px, 2px) rotate(0deg); }
  70% { transform: translate(-1px, 1px) rotate(-1deg); }
  80% { transform: translate(1px, -1px) rotate(1deg); }
  90% { transform: translate(0px, 2px) rotate(0deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}
</style>

<script setup>
import { useAudioStore } from '~~/stores/audio';
import { useGlobalStore } from '~~/stores/global';
import Tablet from './components/tablet.vue';
import PageTransition from './components/pageTransition.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const audioStore = useAudioStore();
const globalStore = useGlobalStore();

const tabletOpen = ref(false);

const shouldShake = computed(() => globalStore.shouldShake);

const menuFocus = computed(() => globalStore.menuFocus);
const bubbleFocus = computed(() => globalStore.bubbleFocus);

const transition = ref(false);

onMounted(() => {
  audioStore.startSong({
    id: 1,
    title: "testSong",
    artist: "testArtist",
    duration: 120,
    image: "https://picsum.photos/400"
  });

  document.addEventListener('touchstart', handleTouchStart, false);        
  document.addEventListener('touchmove', handleTouchMove, false);
});

onUnmounted(() => {
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchmove', handleTouchMove);
});

watch(
  () => globalStore.loadPage, 
  (newValue, oldValue) => {
    if (newValue) {
      transition.value = true;

      setTimeout(() => {
        router.push(newValue);
      }, 400)

      setTimeout(() => {
        transition.value = false;
      }, 850)
    }
  }
);

var xDown = null;                                                        
var yDown = null;

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
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
          tabletOpen.value = false;
          globalStore.closeMenu();
        } else {
          if(bubbleFocus.value === false){
            tabletOpen.value = true;
            globalStore.openMenu();
          }
        }                       
    } else {
        if ( yDiff > 0 ) {
            if(menuFocus.value === false){
              audioStore.openBubble();
              globalStore.openBubble();
            }
        } else { 
            audioStore.closeBubble();
            globalStore.closeBubble();
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
}
</script>