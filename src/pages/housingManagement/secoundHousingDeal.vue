<template>
    <div>
        <!-- 头部 -->
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
                        <el-input clearable placeholder="请输入房源编号" style="width:80%;margin-right:30px" v-model="aim"></el-input>
                </el-col>
                <el-col :span="7">
                    <div class="search">
                        <el-input clearable placeholder="请输入经纪人姓名" style="width:80%;margin-right:30px" v-model="name"></el-input>
                        <el-button type="primary" @click="search">搜索</el-button>
                    </div>
                </el-col>
            </el-row>
        </header>
        <!-- 头部 -->
        <!-- 数量统计 -->
        <div class="num">
            <p>房源总数：<span>{{brokerNum}}人</span></p>
            <p>当前统计总量：<span>{{currentNum}}人</span></p>
        </div>
        <!-- 数量统计 -->
        <!-- 列表 -->
        <div class="table">
            <el-table
                :data="tableData"
                border
                style="width: 95%;margin:auto">
                <el-table-column
                prop="houseSourceNo"
                label="房源编号">
                </el-table-column>
                <el-table-column
                prop="city"
                label="所属城市">
                </el-table-column>
                <el-table-column
                prop="area"
                label="区域">
                </el-table-column>
                <el-table-column
                prop="buildName"
                label="楼盘">
                </el-table-column>
                <el-table-column
                prop="builds"
                label="楼栋单元">
                </el-table-column>
                <el-table-column
                prop="roomNumber"
                label="房号">
                </el-table-column>
                <el-table-column
                prop="square"
                label="面积(m²)">
                </el-table-column>
                <el-table-column
                prop="totalPrice"
                label="价格(元)">
                </el-table-column>
                <el-table-column
                prop="recorder"
                label="经纪人">
                </el-table-column>
                 <el-table-column
                prop="recorderPhone"
                label="电话">
                </el-table-column>
                <el-table-column
                prop="recordTime"
                label="买卖时间">
                </el-table-column>
                <el-table-column
                prop="status"
                label="上架状态">
                <template slot-scope="scope">
                    <p v-if="scope.row.status == 1">上架中</p>
                    <p v-if="scope.row.status == 0">下架中</p>
                </template>
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
        <!-- 列表 -->
        <!-- 分页 -->
        <div class="block">
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
        <!-- 分页 -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            date:'',//日期查询
            city:'',//城市查询
            area:'',//区域查询
            phone:'',//条件查询
            name:'',
            aim:'',
            cityLists:[],
            areaLists:[],
            tableData: [],
            brokerNum:'3000',
            currentNum:'200',
            currentPage:1,
            pageSize:10,
            total:100
        }
    },
    mounted(){
        this.getDeals();
        this.getCities();
        this.getAreas();
    },
    methods:{
        getDeals(){
            this.$post('houseSource/getHouseSourcesListByWeb',{
                houseSourceType: 1,
                beginDate: this.$getTimes(this.date[0]) ? this.$getTimes(this.date[0]) : null,
                endDate: this.$getTimes(this.date[1]) ? this.$getTimes(this.date[1]) : null,
                city: this.city ? this.city : null,
                area: this.area ? this.area : null,
                phone: this.phone ? this.phone : null,
                houseSourceNo: this.aim ? this.aim : null,
                name: this.name ? this.name : null,
                pageNum: this.currentPage ? this.currentPage : 1,
                pageSize:this.pageSize ? this.pageSize : 20
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
        },
        getCities(){
            console.log('获取城市')
        },
        getAreas(){
            console.log('获取区域')
        },
        // 条件查询
        search(){
            this.currentPage = 1
            this.getDeals(this.currentPage)
        },
        // 查看详情
        handleClick(val){
            this.$router.push({
                path:'/secoundDealDetail',
                query:{
                    id:val.cId,
                    type: 1
                }
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
    align-items: center;
    box-sizing: border-box;
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
