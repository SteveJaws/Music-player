<template>
    <div class="tablet" :class="{'is-open' : menuOpen, 'is-closed' : !menuOpen && hasOpenedOnce}">
        <div class="turn-on-overlay-top"></div>
        <div class="turn-on-overlay-bottom"></div>
    </div>
</template>

<style lang="scss" scoped>
    .tablet {
        width: 12rem;
        height: 19rem;
        background-color: $main-color;
        display: flex;
        justify-content: space-between;
        border: 0.5rem solid black;
        border-radius: 1rem;
        position: relative;
        overflow: hidden;

        // Basis instellingen voor de overlays (ze starten als zwart scherm)
        .turn-on-overlay-top,
        .turn-on-overlay-bottom {
            width: 50%;
            height: 100%;
            background-color: black;
            z-index: 5;
        }

        // --- ANIMATIES BIJ OPENEN ---
        &.is-open {
            .turn-on-overlay-top {
                animation: turn-on-top 0.4s ease-in forwards, turn-on-open 0.2s ease-in forwards 0.4s;
            }
            .turn-on-overlay-bottom {
                animation: turn-on-bottom 0.4s ease-in forwards, turn-on-open 0.2s ease-in forwards 0.4s;
            }
        }

        // --- ANIMATIES BIJ SLUITEN (NIEUW!) ---
        &.is-closed {
            .turn-on-overlay-top {
                // We starten breedte op 0 en animeren terug naar 50%
                width: 0; 
                animation: turn-off-close 0.2s ease-out forwards, turn-off-top 0.4s ease-out forwards 0.2s;
            }
            .turn-on-overlay-bottom {
                width: 0;
                animation: turn-off-close 0.2s ease-out forwards, turn-off-bottom 0.4s ease-out forwards 0.2s;
            }
        }

        // --- CRT TV FILTER CONFIGURATIE ---
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
        }
    }

    @keyframes turn-on-top {
        0% { opacity: 1; }
        100% { border-right: 0.2rem solid white; opacity: 1; }
    }
    @keyframes turn-on-bottom {
        0% { opacity: 1; }
        100% { border-left: 0.2rem solid white; opacity: 1; }
    }
    @keyframes turn-on-open {
        100% { width: 0; opacity: 0; visibility: hidden; }
    }
    @keyframes turn-off-close {
        0% { width: 0; opacity: 0; }
        100% { width: 50%; opacity: 1; }
    }
    @keyframes turn-off-top {
        0% { background-color: white; border-right: 0.2rem solid white; }
        20% { background-color: white; }
        100% { background-color: black; border: none; }
    }
    @keyframes turn-off-bottom {
        0% { background-color: white; border-left: 0.2rem solid white; }
        20% { background-color: white; }
        100% { background-color: black; border: none; }
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
</style>

<script setup>
import { computed } from 'vue';
import { useGlobalStore } from '~~/stores/global';

const globalStore = useGlobalStore();
const menuOpen = computed(() => globalStore.menuFocus);

// Nieuw: hiermee onthouden we of de tablet ooit open is geweest
const hasOpenedOnce = ref(false);

// Luister naar menuOpen. Zodra die 1x true is, blijft hasOpenedOnce true.
watch(menuOpen, (newValue) => {
    if (newValue === true) {
        hasOpenedOnce.value = true;
    }
});
</script>