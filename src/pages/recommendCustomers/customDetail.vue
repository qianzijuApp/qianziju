<template>
    <div>
        <header>
            <el-button type="primary" plain @click="goBack">返回</el-button>
        </header>
        <div class="content">
            <div class="houseInfo">
                <h4>客户基本信息</h4>
                <ul>
                    <li>
                        <p>客户姓名：<span>{{customer?customer:'无'}}</span></p>
                    </li>
                    <li>
                        <p>客户电话：<span>{{customTel?customTel:'无'}}</span></p>
                    </li>
                    <li>
                        <p>客户意向区域：<span>{{intentArea?intentArea:'无'}}</span></p>
                    </li>
                    <li>
                        <p>客户需求概述：<span>{{demand?demand:'无'}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="houseInfo">
                <h4>录入经纪人信息</h4>
                <ul>
                    <li>
                        <p>经纪人所在城市：<span>{{city?city:'无'}}</span></p>
                    </li>
                    <li>
                        <p>经纪人姓名：<span>{{entryBroker?entryBroker:'无'}}</span></p>
                    </li>
                    <li>
                        <p>经纪人电话：<span>{{entryTel?entryTel:'无'}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="houseInfo">
                <h4>接单经纪人信息</h4>
                <ul>
                    <li>
                        <p>经纪人姓名：<span>{{receipt?receipt:'无'}}</span></p>
                    </li>
                    <li>
                        <p>经纪人电话：<span>{{receiptTel?receiptTel:'无'}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="houseInfo">
                <h4>客户基本信息</h4>
                <p style="text-indent:28px;padding:0 20px;">{{customBasic?customBasic:'无'}}</p>
            </div>
            <div class="bottomButtons">
                <p class="no" @click="review"  v-if="isShow">审阅</p>
                <p class="yes" v-if="isReview">已审阅</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            customer:'',//客户姓名
            customTel:'',//客户电话
            intentArea:'',//客户意向区域
            demand:'',//客户需求概述
            city:'',//经纪人所在城市
            entryBroker:'',//经纪人姓名
            entryTel:'',//经纪人电话
            receipt:'',//接单经纪人姓名
            receiptTel:'',//接单经纪人电话
            customBasic:'',//客户基本信息
            dialogVisible:false,
            isShow:true,
            isReview:false,
        }
    },
    mounted(){
        this.getCustomDetail();
    },
    methods:{
        getCustomDetail(){
            console.log('获取客户详情')
        },
        goBack(){
            this.$router.go(-1)
        },
        review(){
            this.isShow = false;
            this.isReview  =true;
        }
        
    }
}
</script>

<style scoped>
header{
    width:100%;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}
.el-button--primary{
    height: 40px;
    margin-left: 100px;
}
.personnel{
    display: flex;
    justify-content: space-around;
}
header p{
    margin-right: 100px;
}
.content{
    width:100%;
    padding-top: 50px;
}
.houseInfo{
    width:90%;
    margin: auto;
}
h4{
    font-size:24px;
    padding:20px;
    box-sizing: border-box;
}
.houseInfo ul{
    list-style: none;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
}
.houseInfo ul li{
    width:33%;
    height: 30px;
}
.bottomButtons{
    width:40%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    padding: 50px 0;
}
.yes,.no{
    width:150px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
}
.yes{
    background-color: #5b5b5b;
}
.no{
    background-color: #ff8400;
}
.balck{
    width:95%;
    margin-left:10px;
    font-size:16px;
    outline:none;
    padding-left: 20px;
    box-sizing: border-box;
}
.result{
    width:5%;
    margin: auto;
    padding: 50px 0;
}
.hadPass,.hadRefuse{
    width:100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
}
.hadPass{
    background-color: #67c23a;
}
.hadRefuse{
    background-color: #ff8400;
}
</style>
