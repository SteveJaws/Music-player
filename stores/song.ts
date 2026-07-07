import { defineStore } from 'pinia';
import type { Playlist } from '../models/Playlist';

export const useSongStore = defineStore('song', () => {

    const fakePlayList: Playlist = {
        id: 0,
        title: "playlist1",
        image: "https://picsum.photos/400",
        color: "red"
    }

    const fakePlayList2: Playlist = {
        id: 0,
        title: "playlist1",
        image: "https://picsum.photos/400",
        color: "yellow"
    }

     const fakePlayList3: Playlist = {
        id: 0,
        title: "playlist1",
        image: "https://picsum.photos/400",
        color: "purple"
    }

    function getAllPlayLists(){
        return [fakePlayList, fakePlayList2, fakePlayList3];
    }

    return{
        getAllPlayLists
    }
});