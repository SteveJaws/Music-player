<template>
    <div class="background-effect" id="backgroundEffect">
    </div>
</template>

<style lang="scss">
    .background-effect{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -9999999;
        opacity: 0.2;
        overflow: hidden;
    }

    .block{
        width: 0;
        height: 0;
        border-radius: 1rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: fill-screen 10s linear forwards;
    }

    .color-main{
        background-color: $main-color;
    }

    .color-secondary{
        background-color: $ui-secondary;
    }

    @keyframes fill-screen{
        100%{
            width: 200%;
            height: 200%;
        }
    }
</style>

<script setup>
    let mainColor = true;
    const blockList = [];

    onMounted(() => {
        main();
    });

    function main(){
        createBlock();
        setInterval(() => {
            createBlock();
        }, 1000);
        setInterval(() => {
           shouldDeleteBlock();
        },50);
    }

    function createBlock(){
        const parent = document.getElementById("backgroundEffect");

        const block = document.createElement("div");

        block.classList.add("block");

        if (mainColor) {
            block.classList.add("color-main");
            mainColor = false;
        } else {
            block.classList.add("color-secondary");
            mainColor = true;
        }

        parent.appendChild(block);

        blockList.push(block);
    }

    function shouldDeleteBlock(){
        const parent = document.getElementById("backgroundEffect");
        if (!parent) return;

        const parentWidth = parent.getBoundingClientRect().width;

        blockList.forEach((block) => {
            const currentBlockWidth = block.getBoundingClientRect().width;

            if (currentBlockWidth >= parentWidth + (parentWidth * 0.5)) {
                block.remove(); 
                const index = blockList.indexOf(block);
                blockList.splice(index, 1);
            }
        });
    }
</script>