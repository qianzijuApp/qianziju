<template>
    <div>
        <header>
            <el-button type="warning" @click="add" style="float:right;margin-top:25px;margin-right:100px;">保存</el-button>
        </header>
        <div class="content">
            <div class="type" v-for="(item,index) in lists" :key="index">
                <h4>{{item.h2}}</h4>
                <el-tag
                :key="tag.id"
                v-for="tag in item.dynamicTags"
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
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            
            inputVisible: false,
            inputValue: '',
            dialogCityVisible:false,
            dialogAreaVisible:false,

            lists:[{
                h2:"城市",
               dynamicTags: ['标签一', '标签二', '标签三'],
            },{
                h2:"区域",
                dynamicTags: ['标签一', '标签二', '标签三'],
            }],
            form:{
                city:'',
                area:''
            },
            rules:{
                city:[
                    {required:true,meassge:'请输入城市',trigger:'blur'}
                ],
                area:[
                    {required:true,meassge:'请输入城市',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
            this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        add(){
            this.dialogCityVisible = true;
        },
        submitCity(){
            this.dialogCityVisible = false;
        }
    }
}
</script>

<style>
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

</style>

<style scoped>
header{
    width:100%;
    height: 90px;
}
.content{
    width:100%;
    margin-top: 50px;
}
.type{
    width:95%;
    margin:auto;
    height: 150px;
}
h4{
    padding:30px;
}
</style>
