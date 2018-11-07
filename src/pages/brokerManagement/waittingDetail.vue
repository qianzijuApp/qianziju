<template>
    <div>
        <!-- 头部 -->
         <header>
            <el-button type="primary" plain @click="goBack">返回</el-button>
            <div class="personnel" v-if="isPersonnel">
                <p>操作员工：<span>{{form.staff ? form.staff : '无'}}</span></p>
                <p>电话：<span>{{form.staffTel ? form.staffTel : '无'}}</span></p>
            </div>
        </header>
        <!-- 头部 -->
        <!-- 内容 -->
        <div class="content">
            <h4>申请资料</h4>
            <p class="apply">申请时间：<span>{{form.registerDate? form.registerDate:'无'}}</span></p>
            <ul>
                <li>
                    <label>姓名：</label>
                    <span>{{form.nickname? form.nickname:'无'}}</span>
                </li>
                <li>
                    <label>电话：</label>
                    <span>{{form.phone? form.phone:"无"}}</span>
                </li>
                <li>
                    <label>推荐人：</label>
                    <span>{{form.referee? form.referee:'无'}}</span>
                </li>
                <li>
                    <label>性别：</label>
                    <span>{{form.gender == 1?'男':'女'}}</span>
                </li>
                <li>
                    <label>年龄：</label>
                    <span>{{form.age?form.age:'0'}} 岁</span>
                </li>
                <li>
                    <label>主业务资料：</label>
                    <span>{{form.city?form.city:'无'}}</span>
                </li>
                <li>
                    <label>主业务区域：</label>
                    <span>{{form.area?form.area:'无'}}</span>
                </li>
            </ul>
            <div class="button" v-if="isButtonShow">
                <el-button type="danger"  @click="refuse">拒绝</el-button>
                <el-button type="success"  @click="agreen">通过</el-button>
            </div>
            <div class="result">
                <p class="yes" v-if="isAgreen">已通过</p>
                <p class="no" v-if="isRefuse">已拒绝</p>
            </div>
             
        </div>
        <!-- 内容 -->
        <!-- 拒绝原因 -->
        <el-dialog title="拒绝原因" :visible.sync="dialogVisible" width="30%">
            <textarea cols="60" rows="10" placeholder="请输入拒绝的原因" class="balck" v-model="comment"></textarea>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submission">确 定</el-button>
            </span>
        </el-dialog>
       <!-- 拒绝原因 -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{},
            dialogVisible:false,
            isAgreen:false,
            isRefuse:false,
            isButtonShow:true,
            isPersonnel:false,
            comment:''//拒绝理由
        }
    },
    mounted(){
        this.getWaitterDetail();
    },
    methods:{
        getWaitterDetail(){
            this.$get('user/getUserIntroduce',{
                id:this.$route.query.id
            }).then(res=>{
                console.log(res);
                if(res.code == 0 || res.code == 200){
                    this.form = res.data
                }else{
                    this.$message({
                        message:res.msg,
                        type:"error",
                        duration:1000
                    })
                }
            })
        },
        // 返回
        goBack(){
            this.$router.go(-1)
        },
        // 拒绝
        refuse(){
            this.dialogVisible = true;
            this.isPersonnel = true;
        },
        // 确定拒绝
        submission(){
            if(this.comment == ''){
                this.$message({
                    message:'请填写拒绝的原因',
                    type:'error',
                    duration:1000
                })
            }else{
                this.dialogVisible = false;
                this.isRefuse = true;
                this.isButtonShow = false;
                this.getWaitterDetail()
            }
        },
        // 通过
        agreen(){
            this.isAgreen = true;
            this.isPersonnel = true;
            this.isButtonShow = false;
            this.getWaitterDetail()
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
.el-button--primary:first-of-type{
    height: 40px;
    margin-left: 100px
}
.el-button--danger,.el-button--success{
    margin-bottom: 50px;
}
.personnel{
    width:30%;
    margin-right: 100px;
    display: flex;
    justify-content: space-between;
}
.personnel p{
    font-size: 18px;
}
.content{
    width:100%;
}
.apply{
    padding-left: 80px;
    box-sizing: border-box;
}
h4{
    font-size: 24px;
    padding:20px 100px;
    margin-top: 20px; 
    box-sizing: border-box;
}
.content p{
    font-size: 18px;
    margin-left: 20px;
}
ul{
    list-style: none;
    width:100%;
    display: flex;
    flex-wrap: wrap;
    padding:20px 100px 100px;
    box-sizing: border-box;
}
ul>li{
    width:33%;
    height: 50px;
}
.button{
    width:30%;
    margin: auto;
    display: flex;
    justify-content: space-between;
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
    width:200px;
    margin: auto;
    padding-bottom: 50px;
}
.yes,.no{
    width:100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    border-radius: 5px;
}
.yes{
    background-color: #67c23a;
    
}
.no{
    background-color: #f56c6c;

}
</style>
