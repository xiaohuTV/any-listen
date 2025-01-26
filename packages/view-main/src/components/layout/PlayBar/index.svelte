<script>
  import MiniBar from './MiniBar.svelte'
  import CenterBar from './CenterBar.svelte'
  import { useSettingValue } from '@/modules/setting/reactive.svelte'

  const playBarProgressStyle = useSettingValue('common.playBarProgressStyle')
</script>

{#if playBarProgressStyle.val == 'mini'}
  <MiniBar />
{:else if playBarProgressStyle.val == 'center'}
  <CenterBar />
{/if}
