<template>
    <div class='detail'>
        <div class='detail_top'>
            <div class='detail_top_pic'>
                <!-- <el-carousel :autoplay="false" arrow="always">
                    <el-carousel-item v-for="item in list.detail" :key="item">
                    <img :src="'https://api.anti-cov.com/'+item" />
                    </el-carousel-item>
                </el-carousel> -->
                <img :src="'https://api.anti-cov.com/' + list.title_img" />
            </div>
            <div class='detail_top_content'>
                <div class='detail_top_content_top'>{{list.goods_name}}<br /><span>{{list.norms}}</span></div>
                <div class='detail_top_content_center'>1. Comply with EU 2016/425, GB 19082-2009,and FDA requirements.<br />
2. Sterilized, sealed seam,  synthetic blood penetration resistance (level 5),  filter effiency at key position material and seam is up to 99.9%. <br />
3. Protection against light liquid splashes and hazardous dusts, avoid inward leakage and moisture. <br />
4. Breathable, anti-static, effective filtration,  comfortable, and safe!</div>
                <div class='detail_top_content_bottom' @click="show_panel"><img src="../../img/buy_hover.png" /></div>
            </div>
            <div style="clear:both;"></div>
        </div>
        <!-- <div class='detail_middle'>
            <el-tabs v-model="activeName" :stretch="true" @tab-click="handleClick">
                <el-tab-pane label="Mask" name="first"></el-tab-pane>
                <el-tab-pane label="Certificate" name="second"></el-tab-pane>
                <el-tab-pane label="Company" name="third"></el-tab-pane>
            </el-tabs>
            <div class='detail_middle_content'>
                <div class='detail_middle_content_pic' v-for="item in datapic" v-bind:key="item"><img :src="'https://api.anti-cov.com/' + item" /></div>
            </div>
        </div> -->
        <el-dialog
            title="Your contact information"
            :visible.sync="dialogVisible"
            :width="widthdata"
            :before-close="handleClose">
            <el-form ref="form" :model="form">
                <el-form-item label="Email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="go_sub">Submit</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { goodsdetail, subOrder } from '../../api/index'
export default {
    data() {
        return {
            list: {},
            datapic: [],
            activeName: 'first',
            dialogVisible: false,
            form: {
                email: ''
            },
            widthdata: ''
        }
    },
    props: ['id'],
    mounted() {
        if (!(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))) {
            this.widthdata = '50%'
            return
        }
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            this.widthdata = '100%'
            return
        }
    },
    created() {
        this.fetchData()
    }, 
    methods: {
        fetchData: function(){
            goodsdetail(this.id).then(res=> {
                this.list = res
                this.datapic = this.list.details
            })
        },
        handleClick(e){
            if(e.paneName == 'first'){
                this.datapic = this.list.details
            }else if(e.paneName == 'second'){
                this.datapic = this.list.quality_img
            }else if(e.paneName == 'third'){
                this.datapic = this.list.other_img
            }
        },
        show_panel(){
            this.dialogVisible = true
        },
        go_sub() {
            subOrder(this.form).then(res=>{
                console.log(res)
                this.$message({
                    message: 'Congratulations,it was sent successfully',
                    type: 'success'
                });
                this.dialogVisible = false
            })
        }
    }
}
</script>

<style scoped>

</style>