<script lang="ts">
  import type { SettingListItem } from './settings'
  import SettingCommonItem from './SettingCommonItem.svelte'
  import SettingItemComponentItem from './SettingItemComponentItem.svelte'

  let {
    item,
  }: {
    item: SettingListItem
  } = $props()
</script>

<div class="settings-item">
  {#if item.type === 'component'}
    <SettingItemComponentItem {item} />
  {:else}
    <SettingCommonItem {item} />
  {/if}
</div>

<style lang="less">
  // .settings-item {
  //   padding-right: 10px;
  // }
</style>
