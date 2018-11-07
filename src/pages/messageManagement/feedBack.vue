<template>
    <div>
        <header>
            <div class="date">
                <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @blur="dateSearch" clearable>
                </el-date-picker>
            </div>
        </header>
        <div class="table">
            <el-table
                :data="tableData"
                border
                style="width: 95%;margin:auto">
                <el-table-column
                prop="nickname"
                label="发件人">
                </el-table-column>
                <el-table-column
                prop="sendTel"
                label="发件人电话">
                </el-table-column>
                <el-table-column
                prop="cdate"
                label="时间">
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
            tableData: [],
            brokerNum:'3000',
            currentNum:'200',
            currentPage:1,
            pageSize:10,
            total:100
        }
    },
    mounted(){
        this.getFeeds();
    },
    methods:{
        getFeeds(){
            this.$post('suggestion/queryByRecord',{

            }).then(res=>{
                console.log(res);
                if(res.code == 0 || res.code == 200){
                    this.tableData = [];
                    this.tableData = res.data
                }else{
                    this.$message({
                        message:res.msg,
                        type:'error',
                        duration:1000
                    })
                }
            })
            console.log('获取所有反馈意见')
        },
        dateSearch(){
            console.log('日期搜索')
        },
        handleClick(val){
            this.$router.push({
                path:'/feedDetail',
                query:{
                    id:val.cId
                }
            })
        },
        handleCurrentChange(){
            console.log('分页')
        },
    }
}
</script>

<style scoped>
/* 头部 */
header{
    width:100%;
    height: 90px;
}
.date{
    float: right;
    padding-top:25px;
    margin-right: 100px;
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
