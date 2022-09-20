<template>
    <div>
        <label>Результатов на странице
        </label>
        <el-select v-model="selected">
            <el-option v-for="(option, index) in this.limitPicker" :value='option' :key="index">{{option}}</el-option>
        </el-select>
        <p v-for="index in this.totalPages"
        :key="index" @click="pageClicker(index)" 
        :class="{'active' : numberOfPage === index}">{{index}}</p>
    </div>
</template>
<script>
    
    export default {
        name: 'PaginationC',
        data: function(){
          return{
            limitPicker: [10, 20, 40],
            selected: 10,
            currentPage: null,
            numberOfPage: 1,
            isActive: false,  
          }  
        },
        computed:{
            totalPages() {
                return  Math.ceil(this.$store.state.statObjFull.length / this.selected);
            }        
        },
        watch:{
            selected(){
                let selected = this.selected;
                this.$store.commit('setNewLimit', selected),
                this.$store.dispatch('stat')    
            }
        },
        methods: {
           pageClicker: function(i){  
                this.numberOfPage = i
                this.currentPage = i*this.selected - this.selected;
                this.$store.commit('setNewOffset', this.currentPage)
                this.$store.dispatch('stat')
            }
        }
    }
</script>
<style scoped>
    p{
        display: inline-block;
        margin: 20px;
        cursor: pointer;
    }
    .active{
        color: blue
    }
</style>