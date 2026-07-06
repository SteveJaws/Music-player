import { defineStore } from 'pinia';
import type { Song } from '../models/Song'

export const useAudioStore = defineStore('audio', () => {

    const isPlaying = ref(false);
    const currentSong = ref<Song | null>(null);
    const shouldRepeat = ref(false);
    const shouldShuffle = ref(false);

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
    
    function turnShuffleOn(){
        shouldShuffle.value = true;
    }

    function turnShuffleOff(){
        shouldShuffle.value = false;
    }

    function turnRepeatOn(){
        shouldRepeat.value = true;
    }

    function turnRepeatOff(){
        shouldRepeat.value = false;
    }

    function getPlayerInfo(){
        const response = {
            shuffle: shouldShuffle.value,
            repeat: shouldRepeat.value
        }

        return response;
    }

    function getCurrentSongDurationInfo(){
        
    }

    return{
        isPlaying,
        startSong,
        getCurrentSong,
        turnRepeatOn,
        turnRepeatOff,
        shouldRepeat,
        turnShuffleOn,
        shouldShuffle,
        turnShuffleOff,
        getPlayerInfo
    }
})