<script lang="ts">
  import VirtualizedList from '@/components/base/VirtualizedList.svelte'
  import { useListItemHeight } from '@/modules/app/reactive.svelte'
  import { playInfo, playList } from '@/modules/player/reactive.svelte'
  import ListItem from './ListItem.svelte'
  import Empty from '@/components/material/Empty.svelte'
  import { playerState } from '@/modules/player/store/state'
  import { musicClick } from '@/components/common/MusicList/List/action'
  import { type ComponentExports, onMount } from 'svelte'

  let listItemHeight = useListItemHeight(3.2)
  let picstyle = $derived(`height:${listItemHeight.val * 0.8}px; width:${listItemHeight.val * 0.8}px;`)
  let vl = $state<ComponentExports<typeof VirtualizedList<AnyListen.Player.PlayMusicInfo>> | null>(null)

  onMount(() => {
    vl?.scrollToIndex(playerState.playInfo.index, -100, false)
  })
</script>

<div class="container">
  {#if $playList.length}
    <VirtualizedList
      list={$playList}
      bind:this={vl}
      keyname="itemId"
      containerclass="list"
      itemheight={listItemHeight.val}
      contain="content"
      scrollbaroffset="0"
    >
      {#snippet row(item, index)}
        <ListItem
          info={item}
          {picstyle}
          {index}
          playing={$playInfo.index == index}
          onclick={(isKey) => {
            void musicClick(item.listId, item.musicInfo)
            if (isKey) void musicClick(item.listId, item.musicInfo)
          }}
        />
      {/snippet}
    </VirtualizedList>
  {:else}
    <Empty />
  {/if}
</div>

<style lang="less">
  .container {
    flex: auto;
    min-height: 0;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>
