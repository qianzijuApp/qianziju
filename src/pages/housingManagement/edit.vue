<template>
    <div>
        <header>
            <el-button type="primary" plain @click="goBack">返回</el-button>
            <p>报盘经纪人：<span>黄大喵</span></p>
            <p>经纪人电话：<span>15983735209</span></p>
            <p>录入时间：<span>2018-10-18</span></p>
        </header>
        <div class="content">
            <h4>楼盘基本资料</h4>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="新盘名称：" prop="name">
                            <el-input v-model="ruleForm.name" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="最新开盘时间：" prop="time">
                            <el-date-picker
                                v-model="ruleForm.time"
                                type="date"
                                placeholder="选择日期"
                                style="width:100%" clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="开发商：" prop="developers">
                            <el-input v-model="ruleForm.developers" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="楼盘位置：" prop="address">
                            <el-input v-model="ruleForm.address" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="城市：" prop="city">
                            <el-input v-model="ruleForm.city" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="区域：" prop="area">
                            <el-input v-model="ruleForm.area" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="交房时间：" prop="roomTime">
                            <el-date-picker
                                v-model="ruleForm.roomTime"
                                type="date"
                                placeholder="选择日期"
                                style="width:100%" clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="梯户比：" prop="Ladder">
                            <el-input v-model="ruleForm.Ladder" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="层高标准：" prop="layer">
                            <el-input v-model="ruleForm.layer" clearable>
                                <template slot="append">m</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="负责人：" prop="leader">
                            <el-input v-model="ruleForm.leader" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="负责人电话：" prop="leaderTel">
                            <el-input v-model="ruleForm.leaderTel" clearable oninput="if(value.length > 11)value = value.slice(0, 11)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="佣金提成：" prop="extract">
                            <el-input v-model="ruleForm.extract" clearable>
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="楼盘均价：" prop="average">
                            <el-input v-model="ruleForm.average" clearable>
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="产权年限：" prop="ageLimit">
                            <el-input v-model="ruleForm.ageLimit" clearable>
                                <template slot="append">年</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="户型面积：" prop="unitArea">
                            <el-input v-model="ruleForm.unitArea" clearable>
                                <template slot="append">m<sup>2</sup></template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="占地面积：" prop="areaCovere">
                            <el-input v-model="ruleForm.areaCovere" clearable>
                                <template slot="append">m<sup>2</sup></template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="建筑面积：" prop="buildArea">
                            <el-input v-model="ruleForm.buildArea" clearable>
                                <template slot="append">m<sup>2</sup></template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                         <el-form-item label="容积率：" prop="volumetric">
                            <el-input v-model="ruleForm.volumetric" clearable>
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="绿化率：" prop="greenRate">
                            <el-input v-model="ruleForm.greenRate" clearable>
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="停车位：" prop="parkingSpace">
                            <el-input v-model="ruleForm.parkingSpace" clearable>
                                <template slot="append">个</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="总栋数：" prop="totalNumber">
                            <el-input v-model="ruleForm.totalNumber" clearable>
                                <template slot="append">栋</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="总户数：" prop="roomNumber">
                            <el-input v-model="ruleForm.roomNumber" clearable>
                                <template slot="append">户</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="总楼层：" prop="totalFloor">
                            <el-input v-model="ruleForm.totalFloor" clearable>
                                <template slot="append">层</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item label="装修标准：" prop="radio" >
                            <el-radio-group v-model="ruleForm.radio" style="display:flex;justify-content:space-around">
                                <el-radio-button label="毛坯">毛坯</el-radio-button>
                                <el-radio-button label="简单装修">简单装修</el-radio-button>
                                <el-radio-button label="中等装修">中等装修</el-radio-button>
                                <el-radio-button label="精装修">精装修</el-radio-button>
                                <el-radio-button label="豪华装修">豪华装修</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item label="楼盘类型：" prop="checkboxGroup2" >
                            <el-checkbox-group v-model="ruleForm.checkboxGroup2" style="display:flex;justify-content:space-around">
                                <el-checkbox-button v-for="type in types" :label="type" :key="type" @focus="()=>{console.log(this.type)}">{{type}}</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="23">
                        <el-form-item label="周边配套：" prop="match">
                            <el-input type="textarea" v-model="ruleForm.match" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="23">
                        <el-form-item label="项目简介：" prop="projectIntro">
                            <el-input type="textarea" v-model="ruleForm.projectIntro"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="标签：" prop="inputValue">
                            <el-tag
                                :key="tag"
                                v-for="tag in dynamicTags"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)">
                                {{tag}}
                            </el-tag>
                            <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新建</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="添加楼盘展示图:" prop="houseFile">
                            <el-upload action="https://jsonplaceholder.typicode.com/posts/" 
                            list-type="picture-card" 
                            :on-preview="handlePictureCardPreview" 
                            :limit="18"
                            :on-exceed="handleExceed"
                            :on-remove="handleRemove"
                            :file-list="showFileList"
                            :auto-upload="false"
                            v-model="ruleForm.houseFile">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="添加楼盘简介图:" prop="houseIntro">
                            <el-upload action="https://jsonplaceholder.typicode.com/posts/" 
                            list-type="picture-card" 
                            :on-preview="handlePictureCardPreview" 
                            :on-remove="handleRemove" 
                            :limit="18"
                            :on-exceed="handleExceed"
                            :file-list="synopsisFileList"
                            :auto-upload="false"
                            v-model="ruleForm.houseIntro">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="添加户型图:" prop="houseType">
                            <el-upload action="string" 
                            list-type="picture-card" 
                            :on-preview="handlePictureCardPreview" 
                            :on-remove="handleRemove" 
                            :on-success="handleAvatarSuccess"
                            :http-request="(typeFile) =>{return addType(typeFile)}"
                            :limit="18"
                            :on-exceed="handleExceed"
                            :file-list="typeFileList"
                            :auto-upload="false"
                            v-model="ruleForm.houseType">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>         
            <div class="step">
                <p class="next" @click="submit('ruleForm')">确定</p>
            </div>
        </div>
    </div>
</template>

<script>
const typeOptions = ['住宅', '公寓', '商铺', '写字楼', '别墅'];
export default {
    data(){
        return{
            dialogImageUrl: '',
            dialogVisible: false,
            date:'',
            showFileList:[],
            synopsisFileList:[],
            typeFileList:[],
            showList:[{inputShow:false},{inputShow:false},{inputShow:false},{inputShow:false}],
            ruleForm:{
                name:'',//楼盘名称
                extract:'',//佣金提成
                broker:'',//经纪人
                Tel:'',//经纪人电话
                leader:'',//负责人
                leaderTel:'',//负责人电话
                time:'',//最新开盘时间
                developers:'',//开发商
                address:'',//楼盘位置
                city:'',//城市
                area:'',//区域
                unitArea:'',//户型面积
                layer:'',//层高标准
                average:'',//楼盘均价
                radio:'',//楼盘类型
                checkboxGroup2:[],
                ageLimit:'',//产权年限
                roomTime:'',//交房时间
                areaCovere:'',//占地面积
                buildArea:'',//建筑面积
                volumetric:'',//容积率
                greenRate:'',//绿化率
                parkingSpace:'',//停车位
                totalNumber:'',//总栋数
                roomNumber:'',//总户数
                totalFloor:'',//总层数
                Ladder:'',//梯户比
                match:'',//周边配套
                projectIntro:'',//项目简介
                houseFile:'',//楼盘展示图
                houseType:'',//户型图
                houseIntro:''//楼盘简介图
            },
            rules:{
                name:[
                    {required:true,message:'楼盘名称不能为空',trigger:'blur'},
                    { pattern:/^.{1,10}$/, message: '长度在10个字以内', trigger: 'blur' },
                    { pattern: /^[\u4e00-\u9fa5_0-9]*$/, message: '无效的楼盘名称', trigger: 'blur' },
                ],
                extract:[
                    {required:true,message:'佣金提成不能为空',trigger:'blur'},
                    { pattern:/^.{1,20}$/, message: '长度在20位以内', trigger: 'blur' },
                    { pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/ , message: '请输入数值', trigger: 'blur' },
                ],
                broker:[
                    {required:true,message:'经纪人不能为空',trigger:'blur'},
                    { pattern:/^.{1,4}$/, message: '长度在4个字以内', trigger: 'blur' },
                    { pattern: /^[\u4e00-\u9fa5]*$/, message: '无效的经纪人', trigger: 'blur' },
                ],
                tel:[
                    {required:true,message:'经纪人电话不能为空',trigger:'blur'},
                    { pattern:/^[1][3456789][0-9]{9}$/, message: '无效的电话', trigger: 'blur' },
                ],
                leader:[
                    {required:true,message:'负责人不能为空',trigger:'blur'},
                    { pattern:/^.{1,4}$/, message: '长度在4个字以内', trigger: 'blur' },
                    { pattern: /^[\u4e00-\u9fa5]*$/, message: '无效的负责人', trigger: 'blur' }
                ],
                leaderTel:[
                    {required:true,message:'负责人电话不能为空',trigger:'blur'},
                    { pattern:/^[1][3456789][0-9]{9}$/, message: '无效的电话', trigger: 'blur' },
                ],
                time:[
                    {required:true,message:'最新开盘时间不能为空',trigger:'blur'},
                ],
                developers:[
                    {required:true,message:'开发商不能为空',trigger:'blur'},
                    { pattern:/^.{1,20}$/, message: '长度在20个字以内', trigger: 'blur' },
                    { pattern: /^[\u4e00-\u9fa5]*$/, message: '无效的开发商', trigger: 'blur' },
                ],
                address:[
                    {required:true,message:'楼盘位置不能为空',trigger:'blur'},
                    { pattern: /^.{1,20}$/, message: '长度在50个字以内', trigger: 'blur' },
                ],
                city:[
                    {required:true,message:'城市不能为空',trigger:'blur'},
                    { pattern: /^[\u4e00-\u9fa5]*$/, message: '无效的城市', trigger: 'blur' },
                ],
                area:[
                    {required:true,message:'区域不能为空',trigger:'blur'},
                    { pattern: /^[\u4e00-\u9fa5]*$/, message: '无效的区域', trigger: 'blur' },
                ],
                unitArea:[
                    {required:true,message:'户型面积不能为空',trigger:'blur'},
                    { pattern:/^.{1,4}$/, message: '长度在4位数以内', trigger: 'blur' },
                    { pattern:/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入数值', trigger: 'blur' },
                ],
                layer:[
                    {required:true,message:'楼层标准不能为空',trigger:'blur'},
                    { pattern:/^.{1,3}$/, message: '长度在3位数以内(含小数)', trigger: 'blur' },
                    { pattern:/^([1-9]|0)(\.\d{1,2})?$/, message: '请输入正确的层高标准', trigger: 'blur' },
                ],
                checkboxGroup2:[
                    {required:true,message:'楼盘类型不能为空',trigger:'blur'}
                ],
                average:[
                    {required:true,message:'楼盘均价不能为空',trigger:'blur'},
                    { pattern:/^.{1,8}$/, message: '长度在8位数以内', trigger: 'blur' },
                    { pattern:/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入数值', trigger: 'blur' },
                ],
                radio:[
                    {required:true,message:'装修标准不能为空',trigger:'blur'}
                ],
                ageLimit:[
                    {required:true,message:'产权年限不能为空',trigger:'blur'},
                    { pattern:/^.{1,2}$/, message: '长度在2位数以内', trigger: 'blur' },
                    { pattern:/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入数值', trigger: 'blur' },
                ],
                roomTime:[
                    {required:true,message:'交房时间不能为空',trigger:'blur'}
                ],
                areaCovere:[
                    {required:true,message:'占地面积不能为空',trigger:'blur'},
                    { pattern:/^.{1,8}$/, message: '长度在8位数以内', trigger: 'blur' },
                    { pattern:/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入数值', trigger: 'blur' },
                ],
                buildArea:[
                    {required:true,message:'建筑面积不能为空',trigger:'blur'},
                    { pattern:/^.{1,8}$/, message: '长度在8位数以内', trigger: 'blur' },
                    { pattern:/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入数值', trigger: 'blur' },
                ],
                volumetric:[
                    {required:true,message:'容积率不能为空',trigger:'blur'},
                    { pattern:/^.{1,3}$/, message: '长度在3位数以内', trigger: 'blur' },
                    { pattern:/^([1-9]\d{0,2}|0)(\.\d{1,2})?$/, message: '请输入正确的容积率', trigger: 'blur' },

                ],
                greenRate:[
                    {required:true,message:'绿化率不能为空',trigger:'blur'},
                    { pattern:/^.{1,4}$/, message: '长度在4位数以内（含小数）', trigger: 'blur' },
                    { pattern:/^([1-9]\d{0,2}|0)(\.\d{1,2})?$/, message: '请输入正确的绿化率', trigger: 'blur' },
                ],
                parkingSpace:[
                    {required:true,message:'停车位不能为空',trigger:'blur'},
                    { pattern:/^.{1,10}$/, message: '长度在10位数以内', trigger: 'blur' },
                    { pattern:/^[1-9]\d*$/, message: '请输入数值', trigger: 'blur' },
                ],
                totalNumber:[
                    {required:true,message:'总栋数不能为空',trigger:'blur'},
                    { pattern:/^.{1,10}$/, message: '长度在10位数以内', trigger: 'blur' },
                    { pattern:/^[1-9]\d*$/, message: '请输入数值', trigger: 'blur' },
                ],
                roomNumber:[
                    {required:true,message:'总户数不能为空',trigger:'blur'},
                    { pattern:/^.{1,10}$/, message: '长度在10位数以内', trigger: 'blur' },
                    { pattern:/^[1-9]\d*$/, message: '请输入数值', trigger: 'blur' },
                ],
                totalFloor:[
                    {required:true,message:'总楼层不能为空',trigger:'blur'},
                    { pattern:/^.{1,3}$/, message: '长度在3位数以内', trigger: 'blur' },
                    { pattern:/^[1-9]\d*$/, message: '请输入数值', trigger: 'blur' },
                ],
                Ladder:[
                    {required:true,message:'梯户比不能为空',trigger:'blur'},
                ],
                match:[
                    {required:true,message:'周边配套不能为空',trigger:'blur'},
                    { pattern:/^.{1,2000}$/, message: '长度在2000个字以内', trigger: 'blur' },
                ],
                projectIntro:[
                    {required:true,message:'项目简介不能为空',trigger:'blur'},
                    { pattern:/^.{1,2000}$/, message: '长度在2000个字以内', trigger: 'blur' },
                ]
            },
            types:typeOptions,
            dynamicTags: [],
            inputVisible: false,
            inputValue: ''
        }
    },
    mounted(){
    },
    methods:{
        // 返回
        goBack(){
            this.$router.go(-1)
        },
        // 关闭标签
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
        // 新建标签
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        // 离开或失焦
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue && inputValue.length<=4) {
                this.dynamicTags.push(inputValue);
                console.log(this.dynamicTags)
            }else{
                this.$message({
                    message:'请确保长度在4个字以内',
                    type:'error',
                })
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        // 删除图片
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        //图片放大
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //限制个数
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 18 个文件，本次选择了 ${files.length-1} 个文件`);
        },
        addType(item,index){},
        handleAvatarSuccess(res, file){
            alert(1)
            if(res.code == 0){
                this.$message({
                    message:"上传成功",
                    type:"success",
                    duration:1000
                });
            }else{
                this.$message({
                    message:'上传失败',
                    type:'error',
                    duration:1000
                })
            }
        },
        uploadSectionFile(param){
            alert(1)
            console.log(param);
            const _file = params.file;
            const isLt2M = _file.size / 1024 / 1024 < 2;
            // 通过 FormData 对象上传文件
            var formData = new FormData();
            formData.append("file", _file);
            if (!isLt2M) {
                this.$message.error("请上传2M以下的图片");
                return false;
            }
            RequestUploads(formData).then(res => {
                console.log("_RequestUploads_", res);
                if (code === 2000) {
                    this.$message({
                        type: "success",
                        message: res.msg
                    });
                    // 隐藏弹出框
                    this.importDialog = false;
                } else {
                    this.$message({
                        type: "warning",
                        message: res.msg
                    });
                }
            })
        },
        // 提交
        submit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.dynamicTags.length == 0){
                        this.$message({
                            message:'标签不能为空',
                            type:'error',
                            duration:1000
                        })
                    }
                    else{
                        this.$post('houseSource/addHouseSourcesByNew',{
                            buildName: this.ruleForm.name,
                            latestActivityTime: this.ruleForm.time,
                            developer: this.ruleForm.developers,
                            address: this.ruleForm.address,
                            city: this.ruleForm.city,
                            arae: this.ruleForm.area,
                            handRoomTime: this.ruleForm.roomTime,
                            elevatorRoomRate: this.ruleForm.Ladder,
                            cell: this.ruleForm.layer,
                            owner: this.ruleForm.leader,
                            ownerPhone: this.ruleForm.leaderTel,
                            commission: this.ruleForm.extract,
                            unitPrice:this.ruleForm.average,
                            propertyYears: this.ruleForm.ageLimit,
                            apartmentArea: this.ruleForm.unitArea,
                            coverArea: this.ruleForm.areaCovere,
                            buildArea: this.ruleForm.buildArea,
                            far: this.ruleForm.volumetric,
                            green: this.ruleForm.greenRate,
                            parks: this.ruleForm.parkingSpace,
                            builds: this.ruleForm.totalNumber,
                            households: this.ruleForm.roomNumber,
                            floors: this.ruleForm.totalFloor,
                            decoration: this.ruleForm.radio,
                            buildType: this.ruleForm.checkboxGroup2,
                            surroundings: this.ruleForm.match,
                            introduction: this.ruleForm.projectIntro,
                            label: this.dynamicTags,
                        }).then(res=>{
                            console.log(res);
                            if(res.code == 0 || res.code == 200){
                                this.$message({
                                    message:'新建成功，将在5秒后返回新盘列表',
                                    type:'success'
                                })
                                setTimeout(()=>{
                                    this.$router.push({
                                        path:'/newPlate'
                                    },5000)
                                })
                            }
                        })
                         alert('submit!');
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
<style>
.el-radio-button__inner{
    border: 1px solid #ccc;
    border-radius: 5px ;
}
.el-checkbox-button__inner{
    border: 1px solid #ccc;
    border-radius: 5px ;
}
.el-textarea__inner{
    width:90%;
}
.el-textarea__inner:hover{
    height: 200px;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
.el-radio-button:last-child .el-radio-button__inner,.el-checkbox-button:last-child .el-checkbox-button__inner{
    border-radius: 5px
}
.el-radio-button:first-child .el-radio-button__inner,.el-checkbox-button:first-child .el-checkbox-button__inner{
    border: 1px solid #dcdef6
}
.el-col-7{
    height: 80px;
}
</style>

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
.content{
    width:100%;
}
h4{
    font-size: 24px;
    text-align: center;
}
.demo-ruleForm{
    margin-top: 50px;
}
.tagLabel{
    margin-left: -70px;
}
em{
    color:red;
}
.step{
    width:100%;
    padding-bottom:50px;
}
.next{
    width:500px;
    height: 50px;
    margin: auto;
    background-color: #67c23a;
    border-radius:5px;
    text-align:center;
    line-height:50px;
    color:#fff;
}
</style>
