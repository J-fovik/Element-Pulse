<template>
  <div style="width: 100%">
    <div class="container">
      <div class="content" value="你好，世界">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, #04182C, #000c17, #04182C);

  .content {
    width: 600px;
    height: 160px;
    background-image: linear-gradient(45deg, #000 0, #000 50%, #fff 50%);
    position: relative;

    &::after {
      /* 变量解析 */
      content: attr(value);
      position: absolute;
      white-space: nowrap;
      top: 50%;
      left: 50%;
      font-size: 56px;
      transform: translate(-14%, -50%);
      color: #fff;
      mix-blend-mode: difference;
      animation: move 5s infinite linear;
    }

    @keyframes move {
      0% {
        transform: translate(-14%, -50%);
      }

      50% {
        transform: translate(-86%, -50%);
      }

      100% {
        transform: translate(-14%, -50%);
      }
    }
  }
}
</style>