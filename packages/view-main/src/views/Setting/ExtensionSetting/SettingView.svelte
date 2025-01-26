<script lang="ts">
  import { verticalScrollbar } from '@/shared/compositions/verticalScrollbar'
  import SettingItem from './SettingItem.svelte'

  let {
    id,
    name,
    list,
  }: {
    id: string
    name: string
    list: AnyListen.Extension.SettingValueItem[]
  } = $props()
</script>

<div class="settings-list-container">
  <div class="settings-list" use:verticalScrollbar>
    <h3 class="settings-title">{name}</h3>
    {#each list as item (item.field)}
      <SettingItem {id} {item} />
    {/each}
  </div>
</div>

<style lang="less">
  .settings-list-container {
    flex: auto;
    min-width: 0;
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
    flex: auto;
  }
  .settings-list {
    flex: auto;
    min-height: 0;
    display: flex;
    flex-flow: column nowrap;
    margin: 0 10px;
    // gap: 8px;
  }
</style>
