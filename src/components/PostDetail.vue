<template>
  <div>
    <h2>게시판 - 보기</h2>
    <div class="top-area">
      <p>{{reactiveDt.postVO.postWriter}}</p>
      <div>
        <p>등록일시 {{reactiveDt.postVO.uploadDatetime}}</p> 
        <p>수정일시 {{reactiveDt.postVO.updateDatetime}}</p>
      </div>
    </div>
    <div class="content-head">
      <h3>
        <span>[ {{reactiveDt.postVO.categoryName}} ]</span>
        {{ reactiveDt.postVO.postTitle}}
      </h3>
      <p>조회수 : {{reactiveDt.postVO.postHits}}</p>
    </div>
    <div class="content-main">
      {{reactiveDt.postVO.postContent}}

      <div class="uploaded-file">
        <ul>
          <li v-for="file in reactiveDt.files" :key="file.fileId">
            <a href="#" >{{file.fileOrigin}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="comments">
      <!-- <PostComments :comments="reactiveDt.comments" /> -->
    </div>
    <div class="bottom-area">
      <button>목록</button>
      <button>수정</button>
      <button>삭제</button>
    </div>
  </div>  
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';
import boardService from '../service/BoardService';

const route = useRoute();
const postId = route.params.postId;

const reactiveDt = reactive({
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
  files: []
});


onMounted(()=>{
  boardService.getPost(postId)
    .then( (data) =>{
      console.log(data);
      Object.assign(reactiveDt, data);
      console.log('reactiveDt',reactiveDt);
    });
});

</script>

<style>

</style>