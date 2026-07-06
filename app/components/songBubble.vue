<template>
    <div v-if="currentSong != null" class="container">
        <button class="close-bubble-button" :class="{'close-button-visible': bubbleIsOpen}" @click="closeBubble">close</button>
        <div @click="openBubble" id="bubble" class="bubble" :class="{ 'bubble-beat bubble-visible': songIsPlaying }">
            <div id="bubbleImage" class="bubble-image" :class="{'rotate-bubble-image' : songIsPlaying }" :style="{ backgroundImage: `url(${currentSong?.image})` }"></div>
            <div class="special-border-1"></div>
            <div class="special-border-2"></div>
            <div class="special-border-3"></div>
            <div class="special-border-4"></div>

            <div class="song-player" id="songPlayer">
                <div class="middle">
                    <div class="player-bar">
                        <div class="bar-filling"></div>
                    </div>
                    <div class="duration-info">
                        <span>00:00</span>
                        <span>02:50</span>
                    </div>
                </div>
                <div class="bottom">
                    <div class="top">
                        <svg v-if="playerInfo != null && playerInfo.repeat == false" @click="audioStore.turnRepeatOn" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="grey"><path d="M280-80 120-240l160-160 56 58-62 62h406v-160h80v240H274l62 62-56 58Zm-80-440v-240h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z"/></svg>
                        <svg v-else @click="audioStore.turnRepeatOff" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="white"><path d="M280-80 120-240l160-160 56 58-62 62h406v-160h80v240H274l62 62-56 58Zm-80-440v-240h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z"/></svg>
                    </div>
                    <div class="middle">
                        <div class="back">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="white"><path d="M220-240v-480h80v480h-80Zm520 0L380-480l360-240v480Zm-80-240Zm0 90v-180l-136 90 136 90Z"/></svg>
                        </div>
                        <div class="play-pause">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="white"><path d="M200-312v-336l240 168-240 168Zm320-8v-320h80v320h-80Zm160 0v-320h80v320h-80Z"/></svg>
                        </div>
                        <div class="forward">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="white"><path d="M660-240v-480h80v480h-80Zm-440 0v-480l360 240-360 240Zm80-240Zm0 90 136-90-136-90v180Z"/></svg>
                        </div>
                    </div>
                    <div class="bottom">
                        <svg v-if="playerInfo != null && playerInfo.shuffle == false" @click="audioStore.turnShuffleOn" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="grey"><path d="M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z"/></svg>
                        <svg v-else @click="audioStore.turnShuffleOff" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="white"><path d="M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z"/></svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .container{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;

        .close-bubble-button{
            width: 100vw;
            height: 100vh;
            opacity: 0;
            display: none;
        }

        .close-button-visible{
            display: block;
            filter: brightness(0.4);
        }

        .bubble{
            position: absolute;
            right: -2.5rem;
            top: -2.5rem;
            width: 9rem;
            height: 9rem;
            border-radius: 50%;
            background-color: $bg-color;

            .bubble-image{
                width: 100%;
                height: 100%;
                position: absolute;
                background-color: red;
                border-radius: 50%;
            }

            .rotate-bubble-image{
                animation: rotate 10s linear infinite;

                @keyframes rotate{
                    100%{
                        transform: rotate(360deg);
                    }
                }
            }

            .song-player{
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap: 1rem;
                font-size: 0.5rem;
                transition: 0.2s ease-in-out;
                opacity: 0;
                pointer-events: none;

                svg{
                    width: 1rem;
                    height: 1rem;
                }

                button{
                    @include icon();
                    color: $text-color;
                    font-size: 0.5rem;
                }

                .top{
                    width: 30%;
                    height: 30%;
                    background-color: red;
                }

                .middle{
                    width: 60%;
                    height: 5%;

                    .player-bar{
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: start;
                        background-color: blue;

                        .bar-filling{
                            width: 0%;
                            height: 50%;
                            background-color: $main-color;
                        }
                    }

                    .duration-info{
                        width: 100%;
                        height: 100%;
                        margin-top: 0.2rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 0.3rem;
                    }
                }

                .bottom{
                    width: 50%;
                    height: 40%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .top{
                        width: 100%;
                        height: 30%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: transparent;
                    }

                    .middle{
                        width: 100%;
                        height: 30%;
                        display: flex;
                        justify-content: space-between;
                        background: transparent;

                        *{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .back{
                            width: 30%;
                            height: 100%;
                        }

                        .play-pause{
                            width: 30%;
                            height: 100%;
                        }

                        .forward{
                            width: 30%;
                            height: 100%;
                        }
                    }

                    .bottom{
                        width: 100%;
                        height: 30%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }

            .song-player-visible{
                opacity: 1;
                pointer-events: all;
            }

            .special-border-1{
                width: 105%;
                height: 105%;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                border-left: 0.2rem solid $secondary-color;
                background: transparent;

                transform: translate(-50%, -50%) rotate(0deg);
                animation: rotate-right 4s linear infinite;

                @keyframes rotate-right{
                    100%{
                        transform: translate(-50%, -50%) rotate(-360deg);
                    }
                }
            }

            .special-border-2{
                width: 110%;
                height: 110%;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                border-bottom: 0.2rem solid $tertiary-color;
                background: transparent;

                transform: translate(-50%, -50%) rotate(0deg);
                animation: rotate-left 3s linear infinite;

                @keyframes rotate-left{
                    100%{
                        transform: translate(-50%, -50%) rotate(360deg);
                    }
                }
            }

            .special-border-3{
                width: 115%;
                height: 115%;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                border-right: 0.2rem solid $main-color;
                background: transparent;

                transform: translate(-50%, -50%) rotate(0deg);
                animation: rotate-right 4s linear infinite;

                @keyframes rotate-right{
                    100%{
                        transform: translate(-50%, -50%) rotate(-360deg);
                    }
                }
            }

            .special-border-4{
                width: 120%;
                height: 120%;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                border-top: 0.2rem solid $ui-green;
                background: transparent;

                transform: translate(-50%, -50%) rotate(0deg);
                animation: rotate-left 3s linear infinite;

                @keyframes rotate-left{
                    100%{
                        transform: translate(-50%, -50%) rotate(360deg);
                    }
                }
            }
        }

        .open-bubble{
            animation: click-feedback 0.5s ease-in-out,  open-bubble-anim 0.2s ease-in-out forwards 0.5s;

            @keyframes click-feedback{
                50%{
                    transform: scale(2);
                }
                100%{
                    transform: scale(1);
                }
            }

            @keyframes open-bubble-anim{
                100%{
                    top: 50%;
                    right: 50%;
                    transform: translate(50%, -50%) scale(4);
                }
            }
        }
        
        .close-bubble{
            animation: close-bubble-anim 0.2s ease-in-out forwards;

            @keyframes close-bubble-anim {
                0% {
                    top: 50%;
                    right: 50%;
                    transform: translate(50%, -50%) scale(4);
                }
                100% {
                    top: -2.5rem;
                    right: -2.5rem;
                    transform: none;
                }
            }
        }

        .bubble-beat{
            animation: beat 0.35s ease-in infinite;
        }

        @keyframes beat{
            20%{
                transform: scale(1.1);
            }
            100%{
                transform: scale(1);
            }
        }
    }
</style>

<script setup>
import { useAudioStore } from '~~/stores/audio';

    const audioStore = useAudioStore();
    const songIsPlaying = ref(false);
    let bubbleIsOpen = ref(false);
    const currentSong = ref(null);
    const playerInfo = ref(null);

    function openBubble(){
        const bubble = document.getElementById("bubble");
        const songPlayer = document.getElementById("songPlayer");
        const bubbleImage = document.getElementById("bubbleImage");

        bubble.classList.remove("close-bubble");
        bubble.classList.remove('bubble-beat');
        bubble.classList.add("open-bubble");
        setTimeout(() => {
            songPlayer.classList.add("song-player-visible");
            bubbleImage.style.filter = "brightness(0.5)";
        }, 500)
        bubbleIsOpen.value = true;
    }

    function closeBubble(){
        const bubble = document.getElementById("bubble");
        const songPlayer = document.getElementById("songPlayer");
        const bubbleImage = document.getElementById("bubbleImage");

        songPlayer.classList.remove("song-player-visible")
        bubble.classList.remove("open-bubble");
        bubble.classList.add("close-bubble");
        bubbleImage.style.filter = "brightness(1)";
        setTimeout(() => {
            bubble.classList.add("bubble-beat");
        }, 500);
        bubbleIsOpen.value = false;
    }

    onMounted(() => {
        getData();
        calcBarPercentage();
    });

    function getData(){
        setInterval(() => {
            songIsPlaying.value = audioStore.isPlaying;
            currentSong.value = audioStore.getCurrentSong();
            playerInfo.value = audioStore.getPlayerInfo();
        }, 10);
    }
</script>