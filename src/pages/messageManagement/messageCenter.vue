<template>
    <div>
        <!-- 头部 -->
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
            <el-button type="primary" @click="add">新建</el-button>
        </header>
        <!-- 头部 -->
        <!-- 列表 -->
        <div class="table">
            <el-table
                :data="tableData"
                border
                style="width: 95%;margin:auto">
                <el-table-column
                prop="receivePerson"
                label="收件人">
                </el-table-column>
                <el-table-column
                prop="sendPerson"
                label="发件人">
                </el-table-column>
                <el-table-column
                prop="sendTel"
                label="发件人电话">
                </el-table-column>
                <el-table-column
                prop="time"
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
            tableData: [
                {
                    receivePerson:'黄大米',
                    sendPerson:'12315465465',
                    sendTel:'成都',
                    time: '高新',
                }
            ],
            brokerNum:'3000',
            currentNum:'200',
            currentPage:1,
            pageSize:10,
            total:100
        }
    },
    mounted(){
        this.getMsgs();
    },
    methods:{
        getMsgs(){
            this.$post('sysMessage/queryByRecord',{

            }).then(res=>{
                console.log(res);
                if(res.code == 0 || res.code == 200){

                }else{
                    this.$message({
                        message:res.msg,
                        type:'error',
                        duration:1000
                    })
                }
            })
            console.log('获取所有信息')
        },
        // 日期查询
        dateSearch(){
            console.log("日期搜索")
        },
        // 新建
        add(){
            this.$router.push({
                path:'/messageEdit'
            })
        },
        // 查看详情
        handleClick(){
            this.$router.push({
                path:'/messageDetail'
            })
        },
        // 分页
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
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.search{
    width:30%;
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
