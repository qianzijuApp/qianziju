import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    token: '',

    // baseUrl: 'http://101.207.139.80/meixia/',

    // imagesUrl:'http://101.207.139.80/meixia/common/uploadOssPic',

	  //请求配置请求头为formData;
    config:{
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        }
};
export default new Vuex.Store({
    state: state,
    getters:{
        getToken: state=>state.token,
        getimagesUrl:state=>state.imagesUrl
    },
    mutations:{
        setToken(state,data){
            state.token = data;
            sessionStorage.token = data;
        }
    }
})
