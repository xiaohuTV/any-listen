<script lang="ts">
  import type { Position } from './shared'
  import { tick, untrack } from 'svelte'
  import { fade } from 'svelte/transition'

  let {
    onafterleave,
  }: {
    onafterleave?: () => void
  } = $props()

  let position = $state.raw({ x: 0, y: 0 })
  let message = $state('')
  let visible = $state(false)
  let maxWidth = $state('80%')
  let transform = $state('translate(0, 0)')
  let style = $derived(`left:${position.x}px;top:${position.y}px;transform:${transform};max-width:${maxWidth};`)
  let domTips = $state<HTMLDivElement>()
  let autoCloseTimer: null | number = null

  const handleGetMaxWidth = (left: number) => {
    const containerWidth = document.documentElement.clientWidth
    let maxWidth = containerWidth - left
    return (maxWidth > left ? maxWidth : left - 12) - 30
  }
  const handleGetOffsetXY = (left: number, top: number) => {
    const tipsWidth = domTips!.clientWidth
    const tipsHeight = domTips!.clientHeight
    const domContainer = document.documentElement
    const containerWidth = domContainer.clientWidth
    const containerHeight = domContainer.clientHeight
    const offsetWidth = containerWidth - left - tipsWidth
    const offsetHeight = containerHeight - top - tipsHeight
    let x = 0
    let y = 0
    if (tipsWidth < left && containerWidth > tipsWidth && offsetWidth < 5) {
      x = -tipsWidth - 12
    }
    if (tipsHeight < top && containerHeight > tipsHeight && offsetHeight < 5) {
      y = -tipsHeight - 8
    }
    return `${x}px, ${y}px`
  }

  $effect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    message
    untrack(() => {
      void tick().then(async () => {
        maxWidth = `${handleGetMaxWidth(position.x)}px`
        await tick()
        if (!domTips) return
        transform = `translate(${handleGetOffsetXY(position.x, position.y)})`
      })
    })
  })

  let autoCloseTime = 0
  const addAutoCloseTimer = () => {
    clearAutoCloseTimer()
    autoCloseTimer = setTimeout(() => {
      autoCloseTimer = null
      visible = false
    }, autoCloseTime)
  }
  const clearAutoCloseTimer = () => {
    if (!autoCloseTimer) return
    clearTimeout(autoCloseTimer)
    autoCloseTimer = null
  }
  export const show = (_position: Position, _message: string, _autoCloseTime = 0) => {
    position = _position
    message = _message
    autoCloseTime = _autoCloseTime
    addAutoCloseTimer()
    visible ||= true
  }
  export const hide = () => {
    clearAutoCloseTimer()
    visible &&= false
  }
  export const setTips = (_message: string) => {
    message = _message
    addAutoCloseTimer()
  }
</script>

{#if visible}
  <div transition:fade={{ duration: 100 }} bind:this={domTips} {style} class="tips" role="presentation" onoutroend={onafterleave}>
    {message}
  </div>
{/if}

<style lang="less">
  .tips {
    position: fixed;
    // transform: scale(1);
    line-height: 1.2;
    word-wrap: break-word;
    padding: 4px 5px;
    z-index: 10001;
    font-size: 12px;
    // max-width: 80%;
    color: var(--color-font);
    border-radius: 3px;
    background: var(--color-content-background);
    overflow: hidden;
    pointer-events: none;
    // text-align: justify;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    white-space: pre-wrap;
    box-sizing: border-box;
  }

  // :global(.tips-fade-enter-active),
  // :global(.tips-fade-leave-active) {
  //   transition: opacity 0.2s;
  // }
  // :global(.tips-fade-enter),
  // :global(.tips-fade-leave-to) {
  //   opacity: 0;
  // }
</style>
