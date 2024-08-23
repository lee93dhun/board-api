<template>
  <div>
    <h2>게시판 - 보기</h2>
    <div class="top-area">
      <p>{{respData.postVO.postWriter}}</p>
      <div>
        <p>등록일시 {{respData.postVO.uploadDatetime}}</p> 
        <p>수정일시 {{respData.postVO.updateDatetime}}</p>
      </div>
    </div>
    <div class="content-head">
      <h3><span>[ {{respData.postVO.categoryName}} ]</span> {{ respData.postVO.postTitle}}</h3>
      <p>조회수 : {{respData.postVO.postHits}}</p>
    </div>
    <div class="content-main">
      {{respData.postVO.postContent}}

      <div class="uploaded-file">
        <ul>
          <li v-for="file in respData.files" :key="file.fileId">
            <a href="#" >{{file.fileOrigin}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="comments">
      <!-- comment component 호출 -->
    </div>
    <div class="bottom-area">
      <button>목록</button>
      <button>수정</button>
      <button>삭제</button>
    </div>
  </div>  
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios';
import { onMounted, reactive } from 'vue';

  export default{
    name: 'PostDetail',
    setup(){
      const route = useRoute();
      const postId = route.params.postId;

      const respData = reactive({
        postVO: {
          postId: 0,
          postTitle: '',
          postWriter: '',
          postContent: '',
          postHits: 0,
          uploadDatetime: '',
          updateDatetime: '',
          categoryName: ''
        },
        files: [],
        comments: []
      });

      const fetchData = async(postId) =>{
        try{
          const response = await axios.get(`/post/${postId}`);
          respData.postVO = response.data.postVO || {};
          respData.files = response.data.files || [];
          respData.comments = response.data.comments || [];
        }catch(error){
          console.log(error);
          console.log("데이터를 가져오는 중 오류 발생")
        }
      };

      onMounted(()=>{
        fetchData(postId);
        console.log('onMounted >> ',postId)
      })

      return{
        respData
      }
    }

  }
</script>

<style>

</style>