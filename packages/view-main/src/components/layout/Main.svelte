<script>
  import Router from '@/plugins/svelte-spa-router/Router.svelte'
  import routes from '@/plugins/routes'
</script>

<div class="view" id="view">
  <Router {routes} />
</div>

<style lang="less">
  .view {
    flex: auto;
    position: relative;
    z-index: 1;
    > :global(.view-container) {
      position: absolute !important;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
    }
    // background: #fff;
    // overflow: hidden;
  }
</style>
