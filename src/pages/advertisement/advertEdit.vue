<template>
    <div id="ad">
        <header>
            <el-button type="primary" plain @click="goBack">返回</el-button>
        </header>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="上传图片:">
                <el-upload
                    action="string"
                    list-type="picture-card"
                    :http-request="(file)=>{return upload(file,0)}"
                    :on-preview="handlePictureCardPreview"
                    :on-success="handleAvatarSuccess"
                    :limit="3"
                    :on-remove="(res,file)=>{return handleRemove(res,file,0)}" 
                    class="banIpt"
                    :class="{'inputActive':showList[0].inputShow}"
                    :file-list="list[0]">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <!-- <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="主题:" prop="theme">
                <el-input v-model="ruleForm.theme" style="width:90%;"></el-input>
            </el-form-item>
            <el-form-item label="广告内容:" prop="content">
               <quill-editor style="width: 90%;" v-model="ruleForm.content" ref="myQuillEditor" :options="editorOption">
				</quill-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" style="margin-left:40%;margin-bottom:50px">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
	import { quillEditor } from 'vue-quill-editor'

export default {
    components: {
        //使用编辑器
        quillEditor
    },
    data(){
        return{
            dialogImageUrl: '',
            dialogVisible: false,
            showList:[{inputShow:false},{inputShow:false},{inputShow:false},{inputShow:false}],
            list:[],
            imgData:{} ,    //预览图片的对象
            ruleForm:{
                theme:'',
                content:'',
                picFile:''
            },
            imageUrl:'',
            rules:{
                // picFile:[
                //     {required:true,meassge:'请上传图片',trigger:'blur'}
                // ],
                theme:[
                    {required:true,meassge:'请填写主题',trigger:'blur'},
                    { pattern:/^.{1,50}$/, message: '长度在50个字以内', trigger: 'blur' },
                ],
                content:[
                    {required:true,meassge:'请填写内容',trigger:'blur'},
                    // {min:1,max:1000,meassge:'长度在1000个字以内',trigger:'blur'}
                ]
            },
            editorOption: {
					modules: {
						toolbar: [
							['bold', 'italic', 'underline', 'strike'], // toggled buttons
							['blockquote', 'code-block'],
							['image'],
							[{
								'header': [1, 2, 3, 4, 5, 6, false]
							}],
							[{
								'list': 'ordered'
							}, {
								'list': 'bullet'
							}],
							[{
								'indent': '-1'
							}, {
								'indent': '+1'
							}],
							[{
								'size': ['small', false, 'large', 'huge']
							}],
							[{
								'color': []
							}, {
								'background': []
							}],
							[{
								'font': []
							}],
							[{
								'align': []
							}]
						]
					},
					placeholder: '请输入内容......'
                },
                imageUrl:''
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleRemove(res,item,index){
            this.showList[index].inputShow = false;
            this.delImg(res.id,index);     //删除图片
        },
        
        upload(item,index){     //自定义上传
            this.showList[index].inputShow = true;
            this.insertImg(item.file,index);
        },
        handleAvatarSuccess(res, file){
            alert(1)
            if(res.code == 0){
                this.$message({
                    message:"上传成功",
                    type:"success",
                    duration:1000
                });
            }else{
                this.$message({
                    message:'上传失败',
                    type:'error',
                    duration:1000
                })
            }
        },
        insertImg(iFile,index){     //上传请求
            let formData = new FormData();
            formData.append('adContent',this.ruleForm.content);
            formData.append('adTitle',this.ruleForm.theme);
            this.$post('advertisement/addAdvertisement',formData,this.$store.state.config).then(res=>{
                if(res.code == 0){
                    this.$message({
                        type: 'success',
                        message: '上传成功!'
                    });	
                    console.log(this.list)
                }
            })
        },
        delImg(id,index){     //删除
            // this.$delete('/slideshowControl/deleteById/'+id, {
            // }).then(res => {
            //     if(res.code == 0) {
            //         this.$message({
            //             type: 'success',
            //             message: '删除成功!'
            //         });
            //     }
            // })
        },
        
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.content > 5000){
                        this.$message({
                            meassge:'请确保字数在5000字及其以内',
                            type:'error',
                            duration:1000
                        })
                    }else{
                        this.$post('advertisement/addAdvertisement',this.$store.state.config).then(res=>{
                            if(res.code == 0){
                                this.$message({
                                    type: 'success',
                                    message: '上传成功!'
                                });	
                                console.log(this.list)
                            }
                        })
                        alert('submit!');
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
        
    }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.ql-editor{
    height: 500px;
}
</style>

<style scoped>
    .demo-ruleForm{
        padding-top:50px;
    }
    .el-button--primary{
        margin-left: 100px;
    }
</style>

