<template>
    <div class="background-effect" id="backgroundEffect">
    </div>
</template>

<style lang="scss">
    .background-effect{
        width: 100%;
        height: 100%;
        position: fixed;
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
        animation: fill-screen 15s linear forwards;
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
        }, 1500);
    }

    function createBlock() {
    const parent = document.getElementById("backgroundEffect");
    if (!parent) return;

    const block = document.createElement("div");
    block.classList.add("block");

    // Kleur wisselen
    if (mainColor) {
        block.classList.add("color-main");
        mainColor = false;
    } else {
        block.classList.add("color-secondary");
        mainColor = true;
    }

    parent.appendChild(block);

    // DE TRICK: Zodra de CSS-animatie van dit specifieke blokje klaar is, 
    // verwijdert hij zichzelf direct uit de HTML. Geen loops nodig!
    block.addEventListener('animationend', () => {
        block.remove();
    });
}
</script>