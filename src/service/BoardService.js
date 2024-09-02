import axios from 'axios';

// TODO axios api 모듈 따로 빼기 ? 
export default {
  
  /**
   * 서버로 부터 게시판 페이지에 필요한 데이터 가져오기
   * @param {*} queryParams 
   *  URL로 부터 추출한 파라미터 값들을 포함한 객체, null 허용  
   * @param {*} page 게시판 리스트에서 보여줄 페이지 숫자
   * @returns 게시판 리스트에서 사용할 데이터들 
   */
  async getBoardList ( queryParams = {}, page = 1) {
    console.log('getBoardList() 실행');
    try{
      queryParams.page = page;
      const respData = await axios.get("/list", { params: queryParams });

      return respData.data;
    }catch(error){
      throw new Error ('게시판 리스트를 가지고 오는중 문제가 발생')
    }
  },

  async getPost (postId) {
    console.log('getPost() 실행');
    try{
      const respData = await axios.get(`/post/${postId}`);
      return respData.data;
    }catch(error){
      throw new Error('게시물을 가지고 오는중 문제 발생');
    }
  }



}
  

