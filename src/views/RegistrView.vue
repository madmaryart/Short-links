<template>
  <div>
      <form @submit.prevent="register">
        <h1>Регистрация</h1>
        <label for="name">Логин</label>
        <el-input id="name" type="text" v-model="name" required autofocus/>
        <label for="password">Пароль</label>
        <el-input id="password" type="password" v-model="password" required/>
        <button type="submit">Регистрация</button>
      </form>
  </div>
</template>

<script>
  export default {
    name: 'RegistrView',
    components: {  
    },
    data: function(){
          return{
            name : "",
            password : "",
            is_admin : null
          }   
    },
    methods:{
      register: function(){
        let data = {
          name: this.name, 
          password: this.password, 
        }
        this.$store.dispatch('register', data)
        .then(() => this.$router.push('/login'))
        .catch(err => console.log(err))
      },
    }
  }
</script>

<style scoped>
  form{
    text-align: center;
    box-shadow: 1px 1px 20px rgba(34, 34, 34, 0.1);
    padding: 50px;
    border-radius: 5px;
    background-color: white;
    margin-top: 32%;
  }
 label{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 0 10px 0;
    width: 300px;
  }
  .el-input{
    width: 300px; 
  }
  button{
    display: block;
    margin: 10px 10px 10px 30%;
    width: 100px;
    height: 30px;
    background-color: rgb(66, 170, 255);
    color: white;
    border: 0;
    border-radius: 5px;
  }
  button:hover{
    background-color: rgb(8, 142, 252);
  }
</style>