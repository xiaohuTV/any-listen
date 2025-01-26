<script lang="ts">
  import Popup from '@/components/base/Popup.svelte'
  import PlayerProgressBar from '@/components/common/PlayerProgressBar.svelte'
  import { duration, progress } from '@/modules/player/reactive.svelte'
  import { onActivePlayProgressTransition } from '@/modules/player/shared'
  import { onMount } from 'svelte'

  let isActiveTransition = $state(false)
  let visibleProgress = $state(false)
  let visible = $state(false)
  let domBtn = $state<HTMLElement | null>(null)

  const handleShowPopup = (evt: MouseEvent) => {
    if (visible) {
      evt.stopPropagation()
      // handlMsLeave()
    } else handlMsEnter()
  }
  let timeout: number | null = null
  const handlMsEnter = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    if (visible) return
    timeout = setTimeout(() => {
      visible = true
      visibleProgress = true
    }, 100)
  }
  const handlMsLeave = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    if (!visible) return
    timeout = setTimeout(() => {
      timeout = null
      visible = false
    }, 100)
  }
  const handleTranEnd = () => {
    if (visible) return
    visibleProgress = false
  }

  onMount(() => {
    return onActivePlayProgressTransition(() => {
      isActiveTransition = true
    })
  })
</script>

<button class="content" onclick={handleShowPopup} onmouseenter={handlMsEnter} onmouseleave={handlMsLeave}>
  <div bind:this={domBtn} class="timeContent">
    <span>{$progress.nowPlayTimeStr}</span>
    <span class="dv">/</span>
    <span>{$duration.label}</span>
    <div class="progress">
      <div
        class="progressBar"
        class:barTransition={isActiveTransition}
        style={`transform: scaleX(${$progress.progress || 0})`}
        ontransitionend={() => {
          isActiveTransition = false
        }}
      ></div>
    </div>
    <Popup {visible} btnel={domBtn} onmouseenter={handlMsEnter} onmouseleave={handlMsLeave} ontransitionend={handleTranEnd}>
      <div class="popupProgress">
        {#if visibleProgress}
          <PlayerProgressBar />
        {/if}
      </div>
    </Popup>
  </div>
</button>

<style lang="less">
  .content {
    flex: none;
    position: relative;
    padding: 15px 0;
    background-color: transparent;
    border: none;
    &:hover {
      .progress {
        opacity: 1;
      }
    }
  }
  .timeContent {
    // width: 30%;
    position: relative;
    // flex: none;
    color: var(--color-550);
    font-size: 13px;
    // padding-left: 10px;
    // display: flex;
    // flex-flow: column nowrap;
    // align-items: center;
    padding-bottom: 3px;
  }

  .progress {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    // flex: auto;
    margin-top: 2px;
    contain: strict;
    // width: 160px;
    // position: relative;
    // padding-bottom: 6px;
    // margin: 0 8px;
    height: 2px;
    opacity: 0.24;
    overflow: hidden;
    transition: @transition-normal;
    transition-property: background-color, opacity;
    background-color: var(--color-primary-light-100-alpha-800);

    .progressBar {
      height: 100%;
      width: 100%;
      // position: absolute;
      background-color: var(--color-primary-light-100-alpha-400);
      // left: 0;
      // top: 0;
      transform-origin: 0;
      will-change: transform;
    }

    .barTransition {
      transition-property: transform;
      transition-timing-function: ease-out;
      transition-duration: 0.2s;
    }
  }

  .popupProgress {
    position: relative;
    width: 300px;
    height: 15px;
    padding: 5px 0;
    margin: 0 5px;
  }
</style>
