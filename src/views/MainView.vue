<template>
    <div class="mainContent">
        <label>Введите адрес ссылки:</label>
        <el-input type="url" placeholder="Длинная ссылка" v-model="longLink"/>
        <button type="submit" @click="squeeze">Хочу короткую!</button>
        <button class="logout" type="submit" @click="logout">Выйти</button>
        <p>Короткая cсылка: {{this.respObj}}</p>
        <table>
            <thead>
                <th>Длинная ссылка 
                    <SortButtonTarg class="sortB"/>    
                </th>
                <th>Короткая ссылка 
                    <SortButtonShort class="sortB"/>
                </th>
                <th>Количество переходов 
                    <SortButtonCount class="sortB"/>
                </th>
            </thead>
            <tbody>
                <tr v-for="item in this.$store.state.statObj" :key="item.id">
                    <td>{{item.target}}</td>
                    <td>{{item.short}}</td>
                    <td>{{item.counter}}</td>
                </tr>   
            </tbody>
        </table>   
        <PaginationC/>
    </div>
</template>

<script>
    import PaginationC from '@/components/PaginationC.vue'
    import SortButtonTarg from '@/components/SortButtonTarg.vue'
    import SortButtonCount from '../components/SortButtonCount.vue'
    import SortButtonShort from '../components/SortButtonShort.vue'

    export default  {
        components: {
            PaginationC,
            SortButtonTarg,
            SortButtonCount,
            SortButtonShort
        },
        name: 'MainView',
        mounted(){
            this.stat()  
        },
        data: function(){
            return{
                longLink: '',
                respObj:'',
                offset: 10,    
            }    
        },
        methods:{
            logout: function(){
                this.$store.dispatch('logout')
                .then(() => this.$router.push('/login'))
                .catch(err => console.log(err))
            },
            stat: function(){
                this.$store.dispatch('stat')
                .then()
                .catch(err => console.log(err)); 
            },
            squeeze: function(){
                this.$store.dispatch('squeeze', this.longLink, this.respObj)
                .then(resp => this.respObj ='http://79.143.31.216/s/' + resp.data.short)
                .catch(err => console.log(err));
                this.stat()  
            }, 
        }
    }         
</script>

<style scoped>
    .mainContent{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background-color: white;
        position: relative;
        padding: 20px;
    }
    table {
        text-align: center;
        font-size: 13px;
        table-layout: fixed;
        width: 100%;
        border-collapse: collapse;  
    }
    th, tr, td {
        padding: 5px;
        border: 1px solid rgb(118, 193, 255);
        position: relative;
        height: 30px;
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
        margin: 10px 0 10px 0;
        width: 120px;
        height: 30px;
        background-color: rgb(66, 170, 255);
        color: white;
        border: 0;
        border-radius: 5px;
    }
    button:hover{
        background-color: rgb(8, 142, 252);
    }
    .logout{
        color: rgb(29, 29, 29);
        background-color: rgb(255, 255, 255);
        position: absolute;
        left: 94%
    }
    .logout:hover{
        color: rgb(8, 142, 252);
        background-color: rgb(255, 255, 255);
    }
    .sortB{
        width: 30px;
        background-color: white;
        display: flex;
        position: absolute;
        left: 80%;
        top: 15%
    }
    .sortB:hover{
        background-color: rgb(170, 217, 255);  
    }
</style>