<script lang="ts">
  import Header from './Header.svelte'
  import { query } from '@/plugins/routes'
  import { viewTypes } from './shared'
  import Search from './Search/Search.svelte'
  import Songlist from './Songlist/Songlist.svelte'
  import Leaderboard from './Leaderboard/Leaderboard.svelte'
  import Album from './Album/Album.svelte'
  import Singer from './Singer/Singer.svelte'
  // import InstalledList from './InstalledList.svelte'
  // import OnlineList from './OnlineList.svelte'

  let activeView = $derived<(typeof viewTypes)[number]>(viewTypes.find(t => t == $query.type) ?? 'search')
</script>

<div class="view-container container">
  <Header activeview={activeView} />
  {#if activeView == 'search'}
    <Search />
  {:else if activeView == 'songlist'}
    <Songlist />
  {:else if activeView == 'leaderboard'}
    <Leaderboard />
  {:else if activeView == 'album'}
    <Album />
  {:else if activeView == 'singer'}
    <Singer />
  {/if}
  <!-- {#if activeView == 'online'}
    <OnlineList />
  {:else}
    <InstalledList type={activeView} />
  {/if} -->
</div>

<style lang="less">
  .container {
    // padding: 10px 15px;
    display: flex;
    flex-flow: column nowrap;
  }
</style>
