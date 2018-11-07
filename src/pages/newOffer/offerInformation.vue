<template>
    <div>
        <header>
            <el-row>
                <el-col :span="7">
                    <div class="date">
                        <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        style="width:80%"
                        clearable>
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="7">
                    <el-select v-model="city" clearable placeholder="请选择城市" style="width:80%"> 
                        <el-option
                        v-for="item in cityLists"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="7">
                    <el-select v-model="area" clearable placeholder="请选择区域" style="width:80%">
                        <el-option
                        v-for="item in areaLists"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="7">
                        <el-input clearable placeholder="请输入电话" style="width:80%;margin-right:30px" v-model="phone"></el-input>
                </el-col>
                <el-col :span="7">
                    <div class="search">
                        <el-input clearable placeholder="请输入报盘经纪人姓名" style="width:80%;margin-right:30px" v-model="name"></el-input>
                        <el-button type="primary" @click="search">搜索</el-button>
                    </div>
                </el-col>
            </el-row>
        </header>
        <div class="num">
            <p>报盘总数：<span>{{brokerNum}}人</span></p>
            <p>当前报盘总量：<span>{{currentNum}}人</span></p>
        </div>
        <div class="table">
            <el-table
                :data="tableData"
                border
                style="width: 95%;margin:auto">
                <el-table-column
                prop="name"
                label="新盘名称">
                </el-table-column>
                <el-table-column
                prop="leader"
                label="开发商负责人">
                </el-table-column>
                <el-table-column
                prop="leaderTel"
                label="联系电话">
                </el-table-column>
                <el-table-column
                prop="range"
                label="佣金范围(元)">
                </el-table-column>
                <el-table-column
                prop="houseType"
                label="房屋类别">
                </el-table-column>
                <el-table-column
                prop="broker"
                label="报盘经纪人">
                </el-table-column>
                <el-table-column
                prop="brokerTel"
                label="电话">
                </el-table-column>
                <el-table-column
                prop="time"
                label="报备时间">
                </el-table-column>
                <el-table-column
                prop="address"
                label="楼盘位置">
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            date:'',
            city:'',
            area:'',
            phone:'',
            name:'',
            cityLists:[],
            areaLists:[],
            tableData: [
                {
                    time:'2018-10-18',
                    name: '恒大',
                    leader: '成都',
                    leaderTel:'高新',
                    range:'2000-3000',
                    houseType:'卖',
                    broker:'黄大米',
                    brokerTel:'15983735209',
                    address:"黄小米",
                },
                {
                    time:'2018-10-18',
                    name: '恒大',
                    leader: '成都',
                    leaderTel:'高新',
                    range:'2000-3000',
                    houseType:'卖',
                    broker:'黄大米',
                    brokerTel:'15983735209',
                    address:"黄小米",
                },
                {
                    time:'2018-10-18',
                    name: '恒大',
                    leader: '成都',
                    leaderTel:'高新',
                    range:'2000-3000',
                    houseType:'卖',
                    broker:'黄大米',
                    brokerTel:'15983735209',
                    address:"黄小米",
                },
                {
                    time:'2018-10-18',
                    name: '恒大',
                    leader: '成都',
                    leaderTel:'高新',
                    range:'2000-3000',
                    houseType:'卖',
                    broker:'黄大米',
                    brokerTel:'15983735209',
                    address:"黄小米",
                },
            ],
            brokerNum:'3000',
            currentNum:'200',
            currentPage:1,
            pageSize:10,
            total:100
        }
    },
    mounted(){
        this.getInfo();
        this.getCities();
        this.getAreas();
    },
    methods:{
        getInfo(){
            console.log('获取报盘资料')
        },
        getCities(){
            console.log('获取城市')
        },
        getAreas(){
            console.log('获取区域')
        },
        dateSearch(){
            console.log("日期搜索")
        },
        citySearch(){
            console.log("城市搜索")
        },
        areaSearch(){
            console.log("区域搜索")
        },
        search(){
            console.log("按条件搜索")
        },
        handleClick(){
            this.$router.push({
                path:'/blackDetail'
            })
        },
        handleCurrentChange(){
            console.log('分页')
        },
    }
}
</script>

<style>
.el-row{
    width:100%;
}
.el-col-7{
    width:30%;
    margin-left: 30px;
    margin-bottom: 30px;
}
</style>
<style scoped>
/* 头部 */
header{
    width:100%;
    height: 90px;
    display: flex;
    padding:100px 20px;
    justify-content: space-around;
    align-items: center;
    box-sizing:border-box;
}
.search{
    display: flex;
    justify-content: space-around
}
.el-button--primary{
    height: 40px;
}
/* 头部 */
.num{
    width:100%;
    padding-left:3%;
    box-sizing: border-box;
}
.num p{
    font-size: 20px;
}
.num span{
    font-size: 24px;
    color: #ff8400
}
/* 列表 */
    .table{
        padding-top: 50px;
    }
/* 列表 */
    .block{
        width: 100%;
        height: 80px;
    }
    .el-pagination{
        float: right;
        margin:30px 50px 0 0;
    }
    .el-pagination button, .el-pagination span:not([class*=suffix]),.el-pager li,.el-pagination__editor.el-input .el-input__inner{
        height: 40px !important;
        line-height: 40px;
        font-size: 16px;
    }
    .el-pagination .el-select .el-input .el-input__inner{
        height: 43px !important;
        font-size: 16px;
    }
</style>
