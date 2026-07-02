<template>
    <div class="container">
        <button class="close-bubble-button" :class="{'close-button-visible': bubbleIsOpen}" @click="closeBubble">close</button>
        <div @click="openBubble" id="bubble" class="bubble" :class="{ 'bubble-beat bubble-visible': songIsPlaying }">
            <div class="special-border-1"></div>
            <div class="special-border-2"></div>
            <div class="special-border-3"></div>
            <div class="special-border-4"></div>

            <div class="song-player" id="songPlayer">
                <div class="top"></div>
                <div class="middle"></div>
                <div class="bottom">
                    <div class="top"></div>
                    <div class="middle">
                        <div class="back">
                            back
                        </div>
                        <div class="play-pause">
                            play-pause
                        </div>
                        <div class="forward">
                            forward
                        </div>
                    </div>
                    <div class="bottom"></div>
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
        }

        .bubble-visible{
            opacity: 1 !important;
        }

        .bubble{
            position: absolute;
            right: -2.5rem;
            top: -2.5rem;
            width: 9rem;
            height: 9rem;
            border-radius: 50%;
            background-color: $bg-color;
            opacity: 0;

            .song-player{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap: 0.3rem;
                font-size: 0.5rem;
                transition: 1s ease-in-out;
                opacity: 0;

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
                    background-color: red;
                }

                .bottom{
                    width: 50%;
                    height: 40%;
                    background-color: red;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .top{
                        background-color: blue;
                        width: 100%;
                        height: 30%;
                    }

                    .middle{
                        background-color: blue;
                        width: 100%;
                        height: 30%;
                        display: flex;
                        justify-content: space-between;

                        *{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .back{
                            width: 30%;
                            height: 100%;
                            background-color: green;
                        }

                        .play-pause{
                            width: 30%;
                            height: 100%;
                            background-color: green;
                        }

                        .forward{
                            width: 30%;
                            height: 100%;
                            background-color: green;
                        }
                    }

                    .bottom{
                        background-color: blue;
                        width: 100%;
                        height: 30%;
                    }
                }
            }

            .song-player-visible{
                opacity: 1;
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
            animation: click-feedback 0.5s ease-in-out,  open-bubble-anim 0.8s ease-in-out forwards 0.5s;

            @keyframes click-feedback{
                50%{
                    transform: scale(2);
                }
                100%{
                    transform: scale(1);
                }
            }

            @keyframes open-bubble-anim{
                80%{
                    top: 50%;
                    right: 50%;
                    transform: translate(50%, -50%) scale(1);
                }
                100%{
                    top: 50%;
                    right: 50%;
                    transform: translate(50%, -50%) scale(4);
                }
            }
        }
        
        .close-bubble{
            animation: close-bubble-anim 0.8s ease-in-out forwards;

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
    const songIsPlaying = ref(true);
    let bubbleIsOpen = ref(false);

    function openBubble(){
        const bubble = document.getElementById("bubble");
        const songPlayer = document.getElementById("songPlayer");

        bubble.classList.remove("close-bubble");
        bubble.classList.remove('bubble-beat');
        bubble.classList.add("open-bubble");
        songPlayer.classList.add("song-player-visible")
        bubbleIsOpen.value = true;
    }

    function closeBubble(){
        songPlayer.classList.remove("song-player-visible")
        bubble.classList.remove("open-bubble");
        bubble.classList.add("close-bubble");
        setTimeout(() => {
            bubble.classList.add("bubble-beat");
        }, 1000);
        bubbleIsOpen.value = false;
    }
</script>