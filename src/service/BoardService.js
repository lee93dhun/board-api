import axios from 'axios';


export default {
  
  /**
   * 서버로 부터 게시판 페이지에 필요한 데이터 가져오기
   * @param {*} queryParams 
   *  URL로 부터 추출한 파라미터 값들을 포함한 객체, null 허용  
   * @param {*} page 게시판 리스트에서 보여줄 페이지 숫자
   * @returns 게시판 리스트에서 사용할 데이터들 
   */
  async getBoardList ( queryParams = {}, page) {
    console.log('getBoardList() 실행');
    queryParams.page = page;
    const respData = await axios.get("/list", { params: queryParams });
      return respData.data;
    }

  }
  

