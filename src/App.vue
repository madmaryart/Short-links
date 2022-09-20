<template>
  <div id="app">
    <router-view/>  
  </div>
</template>

<script>
export default {
    methods: {
        logout: function () {
            this.$store.dispatch("logout")
                .then(() => {
                this.$router.push("/login");
            });
        }
    },   
}
</script>

<style>
  body{
    background-color: rgb(241, 241, 241);
  }
  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center; 
  color: #2c3e50;
  }
</style>
