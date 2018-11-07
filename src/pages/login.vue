<template>
    <div id="login">
        <!-- start logo标题 -->
        <div class="logo">
        	<!-- <img src="../../static/images/flower.jpg" id="logoImg"/> -->
			<p>千子居后台管理系统</p>
        </div>
        <!-- end logo标题 -->

        <!-- start login登录框 -->
        <div class="loginWrap">
            <div class="login">
                <div class="login_userinfo">
                    <h1 v-if="show">账号登录</h1>
                    <transition name="fade">
                    <div class="notice" v-if="!show">
                        <span class="iconfont icon-unie044"></span>
                        <p>{{text}}</p>
                    </div>
                    </transition>
                    <div class="row">
                        <span class="iconfont icon-shoujihao icon"></span>
                        <input v-model="userInfo.userName" class="row_input" type="text" placeholder="请输入您的用户名">
                    </div>
                    <div class="row">
                        <span class="iconfont icon-mima icon"></span>
                        <input v-model="userInfo.userPas" class="row_input" type="password" placeholder="请输入您的密码">
                    </div>
                     <div class="row">
                         <input v-model="userInfo.userCode" class="code" type="text" placeholder="请输入验证码">
                         <span class="verification">{{verification}}</span>
                     </div>
                     <p><a href="#" @click="getRandom">看不清换一张</a></p>
                     <div class="row login_btn" @click="login">登录</div>
                     <!--<p class="forgetPas">
                         <span>忘记密码</span>
                     </p>-->
                </div>
            </div>
        </div>
        <!-- end login登录框 -->

        <!-- start 底部版权 -->
        <div class="copyright">
            <p>Copyright © 2018 千子居  版权所有</p>
        </div>
        <!-- end 底部版权 -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            userInfo: {
                userName: '',
                userPas: '',
                userCode: ''
            },
            verification: '',
            show: true,
            text: ''
        }
    },
    methods:{
        //设置随机数
        setRandom(){
            for(var i=0; i<4; i++){
                this.verification+=Math.floor(Math.random()*10)
            }
        },
        //跟换验证码
        getRandom(){
            this.verification = '';
            this.setRandom()
        },
        //登录
        login(){
            if(this.userInfo.userName == '' || this.userInfo.userPas == ''){
                this.show = false;
                this.text = '请输入用户名和密码';
                return;
            }
            else if(this.userInfo.userCode == ''){
                this.show = false;
                this.text = '请输入验证码';
                return;
            }
            else if(this.userInfo.userCode != this.verification){
                this.show = false;
                this.text = '验证码输入错误';
                this.getRandom();
                return;
            }
            // else if(!(/^[1][3456789]\d{9}$/.test(this.userInfo.userName))){
            //     this.show = false;
            //     this.text = '请输入正确的用户名'
            // }
            else{
                this.$post("adminLogin",{
                    phone: this.userInfo.userName,
                    password: this.userInfo.userPas,
                    code:this.userInfo.userCode
                }).then(res=>{
                    console.log(res);
                    if(res.code == 0 || res.code == 200){
                        localStorage.setItem('userInfo',JSON.stringify(res.data));
                        this.$store.commit('setToken',res.data.token);
                        console.log(res.data)
                        this.$message({
                            message:'登录成功',
                            type:'success',
                            duration:1000
                        });
                        this.$router.push({
                            path:'/home'
                        })
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            }
           
//             this.$post('/login',{
//                 phone: this.userInfo.userName,
//                passWord: this.userInfo.userPas
//             }).then(res=>{
//                 if(res.code == 0){
//                     console.log(res);

//                     //存放后台返回的用户信息
//                     localStorage.setItem('userInfo',JSON.stringify(res.id));

//                     //将返回的token存入store
// //                    this.$store.commit('setToken',res.id);

//                     // 登录成功跳转待审核项目
//                     this.$router.push({
//                         path: '/Home'
//                     })
//                 }else{
//                      this.verification = '';
//                      this.show = false;
//                      this.text = res.msg;
//                      this.setRandom()
//                 }
//             })
        }
    },
    mounted(){
        this.setRandom()
    }
}
</script>

<style scoped>
#logoImg{
    width: 150px;
    height: 150px;
}

.logo{
    width: 1200px;
    height: 160px;
    line-height: 180px;
    margin: 0 auto;
    font-size: 23px;
    display: flex;
    background-repeat: no-repeat;
}
.logo p{
    font-size: 30px;
    font-weight: 700;
    margin-left: 50px;
}
.loginWrap{
    width: 100%;
    height: 570px;
    margin: 0 auto;
    background-image: url(../assets/images/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.login{
    position: relative;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
}
.login_userinfo{
    position: absolute;
    top: 76px;
    right: 90px;
    width: 313px;
    height: 410px;
    background: white;
    padding: 20px 22px;
    box-sizing: border-box;
}
.login_userinfo h1{
    font-size: 16px;
    font-weight: bold;
    padding: 19px 0 8px;
}
.login_userinfo p{
    padding: 15px 10px;
}
.login_userinfo .row{
    position: relative;
    width: 270px;
    height: 40px;
    box-sizing: border-box;
    margin-top: 20px;
}
.login_userinfo .row_border{
    border: 1px solid #cbcbcb;
}
.row_input{
    width: 270px;
    height: 40px;
    padding-left: 45px;
    box-sizing: border-box;
}
.icon{
    position: absolute;
    left: 1px;
    top: 1px;
    display: inline-block;
    width: 38px;
    height: 38px;
    background: #f3f3f3;
    text-align: center;
    line-height: 38px;
    font-size: 20px;
    /* color: #b3b3b3; */
}
.login_userinfo .row input{
    border: 1px solid #cbcbcb;
}
.login_userinfo .row .code{
    width: 140px;
    height: 40px;
    box-sizing: border-box;
    padding-left: 10px;
}
.login_userinfo .row .verification{
    display: inline-block;
    width: 80px;
    height: 30px;
    background: blue;
    vertical-align: middle;
    margin-left: 10px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    letter-spacing: 1px;
}
.login_btn{
    margin-top: 0 !important;
    background-color: #2791fe;
    color: #fff;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
}
.forgetPas{
    text-align: right;
    padding: 25px 0 !important;
    cursor: pointer;
}
.copyright p{
    padding-top: 30px;
    text-align: center;
}
.notice{
    border: 1px solid #ffb4a8;
    background-color: #fef2f2;
    color: #6C6C6C;
    padding: 6px 10px;
    margin-top: 13px;
}
.notice span{
    padding-right: 10px;
    float: left;
    font-size: 16px;
    color: #f40;
    margin-top: -2px;
}
.notice p{
    padding: 0 !important;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
