<template>
    <div>
        <header>
            <el-row>
                <el-col :span="7">
                    <div class="date">
                        <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        style="width:80%"
                        @blur="dateSearch"
                        clearable
                        v-show="isDate">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="7">
                    <el-select v-model="city" clearable placeholder="请选择城市" style="width:80%" @change="citySearch" v-show="isCity">
                        <el-option
                        v-for="item in cityLists"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="7">
                    <el-select v-model="area" clearable placeholder="请选择区域" style="width:80%" @change="areaSearch" v-show="isArea">
                        <el-option
                        v-for="item in areaLists"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="7">
                    <div class="search">
                        <el-input clearable :placeholder="placeholder" style="width:80%;margin-right:30px" v-model="phone" @keyup.enter.native="getBrokerList(phone)" @blur="telSearch()" v-show="isPhone"></el-input>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="search">
                        <el-input clearable :placeholder1="placeholder1" style="width:80%;margin-right:30px" v-model="name" v-show="isName"></el-input>
                        <el-button type="primary" @click="search">搜索</el-button>
                    </div>
                </el-col>
            </el-row>
        </header>
    </div>
</template>

<script>
export default {
    props:{
       placeholder:{
           type: String,
           default: '请输入查询内容',
       },
       placeholder1:{
           type:String,
           default:'请输入查询内容'
       },
       isDate: {
           type: Boolean,
           default: false
       },
       isCity: {
           type: Boolean,
           default: false
       },
       isArea: {
           type: Boolean,
           default: false
       },
       isPhone: {
           type: Boolean,
           default: false
       },
       isName: {
           type: Boolean,
           default: false
       },
   },   
    data(){
        return{
            date:'',
            city:'',
            area:'',
            phone:'',
            name:'',
            cityLists:[],//城市下拉值
            areaLists:[]

        }
    },
    methods:{
        search(){
            this.$emit('search',this.name)
        },
        telSearch(){
            this.$emit('phone',this.phone)
        },
        dateSearch(){
            this.$emit("date",this.date)
        },
        areaSearch(){
            this.$emit("area",this.area)
        },
        citySearch(){
            this.$emit('city',this.city)
        },
        orderStatus(val){
            this.$emit("orderStatus",this.status)
        }
    }
}
</script>

<style scoped>
header{
    width:100%;
    height: 90px;
    display: flex;
    padding:100px 20px;
    align-items: center;
    box-sizing: border-box;
}
.search{
    display: flex;
    justify-content: space-around
}
.el-button--primary{
    height: 40px;
}
</style>
