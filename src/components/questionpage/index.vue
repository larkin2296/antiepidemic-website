<template>
    <div class='question'>
        <div class='index_top'>
            <div class='index_top_left'>
                <img src='../../img/virus.png' />
                ANTI-COV
            </div>
        </div>
        <div class='q_content' v-if="end == 0">
            <div class='q_title'>Self-Diagnosis of COVID-19 Risk</div>
            <div class='q_describe'> Please answer the following questions truthfully and we will assess the risks based on your answers and make appropriate recommendations.</div>
            <div class='q_area' v-loading="loading">
                <div class='q_area_title'>
                    <!-- 1.Have you stayed in this place recently for more than two weeks? -->
                    {{currentQ.content}}
                </div>
                <div class='q_area_answer' v-if="currentQ.type == 1 || currentQ.type == 4">
                    <el-radio-group v-model="choose_radio_id" @change="get_radio_choose">
                        <el-radio :label="item" v-for="item in currentQ.answer" v-bind:key="item.id">{{item.content}}</el-radio>
                    </el-radio-group>
                </div>
                <div class='q_area_answer' v-else-if="currentQ.type == 2 || currentQ.type == 5">
                    <el-checkbox-group v-model="choose_check_id" @change="get_check_choose">
                        <el-checkbox :label="item" v-for="item in currentQ.answer" :disabled="(selectType == true && next_id == 99 && item.id != 39)?true:false" v-bind:key="item.id">{{item.content}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class='q_area_answer' v-else-if="currentQ.type == 3">
                    <el-select v-model="choose_select_id" @change="get_select_choose">
                        <el-option :label="item" v-for="item in currentQ.answer" v-bind:key="item.id">{{item.content}}</el-option>
                    </el-select>
                </div>
                <div class='q_area_answer' v-if="(currentQ.id != 3 && (currentQ.type == 4 || currentQ.type == 5) && show_input == true)">
                    <el-input v-model="zitian" placeholder="input your answer"></el-input>
                </div>
                <div class='q_area_answer' v-if="(currentQ.id == 3 && (currentQ.type == 4 || currentQ.type == 5))">
                    <el-tag style="margin-right:5px;" v-for="tag in country" :key="tag" closable @close="handleClose(tag)"> {{tag}}</el-tag>
                    <country @childFn="parentFn"></country>
                </div>
                <div class='q_area_button'>
                    <el-button type="primary" @click="go_Cquestion()">Next</el-button>
                </div>
                <div class='q_area_button' v-if="currentQ.id != 3">
                    <el-button type="info" @click="go_Pquestion()">Prev</el-button>
                </div>
            </div>
        </div>
        <div class='q_content' v-if="end == 1">
            <div class='q_title'>Self-Diagnosis of COVID-19 Risk</div>
            <div class='q_describe'> Please answer the following questions truthfully and we will assess the risks based on your answers and make appropriate recommendations.</div>
            <div class='q_area' v-loading="loading">
                <el-form ref="form" :model="answer">
                <el-form-item label="">
                    <span style='color:#6495ED'>We strictly keep to the privacy protection principle, your test records will be sent directly from the system to your personal email box, and will not leave ANY trace  on our website.</span>
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model="answer.email"></el-input>
                </el-form-item>
                </el-form>
                <div class='q_area_button'>
                    <el-button type="primary" @click="createEva()">Submit</el-button>
                </div>
            </div>
        </div>
        <div class='q_content' v-if="end == 2">
            <div class='q_title'>Self-Diagnosis of COVID-19 Risk</div>
            <div class='q_describe'></div>
            <div class='q_area' v-loading="loading">
                <div class='end_content'>
                    <div class='end_title'><img src="../../img/end.png" /></div>
                    <div class='end_word'>Thank you for your answer.We will inform you of the result by mail.</div>
                </div>
                <div class='q_area_button'>
                    <el-button type="primary" @click="go_home()">Home</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Country from '../../components/country/index.vue'
import { get_question, get_child_question, sub_answer } from '@/api/index'
export default {
    components: {
        Country
    },
    data() {
        return {
            loading: true,
            question: [],
            question_child: [],
            answer: {
                email: '',
                log: []
            },
            currentQ: {},
            choose_radio_id: '',
            choose_check_id: [],
            choose_select_id: '',
            next_id: '',
            end: 0,
            zitian: '',
            param: {},
            show_input: false,
            country: [],
            selectType: false
        }
    },
    created(){
        this.fetchData()
    },
    methods: {
        fetchData: function(){
            // 获取第一个问题
            get_question().then(res => {
                this.question = res
                this.currentQ = res[0]
                this.choose_radio_id = res[0].answer[0]
                this.loading = false
                var param = {}
                this.next_id = 5
                // 储存选择项
                param.qid = 3
                param.answer = [5]
                param.content = ''
                this.param = param
            })
        },
        go_Cquestion: function() {
            // 获取下一个问题
            if(this.param.qid == undefined){
                this.$message.error('please choose your answer');
            }else if(this.param.qid == 3 && this.country == ''){
                this.$message.error('please choose your answer');
            }else{
                this.loading = true
                var id = this.next_id
                this.currentQ = {}
                if(this.show_input == true){
                this.param.content = this.zitian
                this.show_input = false
                }
                if(this.param.qid == 3){
                    if(this.country != ''){
                        var area = ''
                        for(var i=0;i<this.country.length;i++){
                            if(i != (this.country.length-1)){
                                area += (this.country[i] + ',')
                            }else{
                                area += this.country[i]
                            }
                        }
                        this.param.content = area
                    }
                }
                this.answer.log.push(this.param)
                this.param = {}
                // 如果是99则代表问答结束
                if(id == 99){
                    this.end = 1
                    this.loading = false
                }else{
                    // 根据id获取下一个问题
                    get_child_question(id).then(res => {
                        this.currentQ = res
                        this.loading = false
                    })
                }
            }
        },
        get_radio_choose: function(e){
            // 单选选择处理
            var param = {}
            // this.choose_radio_id = e
            if(this.currentQ.id == 3){
                this.next_id = 5
                // 储存选择项
                param.qid = 3
                param.answer = [5]
                param.content = ''
                this.param = param
            }else{
                this.next_id = e.next_question_id?e.next_question_id:(e.qid+1)
                // 储存选择项
                param.qid = e.qid
                param.answer = [e.id]
                param.content = ''
                this.param = param
            }
            // 如果选择为最后一个且type是4或者5显示输入框
            if((this.choose_radio_id.id == this.currentQ.answer[this.currentQ.answer.length -1].id) || e.qid == 3){
                this.show_input = true
            }else{
                this.show_input = false
            }
        },
        get_check_choose: function(e){
            // 复选选择处理
            // this.choose_id = e
            const legendData = []
            // console.log(e)
            // console.log(this.choose_check_id)
            // 答案集整合
            var a = []
            e.forEach(function(item){
                if(item.id == 39){
                    a.push(item)
                }
                legendData.push(item.id)
            })
            // 判断答案是否有no（8）或者 发烧（14）来获取下一个问题id
            // 如果选择other，显示input
            if(legendData.indexOf(37) > -1){
                this.show_input = true
            }else{
                this.show_input = false
            }
            if(this.currentQ.id == 8){
                if(legendData.indexOf(39) > -1){
                    this.next_id = 99
                    this.selectType = true
                    this.choose_check_id = a
                    this.show_input = false
                }else if(legendData.indexOf(21) > -1){
                    this.next_id = 9
                    this.selectType = false
                }else{
                    this.next_id = 10
                    this.selectType = false
                }
            }else{
                this.next_id = this.currentQ.id+1
            }
            // 答案存储
            var param = {}
            param.qid = this.currentQ.id
            param.answer = legendData
            param.content = ''
            this.param = param
        },
        get_select_choose: function(e){
            // 选择框处理
            // this.choose_id = e
            this.next_id = e.next_question_id?e.next_question_id:(e.qid+1)
            // 存储
            var param = {}
            param.qid = e.qid
            param.answer = [e.id]
            param.content = ''
            this.param = param
        },
        createEva: function(){
            this.loading = true
            // 提交答案集
            var param = Object
            param = this.answer
            var data = JSON.stringify(param)
            sub_answer(data).then(response => {
                console.log(response)
            })
            let _this=this
            setTimeout(function(){
                _this.end = 2
                _this.loading = false
            },10000)
        },
        go_Pquestion: function(){
            // 获取上一个问题
            this.loading = true
            if(this.answer.log.length == 1){
                get_question().then(res => {
                    this.currentQ = res[0]
                    this.loading = false
                    this.choose_radio_id = res[0].answer[0]
                    this.loading = false
                    var param = {}
                    this.next_id = 5
                    // 储存选择项
                    param.qid = 3
                    param.answer = [5]
                    param.content = ''
                    this.param = param
                })
            }else{
                get_child_question(this.answer.log[this.answer.log.length-1].qid).then(res => {
                    this.currentQ = res
                    this.loading = false
                })
            }
            
            this.answer.log.splice(this.answer.log.length-1,1);
        },
        parentFn(e) {
            this.country.push(e.name);
        },
        go_home: function(){
            this.$router.push('/')
        },
        handleClose(tag) {
            this.country.splice(this.country.indexOf(tag), 1);
        },
    }
}
</script>