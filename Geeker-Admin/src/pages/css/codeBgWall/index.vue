<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

let canvasWidth = 600;
let canvasHeight = 600;
const text = "abcdefghijklmnopqrstuvwxyz";
const bl = 26;

let ctxRef = null;
let frameId = 0;
const startRates = {};
const rates = {};
const endRates = {};
const textObj = {};

const boxRef = ref();
const canvasRef = ref();

const init = () => {
    if (boxRef.value && canvasRef.value) {
        resize();
        ctxRef = canvasRef.value.getContext(
            "2d"
        );
        ctxRef.font = "14px SourceHanSansCN-Regular";
    }
};

const play = () => {
    if (ctxRef) {
        ctxRef.clearRect(0, 0, canvasWidth, canvasHeight);
        for (let i = 0; i < canvasWidth; i += bl) {
            ctxRef.beginPath();
            const gradient = ctxRef.createLinearGradient(
                0,
                0,
                0,
                canvasHeight
            );
            const s1 = 0.2 * Math.random();
            const s2 = 0.8 * Math.random() + 0.2;
            const step = 0.02 * Math.random();
            rates[i] = rates[i] || -s1;
            endRates[i] = endRates[i] || 0;
            startRates[i] = startRates[i] || -s2;
            gradient.addColorStop(0, "#000000");
            gradient.addColorStop(startRates[i] < 0 ? 0 : startRates[i], "#000000");
            gradient.addColorStop(rates[i] < 0 ? 0 : rates[i], "#0ee30e");
            gradient.addColorStop(endRates[i], "#000000");
            gradient.addColorStop(1, "#000000");
            ctxRef.fillStyle = gradient;
            for (let j = 0; j < canvasHeight; j += bl) {
                textObj[i + "-" + j] =
                    textObj[i + "-" + j] ||
                    text[Math.floor(Math.random() * text.length)];
                ctxRef.fillText(textObj[i + "-" + j], i, j);
            }
            rates[i] += step;
            endRates[i] += step;
            startRates[i] += step;
            if (startRates[i] > 1) {
                startRates[i] = -s2;
            }
            if (rates[i] > 1) {
                if (startRates[i] === -s2) {
                    rates[i] = -s1;
                } else {
                    rates[i] = 1;
                }
            }
            if (endRates[i] > 1) {
                if (rates[i] === -s1 && startRates[i] === -s2) {
                    endRates[i] = step;
                } else {
                    endRates[i] = 1;
                }
            }
        }

        frameId = window.requestAnimationFrame(play);
    }
};

const resize = () => {
    if (boxRef.value && canvasRef.value) {
        const { offsetWidth, offsetHeight } = boxRef.value;
        canvasWidth = offsetWidth;
        canvasHeight = offsetHeight;
        canvasRef.value.width = canvasWidth;
        canvasRef.value.height = canvasHeight;
    }
};


onMounted(() => {
    init();
    play();

    window.addEventListener("resize", resize);
})

onUnmounted(() => {
    frameId && cancelAnimationFrame(frameId);
    window.removeEventListener("resize", resize);
})

</script>

<template>
    <div :style="{
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#000'
    }" ref="boxRef">
        <canvas ref="canvasRef">
            Your browser version is too low, please update your browser
        </canvas>
    </div>
</template>