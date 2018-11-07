<template>
    <div>
       <el-container>
            <el-header id="header">
                <div class="h_left">
                    <img src="../../static/images/header.jpg" alt="">
                    <h1>千客居</h1>
                </div>
                <ul class="p_ul">
                    <li>
                        <div class="person" @click="handleClick">
                            <img src="../../static/images/header.jpg" alt="">
                            <p>黄大喵</p>
                        </div>
                        <div class="child" v-if="isShow">
                            <div class="loading" @click.stop="leave"></div>
                            <ul class="c_ul">
                                <li>修改密码</li>
                                <li>账号管理</li>
                                <li>退出登录</li>
                            </ul>
                        </div>
                    </li>
                    <li class="icon">
                        <i class="el-icon-minus" ></i>
                        <i class="el-icon-close" @click="logoOut"></i>
                    </li>
                </ul>
            </el-header>
            <el-container id="bottom">
                <el-aside :class="collapse ? 'sidebar_collapse':'sidebar'">
                    <div class="slide">
                        <span class="iconfont icon-foldzhedie" @click="colapaseChange"></span>
                    </div>

                    <el-row>
                        <el-col :span="24">
                            <el-menu :router="true" unique-opened @select="handleSelect" default-active="2" class="el-menu-vertical-demo" background-color="#2b3245" text-color="#fff" active-text-color="#ffd04b">
                                <template v-for="item in routerItems">
                                    <template>
                                        <el-submenu :index="item.index" :key="item.index">
                                            <template slot="title">
                                                <i class="iconfont" :class="item.icon"></i>
                                                <span slot="title">{{item.title}}</span>
                                            </template>
                                            <el-menu-item-group>
                                                <el-menu-item v-for="(sub,i) in item.subs" :key="i" :index="sub.index">
                                                     <i class="iconfont subicon" :class="sub.icon"></i><span slot="title">{{sub.title}}</span>
                                                </el-menu-item>
                                            </el-menu-item-group>
                                        </el-submenu>
                                    </template>
                                </template>
                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-main style="width:60% !important;background-color:pink">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import bus from './bus.js'   //引入公共中间件
export default {
    data(){
        return{
            isShow:false,
            collapse:false,
            routerItems:[
                {
                    icon:"icon-jingjiren",
                    index:'index',
                    title:"经纪人管理",
                    subs:[
                        {
                            icon:"icon-kehu",
                            index:'brokerList',
                            title:"经纪人列表"
                        },
                        {
                            icon:"icon-daishenhe",
                            index:'waittingBroker',
                            title:"待审核经纪人"
                        },
                        {
                            icon:"icon-heimingdan",
                            index:'blackList',
                            title:"黑名单"
                        }
                    ]
                },
                {
                    icon:"icon-icon",
                    index:'housingManagement',
                    title:"房源管理",
                    subs:[
                        {
                            icon:"icon-haofangtuo400iconfontershoufangchengjiao",
                            index:'secoundHousingDeal',
                            title:"二手房买卖"
                        },
                        {
                            icon:"icon-xunizulinhetong",
                            index:'secoundHousingRent',
                            title:"二手房租赁"
                        },
                        {
                            icon:"icon-haofangtuo400iconfontguoneixinpan",
                            index:'newPlate',
                            title:"新盘"
                        },
                    ]
                },
                {
                    icon:"icon-qianshoutixing",
                    index:'signatureManagement',
                    title:"签单管理",
                    subs:[
                        {
                            icon:"icon-haofangtuo400iconfontershoufangchengjiao",
                            index:'deal',
                            title:"买卖"
                        },
                        {
                            icon:"icon-xunizulinhetong",
                            index:'rent',
                            title:"租赁"
                        },
                        {
                            icon:"icon-haofangtuo400iconfontguoneixinpan",
                            index:'plate',
                            title:"新盘"
                        },
                    ]
                },
                {
                    icon:"icon-Performance",
                    index:'performanceManagement',
                    title:"业绩管理",
                    subs:[
                        {
                            icon:"icon-icon-test",
                            index:'performanceRecord',
                            title:"业绩记录"
                        },
                        {
                            icon:"icon-jixiaojiangjin",
                            index:'bonusRecord',
                            title:"奖金记录"
                        },
                    ]
                },
                {
                    icon:"icon-customer",
                    index:'recommendCustomers',
                    title:"推荐客户",
                    subs:[
                        {
                            icon:"icon-xinzengkehu",
                            index:'customers',
                            title:"报客户"
                        },
                    ]
                },
                {
                    icon:"icon-kujialeqiyezhan_pinpaiguanggao-",
                    index:'advertisment',
                    title:"广告管理",
                    subs:[
                         {
                            icon:"icon-guanggao",
                            index:'advert',
                            title:"广告管理"
                        },
                    ]
                },
                {
                    icon:"icon-haofangtuo400iconfontguoneixinpan",
                    index:'newOffer',
                    title:"新盘报备",
                    subs:[
                        {
                            icon:"icon-haofangtuo400iconfontxinpandingyue",
                            index:'preparaRecord',
                            title:"报备记录"
                        },
                        {
                            icon:"icon-jixiaojiangjin",
                            index:'offerInformation',
                            title:"报盘资料"
                        },
                    ]
                },
                {
                    icon:"icon-xiaoxiguanli",
                    index:'messageManagement',
                    title:"消息管理",
                    subs:[
                        {
                            icon:"icon-xinxi",
                            index:'messageCenter',
                            title:"信息中心"
                        },
                        {
                            icon:"icon-xinxizhongxin",
                            index:'feedBack',
                            title:"反馈意见"
                        },
                    ]
                },
                {
                    icon:"icon-shezhi",
                    index:'systemSetting',
                    title:"平台设置",
                    subs:[
                        {
                            icon:"icon-chengshijianshe",
                            index:'city',
                            title:"城市建设"
                        },
                        {
                            icon:"icon-canshushezhi",
                            index:'system',
                            title:"参数设置"
                        },
                    ]
                },

            ]
        }
    },
    methods:{
        handleSelect(){

        },
        // 折叠
        colapaseChange(){
            // console.log("折叠")
            // this.collapse = !this.collapse;
            // console.log(this.collapse)
            //  bus.$emit('collapse', this.collapse)
            //  console.log(this.collapse)
        },
        // 点击显示头部子列表
        handleClick(){
            this.isShow = true
        },
        // 点击关闭头部子列表
        leave(){
            this.isShow = false
        },
        // 点击注销退出
        logoOut(){
            console.log("注销")
        }
    }
}
</script>


<style>
.el-submenu__title{
    margin-left:20px;
}
.el-aside{
    width:220px !important;
    background-color: #2b3245;
    /* background-color: red; */
}
.el-menu{
    border: none
}
.el-main{
    background-color: #ddd;
}
</style>

<style scoped>
#bottom{
    width:100%;
    display: flex;
}
/* 头部样式 */
#header{
    width: 100%;
    height: 90px !important;
    display:flex;
    justify-content:space-between;
    background-color: #383d41;
}
#header .h_left{
    width:20%;
    display:flex;
    justify-content:space-around;
    align-items:center;
}
.h_left img{
    width:100px;
    height: 100%;
}
.h_left h1{
    color:#fff;
}
#header .p_ul{
    width:30%;
    list-style: none;
    display: flex;
    justify-content:space-around;
}
.p_ul .person{
    width:250px;
    height: 100%;
    display:flex;
    justify-content:space-around;
    align-items:center;
}
.person img{
    width:90px;
    height: 100%;
    border-radius:50%;
}
.person p{
    font-size:24px;
    color:white;
}
.icon{
    width:20%;
    display: flex;
    justify-content:space-around;
    font-size:30px;
    padding-top:30px;
    color:#fff;
}
.child{
    background-color: #5b5b5b;
}
.loading {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0,0,0,.1);
    z-index: 10000;
}
.c_ul{
    list-style: none;
}
.c_ul li{
    height: 50px;
    font-size:20px;
    text-align:center;
    line-height: 50px;
}
/* 头部样式 */
/* 折叠样式 */
.sidebar{
    position: fixed;
    left: 0;
    z-index: 99;
    width: 175px;
    height: 100%;
    background: #42475b;
    overflow-y: auto;
    transition: all .3s ease-in;
}
.sidebar_collapse{
    position: fixed;
    left: 0;
    /* z-index: 99; */
    width: 65px;
    height: 100%;
    background: #42475b;
    overflow-y: auto;
    transition: all .3s ease-in;
}
.slide{
    width: 100%;
    height: 30px;
    background-color: #4b5064;
    text-align: center;
    line-height: 30px;
    color: #fff;
}
.slide span{
    font-size: 24px;
    cursor: pointer;
}
/* 折叠样式 */
.iconfont{
    font-size:24px;
    margin-right:10px;
}
.subicon{
    font-size:20px;
    margin-left: 20px;
}
</style>
