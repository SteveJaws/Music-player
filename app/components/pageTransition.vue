<template>
    <div class="container">
        <div class="bar bar-1"></div>
        <div class="bar bar-2"></div>
        <div class="bar bar-3"></div>
    </div>
</template>

<style lang="scss" scoped>
.container{
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 1;

    .bar{
        width: 34%;
        height: 100%;
        position: absolute;
        top: 150%;
        transform: translate(0, -50%);
    }

    .bar-1{
        background-color: $main-color;
        animation: to-50 0.3s ease-in-out forwards, to-100 0.3s ease-in-out forwards 0.45s;
    }

    .bar-2{
        background-color: $secondary-color;
        animation: to-50 0.3s ease-in-out forwards 0.05s,  to-100 0.3s ease-in-out forwards 0.50s;
        left: 33%;
    }

    .bar-3{
        background-color: $tertiary-color;
        animation: to-50 0.3s ease-in-out forwards 0.10s,  to-100 0.3s ease-in-out forwards 0.55s;
        left: 66%;
    }

    @keyframes to-50{
        100%{
            top: 50%;
        }
    }
    
    @keyframes to-100{
        100%{
            top: -50%;
        }
    }
}
</style>