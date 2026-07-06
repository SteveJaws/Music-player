<template>
  <BackgroundEffect />
  <NuxtPage />
</template>

<style lang="scss">
html, body{
  padding: 0;
  margin: 0;
}

body{
    background-color: $bg-color;
    color: $text-color;

    width: 100vw;
    height: 100vh;
}

@media (max-width: 360px) {
  body{
    font-size: 20px;
  }
}

@media (min-width: 361px) and (max-width: 412px) {
  body{
    font-size: 21px;
  }
}

@media (min-width: 413px) {
  body{
    font-size: 22px;
  }
}
</style>

<script setup>
import { useAudioStore } from '~~/stores/audio';

const audioStore = useAudioStore();

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