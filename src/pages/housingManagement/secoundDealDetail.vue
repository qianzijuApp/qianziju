<template>
    <div>
        <!-- 头部 -->
        <header>
            <el-button type="primary" plain @click="goBack">返回</el-button>
            <p>录入时间：<span>{{form.recordTime?form.recordTime:'无'}}</span></p>
        </header>
        <!-- 头部 -->
        <!-- 内容 -->
        <div class="content">
            <div class="basic" style="padding-top:20px">
                <div class="house_basic">
                    <h4>房屋基本资料</h4>
                    <p class="grounding" v-if="this.form.status == 1">上架中</p>
                    <p class="undercarriaging" v-if="this.form.status == 0">下架中</p>
                </div>
                <ul>
                    <li>
                        <p>城市：<span>{{form.city?form.city:'无'}}</span></p>
                    </li>
                    <li>
                        <p>区域：<span>{{form.area?form.area:'无'}}</span></p>
                    </li>
                    <li>
                        <p>标题：<span>{{form.title?form.title:'无'}}</span></p>
                    </li>
                    <li>
                        <p>楼盘名称：<span>{{form.buildName?form.buildName:'无'}}</span></p>
                    </li>
                    <li>
                        <p>面积：<span>{{form.square?form.square:'0'}} m<sup>2</sup></span></p>
                    </li>
                    <li>
                        <p>总价：<span>{{form.totalPrice?form.totalPrice:'0'}} 万</span></p>
                    </li>
                    <li>
                        <p>单价：<span>{{form.unitPrice?form.unitPrice:'0'}} 元</span></p>
                    </li>
                    <li>
                        <p>楼栋：<span>{{form.builds?form.builds:'0'}} 栋</span></p>
                    </li>
                    <li>
                        <p>单元：<span>{{form.cell?form.cell:'0'}} 单元</span></p>
                    </li>
                    <li>
                        <p>楼层：<span>{{form.floors?form.floors:'0'}} 层</span></p>
                    </li>
                    <li>
                        <p>房号：<span>{{form.roomNumber?form.roomNumber:'0'}} 号</span></p>
                    </li>
                    <li>
                        <p>房型：<span>{{form.roomType?form.roomType:"无"}}</span></p>
                    </li>
                    <li>
                        <p>装修：<span>{{form.decoration?form.decoration:'无'}}</span></p>
                    </li>
                    <li>
                        <p>朝向：<span>{{form.towards?form.towards:'无'}}</span></p>
                    </li>
                    <li>
                        <p>年代：<span>{{form.years?form.years:'0'}} 年</span></p>
                    </li>
                    <li>
                        <p>标签：<span>{{form.label?form.label:'无'}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="basic attach">
                <h4>房屋介绍</h4>
                <p class="intro">{{form.introduction?form.introduction:'无'}}</p>
            </div>
            <div class="basic attach">
                <h4>经纪人标语</h4>
                <p class="intro">{{form.slogan?form.slogan:'无'}}</p>
            </div>
            <div class="real">
                <h4>实勘</h4>
                <el-row id="myUl">
                    <el-col :span="7" id="myLi" v-for="(item,index) in pics" :key="index">
                        <p class="house_name">{{item.title}}</p>
                        <img src="../../../static/images/a1.png" alt="">
                        <p class="release">发布时间：<span>{{item.releaseTime}}</span></p>
                    </el-col>
                </el-row>
            </div>
            <div class="basic attach">
                <h4>房东信息</h4>
                <ul>
                    <li>
                        <p>房东姓名：<span>{{form.landlord?form.landlord:'无'}}</span></p>
                    </li>
                    <li>
                        <p>房东电话：<span>{{form.landlordPhone?form.landlordPhone:'无'}}</span></p>
                    </li>
                </ul>
            </div>
             <div class="basic attach">
                <h4>责任经纪人</h4>
                <ul>
                    <li>
                        <p>经纪人姓名：<span>{{form.owner?form.owner:'无'}}</span></p>
                    </li>
                    <li>
                        <p>经纪人电话：<span>{{form.ownerPhone?form.ownerPhone:'无'}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="basic record">
                <h4>操作记录</h4>
                <div class="houseTable">
                    <el-table
                        :data="recordData"
                        border
                        style="width: 99%;margin:10px auto;">
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
                        layout="total, prev, pager, next"
                        :total="total">
                        </el-pagination>
                    </div>
                </div>
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
            
            pics:[
                {
                    title:'恒大',
                    releaseTime:'2018-10-23'
                }
            ],
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
        this.getSecoundDetail();
    },
    methods:{
        getSecoundDetail(){
            this.$get('/houseSource/getHouseDetailsByType',{
                id:this.$route.query.id,
                houseSourceType: this.$route.query.type
            }).then(res=>{
                console.log(res);
                if(res.code == 0 || res.code == 200){
                    this.form = res.data;
                    this.pics = res.data.showImgs;
                    this.recordData = res.data.operationLogs;
                    this.total = res.data.operationLogs.length;
                }else{
                    this.$messge({
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
        // 分页
        handleCurrentChange(){
            console.log('sdfsd')
        },
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
.content{
    width:100%;
}
.basic,.real{
    width:90%;
    margin: auto ;
    padding:0 20px;
    box-sizing: border-box;
}
.house_basic{
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
h4{
    font-size: 24px;
    margin: 20px 0;
}
.grounding,.undercarriaging{
    width:100px;
    height: 40px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    border-radius: 5px;
}
.grounding{
    background-color: #67c23a;
}
.undercarriaging{
    background-color: #5b5b5b;
}
.basic ul{
    list-style: none;
    display: flex;
    flex-wrap: wrap   
}
.basic ul li{
    width:33%;
    height:50px
}
#myUl{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
}

#myLi{
    width:30%;
    margin:10px;
    position: relative;
}
#myUl img{
    width:100%;
    height: 300px;
}
.house_name{
    width:100%;
    height: 50px;
    position: absolute;
    top:0;
    text-align: center;
    line-height: 50px;
}
.release{
    width:100%;
    height: 50px;
    position: absolute;
    bottom: 0;
    line-height: 50px;
    text-align: center;
    background-color:rgba(256,256,256,.5);
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
