<template>
    <div>
        <!-- 头部 -->
        <header>
            <el-button type="primary" plain @click="goBack">返回</el-button>
            <p>报盘经纪人：<span>{{form.agent?form.agent:'无'}}</span></p>
            <p>经纪人电话：<span>{{form.agentPhone?form.agentPhone:'无'}}</span></p>
            <p>录入时间：<span>{{form.operatorTime?form.operatorTime:'无'}}</span></p>
            <p class="grounding" v-if="this.form.status == 1">上架中</p>
            <p class="undercarriaging" v-if="this.form.status == 0">下架中</p>
        </header>
        <!-- 头部 -->
        <!-- 内容 -->
        <div class="content">
            <div class="buttons">
                <el-button type="success" @click="top" :disabled="disabled">置顶</el-button>
                <el-button type="warning" @click="edit">编辑</el-button>
            </div>
            <div class="basic" style="padding-top:20px">
                <h4>房屋基本资料</h4>
                <ul>
                    <li>
                        <p>城市：<span>{{form.city?form.city:'无'}}</span></p>
                    </li>
                    <li>
                        <p>区域：<span>{{form.area?form.area:'无'}}</span></p>
                    </li>
                    <li>
                        <p>楼盘名称：<span>{{form.buildName?form.buildName:'无'}}</span></p>
                    </li>
                    <li>
                        <p>当前状态：<span>{{form.sellStatus?(form.sellStatus == 1?'已售':'待售'):'无'}}</span></p>
                    </li>
                     <li>
                        <p>开发商：<span>{{form.developer?form.developer:"无"}}</span></p>
                    </li>
                    <li>
                        <p>环线位置：<span>{{form.address?form.address:'无'}}</span></p>
                    </li>
                    <li>
                        <p>占地面积：<span>{{form.coverArea?form.coverArea:'0'}} m<sup>2</sup></span></p>
                    </li>
                    <li>
                        <p>建筑面积：<span>{{form.buildArea?form.buildArea:'0'}} m<sup>2</sup></span></p>
                    </li>
                    <li>
                        <p>楼盘性质：<span>{{property?property:'无'}}</span></p>
                    </li>
                    <li>
                        <p>产权年限：<span>{{form.propertyYears?form.propertyYears:'0'}} 年</span></p>
                    </li>
                    <li>
                        <p>容积率：<span>{{form.far?form.far:'0'}} %</span></p>
                    </li>
                    <li>
                        <p>绿化率：<span>{{form.green?form.green:'0'}} %</span></p>
                    </li>
                    <li>
                        <p>楼栋总数：<span>{{form.builds?form.builds:'0'}} 栋</span></p>
                    </li>
                    <li>
                        <p>总户数：<span>{{form.households?form.households:'0'}} 户</span></p>
                    </li>
                    <li>
                        <p>楼层状况：<span>{{form.floors?form.floors:'0'}} 层</span></p>
                    </li>
                    <li>
                        <p>户型面积：<span>{{form.apartmentArea?form.apartmentArea:'0'}} m<sup>2</sup></span></p>
                    </li>
                    <li>
                        <p>地铁交通：<span>{{form.label?form.label:'无'}}</span></p>
                    </li>
                    <li>
                        <p>楼盘位置：<span>{{form.address?form.address:'无'}}</span></p>
                    </li>
                    <li>
                        <p>佣金比例：<span>{{form.commission?form.commission:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p>标签：<span>{{form.label?form.label:'无'}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="basic attach">
                <h4>周边配置</h4>
                <p class="intro">{{form.surroundings?form.surroundings:'无'}}</p>
            </div>
            <div class="basic attach">
                <h4>项目简介</h4>
                <p class="intro">{{form.introduction?form.introduction:'无'}}</p>
            </div>
            <div class=" pic">
                <h4>轮播图</h4>
                <ul>
                    <p v-if="this.sows.length == 0">暂无数据</p>
                    <li v-for="(item,index) in sows" :key="index">
                        <img :src="item.sowingImg" alt="">
                    </li>
                </ul>
            </div>
            <div class=" pic">
                <h4>概况图</h4>
                <ul>
                    <p v-if="this.surveies.length == 0">暂无数据</p>
                    <li v-for="(item,index) in surveies" :key="index">
                        <img :src="item.surveyImg" alt="">
                    </li>
                </ul>
            </div>
            <div class=" pic">
                <h4>户型图</h4>
                <ul>
                    <p v-if="this.types.length == 0">暂无数据</p>
                    <li v-for="(item,index) in types" :key="index">
                        <img :src="item.typeImg" alt="">
                    </li>
                </ul>
            </div>
            <div class="basic record">
                <h4>操作记录</h4>
                <div class="houseTable">
                    <el-table
                        :data="recordData"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="time"
                            label="操作时间">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="员工">
                        </el-table-column>
                        <el-table-column
                            prop="tel"
                            label="电话">
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="初始状态">
                        </el-table-column>
                        <el-table-column
                            prop="currentStatus"
                            label="当前状态">
                        </el-table-column>
                    </el-table>
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
                 
            </div>
            <div class="basic attach">
                <ul>
                    <li>
                        <p>录入员工：<span>{{form.recorder?form.recorder:'无'}}</span></p>
                    </li>
                    <li>
                        <p>电话：<span>{{form.recorderPhone?form.recorderPhone:'无'}}</span></p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 内容 -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{},
            sows:[
                {
                    sowingImg:'../../../static/images/a1.png'
                }
            ],//轮播图
            surveies:[
                {
                    surveyImg:'../../../static/images/a1.png'
                }
            ],//概况图
            types:[
                {
                    typeImg:'../../../static/images/a1.png'
                }
            ],//户型图
            property:'',
            disabled:false,
            isGround:true,
            isUnder:false,
            recordData:[
                {
                    time:'2018-10-16',
                    name:'黄大喵',
                    tel:'15983735209',
                    status:'上架中',
                    currentStatus:'下架中',
                }
            ],
            currentPage:1,
            pageSize:10,
            total:30,
        }
    },
    mounted(){
        this.getNewDetail()
    },
    methods:{
        getNewDetail(){
            this.$get('houseSource/getHouseDetailsByType',{
                id: this.$route.query.id,
                houseSourceType: this.$route.query.type
            }).then(res=>{
                console.log(res);
                if(res.code == 0 || res.code == 200){
                    this.form = res.data;
                }else{
                    this.$message({
                        message:res.msg,
                        type:'error',
                        duration:1000
                    })
                }
            })
            console.log('获取新盘详情')
        },
        // 返回
        goBack(){
            this.$router.go(-1)
        },
        // 分页
        handleCurrentChange(){
            console.log('sdfsd')
        },
        // 置顶
        top(){
            this.$confirm('此操作置顶该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    this.$get('houseSource/topHouseSourcesByNew',{
                        houseSourcesId:this.$route.query.id
                    }).then(res=>{
                        console.log(res);
                        if(res.code == 0 || res.code == 200){
                            this.$message({
                                type: 'success',
                                message: '置顶成功!'
                            });
                            this.disabled = true;
                            this.getNewDetail()
                        }else{
                            this.$messge({
                                message:res.msg,
                                type:'error',
                                duration:1000
                            })
                        }
                    })
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '置顶已取消'
                });          
            });
        },
        // 编辑
        edit(val){
            console.log(this.$route.query.id)
            this.$router.push({
                path:'/modifyEdit',
                query:{
                    id: this.$route.query.id
                }
            })
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
header p:last-of-type{
    margin-right: 100px;
}
.content{
    width:100%;
}
.buttons{
    width:15%;
    float: right;
    display: flex;
    justify-content: space-between;
    margin-right: 100px;
}
.basic{
    width:90%;
    margin: auto ;
    padding:0 20px;
    box-sizing: border-box;
}
.pic{
    width:90%;
    margin: auto;
    margin-bottom: 20px;
    padding:0 20px;
    box-sizing: border-box;
}
.pic ul{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
}
.pic p{
    width:100%;
    height: 100px;
    text-align: center;
    line-height: 100px;
}
.pic ul li{
    width:33%;
}
.pic img{
    width:300px;
    height: 200px;
    margin-top: 20px;
}
.house_basic{
    width:100%;
    display: flex;
    justify-content: space-between;
}
h4{
    font-size: 24px;
    margin: 20px 0;
}
h4:first-of-type{
    margin-top: 50px;
}
.grounding,.undercarriaging{
    width:70px;
    height: 40px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    border-radius: 5px;
}
.grounding{
    background-color: #c23a;
}
.undercarriaging{
    background-color: #5b5b5b;
}
.basic ul{
    list-style: none;
    display: flex;
    flex-wrap: wrap   
}
.basic>ul>li{
    width:33%;
    height:50px
}
.real ul{
    display: flex;
    justify-content: space-around;
}
.real ul li{
    width:33%;
    position: relative;

}
.real img{
    width:300px;
    height: 200px;
}
.house_name{
    width:60%;
    height: 50px;
    position: absolute;
    top:0
}
.release{
    width:60%;
    height: 50px;
    position: absolute;
    bottom: 0;
}
.basic p{
    font-size:16px;
}
.houseTable{
    /* border: 1px solid #5b5b5b;
    box-sizing: border-box; */
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
.record{
    padding-bottom: 50px;
}
.block{
    margin: 20px 0
}
.intro{
    font-size: 18px;
    text-indent: 24px;
}
</style>
