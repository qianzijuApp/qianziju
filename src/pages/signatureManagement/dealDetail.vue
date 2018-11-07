<template>
    <div>
        <header>
            <el-button type="primary" plain @click="goBack">返回</el-button>
            <div class="personnel">
                <p>录入经纪人：<span>{{entryBroker?entryBroker:'无'}}</span></p>
                <p>电话：<span>{{entryTel?entryTel:'无'}}</span></p>
            </div>
        </header>
        <div class="topButton" v-if="showBut">
            <p class="over" @click="over">交易完毕</p>
            <p class="add_other" @click="add">添加后续人员</p>
        </div>
        <div class="content">
            <div class="houseInfo">
                <h4>房源信息</h4>
                <ul>
                    <li>
                        <p>交易类型：<span>{{type?type:'无'}}</span></p>
                    </li>
                    <li>
                        <p>合同编号：<span>{{contract?contract:'无'}}</span></p>
                    </li>
                    <li>
                        <p>房源编号：<span>{{house?house:'无'}}</span></p>
                    </li>
                    <li>
                        <p>楼盘名称：<span>{{houseName?houseName:'无'}}</span></p>
                    </li>
                    <li>
                        <p>权证号：<span>{{warrant?warrant:"无"}}</span></p>
                    </li>
                    <li>
                        <p>产权证地址：<span>{{address?address:'无'}}</span></p>
                    </li>
                    <li>
                        <p>房屋性质：<span>{{property?property:'无'}}</span></p>
                    </li>
                    <li>
                        <p>成交价格：<span>{{price?price:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p>房东应付佣金：<span>{{shouldPay?shouldPay:"0"}} 元</span></p>
                    </li>
                    <li>
                        <p>已支付佣金：<span>{{paid?paid:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p style="color:red">补交佣金：<span>{{comple?comple:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p>房东姓名：<span>{{landlord?landlord:'无'}}</span></p>
                    </li>
                    <li>
                        <p>房东身份证号：<span>{{landlordId?landlordId:'无'}}</span></p>
                    </li>
                    <li>
                        <p>房东电话：<span>{{landlordTel?landlordTel:'无'}}</span></p>
                    </li>
                    <li>
                        <p>有无共有人：<span>{{commoner?commoner:'无'}}</span></p>
                    </li>
                    <li>
                        <p>和共有人关系：<span>{{relative?relative:'无'}}</span></p>
                    </li>
                    <li>
                        <p>共有人姓名：<span>{{commonName?commonName:'无'}}</span></p>
                    </li>
                    <li>
                        <p>共有人身份证号：<span>{{commonId?commonId:'无'}}</span></p>
                    </li>
                    <li>
                        <p>共有人电话：<span>{{commonTel?commonTel:'无'}}</span></p>
                    </li>
                    <li>
                        <p>房屋是否按揭：<span>{{mortgage?mortgage:'无'}}</span></p>
                    </li>
                    <li>
                        <p>按揭剩余金额：<span>{{surplus?surplus:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p>房源方经纪人：<span>{{fyfBroker?fyfBroker:'无'}}</span></p>
                    </li>
                    <li>
                        <p>电话：<span>{{fyfTel?fyfTel:'无'}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="houseInfo">
                <h4>客源信息</h4>
                <ul>
                    <li>
                        <p>客户姓名：<span>{{name?name:'无'}}</span></p>
                    </li>
                    <li>
                        <p>身份证号：<span>{{idCard?idCard:'无'}}</span></p>
                    </li>
                    <li>
                        <p>是否有共有人：<span>{{iscommon?iscommon:"无"}}</span></p>
                    </li>
                    <li>
                        <p>共有人身份证号：<span>{{commomIdCard?commomIdCard:'无'}}</span></p>
                    </li>
                    <li>
                        <p>共有人姓名：<span>{{commonNameC?commonNameC:'无'}}</span></p>
                    </li>
                    <li>
                        <p>共有人电话：<span>{{commonTelC?commonTelC:'无'}}</span></p>
                    </li>
                    <li>
                        <p>是否按揭：<span>{{mort?mort:'无'}}</span></p>
                    </li>
                    <li>
                        <p>首付金额：<span>{{payments?payments:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p>预计按揭金额：<span>{{estimate?estimate:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p>成交价格：<span>{{deal?deal:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p>佣金：<span>{{commion?commion:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p>已支付佣金：<span>{{paidC?paidC:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p style="color:red">补交佣金：<span>{{after?after:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p>推荐经纪人：<span>{{recommen?recommen:'无'}}</span></p>
                    </li>
                    <li>
                        <p>经纪人电话：<span>{{phone?phone:'无'}}</span></p>
                    </li>
                    <li>
                        <p>签约日期：<span>{{date?date:'无'}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="houseInfo">
                <h4>备注信息</h4>
                <p style="text-indent:28px;padding:0 20px;">{{remark?remark:'无'}}</p>
            </div>
            <div class="houseInfo" v-for="(item,index) in items" :key="index">
                <h4>{{item.title}}</h4>
                <ul>
                    <li>
                        <p>姓名：<span>{{transfer?transfer:'无'}}</span></p>
                    </li>
                    <li>
                        <p>电话：<span>{{transferTel?transferTel:'无'}}</span></p>
                    </li>
                </ul>
            </div>
            <!-- <div class="houseInfo" v-if="this.form.add == 2">
                <h4>贷款人员</h4>
                <ul>
                    <li>
                        <p>姓名：<span>{{loaner?loaner:'无'}}</span></p>
                    </li>
                    <li>
                        <p>电话：<span>{{loanTel?loanTel:'无'}}</span></p>
                    </li>
                </ul>
            </div> -->
            
            <div class="bottomButtons" v-if="isShow">
                <p class="no" @click="refuse">拒绝</p>
                <p class="yes" @click="pass">通过</p>
            </div>
            <div class="result">
                <p class="hadOver" v-if="isHadOver">交易完毕</p>
                <p class="hadPass" v-if="isHadPass">已通过</p>
                <p class="hadRefuse" v-if="isHadRefuse">已拒绝</p>
            </div>
        </div>
        <el-dialog title="拒绝原因" :visible.sync="dialogVisible" width="30%">
            <textarea cols="60" rows="10" placeholder="请输入拒绝的原因" class="balck" v-model="comment"></textarea>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submission" style="margin-left:unset">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="添加后续人员" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" :rules="rules" ref="form" label-width="130px" class="demo-ruleForm">
                <el-form-item label="添加后续人员：" prop="add">
                    <el-select v-model="form.add" placeholder="请选择提成来源" style="width:100%" clearable>
                        <el-option label="过户人员" value="1"></el-option>
                        <el-option label="贷款人员" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名：" prop="name">
                    <el-input v-model="form.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="电话：" prop="tel">
                    <el-input v-model="form.tel" maxlength="11" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="sure('form')" style="width:80%;margin-left:0">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            items:[
                // {title:'过户人员'},
                // {title:'贷款人员'}
            ],
        //房源信息
            entryBroker:'',//录入经纪人
            entryTel:'',//录入经纪人电话
            type:'',//交易类型
            contract:'',//合同编号
            house:'',//房源编号
            houseName:'',//楼盘名称
            warrant:'',//权证号
            address:'',//产权证地址
            property:'',//房屋性质
            price:'',//成交价格
            shouldPay:'',//房东应付佣金
            paid:'',//已支付佣金
            comple:'',//补交佣金
            landlord:'',//房东姓名
            landlordId:'',//房东身份证号
            landlordTel:'',//房东电话
            commoner:'',//有无共有人
            relative:'',//和共有人关系
            commonName:'',//共有人姓名
            commonId:'',//共有人身份证号
            commonTel:'',//共有人电话
            mortgage:'',//房屋是否按揭
            surplus:'',//按揭剩余金额
            fyfBroker:'',//房源方经纪人
            fyfTel:'',//电话
        //客源信息
            name:'',//客户姓名
            idCard:'',//身份证号
            iscommon:'',//是否有共有人
            commomIdCard:'',//共有人身份证号
            commonNameC:"",//共有人姓名
            commonTelC:'',//共有人电话
            mort:'',//是否按揭
            payments:'',//首付金额
            estimate:'',//预计按揭金额
            deal:'',//成交价格
            commion:'',//佣金
            paidC:'',//已支付佣金
            after:'',//补交佣金
            recommen:'',//推荐经纪人
            phone:'',//经纪人电话
            date:'',//签约日期
            remark:'',//备注信息
            transfer:'',//过户人员姓名
            transferTel:'',//过户人员电话
            loaner:'',//贷款人员姓名
            loanTel:'',//贷款人员电话

            dialogVisible:false,
            dialogFormVisible:false,
            isShow:true,
            isHadOver:false,
            isHadPass:false,
            isHadRefuse:false,
            comment:'',
            form:{
                add:'',
                name:'',
                tel:''
            },
            rules:{
                add:[
                    {required:true,message:'请选择后续人员',trigger:'blur'}
                ],
                name:[
                    {required:true,message:'姓名不能为空',trigger:'blur'},
                    { pattern:/^.{1,4}$/, message: '长度在4个字以内', trigger: 'blur' },
                    { pattern: /^[\u4e00-\u9fa5]*$/, message: '无效的姓名', trigger: 'blur' },
                ],
                tel:[
                    {required:true,message:'电话不能为空',trigger:'blur'},
                    { pattern:/^[1][3456789][0-9]{9}$/, message: '无效的电话', trigger: 'blur' },
                ]
            },
            showBut:false,
            disabled:true
        }
    },
    mounted(){
        this.getDealDetail()
    },
    methods:{
        getDealDetail(){
            console.log('获取买卖详情')
        },
        // 返回
        goBack(){
            this.$router.go(-1)
        },
        // 交易完毕
        over(){
            this.isShow = false;
            this.isHadOver = true;
            this.showBut = false;
        },
        // 添加后续人员
        add(){
            this.dialogFormVisible = true;
            this.form.add = '';
            this.form.name = '';
            this.form.tel = '';
        },
        // 确认添加
        sure(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                    this.dialogFormVisible = false;
                    var arr = [];
                    arr.push(this.form.add);
                    arr.push(this.form.name);
                    arr.push(this.form.tel);
                    this.items.push(arr);
                    if(this.items.length>2 && this.form.add == '1'){
                        this.$message({
                            message:'添加的后续人员的数量请保持在2个以内',
                            type:'error',
                            duration:1000
                        })
                    }
                    console.log(arr,this.items)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 拒绝
        refuse(){
            this.dialogVisible = true;
            this.comment = '';
        },
        // 确定拒绝
        submission(){
            if(this.comment == ''){
                this.$message({
                    message:'请输入拒绝原因',
                    type:'error',
                    duration:1000
                })
            }else{
                this.dialogVisible = false;
                this.isShow = false;
                this.isHadRefuse = true;
            }
        },
        // 通过
        pass(){
            this.isShow = false;
            this.showBut = true;
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
.el-button--primary{
    height: 40px;
    margin-left: 100px;
}
header p{
    margin-right: 100px;
}
.personnel{
    display: flex;
    margin-right: 100px;
}
.topButton{
    width: 100%;
    height: 80px;
}
.over,.add_other{
    width: 150px;
    height: 50px;
    float: right;
    margin-right: 100px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    border-radius: 5px
}
.over{
    background-color: #67c23a;
}
.add_other{
    background-color: #ff8400;
}
.over,.add_other,.no,.yes:hover{
    cursor: pointer;
}
.houseInfo{
    width:90%;
    margin: auto;
}
h4{
    font-size:24px;
    padding:20px;
    box-sizing: border-box;
}
.houseInfo ul{
    list-style: none;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
}
.houseInfo ul li{
    width:25%;
    height: 30px;
}
.bottomButtons{
    width:40%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    padding: 50px 0;
}
.yes,.no{
    width:150px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
}
.yes{
    background-color: #67c23a;
}
.no{
    background-color: #ff8400;
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
    width:5%;
    margin: auto;
    padding: 50px 0;
}
.hadOver,.hadPass,.hadRefuse{
    width:100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
}
.hadOver,.hadPass{
    background-color: #67c23a;
}
.hadRefuse{
    background-color: #ff8400;
}
</style>
