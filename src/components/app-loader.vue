<template>
    <div class="_loader-layout">
        <div class="dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur"/>
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                                   result="goo"/>
                    <feBlend in="SourceGraphic" in2="goo"/>
                </filter>
            </defs>
        </svg>
    </div>
</template>

<script>
  export default {
    name: 'app-loader'
  }
</script>

<style lang="scss" scoped>
    $dot-color: var(--blue_medium);
    $dot-size: 35px;
    $circle-size: 70px;
    $animation-time: 4s;

    $color-yellow: var(--yellow);
    $color-red: var(--orange);
    $color-blue: var(--blue);
    $color-green: var(--green);

    $colors: ($color-red, $color-blue, $color-green, $color-yellow);

    ._loader-layout {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        bottom: 0;
        right: 0;
        background: #fff;
    }

    .dots {
        width: 0;
        height: 0;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        filter: url(#goo);
        z-index: 1;
        padding: 100px;
    }

    .dot {
        width: 0;
        height: 0;
        position: absolute;
        margin: auto;

        &:before {
            content: '';
            width: $dot-size;
            height: $dot-size;
            border-radius: 50px;
            background: $color-yellow;
            position: absolute;
            z-index: 1;
            left: 50%;
            transform: translateY(0) rotate(0deg);
            margin-left: -($dot-size/2);
            margin-top: -($dot-size/2);
        }

        @keyframes dot-move {
            0% {
                transform: translateY(0);
            }

            18%, 22% {
                transform: translateY(-($circle-size));
            }

            40%, 100% {
                transform: translateY(0);
            }
        }

        @keyframes dot-colors {
            @for $i from 0 to 4 {
                #{$i*25%} {
                    background-color: nth($colors, ($i+3)%4+1);
                }
            }
            100% {

                background-color: nth($colors, 4);
            }
        }

        &:nth-child(5):before {
            z-index: 100;
            width: $dot-size * 1.3;
            height: $dot-size * 1.3;
            margin-left: -($dot-size * .65);
            margin-top: -($dot-size * .65);
            animation: dot-colors $animation-time ease infinite;
        }

        @for $i from 0 to 4 {
            @keyframes dot-rotate-#{$i + 1}
            {
                0% {
                    transform: rotate(#{($i+1)*270deg - 375deg});
                }

                100% {
                    transform: rotate(#{($i+1)*270deg + 0deg});
                }
            }

            &:nth-child(#{$i + 1}) {

                animation: dot-rotate-#{$i + 1} $animation-time #{$i * $animation-time / 4} linear infinite;

                &:before {
                    background-color: nth($colors, $i+1);
                    animation: dot-move $animation-time #{$i * $animation-time/4} ease infinite;
                }
            }
        }
    }
</style>
