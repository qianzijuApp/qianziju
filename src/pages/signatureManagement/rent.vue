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
                    <el-select v-model="audit" clearable placeholder="请选择审核状态" style="width:80%">
                        <el-option
                        v-for="item in auditLists"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="7">
                        <el-input clearable placeholder="请输入房源编号" style="width:80%;margin-right:30px" v-model="house"></el-input>
                </el-col>
                <el-col :span="7">
                    <div class="search">
                        <el-input clearable placeholder="请输入合同编号" style="width:80%;margin-right:30px" v-model="contract"></el-input>
                        <el-button type="primary" @click="search">搜索</el-button>
                    </div>
                </el-col>
            </el-row>
        </header>
        <div class="num">
            <p>房源总量：<span>{{brokerNum}}人</span></p>
            <p>当前统计总量：<span>{{currentNum}}人</span></p>
        </div>
        <div class="table">
            <el-table
                :data="tableData"
                border
                style="width: 95%;margin:auto">
                <el-table-column
                prop="contractAim"
                label="合同编号">
                </el-table-column>
                <el-table-column
                prop="aim"
                label="房源编号">
                </el-table-column>
                <el-table-column
                prop="city"
                label="城市">
                </el-table-column>
                <el-table-column
                prop="area"
                label="区域">
                </el-table-column>
                <el-table-column
                prop="house"
                label="楼盘">
                </el-table-column>
                <el-table-column
                prop="type"
                label="房型">
                </el-table-column>
                <el-table-column
                prop="amount"
                label="成交金额(元)">
                </el-table-column>
                <el-table-column
                prop="payType"
                label="付款类型">
                </el-table-column>
                <el-table-column
                prop="time"
                label="录入时间">
                </el-table-column>
                <el-table-column
                prop="record"
                label="审核记录">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
                </template>
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
            audit:'',
            house:'',
            contract:'',
            cityLists:[],
            areaLists:[],
            auditLists:[],
            tableData: [],
            brokerNum:'3000',
            currentNum:'200',
            currentPage:1,
            pageSize:10,
            total:100
        }
    },
    mounted(){
        this.getRent();
        this.getCites();
        this.getAreas();
    },
    methods:{
        getRent(){
            this.$post('sign/getSignByWeb',{
                dealType:3,
                beginDate: this.$getTimes(this.date[0]) ? this.$getTimes(this.date[0]) : null,
                endDate: this.$getTimes(this.date[1]) ? this.$getTimes(this.date[1]) : null,
                houseSourceNo: this.house ? this.house : null,
                contractNo: this.contract ?this.contract : null,
                status: this.audit ? this.audit : null
            }).then(res=>{
                console.log(res);
                if(res.code == 0 || res.code == 200){
                    this.tableData = res.data.list;
                    this.total = res.data.list.length;
                }else{
                    this.$message({
                        message:res.msg,
                        type:'error',
                        duration:1000
                    })
                }
            })
            console.log('获取租赁信息')
        },
        getCites(){
            console.log('获取城市')
        },
        getAreas(){
            console.log('获取区域')
        },
        // 条件查询
        search(){
            console.log("按条件搜索")
        },
        // 查看详情
        handleClick(){
            this.$router.push({
                path:'/rentDetail'
            })
        },
        // 分页
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
