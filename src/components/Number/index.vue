<template>
    <div class='wrapper'>
    <div class='clock'>
        <div class='total'>PAGE VIEWS:</div>
        <div class='digit' data-number='0' v-for="count in today.length" v-bind:key="count">
            <svg class='digit__svg' viewbox='0 0 25 50' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path d='M0,0 L25,0 L25,25 L25,50 L0,50 L0,17.4 L0,0'></path>
            </svg>
        </div>
        <!-- <div class='digit' data-number='0'>
            <svg class='digit__svg' viewbox='0 0 50 100' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path d='M0,0 L50,0 L50,50 L50,100 L0,100 L0,25 L0,0'></path>
            </svg>
        </div>
        <div class='digit' data-number='0'>
            <svg class='digit__svg' viewbox='0 0 50 100' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path d='M0,0 L50,0 L50,50 L50,100 L0,100 L0,25 L0,0'></path>
            </svg>
        </div>
        <div class='digit' data-number='0'>
            <svg class='digit__svg' viewbox='0 0 50 100' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path d='M0,0 L50,0 L50,50 L50,100 L0,100 L0,25 L0,0'></path>
            </svg>
        </div>
        <div class='digit' data-number='0'>
            <svg class='digit__svg' viewbox='0 0 50 100' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path d='M0,0 L50,0 L50,50 L50,100 L0,100 L0,25 L0,0'></path>
            </svg>
        </div>
        <div class='digit' data-number='0'>
            <svg class='digit__svg' viewbox='0 0 50 100' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path d='M0,0 L50,0 L50,50 L50,100 L0,100 L0,25 L0,0'></path>
            </svg>
        </div> -->
    </div>
    </div>
</template>

<script>
import { visitData } from '../../api/index'
export default {
    data() {
        return{
            numbers: [
                'M0,0 L25,0 L25,25 L25,50 L0,50 L0,12.5 L0,0',
                'M25,0 L25,7.5 L25,15 L25,27.5 L25,30 L25,37.5 L25,50',
                'M0,0 L25,0 L25,25 L17.5,25 L0,25 L0,50 L25,50',
                'M0,0 L25,0 L25,50 L0,50 L25,50 L25,25 L0,25',
                'M0,0 L0,25 L25,25 L25,0 L25,17.5 L25,35 L25,50',
                'M25,0 L0,0 L0,25 L12.5,25 L25,25 L25,50 L0,50',
                'M25,0 L0,0 L0,25 L25,25 L25,50 L0,50 L0,25',
                'M0,0 L25,0 L25,10 L25,20 L25,30 L25,50 L25,50',
                'M0,0 L25,0 L25,50 L0,50 L0,0 L0,25 L25,25',
                'M0,50 L25,50 L25,25 L25,0 L0,0 L0,25 L25,25'
            ],
            digit: '',
            timer: '',
            today: '',
            time_numbers: '123422'
        }
    },
    mounted() {
        var _this = this
        this.timer = setInterval(function(){
            visitData().then(res => {
                if(res){
                    _this.$emit('Eva_value', res.evaluation_num)
                    _this.today = String(res.total)
                }
            })
            _this.setTime(_this.today,_this)
        }, 1000);
    },
    methods: {
        setTime(today,_this) {
            var digit = document.getElementsByClassName('digit');
            
            digit.forEach(function(item,index) {
                if (item.dataset.number !== today.charAt(index)) {
                item.dataset.number = today.charAt(index);
                _this.morphDigit(item.querySelector('path'), _this.numbers[today.charAt(index)]);
                }
            });
        },   
        morphDigit(digit, numberPath) {
            this.$anime({
                targets: digit,
                d: [
                { value: numberPath }
                ],
                easing: 'easeInOutExpo',
                duration: 800
            });
        }
    },
    beforeDestroy() {
        if(this.timer) {
            clearInterval(this.timer);
        }
    }
}
</script>