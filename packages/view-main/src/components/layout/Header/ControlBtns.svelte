<script lang="ts">
  import ControlBtnsElectron from './ControlBtnsElectron.svelte'
  import ControlBtnsWeb from './ControlBtnsWeb.svelte'
</script>

{#if import.meta.env.VITE_IS_ELECTRON}
  <ControlBtnsElectron />
{/if}
{#if import.meta.env.VITE_IS_WEB}
  <ControlBtnsWeb />
{/if}
