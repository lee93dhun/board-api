<template>
  <div>
    <h2>게시판 - 리스트</h2>
    <div class="search-filter">
      <label>등록일</label>
      <input class="searchDate" type="date" v-model="respData.boardFilterVO.startDate" name="startDate"/> - 
      <input class="searchDate" type="date" v-model="respData.boardFilterVO.endDate" name="endDate"/>
      <select class="searchCategory" v-model="respData.boardFilterVO.category">
        <option :value="null">카테고리 선택</option>
        <option v-for="category in respData.categoryList" :key="category.categoryId" :value="category.categoryId">{{ category.categoryName }}</option>
      </select>
      <input class="searchKeyword" type="text" v-model="respData.boardFilterVO.keyword" name="keyword"/>
      <button class="searchBtn" @click="searchPost">검색</button>
    </div>
    <p>총 {{ respData.postCount }}건</p>
    <div class="board-list">
      <table>
        <colgroup>
          <col style="width: 15%">
          <col style="width: 5%">
          <col style="width: 30%">
          <col style="width: 10%">
          <col style="width: 10%">
          <col style="width: 15%">
          <col style="width: 15%">
        </colgroup>
        <tr>
          <th>카테고리</th>
          <th>첨부</th>
          <th>제목</th>
          <th>작성자</th>
          <th>조회수</th>
          <th>등록일시</th>
          <th>수정일시</th>
        </tr>
        <tr v-if="respData.boardListByFilter.length == 0">
          <td colspan="7">조건에 맞는 게시물이 없습니다.</td>
        </tr>
        <tr v-for="post in respData.boardListByFilter" :key="post.postId">
          <td>{{ post.categoryName }}</td>
          <td>
            <i v-if="post.hasFiles" class="fas fa-paperclip"></i>
          </td>
          <td>
            <router-link :to="{name: 'PostDetail', params:{ postId : post.postId } }">{{ post.postTitle }}</router-link>
          </td>
          <td>{{ post.postWriter }}</td>
          <td>{{ post.postHits }}</td>
          <td>{{ post.uploadDatetime.replace('T',' ') }}</td>
          <td>{{ post.updateDatetime === '9999-12-31T23:59:59' ? '-' : post.updateDatetime.replace('T',' ')}}</td>
        </tr>
      </table>
    </div>
    <div class="pagination">
      <button class="page-btn" @click="goToPage(respData.pageVO.currentPage - 1)" :disabled="respData.pageVO.currentPage === 1">
        <i class="fas fa-chevron-left"></i>
      </button>

      <ul>
        <li v-for="page in respData.pageVO.totalPage" :key="page" :class="{ active: page === respData.pageVO.currentPage }" @click="goToPage(page)">
          <a>{{ page }}</a>
        </li>
      </ul>

      <button class="page-btn" @click="goToPage(respData.pageVO.currentPage + 1)" :disabled="respData.pageVO.currentPage === respData.pageVO.totalPage">
        <i class="fas fa-chevron-right"></i>
      </button>
     <!-- TODO 한번에 보여줄 pagenattion 범위 지정 , 범위 이동 버튼(기능) 생성 -->

    </div>
  
    <button class="registerBtn">등록</button>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

    const respData = reactive({
      categoryList: [],
      postCount: 0,
      boardFilterVO: {
        startDate: '',
        endDate: '',
        category: '',
        keyword: ''
      },
      boardListByFilter: [],
      pageVO: {
        currentPage: 1,
        totalPage: 1
      }
    });

    const route = useRoute();
    const router = useRouter();


    const fetchData = async ( queryParams  = {},page = route.params.page) => {
      try{
        console.log('fetchData() 실행');
        queryParams.page = page;
        const response = await axios.get("/list", {params: queryParams});

        respData.categoryList = response.data.categoryList || [];
        respData.postCount = response.data.postCount || 0;
        respData.boardFilterVO = response.data.boardFilterVO || {};
        respData.boardListByFilter = response.data.boardListByFilter || {};
        respData.pageVO = response.data.pageVO || {
          currentPage: 1, totalPage: 1
        };
      }catch(error){
        console.log('데이터를 가져오는 오류 발생');
      }
    };
    
    const buildQueryParams = (filterVO, page) => {
      const queryParams = {};

      if (filterVO.startDate) queryParams.startDate = filterVO.startDate;
      if (filterVO.endDate) queryParams.endDate = filterVO.endDate;
      if (filterVO.category) queryParams.category = filterVO.category;
      if (filterVO.keyword) queryParams.keyword = filterVO.keyword;

      queryParams.page = page;

      return queryParams;
    };

    const searchPost = () =>{
      const queryParams = buildQueryParams(respData.boardFilterVO,1);

      router.push({path: '/list',query: queryParams});

      fetchData(queryParams, queryParams.page);
    };

    const goToPage = (page) => {
      const queryParams = buildQueryParams(respData.boardFilterVO, page);

      router.push({ path: 'list', query: queryParams });
      fetchData(queryParams, page);
    };

    onMounted(() => {
      const initialQueryParams = route.query;
      Object.assign(respData.boardFilterVO, initialQueryParams);
      fetchData(initialQueryParams, respData.pageVO.currentPage);
    });


</script>

<style>
  .search-filter{
    border: 1px solid black;
    padding: 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .searchCategory{
    height: 30px;
  }
  .searchDate, .searchKeyword{
    height: 22px;
  }
  .search-filter input, .search-filter select{
    margin: 0 10px;
    padding: 2px 4px;
  }
  .searchDate, .searchCategory{
    width: 150px;
  }
  .searchKeyword{
    width: 250px;
  }
  .searchBtn{
    width: 80px;
    height: 30px;
  }
  .board-list{
    margin: 20px 5px;
  }
  .board-list table, .board-list th, .board-list td {
    border-collapse: collapse;
  }
  .board-list table{
    border-top: 1px solid #c1c1c1;
    width: 100%;
  }
  .board-list th{
    border-bottom: 1px solid black;
  }
  .board-list td{
    border-bottom: 1px solid #c1c1c1;
  }
  .board-list td,.board-list th{
    padding: 7px 5px;
    text-align: center;
    font-size: 15px;
  }

  .pagination li.active a {
    font-weight: bold;
    color: red;
    text-decoration: underline;
  }
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pagination ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .pagination li {
    margin: 0 5px;
    cursor: pointer;
  }
  .pagination button {
    margin: 0 10px;
    padding: 5px 10px;
    cursor: pointer;
  }

  .pagination button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .page-btn{
    background-color: transparent;
    border: none;
  }
  .registerBtn{
    float: right;
    width: 80px;
    height: 30px;
  }
</style>
