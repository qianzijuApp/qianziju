<template>
    <div>
        <div class="content">
            <ul>
                <li v-for="(item,index) in lists" :key="index">
                    <img :src="item.img" alt="">
                    <div class="buttons">
                        <p class="look" @click="view">查看</p>
                        <p class="edit" @click="edit">编辑</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            lists:[
                {
                    img:'../../../static/images/header.jpg'
                },
                {
                    img:'../../../static/images/header.jpg'
                },
                {
                    img:'../../../static/images/header.jpg'
                },
                {
                    img:'../../../static/images/header.jpg'
                }
            ]
        }
    },
    mounted(){
        this.getAds()
    },
    methods:{
        getAds(){
            this.$post('advertisement/getAdvertisementByWeb',{}).then(res=>{
                console.log(res);
                if(res.code == 0 || res.code == 200){

                }else{
                    this.$message({
                        message:res.msg,
                        type:'error',
                        duration:1000
                    })
                }
            })
        },
        view(){
            this.$router.push({
                path:'/advertDetail'
            })
        },
        edit(){
            this.$router.push({
                path:'/advertEdit'
            })
        }
    }
}
</script>

<style scoped>
.content{
    width:100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
ul{
    list-style: none;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-top: 50px;
}
ul>li{
    width:35%;
    margin-bottom: 50px;
}
img{
    width:100%;
    height: 300px;
}
.buttons{
    width:100%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    padding-top:30px;
}
.buttons p{
    width:100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color:#fff;
    border-radius: 5px;
}
.look{
    background-color: #409EFF;
}
.edit{
    background-color: #ff8400;
}
</style>
