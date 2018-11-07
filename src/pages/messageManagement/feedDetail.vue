<template>
    <div>
        <header>
            <el-button type="primary" plain @click="goBack" style="margin-left:100px">返回</el-button>
        </header>
        <ul>
            <li>
                <p>推送人：<span>{{pusher?pusher:'无'}}</span></p>
            </li>
            <li>
                <p>电话：<span>{{tel?tel:'无'}}</span></p>
            </li>
            <li>
                <p>{{content?content:'无'}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pusher:'',//推送人
            tel:'',//电话，
            content:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        }
    },
    mounted(){
        this.getFeedDetail();
    },
    methods:{
        getFeedDetail(){
            this.$get('suggestion/queryById',{
                suggestionId:this.$route.query.id
            }).then(res=>{
                console.log(res);
                if(res.code == 0 || res.code == 200){
                    this.pusher = res.data.nickname,
                    this.content= res.data.content
                }else{
                    this.$message({
                        message:res.msg,
                        type:'error',
                        duration:1000
                    })
                }
            })
            console.log('获取反馈意见详情')
        },
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
    ul{
        list-style: none;
        padding:200px;
        box-sizing: border-box;
    }
    ul>li{
        height: 50px;
    }
</style>
