import Vue from 'vue'
import Axios from 'axios'
import store from './../store/store'
import { Message, Loading } from 'element-ui';

import router from './../router/index';     //引入router


//Axios.defaults.baseURL = 'http://101.207.139.80/meixia/';
Axios.defaults.baseURL = 'http://192.168.20.158:8080/';
Axios.defaults.timeout = 50000;

Axios.defaults.withCredentials = true;

// http request 拦截器
Axios.interceptors.request.use(
	config => {
		if(store.state.token) { //判断是否存在token,如果存在，则在每个header都加上token
			config.headers['token'] = store.state.token; //请求头设置token
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);

// http response 拦截器
Axios.interceptors.response.use(
	response => {
		//如果返回1  需要重新登录
		if(response.data.code == 602) {
			Message({
				message:'请重新登录',
				type: 'warning'
			});
			router.replace({
              path: '/',
            })
		}
		return response;
	},
	err => {
		alert(1)
		Message({
            message: err.response.data.msg,
            type: 'warning'
        });
		// return Promise.reject(err);
	}
);

/***
 * 公用的server方法
 */

export default {
	//get请求
	get: (url, data, load) => {
		let loading;
		if(load || load == undefined) {
			loading = Loading.service({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.5)'
			});
		}
		return new Promise((resolve, reject) => {
			Axios.get(url, {
				params: data
			}).then((res) => {
				//如果动画为true，返回之后需要关闭动画
				if(load || load == undefined) {
					loading.close();
				}
				resolve(res.data)
				// if(res.data.code == 0) {
				// 	resolve(res.data)
				// } else if(res.data.code == 500) {
				// 	resolve(res.data);
				// 	Message({
				// 		message: res.data.msg,
				// 		type: 'warning'
				// 	});
				// }
			}, err => {

				//如果动画为true，返回之后需要关闭动画
				if(load || load == undefined) {
					loading.close();
				}
				Message({
					message: err.response.data.msg,
					type: 'warning'
				});

			}).catch((err) => {

				//如果动画为true，返回之后需要关闭动画
				if(load || load == undefined) {
					loading.close();
				}

				reject(err)
			})
		})
	},

	//post请求
	post: (url, data, load) => {
		let loading;
		if(load || load == undefined) {
			loading = Loading.service({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.5)'
			});
		}

		return new Promise((resolve, reject) => {
			Axios.post(url, data)
				.then((res) => {

					//如果动画为true，返回之后需要关闭动画
					if(load || load == undefined) {
						loading.close();
					}
					resolve(res.data)

					// if(res.data.code == 0) {
					// 	resolve(res.data)
					// } else if(res.code == 500) {
					// 	resolve(res.data);
					// 	Message({
					// 		message: res.data.msg,
					// 		type: 'warning'
					// 	});
					// }
				}, err => {
					//如果动画为true，返回之后需要关闭动画
					if(load || load == undefined) {
						loading.close();
					}
					Message({
						message: err.response.data.msg,
						type: 'warning'
					});

				}).catch((err) => {

					//如果动画为true，返回之后需要关闭动画
					if(load || load == undefined) {
						loading.close();
					}
					reject(err)
				})
		})
	},

	//=========delete请求=========
	deleted: (url, data, load) => {
		let loading;
		if(load || load == undefined) {
			loading = Loading.service({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.5)'
			});
		}
		return new Promise((resolve, reject) => {
			Axios.delete(url, {
				//params: data
			}).then((res) => {
				//如果动画为true，返回之后需要关闭动画
				if(load || load == undefined) {
					loading.close();
				}
				resolve(res.data)

				// if(res.data.code == 0) {
				// 	resolve(res.data)
				// } else if(res.data.code == 500) {
				// 	resolve(res.data);
				// 	Message({
				// 		message: res.data.msg,
				// 		type: 'warning'
				// 	});
				// }
			}, err => {
				//如果动画为true，返回之后需要关闭动画
				if(load || load == undefined) {
					loading.close();
				}
				Message({
					message: err.response.data.msg,
					type: 'warning'
				});
			}).catch((err) => {
				//如果动画为true，返回之后需要关闭动画
				if(load || load == undefined) {
					loading.close();
				}
				reject(err)
			})
		})
	},
	// 时间转换器
	getTimes:(times)=>{
        var d = new Date(times);
        if(d.getMonth()+1<10){
          if(d.getDate()<10){
            return d.getFullYear()+"-"+"0"+(d.getMonth()+1)+"-"+"0"+d.getDate();
          }else{
            return d.getFullYear()+"-"+"0"+(d.getMonth()+1)+"-"+d.getDate();
          }
        }
          if(d.getMonth()+1 == 10){
            if(d.getDate()<10){
              return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+"0"+d.getDate();
            }else{
              return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
            }
          }
          if(d.getMonth()+1 > 10){
            if(d.getDate()<10){
              return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+"0"+d.getDate();
            }else{
              return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
            }
        }
    },
}
