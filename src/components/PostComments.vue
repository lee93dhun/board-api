<template>
  <div class="comment-area">
    <div class="comment" v-for="comment in comments" :key="comment.commentId">
      <p class="comment-writer">{{comment.commentWriter}} <span>{{comment.commentDatetime}}</span></p>
      <p>{{comment.commentContent}}</p>
    </div>
  </div>
  <div class="comment-input">
    <input v-model="newWriter" placeholder="작성자"/>
    <input v-model="newCommentContent" placeholder="댓글을 입력해주세요."/>
    <button @click="submitComment">등록</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'PostComments', 
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const newWriter = ref(''); 
    const newCommentContent = ref(''); 

    const submitComment = () => {
      if (newWriter.value.trim() && newCommentContent.value.trim()) {
        const newComment = {
          commentWriter: newWriter.value,
          commentContent: newCommentContent.value,
        };

        emit('add-comment', newComment);

        newWriter.value = '';
        newCommentContent.value = '';
      }
    };

    return {
      newWriter,
      newCommentContent,
      submitComment
    };
  }
};
</script>