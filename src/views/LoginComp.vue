<template>
  <form class="login" @submit.prevent="login">
     <h1>Вход</h1>
     <label>Логин</label>
     <el-input  v-model="username" type="text" placeholder="Name" required autofocus/>
     <label>Пароль</label>
     <el-input  v-model="password" type="password" placeholder="Password" required/>
     <button type="submit">Войти</button>
  </form>
</template>

<script>
export default {
  name: 'LoginComp',
  components: {   
  },
  data: function(){
          return{
            username : "",
            password : ""
          }   
        },
  methods:{
    login: function () {
        let username = this.username 
        let password = this.password
        this.$store.dispatch('login', { username, password })
       .then(() => this.$router.push('/main'))
       .catch(err => console.log(err), this.$router.push('/register'))
      }    
  },
}
</script>

<style scoped>
  form{
    text-align: center;
    box-shadow: 1px 1px 20px rgba(34, 34, 34, 0.1);
    padding: 50px;
    border-radius: 5px;
    background-color: white;
    margin-top: 10%;
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