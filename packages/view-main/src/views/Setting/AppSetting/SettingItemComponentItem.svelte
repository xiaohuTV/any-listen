<script lang="ts">
  import type { SettingListComponentItem } from './settings'

  let {
    item,
  }: {
    item: SettingListComponentItem
  } = $props()
</script>

<div class="settings-item">
  <item.component />
</div>

<style lang="less">
  // .settings-item {
  //   padding-right: 10px;
  // }
</style>
