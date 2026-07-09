<template>
    <div class="container">
        <div class="playlist-banner">
            <h1>{{ playlist.title }}</h1>
            <img :src="playlist.image" alt="playlist image">
        </div>

        <div class="song-list">
            <div class="song">
                song
            </div><div class="song">
                song
            </div><div class="song">
                song
            </div><div class="song">
                song
            </div><div class="song">
                song
            </div><div class="song">
                song
            </div><div class="song">
                song
            </div><div class="song">
                song
            </div><div class="song">
                song
            </div><div class="song">
                song
            </div><div class="song">
                song
            </div><div class="song">
                song
            </div><div class="song">
                song
            </div><div class="song">
                song
            </div>
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
            overflow: scroll;

            .song{
                width: 80%;
                min-height: 5rem;
                border-radius: 1rem;
                margin: 1rem;
                background-color: green;
            }
        }
    }
</style>

<script setup>
import { useRoute } from 'vue-router';
import { usePlaylistStore } from '~~/stores/playlist';

const route = useRoute();

const playlistStore = usePlaylistStore();

const playlist = computed(() => {
    return playlistStore.getPlayList(route.params.id);
});
</script>