<template>
    <div class="container">
        <div class="playlist-banner">
            <h1>{{ playlist.title }}</h1>
            <img :src="playlist.image" alt="playlist image">
        </div>

        <div :style="{overflow: globalStore.menuFocus ? 'hidden' : 'scroll'}" class="song-list">
            <button v-for="i in list" class="song">
                <div class="turn-on-overlay-top"></div>
                <div class="turn-on-overlay-bottom"></div>
                <div class="song-content">
                    <h2>Song</h2>
                    <img src="https://picsum.photos/400" alt="Song image">
                </div>
            </button>
        </div>
    </div>
</template>

<style lang=scss scoped>
    .container{
        width: 100%;
        height: 100%;

        .playlist-banner{
            width: 100%;
            height: 20%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            img{
                width: 30%;
                margin-right: 1rem;
                border-radius: 1rem;
            }
        }

        .song-list{
            width: 100%;
            height: 80%;
            display: flex;
            flex-direction: column;
            align-items: end;

            .song{
                width: 80%;
                min-height: 5rem;
                border-radius: 1rem;
                border: none;
                margin: 1rem;
                position: relative;
                color: $text-color;
                background-color: $main-color;
                
                .song-content{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    img{
                        width: 4rem;
                        height: 4rem;
                        border-radius: 1rem;
                        margin-right: 1rem;
                    }
                }

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
                    border-radius: 1rem;
                }

                .turn-on-overlay-top{
                    width: 100%;
                    height: 50%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    border-top-left-radius: 1rem;
                    border-top-right-radius: 1rem;
                    background-color: black;
                    animation: turn-on-top 0.4s ease-in forwards, turn-on-open 0.2s ease-in forwards 0.4s;
                }

                .turn-on-overlay-bottom{
                    width: 100%;
                    height: 50%;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    border-bottom-left-radius: 1rem;
                    border-bottom-right-radius: 1rem;
                    background-color: black;
                    animation: turn-on-bottom 0.4s ease-in forwards, turn-on-open 0.2s ease-in forwards 0.4s;
                }

                @keyframes turn-on-top {
                    0% { opacity: 1; }
                    100% { border-bottom: 0.2rem solid white; opacity: 1; }
                }
                @keyframes turn-on-bottom {
                    0% { opacity: 1; }
                    100% { border-top: 0.2rem solid white; opacity: 1; }
                }
                @keyframes turn-on-open {
                    100% { height: 0; opacity: 0; visibility: hidden; }
                }
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
        }
    }
</style>

<script setup>
import { useRoute } from 'vue-router';
import { usePlaylistStore } from '~~/stores/playlist';
import { useGlobalStore } from '~~/stores/global';

const list = [0,1,2,3,4,5,6,7,8,9,10]

const route = useRoute();

const playlistStore = usePlaylistStore();
const globalStore = useGlobalStore();

const playlist = computed(() => {
    return playlistStore.getPlayList(route.params.id);
});
</script>