<template>
  <div style="width: 100%">
    <div class="container">
      <div class="content">
        <img :src="scenery1" alt="" />
        <img :src="scenery2" alt="" />
        <img :src="scenery3" alt="" />
        <img :src="scenery4" alt="" />
        <img :src="scenery5" alt="" />
        <img :src="scenery6" alt="" />
        <img :src="scenery7" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup>
import scenery1 from "/src/assets/images/scenery1.jpg";
import scenery2 from "/src/assets/images/scenery2.jpg";
import scenery3 from "/src/assets/images/scenery3.jpg";
import scenery4 from "/src/assets/images/scenery4.jpg";
import scenery5 from "/src/assets/images/scenery5.jpg";
import scenery6 from "/src/assets/images/scenery6.jpg";
import scenery7 from "/src/assets/images/scenery7.jpg";
</script>



<style scoped lang="scss">
.container {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, #04182c, #000c17, #04182c);

  .content {
    --s: 130px;
    /* control the size */
    --g: 10px;
    /* control the gap */
    display: grid;
    margin: calc(var(--s) + var(--g));

    img {
      grid-area: 1/1;
      width: var(--s);
      aspect-ratio: 0.866;
      object-fit: cover;
      clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0);
      transform: translate(var(--x, 0), var(--y, 0)) scale(var(--t, 1));
      cursor: pointer;
      filter: grayscale(80%);
      transition: 0.2s linear;

      &:nth-child(1) {
        --x: calc(-100% - var(--g));
      }

      &:nth-child(7) {
        --x: calc(100% + var(--g));
      }

      &:nth-child(3),
      &:nth-child(5) {
        --y: calc(-75% - 0.87 * var(--g));
      }

      &:nth-child(4),
      &:nth-child(6) {
        --y: calc(75% + 0.87 * var(--g));
      }

      &:nth-child(3),
      &:nth-child(4) {
        --x: calc(-50% - 0.5 * var(--g));
      }

      &:nth-child(5),
      &:nth-child(6) {
        --x: calc(50% + 0.5 * var(--g));
      }

      &:hover {
        filter: grayscale(0);
        z-index: 1;
        --t: 1.2;
      }
    }
  }
}</style>