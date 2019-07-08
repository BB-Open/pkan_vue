<template>
  <div class="header">
    <div class="header-line">Datenadler Land Brandenburg</div>
    <div class="logo-container">
      <div class="logo logo-left">
        <img src="../../../assets/brandenburg-logo.png" alt="Logo Brandenburg"/>
      </div>
      <div class="logo logo-right">
        <img src="../../../assets/datenadler-logo.png" alt="Logo Datenadler"/>
      </div>
    </div>
    <pkan-menu></pkan-menu>
    <hr/>
    <breadcrumb></breadcrumb>
  </div>
</template>

<script>
    import PkanMenu from "./PkanMenu";
    import Breadcrumb from "./Breadcrumb";

    export default {
        name: "PkanHeader",
      components: {
        PkanMenu,
        Breadcrumb
      },
    }
</script>

<style scoped>
  .header-line {
    height: 30px;
    line-height: 30px;
    background-color: #C73C35;
    color: #fff;
    white-space: nowrap;
    text-align: left;
  }

  .logo {
    margin-top: auto;
    margin-bottom: auto;
    height: 100%;
  }

  .logo img {
    max-width: 200px;
    max-height: 100px;
  }

  .logo-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }

</style>
