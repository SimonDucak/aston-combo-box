<template>
  <div id="app">
    <nav id="id" style="position: fixed; top: 0;">
      <router-link to="/combo">Combo box</router-link> |
      <router-link to="/datepicker">Datepicker</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style lang="less" coped>
  body {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: inherit;
    position: relative;
  }

  #app {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto', sans-serif;
  }
</style>
