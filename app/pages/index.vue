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
import { useAudioStore } from '~~/stores/audio';

const audioStore = useAudioStore();

onMounted(() => {
    // Dit runt pas in de browser, dus hier is 'document' wel veilig te gebruiken!
    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);
});

onUnmounted(() => {
    // Altijd netjes opruimen om memory leaks te voorkomen
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchmove', handleTouchMove);
});

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
            /* right swipe */ 
        } else {
            /* left swipe */
        }                       
    } else {
        if ( yDiff > 0 ) {
            audioStore.openBubble();
        } else { 
            audioStore.closeBubble();
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
}
</script>