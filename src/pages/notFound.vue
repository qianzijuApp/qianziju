<template>
    <div id="not">
        <div>
            <router-link to="/" style="color:#fff;text-decoration:unset"><p>返回首页</p></router-link> 
            <p @click="goback">返回上一页</p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
#not{
    height: 969px;
    background: url("../../static/images/4044.jpg") no-repeat;
    background-size: 100% 100%;
    position: relative;
}
h1{
    font-weight: 900;
    text-align: center;
    padding: 200px 0 100px;
}
div{
    width:100%;
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 150px;
    left: 0;
}
p{  
    width:100px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-weight: 500;
    font-size: 18px;
}
p:hover{
    cursor: pointer;
    color: #000
}
    
</style>
