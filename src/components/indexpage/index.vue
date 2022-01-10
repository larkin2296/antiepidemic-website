<template>
    <div class='page' :style="{width:sceen_width + 'px'}">
        <div class='index_top' v-if="screen_type == 0">
            <div class='index_top_left'>
                <img src='../../img/virus.png' />
                ANTI-COV
            </div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color="#0334CC">
                <el-menu-item index="1">Testing</el-menu-item>
                <el-menu-item index="2">Global Statistics</el-menu-item>
                <el-menu-item index='3'>Protective Products</el-menu-item>
                <el-menu-item index="4">The outbreak guide</el-menu-item>
                <el-menu-item index="5">Real-time broadcast</el-menu-item>
                <el-menu-item index="6"><img class='top_pic' src="../../img/china.png" />Team</el-menu-item>
            </el-menu>
        </div>
        <div class='index_top' v-else>
            <div class='index_top_left'>
                <img src='../../img/virus.png' />
                ANTI-COV
            </div>
            <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                <img class="el-icon-arrow-down" src="../../img/meau.png" />
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">Testing</el-dropdown-item>
                <el-dropdown-item command="2">Global Statistics</el-dropdown-item>
                <el-dropdown-item command="3">Protective Products</el-dropdown-item>
                <el-dropdown-item command="4">The outbreak guide</el-dropdown-item>
                <el-dropdown-item command="5">Real-time broadcast</el-dropdown-item>
                <el-dropdown-item command="6">Team</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </div>

        <div class='index_page_one' :style="{height:sceen_height + 'px'}">
            <div class='index_page_one_title'>
                <div class='index_page_one_title_word' ref="word">
                    <div class='index_page_one_title_word_bold'>COVID-19 crisis is everywhere, do you worry that you have been infected? </div> 
                Please complete the following questions for a self-diagnosis.<br/> The diagnosis will be sent to your mailbox.<br/>
                <span>Total number of diagnostic reports: {{evaluation_num}}</span>
                </div>
                
                <div class='index_page_one_button'>
                    <button @click="go_question()">Starting test</button>
                </div>
            </div>
            <!-- <div class='index_page_one_pic' :style="{height:pic_height}">
                <img src="../../img/doctor.png" />
            </div> -->
        </div>

        <div class='index_page_two' :style="map_height">
            <div class='index_page_two_top'>
                <div class='index_page_two_top_title'><span>Updated global data for COVID-19 Coronavirus Pandemic(UTC){{covdata.update_time}}</span></div>
                <div class='index_page_two_top_content'>
                    <div class='index_page_two_top_content_list orange'>
                        <div class='index_page_two_top_content_list_number'>{{covdata.cumulative}}</div>
                        <div class='index_page_two_top_content_list_word'>Cumulative confirmed cases</div>
                    </div>
                    <div class='index_page_two_top_content_list red'>
                        <div class='index_page_two_top_content_list_number'>{{covdata.existing}}</div>
                        <div class='index_page_two_top_content_list_word'>Existing confirmed</div>
                    </div>
                    <div class='index_page_two_top_content_list grey'>
                        <div class='index_page_two_top_content_list_number'>{{covdata.death}}</div>
                        <div class='index_page_two_top_content_list_word'>Cumulative deaths</div>
                    </div>
                    <div class='index_page_two_top_content_list green'>
                        <div class='index_page_two_top_content_list_number'>{{covdata.cure}}</div>
                        <div class='index_page_two_top_content_list_word'>Cumulative cured cases</div>
                    </div>
                    
                </div>
            </div>
            <div class='index_page_two_bottom'>
                <!-- <div class='index_page_two_bottom_input' v-if="screen_type == 1">
                    <el-input v-model="search" :change="seachcountry" placeholder="search"></el-input>
                </div> -->
                <vChartMap
                    :series-data="covlist"
                    :tooltip-data="search"
                    :color="liness.color"
                    class="areaBar"
                    :title="liness.title"
                    :orient="liness.orient"
                    :legend-top="liness.legendTop"
                    :legend-right="liness.legendRight"
                    :radius="liness.radius"
                    :center="liness.center"
                    :item-gap="liness.itemGap"
                />
            </div>
        </div>

        <div class='index_page_three' :style="goods_height">
            <div class='index_page_three_title'>
                <div class='index_page_three_title_top'>Medical protective materials supply</div>
                <div class='index_page_three_title_bottom'>【Important 】In order to save more lives, we are now prioritizing supplies to governments and 
their designated agencies, as well as medical facilities. Other purchases by companies and 
individuals will be on hold until the output of our factories has increased. In addition, due 
to the huge demand but limited productivity, your needs may not be met immediately, 
but you can leave your message by filling below purchase form, 
we will contact you as soon as possible. </div>
            </div>
            <el-carousel class='index_page_three_list' :autoplay="false" v-if="screen_type == 0" type="card" arrow="always" height="400px">
                <el-carousel-item class='index_page_three_list_good' v-for="item in goods" v-bind:key="item.id">
                    <div class='index_page_three_list_good_pic'>
                        <img :src="'https://api.anti-cov.com/' + item.title_img" />
                    </div>
                    <div class='index_page_three_list_good_title'>{{item.goods_name}}</div>
                    <div class='index_page_three_list_good_price' @click="go_detail(item)">More details</div>
                    <div class='index_page_three_list_good_button' @click="go_order(item.id)"></div>
                </el-carousel-item>
            </el-carousel>
                <!-- <div class='index_page_three_list_good' v-for="item in goods" v-bind:key="item">
                    <div class='index_page_three_list_good_pic'>
                        <img :src="'https://api.anti-cov.com/' + item.title_img" />
                    </div>
                    <div class='index_page_three_list_good_title'>{{item.goods_name}}</div>
                    <div class='index_page_three_list_good_price'>Advisory details</div>
                    <div class='index_page_three_list_good_button' @click="go_detail(item)"></div>
                </div> -->
            <div class='index_page_three_list' v-else>
                <div class='index_page_three_list_good' v-for="item in goods" v-bind:key="item.id">
                    <div class='index_page_three_list_good_pic'>
                        <img :src="'https://api.anti-cov.com/' + item.title_img" />
                    </div>
                    <div class='index_page_three_list_good_title'>{{item.goods_name}}</div>
                    <div class='index_page_three_list_good_price' @click="go_detail(item)">More details</div>
                    <div class='index_page_three_list_good_button' @click="go_order(item.id)"></div>
                </div>
                <!-- <div class='index_page_three_list_good'>
                    <div class='index_page_three_list_good_pic'>
                        <img src="../../img/good.png" />
                    </div>
                    <div class='index_page_three_list_good_title'>Surgical mask</div>
                    <div class='index_page_three_list_good_price'><span>$19.9</span>/box</div>
                    <div class='index_page_three_list_good_button'></div>
                </div>
                <div class='index_page_three_list_good'>
                    <div class='index_page_three_list_good_pic'>
                        <img src="../../img/good.png" />
                    </div>
                    <div class='index_page_three_list_good_title'>Surgical mask</div>
                    <div class='index_page_three_list_good_price'><span>$19.9</span>/box</div>
                    <div class='index_page_three_list_good_button'></div>
                </div> -->
            </div>
        </div>

        <div class='index_page_four' :style="guide_height">
            <div class='index_page_four_title'>
                <div class='index_page_four_title_top'>Brief guideline for personal protection</div>
                <div class='index_page_four_title_bottom'>
                    For more details, please download our <a style="text-decoration:underline;color:#fff;" href="https://api.anti-cov.com/downloadGuide" download="guideline for personal protection">"Guidelines for personal infection prevention and control of Covid-19"</a>
                </div>
            </div>
            <div class='index_page_four_center'>
                <div class='index_page_four_center_list'>
                    <div class='index_page_four_center_list_pic'>
                        <img src='../../img/kouzhao.png' />
                    </div>
                    <div class='index_page_four_center_list_word'>Put on a mask</div>
                </div>
                <div class='index_page_four_center_list'>
                    <div class='index_page_four_center_list_pic'>
                        <img src="../../img/xishouye.png" />
                    </div>
                    <div class='index_page_four_center_list_word'>
                        Wash your hands frequently
                    </div>
                </div>
                <div class='index_page_four_center_list'>
                    <div class='index_page_four_center_list_pic'>
                        <img src='../../img/tongfeng.png' />
                    </div>
                    <div class='index_page_four_center_list_word'>
                        Keep ventilation
                    </div>
                </div>
                <div class='index_page_four_center_list'>
                    <div class='index_page_four_center_list_pic'>
                        <img src="../../img/waichu.png" />
                    </div>
                    <div class='index_page_four_center_list_word'>
                        Restrain going out
                    </div>
                </div>
                <div class='index_page_four_center_list'>
                    <div class='index_page_four_center_list_pic'>
                        <img src="../../img/juhui.png" />
                    </div>
                    <div class='index_page_four_center_list_word'>
                        Reduce the aggregation
                    </div>
                </div>
                <div class='index_page_four_center_list'>
                    <div class='index_page_four_center_list_pic'>
                        <img src="../../img/yaofang.png" />
                    </div>
                    <div class='index_page_four_center_list_word'>
                        Seek for medic's helps in time
                    </div>
                </div>
            </div>
        </div>

        <div class='index_page_five' :style="goods_height">
            <div class='index_page_five_title'>Real-time broadcast</div>
            <div class='index_page_five_center'>
                <div class='index_page_five_center_pic'><img src="../../img/new_pic.jpeg" /></div>
                <div class='index_page_five_center_list'>
                    <div class='index_page_five_center_list_list' v-for="item in news" v-bind:key="item.id">
                        <div class='index_page_five_center_list_top'>{{item.publishedAt}}</div>
                        <div class='index_page_five_center_list_center'>
                            <a :href="item.url" target="_black">
                                {{item.description}}
                            </a>
                        </div>
                        <div class='index_page_five_center_list_bottom'>{{item.from}}</div>
                    </div>
                    <!-- <div class='index_page_five_center_list_list'>
                        <div class='index_page_five_center_list_top'>On March 27 15:34</div>
                        <div class='index_page_five_center_list_center'>
                            <a href="http://en.people.cn/n3/2020/0327/c90000-9673463.html" target="_black">
                                Xi urges joint China-US action against COVID-19 in phone call with Trump                            
                            </a>
                        </div>
                        <div class='index_page_five_center_list_bottom'>China Daily</div>
                    </div>
                    <div class='index_page_five_center_list_list'>
                        <div class='index_page_five_center_list_top'>On March 27 10:02</div>
                        <div class='index_page_five_center_list_center'>
                            <a href="http://en.people.cn/n3/2020/0327/c90000-9673260.html" target="_black">
                            China highlights scientific information sharing in containing COVID-19
                            </a>
                        </div>
                        <div class='index_page_five_center_list_bottom'>Xinhua</div>
                    </div>
                    <div class='index_page_five_center_list_list'>
                        <div class='index_page_five_center_list_top'>On March 27 01:34</div>
                        <div class='index_page_five_center_list_center'>
                            <a href="https://www.bbc.com/news/live/world-52058788" target="_black">
                            Boris Johnson tests positive for coronavirus,The British prime minister is self-isolating but not stepping back from his duties for the time being.
                            </a>
                        </div>
                        <div class='index_page_five_center_list_bottom'>BBC.com</div>
                    </div>
                    <div class='index_page_five_center_list_list'>
                        <div class='index_page_five_center_list_top'>On March 26 02:38</div>
                        <div class='index_page_five_center_list_center'>
                            <a href="https://www.usnews.com/news/healthiest-communities/articles/2020-03-26/coronavirus-pandemic-reaching-critical-tipping-point-in-america-analysis-shows" target="_black" >
                            America Is Approaching a Deadly Tipping Point in the Coronavirus Pandemic, U.S. News Analysis Shows
                            </a>
                        </div>
                        <div class='index_page_five_center_list_bottom'>US News</div>
                    </div> -->
                </div>
            </div>
        </div>

        <div class='index_page_six' :style="guide_height">
            <div class='index_page_six_center'>
                <div class='index_page_six_center_list'>
                    <div class='index_page_six_center_list_top'>Hello, this is Anti-Covid-19 team from China</div>
                    <div class='index_page_six_center_list_center'>we are committed to providing help to combat COVID-19. </div>
                    <div class='index_page_six_center_list_bottom'> We will update information about the pandemic, provide self-diagnosis of COVID-19 risk, and share a detailed guidelines for personal protection. In addition, we coorporate with qualified China medical materials manufacturers to supply protective equipments to governments and their designated agencies, as well as medical facilities. Let's work together to save lives!<br /><span style="font-size:1.3rem;">Contact us:<a style="color:#fff;" href="mailto:anti-cov@thunderland.com.cn">anti-cov@thunderland.com.cn</a></span></div>
                </div>
                <div class='index_page_six_center_pic'><smile></smile></div>
            </div>
        </div>

        <div class='index_page_seven'>
            <div class='index_page_seven_list'>
                <div class='index_page_seven_list_list' v-for="item in Comment" v-bind:key="item.id">
                    <div class='index_page_seven_list_list_top'><span>{{item.ip}}</span><i class='fa fa-thumbs-up' :class="item.operation == 1?'blue':''" aria-hidden="true" @click="thumb_up(item)"></i>({{item.thumbs_up}})<i class="fa fa-thumbs-down" aria-hidden="true" @click="thumb_down(item)"></i>({{item.thumbs_down}})<i v-if="item.self == 1" class="fa fa-trash" aria-hidden="true" @click="thumb_del(item.id)"></i></div>
                    <div class='index_page_seven_list_list_center'>{{item.comment}}</div>
                </div>
                <el-pagination
                    :page-size="4"
                    background
                    layout="prev, pager, next"
                    :total="totalData"
                    @current-change="get_page_data">
                </el-pagination>
            </div>
            <div class='index_page_seven_center'>
                <el-input v-model="comment_text" type='textarea' :rows="5"></el-input>
                <el-button @click="sub_comment" type="primary">Comment</el-button>
            </div>
        </div>

        <div class='index_page_eight'>
            <number v-on:Eva_value="GetValue"></number>
        </div>

        <div class='index_page_bottom' v-if="screen_type == 0">
            Copyright © 2020 Shanghai Thunderland Technology Co., Ltd.  All Rights Reserved.
        </div>

        <el-dialog class='detail_top' :visible.sync="dialogVisible" :width="widthdata" title="Product Details">
            <div class='detail_top_pic'>
                <img :src="'https://api.anti-cov.com/' + goods_detail.title_img" />
            </div>
            <div class='detail_top_content'>
                <!-- <span>{{goods_detail.norms}}</span> -->
                <div class='detail_top_content_top'>{{goods_detail.goods_name}}<br /></div>
                <div class='detail_top_content_center' v-html="goods_detail.feature"></div>
            </div>
        </el-dialog>

        <el-dialog
            title="Your contact information"
            :visible.sync="dialogVisible1"
            :width="widthdata">
            <el-form :model="form" ref="form" :rules="rules" label-width="100px">
                <el-form-item label="Email" required>
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="Requirement">
                    <el-input type="textarea" v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">Cancel</el-button>
                <el-button type="primary" @click="go_sub">Submit</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import '@/css/pc.css'
import vChartMap from '../../components/chinamap/index.vue'
import Number from '../../components/Number/index.vue'
import Smile from '../../components/smile'
import { covdata, goodsList, subOrder, getNews, getComment, Subcomment, thumbsUp, thumbsDown, delComment } from '../../api/index'
export default {
    components: {
        vChartMap,
        Smile,
        Number
    },
    data(){
        return {
            form: {
                id: '',
                remark: '',
                email: ''
            },
            startVal: 0,
            endVal: 3017,
            rules: {
                email: [{ required: true, message: 'please write your email', trigger: 'change' }]
            },
            sceen_height: '',
            activeIndex: '1',
            pic_height: '',
            locationOfSpringFestival: [],
            liness: {
                title: '及时性：',
                radius: ['35%', '55%'],
                center: ['34%', '51%'],
                orient: 'vertical',
                legendTop: 200,
                legendRight: 105,
                itemGap: 35,
                color: ['#289df5', '#fbc01b']
            },
            screen_type: 0,
            goods_height: '',
            guide_height: '',
            map_height: '',
            sceen_width: '',
            goods: [],
            covdata: {},
            covlist: {},
            search: '',
            dialogVisible: false,
            goods_detail: {},
            widthdata: '',
            dialogVisible1: false,
            news: [],
            Comment: [],
            comment_text: '',
            totalData: 0,
            current_thumb: [],
            evaluation_num: 0
        }
    },
    mounted() {
        // const that = this
        this.sceen_height = window.innerHeight -75
        console.log(window.innerWidth)
        if(window.innerWidth > 450){
            this.screen_type = 0
            this.pic_height = window.innerWidth - this.$refs.word.offsetHeight - 52
            this.pic_height = this.pic_height + 'px'
            this.goods_height = 'height:' + this.pic_height +'px'
            this.guide_height = 'height:' + this.pic_height*0.6 +'px'
            this.map_height = 'height:' + this.pic_height +'px'
            this.screen_width = window.innerWidth
        }else{
            this.screen_type = 1
            this.pic_height = window.innerWidth - 52
            this.pic_height = this.pic_height + 'px'
            this.goods_height = 'height:auto'
            this.guide_height = 'height:auto'
            this.map_height = 'height:' + this.pic_height*0.6 +'px'
            this.screen_width = window.innerWidth
        }
        if (!(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))) {
            this.widthdata = '50%'
        }
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            this.widthdata = '100%'
        }
        window.addEventListener('scroll', this.handleScroll, true);
        // window.onresize = () => {
        //     return (() => {
        //     location.reload();
        //     })();
        // };
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData: function(){
            covdata().then(res => {
                this.covdata = res
                this.covlist = JSON.parse(res.remark)
            })
            goodsList().then(res => {
                this.goods = res.list.data
            })
            getNews().then(res => {
                this.news = res
            })
            this.get_Comment()
        },
        get_Comment(){
            var param = new Object
            param.page = 1
            getComment(param).then(res => {
                this.totalData = res.total
                this.Comment = res.data
            })
        },
        handleSelect: function(e){
            if(e == 1){
                document.documentElement.scrollTop = 0
            }
            if(e == 2){
                document.documentElement.scrollTop = this.sceen_height
            }
            if(e == 3){
                document.documentElement.scrollTop = this.sceen_height*1.9
            }
            if(e == 4){
                document.documentElement.scrollTop = this.sceen_height*2.5
            }
            if(e == 5){
                document.documentElement.scrollTop = this.sceen_height*3.5
            }
            if(e == 6){
                document.documentElement.scrollTop = this.sceen_height*4
            }
        },
        handleScroll: function () {
            // let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;  
            // 设备/屏幕高度
            let scrollObj = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            // let scrollTop = scrollObj[0].scrollTop; // div 到头部的距离
            // let scrollHeight = scrollObj[0].scrollHeight; // 滚动条的总高度
            if(scrollObj > this.sceen_height){
                this.activeIndex = '3'
            }
            if(scrollObj < this.sceen_height){
                this.activeIndex = '2'
            }
            if(scrollObj == 0){
                this.activeIndex = '1'
            }
            if(scrollObj > this.sceen_height*2){
                this.activeIndex = '4'
            }
            if(scrollObj > this.sceen_height*3){
                this.activeIndex = '5'
            }
            if(scrollObj > this.sceen_height*3.5){
                this.activeIndex = '6'
            }
        },
        go_question() {
            if (!(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))) {
                this.$router.push('/pcquestion')
                return
            }
            if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                this.$router.push('/mobilequestion')
                return
            }
        },
        go_detail(item) {
            this.goods_detail = item
            this.dialogVisible = true
            console.log(this.goods_detail)
        },
        handleCommand(e){
            console.log(e)
            if(e == 1){
                document.documentElement.scrollTop = 0
            }
            if(e == 2){
                document.documentElement.scrollTop = this.sceen_height
            }
            if(e == 3){
                document.documentElement.scrollTop = this.sceen_height*2
            }
            if(e == 4){
                document.documentElement.scrollTop = this.sceen_height*4
            }
            if(e == 5){
                document.documentElement.scrollTop = this.sceen_height*5.3
            }
            if(e == 6){
                document.documentElement.scrollTop = this.sceen_height*6.5
            }
        },
        seachcountry(e){
           console.log(e) 
        },
        go_sub() {
            var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if (this.form.email == '' || !regEmail.test(this.form.email)) {
                this.$message({
                    message: 'Incorrect mailbox format',
                    type: 'error'
                })
            }else{
                subOrder(this.form).then(res=>{
                    console.log(res)
                })
                this.$message({
                    message: 'Your message has been submitted successfully, the corresponding supplier will contact you as soon as possible.',
                    type: 'success'
                });
                this.dialogVisible1 = false
            }
        },
        go_order(id){
            this.form.id = id
            this.dialogVisible1 = true
        },
        sub_comment(){
            var param = new Object
            param.comment = this.comment_text
            Subcomment(param).then(res=>{
                console.log(res)
                this.$message({
                    message: '',
                    type: 'success'
                });
                this.comment_text = '',
                this.get_Comment()
            })
        },
        thumb_up(item){
            if(item.operation == 1){
                this.$message({
                    message: 'You already liked it',
                    type: 'warning'
                });
            }else{
                var param = new Object
                param.id = item.id
                thumbsUp(param).then(res=>{
                    console.log(res)
                    if(res != 'success'){
                        this.$message({
                            message: res,
                            type: 'warning'
                        });
                    }else{
                        this.get_Comment()
                    }
                    // this.current_thumb.push(item.id)
                })
                }
        },
        thumb_down(item){
            if(item.operation == 2){
                this.$message({
                    message: "You've already stepped on it",
                    type: 'warning'
                });
            }else{
                var param = new Object
                param.id = item.id
                thumbsDown(param).then(res=>{
                    console.log(res)
                    if(res != 'success'){
                        this.$message({
                            message: res,
                            type: 'warning'
                        });
                    }else{
                        this.get_Comment()
                    }
                    // this.current_thumb.splice(this.current_thumb.indexOf(item.id), 1);
                })
            }
        },
        thumb_del(id){
            var param = new Object
            param.id = id
            delComment(param).then(res=>{
                console.log(res)
                this.get_Comment()
            })
        },
        get_page_data(e){
            var param = new Object
            param.page = e
            getComment(param).then(res => {
                this.totalData = res.total
                this.Comment = res.data
            })
        },
        GetValue(e){
            this.evaluation_num = e
        }
    }
}
</script>