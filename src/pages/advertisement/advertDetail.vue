<template>
    <div id="review">
        <img :src="img" alt="">
        <p>{{title?title:'无'}}</p>
        <div class="text" v-html="text"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            img:'../../../static/images/a6.png',
            title:'',
            text:'反倒是规范换个啥给大家',
        }
    }
}
</script>

<style scoped>
#review{
    height: auto;
}
img{
    width:300px;
    height: 200px;
    margin-left: 40%;
    padding-top:100px
}
p{
    text-align: center;
    margin: 30px 0
}
.text{
    width:80%;
    margin: auto;
    padding-bottom: 100px;
}
</style>
