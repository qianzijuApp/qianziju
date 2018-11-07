<template>

    <div class="tags" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>

</template>

<script>
    import bus from './bus';
    export default {
        data() {
            return {
                tagsList: []
            }
        },
        methods: {

            isActive(path) {
                return path === this.$route.fullPath;
            },

            // 关闭单个标签
            closeTags(index) {                       //index是v-for遍历出来的索引值
                const delItem = this.tagsList.splice(index,1)[0];      //删除当前点击的对象，delItem的值是你点击删除的那个标签
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];    //删除之后，去哪数组上一个索引值的对象
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);      //判断对象是否存在，存在就跳转当前对象内的指定路径
                }else{
                    this.$router.push('/');     //不存在就回跳登录进来的第一个页面
                }
            },

            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                this.$router.push('/');
            },

            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {           //数组过滤，会返回一个新数组，新数组内只包含当前Url地址
                    return item.path === this.$route.fullPath;
                });
                this.tagsList = curItem;
            },

            // 设置标签
            setTags(route){
                const isExist = this.tagsList.some(item => {             //遍历自己定义的标签数组，判断是否标签数组内的路由名字是否跟当前url地址内的路由名字相等，并返回给isExist
                    return item.path === route.fullPath;
                });

                !isExist && this.tagsList.push({               //如果url地址内的路由跟标签数组内的路由不匹配并且标签数组也存在，那么直接把url地址添加到标签数组内
                    title: route.meta.title,
                    path: route.fullPath,
                    name: route.matched[1].components.default.name
                });


                bus.$emit('tags', this.tagsList);    //将数组抛给Home组件，Home组件内用tags接收

            },


            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            }
        },

        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },

        watch:{
            $route(newValue, oldValue){    //监听整个路由改变，保存到tagsList数组 $route（to,from）,从哪儿来，到哪儿去
              if(newValue.meta.title){
                this.setTags(newValue);
              }
            }
        },

        created(){
            if(this.$route.meta.title){
              this.setTags(this.$route);      //this.$route 是vue中每个路由自带的所有属性对象
            }
        }

    }

</script>


<style>
    .tags {
        position: relative;
        height: 30px;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
    }
    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
    .tags-li {
        float: left;
        margin: 3px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }
    .tags-li:not(.active):hover {        /*除了li带有active的class，其他的移入变色*/
        background: #f8f8f8;
    }
    .tags-li.active {
        color: #fff;
        background-color: #409EFF;
    }
    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
        text-decoration: none;
    }
    .tags-li.active .tags-li-title {
        color: #fff;
        text-decoration: none;
    }
    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }

</style>
