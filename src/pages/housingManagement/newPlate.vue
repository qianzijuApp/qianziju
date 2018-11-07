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
                    <el-select v-model="shelf" clearable placeholder="请选择上架状态" style="width:80%">
                        <el-option label="上架中" value="1"></el-option>
                        <el-option label="下架中" value="2"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="7">
                    <div class="search">
                        <el-input clearable placeholder="请输入房源编号" style="width:80%;margin-right:30px" v-model="text"></el-input>
                        <el-button type="primary" @click="search">搜索</el-button>
                    </div>
                </el-col>
            </el-row>
        </header>
        <div class="banner">
            <div class="num">
                <p>房源总数：<span>{{brokerNum}}人</span></p>
                <p>当前统计总量：<span>{{currentNum}}人</span></p>
            </div>
            <el-button type="warning" @click="build" style="margin-left:30px;margin-top:20px">新建</el-button>
        </div>   
        <div class="table">
            <el-table
                :data="tableData"
                border
                style="width: 95%;margin:auto">
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
                label="新盘名称">
                </el-table-column>
                <el-table-column
                prop="recordTime"
                label="开盘时间">
                </el-table-column>
                <el-table-column
                prop="developer"
                label="开发商">
                </el-table-column>
                <el-table-column
                prop="coverArea"
                label="占地面积(m²)">
                </el-table-column>
                <el-table-column
                prop="square"
                label="建筑面积(m²)">
                </el-table-column>
                <el-table-column
                prop="builds"
                label="楼栋总数(栋)">
                </el-table-column>
                <el-table-column
                prop="cell"
                label="总户数(户)">
                </el-table-column>
                <el-table-column
                prop="commission"
                label="佣金范围(元)">
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
            date:'',//日期查询
            city:'',//城市查询
            area:'',//区域查询
            shelf:'',//状态查询
            text:'',//条件查询
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
        this.getNews();
        this.getCities();
        this.getAreas();
    },
    methods:{
        getNews(){
            this.$post('houseSource/getHouseSourcesListByWeb',{
                houseSourceType: 3,
                beginDate: this.$getTimes(this.date[0]) ? this.$getTimes(this.date[0]) : null,
                endDate: this.$getTimes(this.date[1]) ? this.$getTimes(this.date[1]) : null,
                city: this.city ? this.city : null,
                area: this.area ? this.area : null,
                houseSourceNo: this.text ? this.text : null,
                status: this.shelf ? this.shelf : null,
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
            this.currentPage = 1;
            this.getNews(this.currentPage)
        },
        // 查看详情
        handleClick(val){
            console.log(val.cId)
            this.$router.push({
                path:'/newDetail',
                query:{
                    id: val.cId,
                    type: 3
                }
            })
        },
        // 新建
        build(){
            this.$router.push({
                path:'/edit'
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
.el-button--warning{
    height: 40px;
    margin-right: 100px;
}
/* 头部 */
.banner{
    width:100%;
    display:flex
}
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
