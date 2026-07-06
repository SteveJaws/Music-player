import { defineStore } from 'pinia';
import type { Song } from '../models/Song'

export const useAudioStore = defineStore('audio', () => {

    const isPlaying = ref(false);
    const currentSong = ref<Song | null>(null);

    function startSong(song: Song){
        currentSong.value = song;
        isPlaying.value = true;
    }

    function getCurrentSong(): Song | null{
        if(currentSong.value){
            return currentSong.value ;
        }
        return null;
    }

    return{
        isPlaying,
        startSong,
        getCurrentSong
    }
})