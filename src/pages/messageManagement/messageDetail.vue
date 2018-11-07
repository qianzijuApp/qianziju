<template>
    <div>
        <header>
            <el-button type="primary" plain @click="goBack" style="margin-left:100px;">返回</el-button>
        </header>
        <ul>
            <li>
                <p>推送人：<span>{{pusher?pusher:'无'}}</span></p>
            </li>
            <li>
                <p>电话：<span>{{tel?tel:'无'}}</span></p>
            </li>
            <li>
                <p>收件人：<span>{{collect?collect:'无'}}</span></p>
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
            tel:'',//电话
            collect:'',//收件人
            content:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',//信件内容
        }
    },
    mounted(){
        this.getMsgDetail();
    },
    methods:{
        getMsgDetail(){
            console.log('获取信息详情')
        },
        // 返回
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
    ul{
        list-style: none;
        padding:100px 200px;
        box-sizing: border-box;
    }
    ul>li{
        height: 50px;
    }
</style>
