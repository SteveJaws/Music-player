import { defineStore } from 'pinia';
import type { Playlist } from '../models/Playlist';

export const usePlaylistStore = defineStore('playlist', () => {

     const fakePlayList: Playlist = {
        id: 1,
        title: "playlist1",
        image: "https://picsum.photos/400",
        color: "red"
    }

    const fakePlayList2: Playlist = {
        id: 2,
        title: "playlist2",
        image: "https://picsum.photos/400",
        color: "yellow"
    }

     const fakePlayList3: Playlist = {
        id: 3,
        title: "playlist3",
        image: "https://picsum.photos/400",
        color: "purple"
    }

    const allPlayLists = [fakePlayList, fakePlayList2, fakePlayList3];

    function getAllPlayLists(){
        return [fakePlayList, fakePlayList2, fakePlayList3];
    }

    function getPlayList(id: number){
        return allPlayLists.find((playList) => playList.id == id);
    }

    return{
        getAllPlayLists,
        getPlayList
    }
});