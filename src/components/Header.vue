<template>
  <div class="header">
    <b @click="showBoardList">게시판</b>
  </div>
</template>

<script>
import { useRouter}from 'vue-router';
  export default {
    name: 'HeaderComponent',
    setup(){

      const router = useRouter();

      const showBoardList = () => {
        console.log('click event');
        router.push('/list')
      }
      
      return {
        showBoardList
      }
    } 
  }
</script>

<style>
  .header{
    padding: 10px 10px;
    border-bottom: 1px solid rgb(82, 81, 81);
    text-align: center;
  }
  .header b{
    cursor: pointer;
  }
</style>