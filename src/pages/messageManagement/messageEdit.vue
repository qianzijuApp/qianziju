<template>
    <div id="edit">
        <!-- 头部 -->
        <header>
            <el-button type="primary" plain @click="goBack" style="margin-left:100px;">返回</el-button>
        </header>
        <!-- 头部 -->
        <!-- 内容 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="城市：" prop="city">
                <el-select v-model="ruleForm.city" placeholder="请选择城市" style="width:80%" clearable>
                    <el-option
                        v-for="item in cityLists"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="区域：" prop="area">
                <el-select v-model="ruleForm.area" placeholder="请选择区域" style="width:80%" clearable>
                    <el-option
                        v-for="item in areaLists"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="经纪人姓名：" prop="name" id="nameSelect" clearable>
                <el-select
                    v-model="ruleForm.name"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入经纪人"
                    :remote-method="remoteMethod"
                    :loading="loading"
                    style="width:80%;">
                    <el-option v-for="item in brokers" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="经纪人电话：" prop="tel" clearable>
                <el-select
                    v-model="ruleForm.tel"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入经纪人电话"
                    :remote-method="remoteTelMethod"
                    :loading="loading"
                    style="width:80%;">
                    <el-option v-for="item in tels" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="消息内容：" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc" style="width:80%;" placeholder="说点儿什么吧..."></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="warning" @click="submitForm('ruleForm')" style="margin-left:30%">推送</el-button>
            </el-form-item>
        </el-form>
        <!-- 内容 -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            cityLists:[],
            areaLists:[],
            ruleForm:{
                city:"",
                area:"",
                name:'',
                tel:'',
                desc:''
            },
            rules:{
                city:[
                    {required:true,message:'请选择城市',trigger:'blur'}
                ],
                area:[
                    {required:true,message:'请选择地区',trigger:'blur'}
                ],
                name:[
                    {required:true,message:'请选择经纪人',trigger:'blur'}
                ],
                tel:[
                    {required:true,message:'电话不能为空',trigger:'blur'},
                    { pattern:/^[1][3456789][0-9]{9}$/, message: '無效的电话', trigger: 'blur' },
                ],
                desc:[
                    {required:true,message:'消息内容不能为空',trigger:'blur'}
                ],
            },
            brokers: [],
            tels:[],
            list: [],
            telList:[],
            loading: false,
            states: ["Alabama", "Alaska", "Arizona",
            "Arkansas", "California", "Colorado",
            "Connecticut", "Delaware", "Florida",
            "Georgia", "Hawaii", "Idaho", "Illinois",
            "Indiana", "Iowa", "Kansas", "Kentucky",
            "Louisiana", "Maine", "Maryland",
            "Massachusetts", "Michigan", "Minnesota",
            "Mississippi", "Missouri", "Montana",
            "Nebraska", "Nevada", "New Hampshire",
            "New Jersey", "New Mexico", "New York",
            "North Carolina", "North Dakota", "Ohio",
            "Oklahoma", "Oregon", "Pennsylvania",
            "Rhode Island", "South Carolina",
            "South Dakota", "Tennessee", "Texas",
            "Utah", "Vermont", "Virginia",
            "Washington", "West Virginia", "Wisconsin",
            "Wyoming"],
            telStates: ["Alabama", "Alaska", "Arizona",
            "Arkansas", "California", "Colorado",
            "Connecticut", "Delaware", "Florida",
            "Georgia", "Hawaii", "Idaho", "Illinois",
            "Indiana", "Iowa", "Kansas", "Kentucky",
            "Louisiana", "Maine", "Maryland",
            "Massachusetts", "Michigan", "Minnesota",
            "Mississippi", "Missouri", "Montana",
            "Nebraska", "Nevada", "New Hampshire",
            "New Jersey", "New Mexico", "New York",
            "North Carolina", "North Dakota", "Ohio",
            "Oklahoma", "Oregon", "Pennsylvania",
            "Rhode Island", "South Carolina",
            "South Dakota", "Tennessee", "Texas",
            "Utah", "Vermont", "Virginia",
            "Washington", "West Virginia", "Wisconsin",
            "Wyoming"]
        }
    },
    mounted() {
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
      this.telList = this.telStates.map(item => {
        return { value: item, label: item };
      });
    },
    methods:{
        // 返回
        goBack(){
            this.$router.go(-1)
        },
        // 确认新建
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                        alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 远程搜索
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.brokers = this.list.filter(item => {
                    return item.label.toLowerCase()
                        .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.brokers = [];
            }
        },
        remoteTelMethod(query) {
            if (query !== '') {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.tels = this.telList.filter(item => {
                return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
                });
            }, 200);
            } else {
            this.tels = [];
            }
        }
    }
}
</script>

<style>
.el-textarea__inner{
    height: 200px !important;
}
</style>

<style scoped>
.demo-ruleForm{
    width:50%;
    margin: auto;
    padding:50px
}
#nameSelect{
    position: relative;
}
#nameSelect .el-button--primary{
    position: absolute;
    left:55%;
}
</style>
