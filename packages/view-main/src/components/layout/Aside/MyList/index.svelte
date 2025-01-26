<script>
  import Header from './Header.svelte'
  import List from './List.svelte'
  // console.log(params)
</script>

<div class="container">
  <Header />
  <List />
</div>

<style lang="less">
  .container {
    margin-top: 10px;
    flex: auto;
    display: flex;
    flex-flow: column nowrap;
    overflow: hidden;
  }
</style>
