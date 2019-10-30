<template>
  <div class="header">
    <div class="header-line">DatenAdler Brandenburg</div>
    <div class="logo-container content_container">
      <div class="logo logo-left">
        <img src="../../../assets/brandenburg-logo.png" alt="Logo Brandenburg"/>
      </div>
      <div class="logo logo-right">
        <img src="../../../assets/datenadler-logo.png" alt="Logo Datenadler"/>
      </div>
    </div>
    <div class="header_content content_container">
      <pkan-menu ></pkan-menu>
      <hr/>
      <breadcrumb></breadcrumb>
    </div>

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
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .logo img {
    max-width: 200px;
    max-height: 90px;
  }

  .logo-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .header_content {
    padding-bottom: 0;
  }

  .header_content .breadcrumb {
    padding-top: 30px;
    padding-bottom: 3px;
  }

  .header-line {
    padding-left: 30px;
    padding-right: 30px;
  }

</style>
