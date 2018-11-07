<template>
    <div>
        <header>
            <el-button type="warning" @click="save('ruleForm')" style="float:right;margin-top:25px;margin-right:100px;">保存</el-button>
        </header>
        <div class="content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
                <el-form-item label="每日抢置顶时间设置：" prop="time">
                     <el-time-picker
                        v-model="ruleForm.time"
                        editable
                        style="width:70%"
                        type="datetime" 
                        value-format="HH:mm" format="HH:mm"
                        placeholder="请选择时间" clearable>
                    </el-time-picker>
                </el-form-item>
                <el-form-item label="每日置顶总套数限制：" prop="number">
                    <el-input v-model="ruleForm.number" style="width:70%" clearable>
                        <template slot="append">套</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="区域每日置顶数量限制：" prop="area">
                    <el-input v-model="ruleForm.area" style="width:70%" clearable>
                        <template slot="append">单</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="经纪人每日置顶数量限制：" prop="broker">
                    <el-input v-model="ruleForm.broker" style="width:70%" clearable>
                        <template slot="append">套</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="经纪人每周抢客数量限制：" prop="custom">
                    <el-input v-model="ruleForm.custom" style="width:70%" clearable>
                        <template slot="append">个</template>
                    </el-input>
                </el-form-item>              
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            ruleForm:{
                time:'',
                number:'',
                area:'',
                broker:'',
                custom:''
            },
            rules:{
                time:[
                    {required:true,message:'请输入每日置顶时间',trigger:'blur'},
                ],
                number:[
                    {required:true,message:'请输入每日置顶数量',trigger:'blur'},
                    { pattern:/^.{1,3}$/, message: '长度在3位数以内', trigger: 'blur' },
                    { pattern: /^[1-9]\d{0,2}$/, message: '请输入数值', trigger: 'blur' },
                ],
                area:[
                    {required:true,message:'请输入区域每日置顶数量',trigger:'blur'},
                    { pattern:/^.{1,3}$/, message: '长度在3位数以内', trigger: 'blur' },
                    { pattern: /^[1-9]\d{0,2}$/, message: '请输入数值', trigger: 'blur' },
                ],
                broker:[
                    {required:true,message:'请输入经纪人每日置顶数量',trigger:'blur'},
                    { pattern:/^.{1,3}$/, message: '长度在3位数以内', trigger: 'blur' },
                    { pattern: /^[1-9]\d{0,2}$/, message: '请输入数值', trigger: 'blur' },
                ],
                custom:[
                    {required:true,message:'请输入经纪人每周抢客数量',trigger:'blur'},
                    { pattern:/^.{1,2}$/, message: '长度在2位数以内', trigger: 'blur' },
                    { pattern: /^[1-9]\d{0,1}$/, message: '请输入数值', trigger: 'blur' },
                ],
            }
        }
    },
    mounted(){
        this.getSetting();
    },  
    methods:{
        getSetting(){
            this.$post('sysConfig/getSysConfigByWeb',{

            }).then(res=>{
                console.log(res);
                if(res.code == 0 || res.code == 200){

                }else{
                    this.$message({
                        message:res.mag,
                        type:'error',
                        duration:1000
                    })
                }
            })
            console.log('获取参数设置')
        },
        // 保存
        save(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$post('sysConfig/addSysConfig').then(res=>{
                        console.log(res);
                        if(res.code == 0 || res.code == 200){
                            this.$message({
                                message:'保存成功',
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
                    alert('submit!');
                } else {
                    return false;
                }
            });
        }
    }
}
</script>

<style>
.el-popper[x-placement^=bottom]{
    width:31% !important;
}
</style>

<style scoped>

header{
    width:100%;
    height: 90px;
}
.el-form-item{
    margin-bottom: 50px !important;
}
.content{
    width: 100%;
}
.demo-ruleForm{
    width:62.5%;
    margin: auto;
    padding: 100px;
}
</style>
