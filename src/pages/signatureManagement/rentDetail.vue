<template>
    <div>
        <header>
            <el-button type="primary" plain @click="goBack">返回</el-button>
            <div class="personnel">
                 <p>录入经纪人：<span>{{entryBroker?entryBroker:'无'}}</span></p>
                <p>电话：<span>{{entryTel?entryTel:'无'}}</span></p>
            </div>
           
        </header>
        <div class="content">
            <div class="houseInfo">
                <h4>基本信息</h4>
                <ul>
                    <li>
                        <p>城市：<span>{{city?city:'无'}}</span></p>
                    </li>
                    <li>
                        <p>区域：<span>{{area?area:'无'}}</span></p>
                    </li>
                    <li>
                        <p>合同编号：<span>{{contract?contract:'无'}}</span></p>
                    </li>
                    <li>
                        <p>成交价格：<span>{{price?price:'无'}}</span></p>
                    </li>
                    <li>
                        <p>付款类型：<span>{{payType?payType:'无'}}</span></p>
                    </li>
                    <li>
                        <p>客户来源：<span>{{source?source:'无'}}</span></p>
                    </li>
                    <li>
                        <p>客户姓名：<span>{{customer?customer:'无'}}</span></p>
                    </li>
                    <li>
                        <p>客户电话：<span>{{customTel?customTel:'无'}}</span></p>
                    </li>
                    <li>
                        <p>房东姓名：<span>{{landlord?landlord:'无'}}</span></p>
                    </li>
                    <li>
                        <p>房东电话：<span>{{landlordTel?landlordTel:'无'}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="houseInfo">
                <h4>房屋资料</h4>
                <ul>
                    <li>
                        <p>房源编号：<span>{{house?house:'无'}}</span></p>
                    </li>
                    <li>
                        <p>城市：<span>{{hCity?hCity:'无'}}</span></p>
                    </li>
                    <li>
                        <p>区域：<span>{{hArea?hArea:'无'}}</span></p>
                    </li>
                    <li>
                        <p>楼盘：<span>{{building?building:'无'}}</span></p>
                    </li>
                    <li>
                        <p>房号：<span>{{room?room:'无'}}</span></p>
                    </li>
                    <li>
                        <p>面积：<span>{{acreage?acreage:'无'}}</span></p>
                    </li>
                    <li>
                        <p>装修：<span>{{fit?fit:'无'}}</span></p>
                    </li>
                    <li>
                        <p>朝向：<span>{{direct?direct:'无'}}</span></p>
                    </li>
                    <li>
                        <p>房型：<span>{{hType?hType:'无'}}</span></p>
                    </li>
                    <li>
                        <p>地址：<span>{{address?address:'无'}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="houseInfo">
                <h4>相关经纪人</h4>
                <ul>
                    <li>
                        <p>房源方经纪人：<span>{{broker?broker:'无'}}</span></p>
                    </li>
                    <li>
                        <p>电话：<span>{{brokerTel?brokerTel:'无'}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="bottomButtons" v-if="isShow">
                <p class="no" @click="refuse">拒绝</p>
                <p class="yes" @click="pass">通过</p>
            </div>
            <div class="result">
                <p class="hadPass" v-if="isHadPass">已通过</p>
                <p class="hadRefuse" v-if="isHadRefuse">已拒绝</p>
            </div>
        </div>

        <el-dialog title="拒绝原因" :visible.sync="dialogVisible" width="30%">
            <textarea cols="60" rows="10" placeholder="请输入拒绝的原因" class="balck" v-model="comment"></textarea>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submission" style="margin-left:unset">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            entryBroker:'',//录入经纪人
            entryTel:'',//电话
            city:'',//城市
            area:'',//区域
            contract:'',//合同编号
            price:'',//成交价格
            payType:'',//付款类型
            source:'',//客户来源
            customer:'',//客户姓名
            customTel:'',//客户电话
            landlord:'',//房东姓名
            landlordTel:'',//房东电话
            house:'',//房源编号
            hCity:'',//城市
            hArea:'',//区域
            building:'',//楼盘
            room:'',//房号
            acreage:'',//面积
            fit:'',//装修
            direct:'',//朝向
            hType:'',//房型
            address:'',//地址
            broker:'',//房源方经纪人
            brokerTel:'',//电话
            dialogVisible:false,
            isShow:true,
            isHadPass:false,
            isHadRefuse:false,
            comment:'',
        }
    },
    mounted(){
        this.getRentDetail()
    },
    methods:{
        getRentDetail(){
            console.log('获取租赁详情')
        },
        // 返回
        goBack(){
            this.$router.go(-1)
        },
        // 拒绝
        refuse(){
            this.dialogVisible = true;
            this.comment = '';
        },
        // 确定拒绝
        submission(){
            this.dialogVisible = false;
            this.isShow = false;
            this,isHadRefuse = true;
        },
        // 通过
        pass(){
            this.isShow = false;
            this.isHadPass  =true;
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
    width:25%;
    height: 30px;
}
.bottomButtons{
    width:40%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    padding: 80px 0 0;
}
.yes,.no{
    width:150px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
}
.yes,.no:hover{
    cursor: pointer;
}
.yes{
    background-color: #67c23a;
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
