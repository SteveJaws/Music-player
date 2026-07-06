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
  })
});
</script>