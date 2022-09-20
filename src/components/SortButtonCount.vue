<template>
    <div>
        <button class="sortButton" @click="sort">
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                width="26" 
                height="26" 
                viewBox="0 0 26 26">
                    <path d="M11 8L7 4M7 4L3 8M7 4L7 20" 
                        stroke="#292929" 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2"/>
                    <path d="M13 16L17 20M17 20L21 16M17 20L17 4" 
                        stroke="#292929" 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2"/>
            </svg>
        </button>
    </div>
</template>
<script>
    export default{
        name: 'SortButton',
        data: function(){
            return{
                sortDirectionTarg: 'asc_counter'
            }    
        },
        methods:{
            sort: function(){
          if(this.sortDirectionTarg === 'asc_counter'){
           this.sortDirectionTarg = 'desc_counter'
          } else {
           this.sortDirectionTarg = 'asc_counter'
          }
           console.log (this.sortDirectionTarg),
           this.$store.commit('setNewOrder', this.sortDirectionTarg),
           this.$store.dispatch('stat')
      
       }
        }
    }
</script>
<style scoped>
    .sortButton{
        border: none;
        background-color: white;
        
    }
    path{
        stroke:  rgb(8, 142, 252);
    }
    svg:hover{
        background-color: rgb(221, 239, 255);
    }
</style>