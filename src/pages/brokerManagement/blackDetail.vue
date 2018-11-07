<template>
    <div>
        <!-- 头部 -->
        <header>
            <el-button type="primary" plain @click="goBack">返回</el-button>
            <div class="personnel">
                <p>操作员工：<span>{{form.operator?form.operator:'无'}}</span></p>
                <p>电话：<span>{{form.operatorPhone?form.operatorPhone:'无'}}</span></p>
            </div>
        </header>
        <!-- 头部 -->
        <!-- 内容 -->
        <div class="content">
            <div class="basic" style="padding-top:20px">
                <h4>基本资料</h4>
                <ul>
                    <li>
                        <p>姓名：<span>{{form.nickname?form.nickname:'无'}}</span></p>
                    </li>
                    <li>
                        <p>电话：<span>{{form.phone?form.phone:'无'}}</span></p>
                    </li>
                    <li>
                        <p>推荐人：<span>{{form.invitePhone?form.invitePhone:'无'}}</span></p>
                    </li>
                    <li>
                        <p>性别：<span>{{form.gender == 1?'男':'女'}}</span></p>
                    </li>
                    <li>
                        <p>年龄：<span>{{form.age?form.age:'0'}} 岁</span></p>
                    </li>
                    <li>
                        <p>主业务城市：<span>{{form.city?form.city:'无'}}</span></p>
                    </li>
                    <li>
                        <p>主业务区域：<span>{{form.area?form.area:'无'}}</span></p>
                    </li>
                    <li>
                        <p>经纪人总业绩：<span>{{income.performance?income.performance:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p>未结业绩：<span>{{income.unclosePerformance?income.unclosePerformance:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p>共计奖金总额：<span>{{income.bonus?income.bonus:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p>当前奖金余额：<span>{{income.uncloseBonus?income.uncloseBonus:'0'}} 元</span></p>
                    </li>
                </ul>
            </div>
            <div class="basic attach">
                <h4>附加资料</h4>
                <ul>
                    <li>
                        <p>从业年限：<span>{{form.workYears?form.workYears:'0'}} 年</span></p>
                    </li>
                    <li>
                        <p>个人简介：<span>{{form.description?form.description:'无'}}</span></p>
                    </li>
                    <li>
                        <p>经纪人标语：<span>{{form.slogan?form.slogan:'无'}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="basic house">
                <h4>房源资料</h4>
                <div class="houseTable">
                    <p>房源总量：<span>{{hTotal?hTotal:'0'}} 套</span></p>
                    <el-table
                        :data="houseData"
                        border
                        style="width: 99%;margin:auto">
                        <el-table-column
                            prop="houseSourceNo"
                            label="房源编号">
                        </el-table-column>
                        <el-table-column
                            prop="city"
                            label="城市">
                        </el-table-column>
                        <el-table-column
                            prop="buildName"
                            label="楼盘名称">
                        </el-table-column>
                        <el-table-column
                            prop="square"
                            label="面积">
                        </el-table-column>
                        <el-table-column
                            prop="totalPrice"
                            label="价格">
                        </el-table-column>
                        <el-table-column
                            prop="houseSourceType"
                            label="房屋性质">
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="状态">
                            <template slot-scope="scope">
                                <p v-if="scope.row.status == 1">上架中</p>
                                <p v-if="scope.row.status == 0">下架中</p>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        @current-change="handleHouseChange"
                        :current-page="hCurrentPage"
                        :page-size="hPageSize"
                        layout="total, prev, pager, next"
                        :total="hTotal">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="basic reply">
                <h4>报单客户</h4>
                <div class="houseTable">
                    <p>报单总量：<span>{{cTotal?cTotal:'0'}} 单</span></p>
                    <el-table
                        :data="customData"
                        border
                        style="width: 99%;margin:auto">
                        <el-table-column
                            prop="acceptDate	"
                            label="时间">
                        </el-table-column>
                        <el-table-column
                            prop="customer"
                            label="客户姓名">
                        </el-table-column>
                        <el-table-column
                            prop="customerPhone"
                            label="客户电话">
                        </el-table-column>
                        <el-table-column
                            prop="hopeCity"
                            label="意向城市">
                        </el-table-column>
                        <el-table-column
                            prop="hopeArea"
                            label="意向区域">
                        </el-table-column>
                        <el-table-column
                            prop="recorder"
                            label="合作经纪人">
                        </el-table-column>
                        <el-table-column
                            prop="recorderPhone"
                            label="经纪人电话">
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        @current-change="handleReplyChange"
                        :current-page="cCurrentPage"
                        :page-size="cPageSize"
                        layout="total, prev, pager, next"
                        :total="cTotal">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="basic receipt">
                <h4>接单客户</h4>
                <div class="houseTable">
                    <p>接单总量：<span>{{rTotal?rTotal:'0'}} 单</span></p>
                    <el-table
                        :data="receiptData"
                        border
                        style="width: 99%;margin:auto">
                        <el-table-column
                            prop="acceptDate"
                            label="时间">
                        </el-table-column>
                        <el-table-column
                            prop="customer"
                            label="客户姓名">
                        </el-table-column>
                        <el-table-column
                            prop="customerPhone"
                            label="客户电话">
                        </el-table-column>
                        <el-table-column
                            prop="hopeCity"
                            label="意向城市">
                        </el-table-column>
                        <el-table-column
                            prop="hopeArea"
                            label="意向区域">
                        </el-table-column>
                        <el-table-column
                            prop="recorder"
                            label="合作经纪人">
                        </el-table-column>
                        <el-table-column
                            prop="recorderPhone"
                            label="经纪人电话">
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        @current-change="handleReceiptChange"
                        :current-page="rCurrentPage"
                        :page-size="rPageSize"
                        layout="total, prev, pager, next"
                        :total="rTotal">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="basic">
                <h4>拉黑原因</h4>
                <p class="reason">{{form.blackreason?form.blackreason:'无'}}</p>
            </div>
            <div class="button">
               <el-button type="warning" style="float:right;margin:20px 100px 0 0;" @click="toNormal" :disabled="disabled">恢复</el-button> 
            </div>
        </div>
        <!-- 内容 -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{},
            income:{},
            disabled:false,
            houseData:[],//房源资料
            hCurrentPage:1,
            hPageSize:10,
            hTotal:30,
            customData:[],//报单客户
            cCurrentPage:1,
            cPageSize:10,
            cTotal:30,
            receiptData:[],//接单客户
            rCurrentPage:1,
            rPageSize:10,
            rTotal:30,
        }
    },
    mounted(){
        this.getBlackDetail();
    },
    methods:{
        getBlackDetail(){
            this.$get('user/getUserInfoByWeb',{
                id: this.$route.query.id
            }).then(res=>{
                console.log(res);
                if(res.code == 0 || res.code == 200){
                    if(res.data.income){
                        this.income = res.data.income;
                    }
                    this.form = res.data;
                    this.houseData = res.data.houseSourceList;
                    this.hTotal = res.data.houseSourceList.length;
                    this.customData = res.data.reportCustomerList;
                    this.cTotal = res.data.reportCustomerList.length;
                    this.receiptData = res.data.acceptCustomerList;
                    this.rTotal = res.data.acceptCustomerList.length;
                }else{
                    this.$message({
                        message:res.msg,
                        type:'error',
                        duration:1000
                    })
                }
            })
        },
        // 返回
        goBack(){
            this.$router.go(-1)
        },
        // 分页 房源
        handleHouseChange(val){
            this.hCurrentPage = val;
            this.getBlackDetail(this.hCurrentPage)
        },
        // 分页 报单
        handleReplyChange(val){
            this.cCurrentPage = val;
            this.getBlackDetail(this.cCurrentPage)
        },
        // 分页 接单
        handleReceiptChange(val){
            this.rCurrentPage = val;
            this.getBlackDetail(this.rCurrentPage)
        },
        // 恢复
        toNormal(){
            this.$confirm(' 是否恢复此经纪人信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '恢复成功!'
                });
                this.disabled = true;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消恢复'
                });          
            });
        },
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
    width:30%;
    display: flex;
    justify-content: space-between;
    margin-right: 100px;
}
.content{
    width:100%;
}
.basic{
    width:90%;
    margin: auto;
    padding:0 20px;
    box-sizing: border-box;
}
h4{
    font-size: 24px;
    margin-bottom: 20px;
}
.basic ul{
    list-style: none;
    display: flex;
    flex-wrap: wrap   
}
.basic ul li{
    width:33%;
    height:50px
}
.basic p{
    font-size:16px;
}
.houseTable{
    border: 1px solid #5b5b5b;
    box-sizing: border-box;
    margin-bottom: 20px;
}
.houseTable p{
    font-size: 18px;
    margin:20px;
}
.attach ul{
    display: flex;
    flex-direction: column;
}
.button{
    width:100%;
    height: 90px;
}
.balck{
    width:95%;
    margin-left:10px;
    font-size:16px;
    outline:none;
    padding-left: 20px;
    box-sizing: border-box;
}
.block{
    margin: 20px 0
}
.reason{
    font-size: 18px;
    text-indent: 24px;
}
.had{
    float: right;
    width:80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: #67c23a;
    border-radius: 5px;
    margin-right: 100px;
}
</style>
