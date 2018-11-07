<template>
    <div>
        <header>
            <el-button type="primary" plain @click="goBack">返回</el-button>
            <el-button type="warning"  @click="add">新增</el-button>            
        </header>
        <div class="table">
            <el-table
                :data="tableData"
                border
                style="width: 95%;margin:auto">
                <el-table-column
                prop="nickname"
                label="姓名">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="电话">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="200">
                <template slot-scope="scope">
                    <el-button @click="handleUpdate(scope.row)" type="warning" size="small">修改</el-button>
                    <el-button @click="handleRemove(scope.row)" type="danger" size="small">删除</el-button>
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
        <el-dialog :visible.sync="dialogVisible" width="30%">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名：" prop="name">
                    <el-input v-model="form.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="电话：" prop="tel">
                    <el-input v-model="form.tel" maxlength="11" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="passWord">
                    <el-input v-model="form.passWord" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="newBuild('form')" style="width:80%;" v-if="isAdd">确定</el-button>
                    <el-button type="primary" @click="update('form')" style="width:80%;" v-if="isUpdate">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dialogVisible:false,
            isAdd:true,
            isUpdate:false,
            form:{
                name:'',
                tel:'',
                passWord:''
            },
            rules:{
                name:[
                    {required:true,message:'姓名不能为空',trigger:'blur'},
                    { pattern:/^.{1,4}$/, message: '长度在4个字以内', trigger: 'blur' },
                    { pattern: /^[\u4e00-\u9fa5]*$/, message: '无效的姓名', trigger: 'blur' },
                ],
                tel:[
                    {required:true,message:'电话不能为空',trigger:'blur'},
                    { pattern:/^[1][3456789][0-9]{9}$/, message: '无效的电话', trigger: 'blur' },
                ],
                passWord:[
                    {required:true,message:'密码不能为空',trigger:'blur'},
                    { pattern:/^.{8,20}$/, message: '长度在8-20个字以内', trigger: 'blur' },
                    { pattern:/^[^\u4E00-\u9FA5\uF900-\uFA2D\u0020]*$/, message: '无效的密码', trigger: 'blur' },
                ]
            },
            tableData: [],
            currentPage:1,
            pageSize:10,
            total:100
        }
    },
    mounted(){
        this.getUsers()
    },
    methods:{
        getUsers(){
            this.$get('user/getUserListByRole').then(res=>{
                console.log(res);
                if(res.code == 0 || res.code == 200){
                    this.tableData = res.data;
                    this.total = res.data.length;
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
        // 新建
        add(){
            this.dialogVisible = true;
            this.form.name = '';
            this.form.tel = '';
            this.form.passWord = '';
        },
        // 确定新建
        newBuild(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$post("user/addManager",{
                        nickName:this.form.name,
                        phone: this.form.tel,
                        password: this.form.passWord
                    }).then(res=>{
                        if(res.code == 0 || res.code == 200){
                            this.dialogVisible = false;
                            this.$message({
                                message:res.msg,
                                type:'success',
                                duration:1000
                            });
                            this.getUsers()
                        }else{
                            this.$message({
                                message:res.msg,
                                type:'error',
                                duration:1000
                            })
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 修改
        handleUpdate(val){
            this.dialogVisible = true;
            this.isAdd = false;
            this.isUpdate = true;
            this.id = val.id;
            this.form.name = val.nickname;
            this.form.tel = val.phone
        },
        // 确定修改
        update(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$post("user/updateUserByManager",{
                        cId:this.id,
                        nickname:this.form.name,
                        phone:this.form.tel,
                        password:this.form.passWord
                    }).then(res=>{
                        console.log(res);
                        if(res.code == 0 || res.code == 200){
                            this.$message({
                                message:res.msg,
                                type:'success',
                                duration:1000
                            })
                        }else{
                            this.$message({
                                message:res.msg,
                                type:'error',
                                duration:1000
                            })
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 删除
        handleRemove(){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    box-sizing: border-box;
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
