<template>
    <div>
        <!-- 头部 -->
        <header>
            <el-button type="primary" plain @click="goBack">返回</el-button>
            <div class="personnel">
                <p>操作员工：<span>{{staff?staff:'无'}}</span></p>
                <p>电话：<span>{{staffTel?staffTel:'无'}}</span></p>
            </div>
        </header>
        <!-- 头部 -->
        <!-- 内容 -->
        <div class="content">
            <div class="buttons"> 
                <el-button type="primary" @click="toEntryAchieve" :disabled="disabled">录入业绩</el-button>
                <el-button type="warning" @click="toEntryBonus" :disabled="disabled">录入奖金</el-button>
                <el-button type="danger" @click="toDeductBonus" :disabled="disabled">扣除奖金</el-button>
            </div>
            <div class="basic" style="padding-top:100px">
                <h4>基本资料</h4>
                <ul>
                    <li>
                        <p>姓名：<span>{{name?name:'无'}}</span></p>
                    </li>
                    <li>
                        <p>电话：<span>{{tel?tel:'无'}}</span></p>
                    </li>
                    <li>
                        <p>推荐人：<span>{{referee?referee:'无'}}</span></p>
                    </li>
                    <li>
                        <p>性别：<span>{{sex==1?'男':'女'}}</span></p>
                    </li>
                    <li>
                        <p>年龄：<span>{{age?age:'0'}} 岁</span></p>
                    </li>
                    <li>
                        <p>主业务城市：<span>{{city?city:'无'}}</span></p>
                    </li>
                    <li>
                        <p>主业务区域：<span>{{area?area:'无'}}</span></p>
                    </li>
                    <li>
                        <p>经纪人总业绩：<span>{{income.totalAmount? income.totalAmount:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p>未结业绩：<span>{{income.unfinished?income.unfinished:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p>共计奖金总额：<span>{{income.totalBonus?income.totalBonus:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p>当前奖金余额：<span>{{income.currentBonus?income.currentBonus:'0'}} 元</span></p>
                    </li>
                </ul>
            </div>
            <div class="basic team">
                <h4>团队资料</h4>
                <ul>
                    <li>
                        <p>一级团队人数：<span>{{aNumber?aNumber:'0'}}人</span></p>
                    </li>
                    <li>
                        <p>二级团队人数：<span>{{bNumber?bNumber:'0'}}人</span></p>
                    </li>
                </ul>
            </div>
            <div class="basic attach">
                <h4>附加资料</h4>
                <ul>
                    <li>
                        <p>从业年限：<span>{{limitYear?limitYear:'0'}} 年</span></p>
                    </li>
                    <li>
                        <p>个人简介：<span>{{personalIntro?personalIntro:'无'}}</span></p>
                    </li>
                    <li>
                        <p>经纪人标语：<span>{{slogan?slogan:'无'}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="basic card">
                <h4>银行卡信息</h4>
                <ul>
                    <li>
                        <p>开户人：<span>{{holder?holder:'无'}}</span></p>
                    </li>
                    <li>
                        <p>开户银行：<span>{{bank?bank:'无'}}</span></p>
                    </li>
                    <li>
                        <p>银行卡号：<span>{{cardNumber?cardNumber:'无'}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="basic house">
                <h4>房源资料</h4>
                <div class="houseTable">
                    <p>房源总量：<span >{{hTotal?hTotal:'0'}} 套</span></p>
                    <el-table
                        :data="houseData"
                        border
                        style="width: 99%;margin:auto">
                        <el-table-column
                            prop="aim"
                            label="房源编号">
                        </el-table-column>
                        <el-table-column
                            prop="city"
                            label="城市">
                        </el-table-column>
                        <el-table-column
                            prop="houseName"
                            label="楼盘名称">
                        </el-table-column>
                        <el-table-column
                            prop="acreage"
                            label="面积">
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label="价格(元)">
                        </el-table-column>
                        <el-table-column
                            prop="houseProperty"
                            label="房屋性质">
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="状态">
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        @current-change="handleHouseChange"
                        :current-page="hCurrentPage"
                        :page-size="hPageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="hTotal">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="basic reply">
                <h4>报单客户</h4>
                <div class="houseTable">
                    <p>报单总量：<span>{{cTotal?cTotal:'0'}} 单</span></p>
                    <el-table
                        :data="customData"
                        border
                        style="width: 99%;margin:auto">
                        <el-table-column
                            prop="time"
                            label="时间">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="客户姓名">
                        </el-table-column>
                        <el-table-column
                            prop="tel"
                            label="客户电话">
                        </el-table-column>
                        <el-table-column
                            prop="intentCity"
                            label="意向城市">
                        </el-table-column>
                        <el-table-column
                            prop="intentArea"
                            label="意向区域">
                        </el-table-column>
                        <el-table-column
                            prop="broker"
                            label="合作经纪人">
                        </el-table-column>
                        <el-table-column
                            prop="brokerTel"
                            label="经纪人电话">
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        @current-change="handleReplyChange"
                        :current-page="cCurrentPage"
                        :page-size="cPageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="cTotal">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="basic receipt">
                <h4>接单客户</h4>
                <div class="houseTable">
                    <p>接单总量：<span>{{rTotal?rTotal:'0'}} 单</span></p>
                    <el-table
                        :data="receiptData"
                        border
                        style="width: 99%;margin:auto">
                        <el-table-column
                            prop="time"
                            label="时间">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="客户姓名">
                        </el-table-column>
                        <el-table-column
                            prop="tel"
                            label="客户电话">
                        </el-table-column>
                        <el-table-column
                            prop="intentCity"
                            label="意向城市">
                        </el-table-column>
                        <el-table-column
                            prop="intentArea"
                            label="意向区域">
                        </el-table-column>
                        <el-table-column
                            prop="broker"
                            label="合作经纪人">
                        </el-table-column>
                        <el-table-column
                            prop="brokerTel"
                            label="经纪人电话">
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        @current-change="handleReceiptChange"
                        :current-page="rCurrentPage"
                        :page-size="rPageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="rTotal">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="basic achieve">
                <h4>业绩操作记录</h4>
                <div class="houseTable">
                    <el-table
                        :data="achieveData"
                        border
                        style="width: 99%;margin: 10px auto">
                        <el-table-column
                            prop="time"
                            label="时间">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="操作员工">
                        </el-table-column>
                        <el-table-column
                            prop="tel"
                            label="电话">
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="操作类型">
                        </el-table-column>
                        <el-table-column
                            prop="amount"
                            label="业绩金额(元)">
                        </el-table-column>
                        <el-table-column
                            prop="contractNumber"
                            label="合同编号">
                        </el-table-column>
                        <el-table-column
                            prop="houseNumber"
                            label="房源编号">
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        @current-change="handleAchieveChange"
                        :current-page="aCurrentPage"
                        :page-size="aPageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="aTotal">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="basic bonus">
                <h4>奖金操作记录</h4>
                <div class="houseTable">
                    <el-table
                        :data="bonusData"
                        border
                        style="width: 99%;margin:10px auto">
                        <el-table-column
                            prop="time"
                            label="时间">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="操作员工">
                        </el-table-column>
                        <el-table-column
                            prop="tel"
                            label="电话">
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="操作类型">
                        </el-table-column>
                        <el-table-column
                            prop="amount"
                            label="奖金金额(元)">
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        @current-change="handleBonusChange"
                        :current-page="bCurrentPage"
                        :page-size="bPageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="bTotal">
                        </el-pagination>
                    </div>
                </div>
                 
            </div>
            <div class="button">
               <el-button type="danger" style="float:right;margin:20px 100px 0 0;" @click="toBlack" :disabled="disabled">拉黑</el-button> 
            </div>
        </div>
        <!-- 内容 -->
        <!-- 弹框   拉黑 -->
        <el-dialog title="拉黑原因" :visible.sync="dialogVisible" width="30%">
            <textarea cols="60" rows="10" placeholder="请输入拉黑的原因" class="balck" v-model="comment"></textarea>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submission" style="margin-left:0">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 弹框   拉黑 -->
        <!-- 录入业绩 -->
        <el-dialog title="录入业绩" :visible.sync="dialogAchieveVisible" width="30%">
            <el-form :model="achieveForm" :rules="rules" ref="achieveForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="提成来源：" prop="region" >
                    <el-select v-model="achieveForm.region" placeholder="请选择提成来源" style="width:100%" clearable>
                        <el-option label="一级团队" value="1"></el-option>
                        <el-option label="二级团队" value="2"></el-option>
                        <el-option label="房源提成" value="3"></el-option>
                        <el-option label="客源提成" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房源编号：" prop="houseNumber" v-if="this.achieveForm.region == 3">
                    <el-input v-model="achieveForm.houseNumber" clearable></el-input>
                </el-form-item>
                <el-form-item label="合同编号：" prop="contractNumber" v-if="this.achieveForm.region == 4">
                    <el-input v-model="achieveForm.contractNumber" clearable></el-input>
                </el-form-item>
                <el-form-item label="业绩金额：" prop="achieveNumber" v-if="this.achieveForm.region == 1 || this.achieveForm.region == 2">
                    <el-input v-model="achieveForm.achieveNumber" clearable>
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('achieveForm')" style="width:80%;margin-left:0">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 录入业绩 -->
        <!-- 录入、扣除奖金 -->
        <el-dialog title="录入/扣除奖金" :visible.sync="dialogBonusVisible" width="30%">
            <el-form :model="bonusForm" :rules="rules" ref="bonusForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="操作类型：" prop="bonusRegion">
                    <el-select v-model="bonusForm.bonusRegion" placeholder="请选择操作类型" style="width:100%;" clearable>
                        <el-option label="团队发展奖金" value="1"></el-option>
                        <el-option label="房源发布奖金" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="奖金金额：" prop="bonusNumber">
                    <el-input v-model="bonusForm.bonusNumber" clearable>
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="entryForm('bonusForm')" style="width:80%;margin-left:0;"  v-if="isEntry">确定</el-button>
                    <el-button type="primary" @click="deductForm('bonusForm')" style="width:80%;margin-left:0;" v-if="isDeduct">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 录入、扣除奖金 -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                
            },
            staff:'',//操作员工
            staffTel:'',//员工电话
            name:'',//姓名
            tel:'',//电话
            referee:'',//推荐人
            sex:'',//性别
            age:'',//年龄
            city:'',//主业务城市
            area:'',//主业务区域
            income: {},  //业绩
            aNumber:'',//一级团队人数
            bNumber:'',//二级团队人数
            limitYear:'',//从业年限
            personalIntro:'',//个人简介
            slogan:'',//经纪人标语
            holder:'',//开户人
            bank:'',//开户银行
            cardNumber:'',//银行卡号
            disabled:false,//拉黑后不能再次拉黑
            dialogVisible:false,//拉黑弹框
            dialogAchieveVisible:false,//录入业绩弹框
            dialogBonusVisible:false,//录入、扣除奖金弹框
            isEntry:true,//确定录入
            isDeduct:false,//确定扣除
            comment:'',//拉黑输入框的值
            houseData:[],//房源资料
            hCurrentPage:1,
            hPageSize:10,
            hTotal:30,
            customData:[],//报单客户
            cCurrentPage:1,
            cPageSize:10,
            cTotal:30,
            receiptData:[],//接单客户
            rCurrentPage:1,
            rPageSize:10,
            rTotal:30,
            achieveData:[],//业绩操作记录
            aCurrentPage:1,
            aPageSize:10,
            aTotal:30,
            bonusData:[],//奖金操作记录
            bCurrentPage:1,
            bPageSize:10,
            bTotal:30,
            achieveForm:{
                region:'1',
                houseNumber:'',//房源编号
                contractNumber:'',//合同编号
                achieveNumber:''//业绩金额
            },
            bonusForm:{
                bonusRegion:'',
                bonusNumber:'',//奖金金额
            },
            rules:{
                houseNumber:[
                    {required:true,message:'请填写房屋编号',trigger:'blur'},
                    { pattern:/^[1-9]\d*$/, message: '无效的数值', trigger: 'blur' },
                ],
                contractNumber:[
                    {required:true,message:'请填写合同编号',trigger:'blur'},
                    { pattern:/^[1-9]\d*$/, message: '无效的数值', trigger: 'blur' },
                ],
                achieveNumber:[
                    {required:true,message:'请填写业绩金额',trigger:'blur'},
                    { pattern:/^[1-9]\d*$/, message: '无效的数值', trigger: 'blur' },
                ],
                bonusNumber:[
                    {required:true,message:'请填写奖金金额',trigger:'blur'},
                    { pattern:/^[1-9]\d*$/, message: '无效的数值', trigger: 'blur' },
                ],
            }
        }
    },
    mounted(){
        this.getBrokerDetail()
    },
    methods:{
        getBrokerDetail(){
            this.$get('user/getUserInfoByWeb',{id:this.$route.query.id}).then(res=>{
                console.log(res);
                if(res.code == 0 || res.data == 200){
                    this.name = res.data.nickname;
                    this.tel = res.data.phone;
                    this.staff = res.data.operator;
                    this.staffTel = res.data.operatorPhone;
                    this.city = res.data.city;
                    this.area = res.data.area;
                    this.sex = res.data.gender;
                    this.aNumber = res.data.secondGroups;
                    this.bNumber = res.data.thridGroups;
                    this.slogan = res.data.slogan;
                    if(res.data.accountBank){
                        this.bank = res.data.accountBank;
                    }
                    if(res.data.accountNumber){
                        this.cardNumber = res.data.accountNumber;
                    }
                    if(res.data.accountOwner){
                        this.holder = res.data.accountOwner;
                    }
                    if(res.data.invitePhone){
                        this.referee = res.data.invitePhone;
                    }
                    this.age = res.data.age;
                    this.personalIntro = res.data.description;
                    this.limitYear = res.data.workYears;
                    this.receiptData = res.data.acceptCustomerList;
                    this.rTotal = res.data.acceptCustomerList.length;
                    this.bonusData = res.data.bounsList;
                    this.bTotal = res.data.bounsList.length;
                    this.achieveData = res.data.performanceList;
                    this.aTotal = res.data.performanceList.length;
                    this.customData = res.data.reportCustomerList;
                    this.cTotal = res.data.reportCustomerList.length;
                    this.houseData = res.data.houseSourceList;
                    this.hTotal = res.data.houseSourceList.length;
                    if(res.data.income){
                        this.income = res.data.income;
                    }
                   
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
        // 分页 房源资料
        handleHouseChange(val){

        },
        // 分页 报单客户
        handleReplyChange(val){

        },
        // 分页 接单客户
        handleReceiptChange(val){

        },
        // 分页 业绩操作记录
        handleAchieveChange(val){

        },
        // 分页 奖金操作记录
        handleBonusChange(val){

        },
        // 拉黑
        toBlack(){
            this.dialogVisible = true;
            this.comment = '';
        },
        // 确定拉黑
        submission(){
            if(this.comment == ''){
                this.$message({
                    message:'请填写拉黑原因',
                    type:'error',
                    duration:1000
                })
            }else{
                this.$get('user/blackUser',{
                    id: this.$route.query.id,
                    blackreason:this.comment
                }).then(res=>{
                    console.log(res);
                    if(res.code == 0 || res.code == 200){
                        this.dialogVisible = false;
                        this.disabled = true;
                        this.$message({
                            message:'已拉黑',
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
                
            }
        },
        // 录入业绩
        toEntryAchieve(){
            this.dialogAchieveVisible = true;
            this.achieveForm.houseNumber = '';
            this.achieveForm.contractNumber = '';
            this.achieveForm.achieveNumber = '';
        },
        // 确定录入业绩
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$post('performance/addPerformance',{
                        earnSource:this.achieveForm.region,
                        contractNo: this.achieveForm.contractNumber,
                        houseSourceNo:this.achieveForm.houseNumber,
                        money:this.achieveForm.achieveNumber,
                        kind:1
                    }).then(res=>{
                        console.log(res);
                        if(res.code == 0 || res.code == 200){
                            this.dialogAchieveVisible = false;
                            this.$message({
                                message:'录入业绩成功',
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
        // 录入奖金
        toEntryBonus(){
            this.dialogBonusVisible = true;
            this.isEntry = true;
            this.isDeduct = false;
            this.bonusForm.bonusNumber = '';
        },
        // 确定录入
        entryForm(formName){
            console.log('录入')
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.bonusForm.bonusRegion == ''){
                        this.$message({
                            message:'请选择操作类型',
                            type:'error',
                            duration:1000
                        })
                    }else{
                        this.$post('performance/addPerformance',{
                            earnSource:this.bonusForm.bonusRegion,                        
                            money:this.achieveForm.achieveNumber,
                            kind:2,
                            operatorStatus:3
                        }).then(res=>{
                            console.log(res);
                            if(res.code == 0 || res.code == 200){
                                this.dialogBonusVisible= false;
                                this.$message({
                                    message:'录入奖金成功',
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
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 扣除奖金
        toDeductBonus(){
            this.dialogBonusVisible = true;
            this.isEntry = false;
            this.isDeduct = true;
            this.bonusForm.bonusNumber = '';
        },
        // 确定扣除
        deductForm(formName){
            console.log("扣除")
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(this.bonusForm.bonusRegion == ''){
                    this.$message({
                        message:'请选择操作类型',
                        type:'error',
                        duration:1000
                    })
                }else{
                    this.$post('performance/addPerformance',{
                            earnSource:this.bonusForm.bonusRegion,                        
                            money:this.achieveForm.achieveNumber,
                            kind:2,
                            operatorStatus:4
                        }).then(res=>{
                            console.log(res);
                            if(res.code == 0 || res.code == 200){
                                this.dialogBonusVisible= false;
                                this.$message({
                                    message:'扣除奖金成功',
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
                }
            } else {
                console.log('error submit!!');
                return false;
            }
            });
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
.el-button{
    height: 40px;
    margin-left: 100px;
}
.personnel{
    width:30%;
    display: flex;
    justify-content: space-around;
}
.buttons{
    float: right;
    padding-top:50px;
    margin-right: 100px;
}
.content{
    width:100%;
}
.attach ul{
    display: flex;
    flex-direction: column;
}
.basic{
    width:90%;
    margin: auto;
    padding:0 20px;
    box-sizing: border-box;
}
h4{
    font-size: 24px;
    margin-bottom: 20px;
}
.basic ul{
    list-style: none;
    display: flex;
    flex-wrap: wrap   
}
.basic ul li{
    width:33%;
    height:30px
}
.basic p{
    font-size:16px;
}
.houseTable{
    border: 1px solid #5b5b5b;
    box-sizing: border-box;
    margin-bottom: 20px;
}
.houseTable p{
    font-size: 18px;
    margin:20px;
}
.button{
    width:100%;
    height: 90px;
}
.balck{
    width:95%;
    margin-left:10px;
    font-size:16px;
    outline:none;
    padding-left: 20px;
    box-sizing: border-box;
}
.block{
    margin: 20px 0
}
</style>
