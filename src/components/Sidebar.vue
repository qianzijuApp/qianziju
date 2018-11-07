<!--左侧菜单栏组件-->
<template>
    <div :class="collapse ? 'sidebar_collapse':'sidebar'">

        <!-- start菜单栏是否折叠按钮 -->
        <div class="slide">
            <span class="iconfont icon-foldzhedie" @click="colapaseChange"></span>
        </div>
        <!-- end菜单栏是否折叠按钮 -->

        <!-- start菜单栏 -->
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" :collapse="collapse" :collapse-transition="false" router @select="menuSlect"  background-color="#42475b" text-color="#fff">
            <template v-for="item in routerItems">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" v-if="item.isShow">
                      <template slot="title">
                          <i class="iconfont" :class="item.icon"></i><span slot="title">{{item.title}}</span>
                      </template>
                      <el-menu-item v-for="(sub,i) in item.subs" :key="i" :index="sub.index">
                          <i class="iconfont subicon" :class="sub.icon"></i><span slot="title">{{sub.title}}</span>
                      </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="sub.index" :key="item.index">
                         <i class="iconfont subicon" :class="sub.icon"></i><span slot="title">{{sub.title}}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
        <!-- end菜单栏 -->
    </div>
</template>

<script>
import bus from './bus.js'   //引入公共中间件
export default {
    data(){
        return{
        	menudisabled:false,     //是否禁用菜单栏
            collapse: false,   //菜单栏是否折叠
            routerItems:[
                {
                    icon:"icon-jingjiren",
                    index:'index',
                    title:"经纪人管理",
                    isShow:true,
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
                    isShow:true,
                    subs:[
                        {
                            icon:"icon-haofangtuo400iconfontershoufangchengjiao",
                            index:'secoundHousingDeal',
                            title:"二手房买卖"
                        },
                        {
                            icon:"icon-xunizulinhetong",
                            index:'seoundHousingRent',
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
                    isShow:true,
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
                    isShow:true,
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
                    isShow:true,
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
                    isShow:true,
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
                    isShow:true,
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
                    isShow:true,
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
                    isShow:false,
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
                }
            ]
        }
    },
    computed:{
        onRoutes(){
            return this.$route.path.replace('/','')
        }
    },
    mounted(){
        if(JSON.parse(localStorage.getItem('userInfo')).role == '0') {
            this.routerItems[8].isShow = true;
        }
    },
    methods: {
        //点击菜单栏是否折叠按钮
        colapaseChange(){
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse)
        },
        menuSlect(val){
        	// if(val == 'money'){
        	// 	this.$message({ 
		    //       message: '此模块暂未开放！',
		    //       type: 'warning'
		    //     });
        	// }
        }       
    }
}
</script>

<style>
.el-menu-vertical-demo i.iconfont{
    font-size: 20px;
    padding-right: 6px;
    vertical-align: middle;
}
</style>



<style scoped>
.el-menu{
    border: none;
}

.sidebar{
    position: fixed;
    left: 0;
    top: 50px;
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
    top: 50px;
    z-index: 99;
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
    font-size: 20px;
    cursor: pointer;
}


</style>
