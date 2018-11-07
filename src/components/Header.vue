<!-- 头部导航 -->
<template>
	<div class="header">
		<!-- start logo图片 -->
		<div class="logo">
			<img src="../assets/images/logo.png"/>
		</div>
		<!-- end logo图片 -->

		<!-- start 标题 -->
		<h1 class="title">千子居</h1>
		<!-- end 标题 -->

		<!-- start 右侧模块 -->
		<div class="right_model">
			<div class="search"></div>
			<div class="user" @click="downList">
				<img src="../../static/images/header.jpg" alt="">
				<span>{{nick}}</span>
				<div class="down">
					<span class="iconfont icon-down"></span>
					<transition name="fade">
						<ul class="down_list" v-if="show">
							<li v-for="(item,index) in userList" :key="index" @click="downClick(index)" v-if="item.isShow"><span class="iconfont" :class="item.icon"></span>
								<a href="#">{{item.title}}</a>
							</li>
						</ul>
					</transition>
				</div>
			</div>
		</div>
		<!-- end 右侧模块 -->

		<el-dialog :visible.sync="dialogVisible" width="30%">
            <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
                <el-form-item label="原密码：" prop="oldPas">
                    <el-input v-model="form.oldPas" clearable></el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="newPas">
                    <el-input v-model="form.newPas" clearable></el-input>
                </el-form-item>
                <el-form-item label="确认新密码：" prop="confirm">
                    <el-input v-model="form.confirm" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="update('form')" style="width:80%;">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
	</div>
</template>

<script>
	import bus from './bus.js'
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form.newPas) {
					callback(new Error('两次输入密码的不一致!'));
				} else {
					callback();
				}
			};
			return {
				dialogVisible:false,
				nick:'',
				form:{
					oldPas:'',
					newPas:'',
					confirm:''
				},
				rules:{
					oldPas:[
						{required:true,message:'请填写原密码',trigger:'blur'},
                    	{ pattern:/^[^\u4E00-\u9FA5\uF900-\uFA2D\u0020]*$/, message: '请输入正确的原密码', trigger: 'blur' },
					],
					newPas:[
						{required:true,message:'请填写新密码',trigger:'blur'},
						{ pattern:/^.{8,20}$/, message: '长度在8-20个字以内', trigger: 'blur' },
                    	{ pattern:/^[^\u4E00-\u9FA5\uF900-\uFA2D\u0020]*$/, message: '无效的电话', trigger: 'blur' },
					],
					confirm:[
						{required:true,message:'请再次输入',trigger:'blur'},
						{ validator: validatePass, trigger: 'blur' }
					]
				},
				show: false,
				userName: '',
				userType: null, //用户类型
				userList: [
					{
						icon: 'icon-dianyuan',
						title: '修改密码',
						isShow: true,
					},
					{
						icon: 'icon-plus',
						title: '新增用户',
						isShow: false,
					},
					{
						icon: 'icon-plus',
						title: '安全退出',
						isShow: true,
					}
				]
			}
		},
		methods: {
			downList() {
				this.show = !this.show;
				bus.$emit('headerShow', this.show)
			},
			//点击下拉列表的每一个选项
			downClick(index) {
				switch(index) {
					case 0: //点击弹出修改密码框
						this.dialogVisible = true;
						this.form.oldPas = '';
						this.form.newPas = '';
						this.form.confirm = ''
						break;
					case 1: //点击新增用户
						this.$router.push('/newPerson');
						break;
					default:
					this.$get('logout').then(res=>{
						console.log(res);
						if(res.code == 0 || res.code == 200){
							localStorage.removeItem('userInfo');
							this.$message({
								message:'注销成功',
								type:'success',
								dduration:1000
							});
							this.$router.push({
								path:'/'
							})
						}else{
							this.$message({
								message:res.msg,
								type:'error',
								duration:1000
							})
						}
					})
				}
			},
			update(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$post('user/modifyPwdForManager',{
							oldpwd: this.form.oldPas,
							newpwd: this.form.newPas,
							password: this.form.confirm
						}).then(res=>{
							console.log(res);
							if(res.code == 0 || res.code == 200){
								this.$message({
									message:res.msg,
									type:'success',
									duration:1000
								});
								// this.$router.push({
								// 	path:'/'
								// })
							}else{
								this.$message({
									message:res.msg,
									type:'error',
									duration:1000
								})
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		},
		mounted() {
			if(JSON.parse(localStorage.getItem('userInfo'))){
				this.nick = JSON.parse(localStorage.getItem('userInfo')).phone
			}
			//获取用户类型
			if(JSON.parse(localStorage.getItem('userInfo')).role == '0') {
				this.userList[1].isShow = true;
			}
		}

	}
</script>

<style scoped>
	.header {
		width: 100%;
		height: 50px;
		background: #383d41;
	}
	
	.logo {
		float: left;
		width: 127px;
		height: 100%;
		border-right: 1px solid #2c3135;
		background-repeat: no-repeat;
		background-position: center;
		text-align: center;
	}
	.logo img{
		width: 50px;
	}
	.user span{
		color: #fff;
		line-height: 50px;
	}
	.title {
		float: left;
		line-height: 50px;
		padding-left: 20px;
		color: #fff;
		font-size: 16px;
	}
	
	.right_model {
		float: right;
		height: 100%;
		width: 625px;
		cursor: pointer;
	}
	
	.search {
		float: left;
		width: 302px;
		height: 100%;
		padding: 10px 0;
		border-right: 1px solid #2c3135;
		box-sizing: border-box;
	}
	
	.search_input {
		float: left;
		position: relative;
		height: 30px;
		width: 218px;
		outline: none;
		border: none;
	}
	
	.search_input input {
		background: #505559;
		padding-left: 12px;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		outline: none;
		border: none;
		color: #fff;
	}
	
	.search_input span.iconfont {
		position: absolute;
		right: 0;
		top: 3px;
		padding: 0 10px 0 12px;
		border-left: 1px solid #6c7175;
		color: #fff;
		font-weight: 400;
		cursor: pointer;
	}
	
	.msg_num {
		float: left;
	}
	
	.msg_num span.iconfont {
		font-size: 25px;
		line-height: 30px;
		padding-left: 18px;
		color: #fff;
	}
	
	.num {
		position: relative;
		top: -3px;
		display: inline-block;
		padding: 0 6px;
		border-radius: 4px;
		background: #ff9c0a;
		text-align: center;
		line-height: 20px;
		color: #fff;
	}
	
	.notice {
		float: left;
		width: 101px;
		line-height: 50px;
		text-align: center;
		color: #fff;
		border-right: 1px solid #2c3135;
	}
	
	.user {
		float: left;
		width: 220px;
		height: 100%;
	}
	
	.user img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin: 5px 20px 0 25px;
		float: left;
	}
	
	.down {
		position: relative;
		float: left;
		line-height: 50px;
		cursor: pointer;
	}
	
	.down .userName {
		color: #fff;
		display: inline-block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		font-size: 12px;
		max-width: 90px;
	}
	
	.down .iconfont {
		position: relative;
		top: -11px;
		left: -2px;
		font-size: 20px;
		color: #fff;
	}
	
	.down_list {
		position: absolute;
		left: -86px;
		top: 50px;
		z-index: 199;
		width: 200px;
		box-shadow: 0 0 3px rgba(86, 96, 117, .3);
		border: 1px solid #ddd;
		box-sizing: border-box;
		background: rgba(255, 255, 255, .7)
	}
	
	.down_list>li {
		line-height: 40px;
		display: flex;
		align-items: center;
	}
	
	.down_list>li>a {
		width:100%;
		color: #000;
		text-align: center
	}
	.down_list a:hover{
		color: #fff
	}
	.down_list>li:nth-child(2) {
		border-bottom: 1px solid #ddd;
	}
	
	.down_list>li:nth-child(5) {
		border-bottom: 1px solid #ddd;
	}
	
	.down_list>li span.iconfont {
		position: relative;
		top: 1px;
		vertical-align: middle;
		font-size: 16px;
		color: #000;
	}
	
	.down_list>li:hover {
		background: #ff9c0a;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s;
	}
	
	.fade-enter,
	.fade-leave-to
	/* .fade-leave-active below version 2.1.8 */
	
	{
		opacity: 0;
	}
</style>