<template>
  <div class="w-full">
    <div class="container">
      <div class="content">
        <div class="top">
          <div class="line" />
        </div>
        <div class="bottom" />
      </div>
      <svg>
        <filter id="fractal" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence id="turbulence" type="fractalNoise" baseFrequency="0.005 0.005" numOctaves="10">
            <animate attributeName="baseFrequency" dur="30s" values="0.005 0.005;0.05 0.3;0.005 0.005"
              repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="15"></feDisplacementMap>
        </filter>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  $backgroundColor: #111;
  width: 100%;
  height: 450px;
  background-color: $backgroundColor;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .content {
    width: 100%;
    height: 100%;
    position: relative;

    .top {
      position: absolute;
      width: 100%;
      height: 50%;
      top: 0;
      left: 0;
      overflow: hidden;

      &::before {
        content: "";
        position: absolute;
        border-radius: 50%;
        bottom: 0;
        left: 50%;
        width: 200px;
        height: 200px;
        transform: translate(-50%, 100px);
        box-sizing: border-box;
        background-color: $backgroundColor;
        border: 25px solid #fff;
        z-index: 1;
        box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.8),
          0 0 8px 2px rgba(255, 255, 255, 0.6);
      }

      &::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: repeating-radial-gradient(circle at 50% 100%,
            transparent,
            transparent 5px,
            #3a77f6 5.2px,
            #3a77f6 6.2px,
            transparent 6.5px);
        mask: radial-gradient(circle at 50% 100%,
            rgba(255, 255, 255, 1),
            transparent 25%,
            transparent);
        -webkit-mask: radial-gradient(circle at 50% 100%,
            rgba(255, 255, 255, 1),
            transparent 25%,
            transparent);
        z-index: 0;
      }

      .line {
        position: absolute;
        bottom: -8px;
        left: 50%;
        width: 96%;
        height: 6px;
        border-radius: 50%;
        background: rgba(46, 107, 232, 0.8);
        transform: translate(-50%, -50%);
        z-index: 10;
        filter: blur(5px) contrast(1.2) brightness(1.2);
        box-shadow: 0 0 5px rgba(46, 107, 232, 0.7);
      }
    }

    .bottom {
      position: absolute;
      width: 100%;
      height: 50%;
      top: 50%;
      left: 0;
      overflow: hidden;
      filter: url(#fractal);

      &::before {
        content: "";
        position: absolute;
        box-sizing: border-box;
        width: 200px;
        height: 200px;
        top: 0;
        left: 50%;
        border: 25px solid #fff;
        border-radius: 50%;
        background-color: $backgroundColor;
        transform: translate(-50%, -100px);
        z-index: 3;
        box-shadow: 0 0 4px rgba(255, 255, 255, 0.8),
          0 0 8px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.6);
        filter: blur(4px);
      }

      &::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: repeating-radial-gradient(circle at 50% 0,
            transparent,
            transparent 5px,
            #3a77f6 5.1px,
            #3a77f6 6.4px,
            transparent 6.5px);
        mask: radial-gradient(circle at 50% 0,
            rgba(255, 255, 255, 0.6),
            transparent 25%,
            transparent);
        -webkit-mask: radial-gradient(circle at 50% 0,
            rgba(255, 255, 255, 0.6),
            transparent 25%,
            transparent);
        z-index: 2;
      }
    }
  }

  svg {
    position: absolute;
  }
}
</style>
