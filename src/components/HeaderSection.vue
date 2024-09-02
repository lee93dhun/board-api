<template>
  <div class="header">
    <b @click="showBoardList">게시판</b>
  </div>
</template>

<script setup>
import { useRouter}from 'vue-router';

  const router = useRouter();

  const showBoardList = () => {
    router.push('/list')
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