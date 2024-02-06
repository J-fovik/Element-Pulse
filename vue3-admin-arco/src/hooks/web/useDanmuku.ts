import type { Ref } from 'vue'

// 基本配置
interface danmukuCommonConfig {
  autoplay?: boolean
  loop?: boolean
  speeds?: number
  top?: number
  right?: number
}

// 实例方法及属性
export interface danmukuValueProps extends danmukuCommonConfig {
  // play: () => void
  // pause: () => void
  // stop: () => void
  speedUp: (val: number) => void
  speedDown: (val: number) => void
  gapUp: (val: number) => void
  gapDown: (val: number) => void
}

interface danmukuRefProps {
  value: danmukuValueProps
}

type danmukuElement = Ref<HTMLDivElement> & danmukuRefProps

export function useDanmu(danmuDom: danmukuElement, config: danmukuCommonConfig) {
  danmuDom.value = { ...danmuDom.value, ...config }

  // 提速
  const speedUp = (val: number) => {
    ;(config.speeds as number) += val
  }

  // 减速
  const speedDown = (val: number) => {
    ;(config.speeds as number) -= val
  }

  // 提升间距
  const gapUp = (val: number) => {
    ;(config.top as number) += val
    ;(config.right as number) += val
  }

  // 降低间距
  const gapDown = (val: number) => {
    ;(config.top as number) -= val
    ;(config.right as number) -= val
  }

  return {
    speedUp,
    speedDown,
    gapUp,
    gapDown,
  }
}
