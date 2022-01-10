<!--国际区号-->
<template>
	<div id="quhao">
		<span class="couns" v-show="!isShow"  @click.stop="isShow=!isShow">{{ctr}}</span>
		<input class="couns" type="text" v-show="isShow" @click.stop="1324" placeholder="input your regions to search" v-model="vmd" @keyup="search"/>
		<ul v-show="isShow" id="search" name="phone">
			<template v-if="quhao.length>0">
				<li v-for='(n,index) in quhao' :key='index' :class="n.quhaos" @click.stop="getQuhaos(n.quhaos+n.label)">{{n.label}} +{{n.quhaos}}</li>
			</template>
			<template v-else>
				<li>none</li>
			</template>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				isShow:false,
				ctr:'please select your regions',
				vmd:'',
				quhao:[],
				arrs:[
					{label:"(China)",quhaos:"86"},
					{label:"(Hong Kong)",quhaos:"852"},
					{label:"(Macau)",quhaos:"853"},
					{label:"(Taiwan)",quhaos:"886"},
					{label:"(Japan)",quhaos:"81"},
					{label:"(South Korea)",quhaos:"82"},
					{label:"(USA or Canada)",quhaos:"1"},
					{label:"(Afghanistan)",quhaos:"93"},
					{label:"(Albania)",quhaos:"355"},
					{label:"(Algeria)",quhaos:"213"},
					{label:"(American Samoa)",quhaos:"684"},
					{label:"(Andorra)",quhaos:"376"},
					{label:"(Angola)",quhaos:"244"},
					{label:"(Anguilla)",quhaos:"1264"},
					{label:"(Antarctica)",quhaos:"672"},
					{label:"(Antigua and Barbuda)",quhaos:"1268"},
					{label:"(Argentina)",quhaos:"54"},
					{label:"(Armenia)",quhaos:"374"},
					{label:"(Aruba)",quhaos:"297"},
					{label:"(Australia)",quhaos:"61"},
					{label:"(Austria)",quhaos:"43"},
					{label:"(Azerbaijan)",quhaos:"994"},
					{label:"(Bahamas)",quhaos:"1242"},
					{label:"(Bahrain)",quhaos:"973"},
					{label:"(Bangladesh)",quhaos:"880"},
					{label:"(Barbados)",quhaos:"1246"},
					{label:"(Belarus)",quhaos:"375"},
					{label:"(Belgium)",quhaos:"32"},
					{label:"(Belize)",quhaos:"501"},
					{label:"(Benin)",quhaos:"229"},
					{label:"(Bermuda)",quhaos:"1441"},
					{label:"(Bhutan)",quhaos:"975"},
					{label:"(Bolivia)",quhaos:"591"},
					{label:"(Bosnia and Herzegovina)",quhaos:"387"},
					{label:"(Botswana)",quhaos:"267"},
					{label:"(Brazil)",quhaos:"55"},
					{label:"(British Indian Ocean Territory)",quhaos:"246"},
					{label:"(Brunei Darussalam)",quhaos:"673"},
					{label:"(Bulgaria)",quhaos:"359"},
					{label:"(Burkina Faso)",quhaos:"226"},
					{label:"(Burundi)",quhaos:"257"},
					{label:"(Cambodia)",quhaos:"855"},
					{label:"(Cameroon)",quhaos:"237"},
					{label:"(Cape Verde)",quhaos:"238"},
					{label:"(Cayman Islands)",quhaos:"1345"},
					{label:"(Central African Republic)",quhaos:"236"},
					{label:"(Chad)",quhaos:"235"},
					{label:"(Chile)",quhaos:"56"},
					{label:"(Christmas Island)",quhaos:"61"},
					{label:"(Cocos (Keeling) Islands)",quhaos:"61"},
					{label:"(Colombia)",quhaos:"57"},
					{label:"(Comoros)",quhaos:"269"},
					{label:"(Congo)",quhaos:"242"},
					{label:"(Congo,The Democratic Republic Of The)",quhaos:"243"},
					{label:"(Cook Islands)",quhaos:"682"},
					{label:"(Costa Rica)",quhaos:"506"},
					{label:"(Cote D Ivoire)",quhaos:"225"},
					{label:"(Croatia)",quhaos:"385"},
					{label:"(Cuba)",quhaos:"53"},
					{label:"(Cyprus)",quhaos:"357"},
					{label:"(Czech Republic)",quhaos:"420"},
					{label:"(Denmark)",quhaos:"45"},
					{label:"(Djibouti)",quhaos:"253"},
					{label:"(Dominica)",quhaos:"1767"},
					{label:"(Dominican Republic)",quhaos:"1849"},
					{label:"(East Timor)",quhaos:"670"},
					{label:"(Ecuador)",quhaos:"593"},
					{label:"(Egypt)",quhaos:"20"},
					{label:"(El Salvador)",quhaos:"503"},
					{label:"(Equatorial Guinea)",quhaos:"240"},
					{label:"(Estonia)",quhaos:"372"},
					{label:"(Ethiopia)",quhaos:"251"},
					{label:"(Falkland Islands (Malvinas))",quhaos:"500"},
					{label:"(Faroe Islands)",quhaos:"298"},
					{label:"(Fiji)",quhaos:"679"},
					{label:"(Finland)",quhaos:"358"},
					{label:"(France)",quhaos:"33"},
					{label:"(France Metropolitan)",quhaos:"33"},
					{label:"(French Guiana)",quhaos:"594"},
					{label:"(French Polynesia)",quhaos:"689"},
					{label:"(Gabon)",quhaos:"241"},
					{label:"(Gambia)",quhaos:"220"},
					{label:"(Georgia)",quhaos:"995"},
					{label:"(Germany)",quhaos:"49"},
					{label:"(Ghana)",quhaos:"233"},
					{label:"(Gibraltar)",quhaos:"350"},
					{label:"(Greece)",quhaos:"30"},
					{label:"(Greenland)",quhaos:"45"},
					{label:"(Grenada)",quhaos:"1473"},
					{label:"(Guadeloupe)",quhaos:"590"},
					{label:"(Guam)",quhaos:"1671"},
					{label:"(Guatemala)",quhaos:"502"},
					{label:"(Guinea)",quhaos:"224"},
					{label:"(Guinea-Bissau)",quhaos:"245"},
					{label:"(Guyana)",quhaos:"592"},
					{label:"(Haiti)",quhaos:"509"},
					{label:"(Honduras)",quhaos:"504"},
					{label:"(Hungary)",quhaos:"36"},
					{label:"(Iceland)",quhaos:"354"},
					{label:"(India)",quhaos:"91"},
					{label:"(Indonesia)",quhaos:"62"},
					{label:"(Iran (Islamic Republic of))",quhaos:"98"},
					{label:"(Iraq)",quhaos:"964"},
					{label:"(Ireland)",quhaos:"353"},
					{label:"(Israel)",quhaos:"972"},
					{label:"(Italy)",quhaos:"39"},
					{label:"(Jamaica)",quhaos:"1876"},
					{label:"(Jordan)",quhaos:"962"},
					{label:"(Kazakhstan)",quhaos:"7"},
					{label:"(Kenya)",quhaos:"254"},
					{label:"(Kuwait)",quhaos:"965"},
					{label:"(Kyrgyzstan)",quhaos:"996"},
					{label:"(Latvia)",quhaos:"371"},
					{label:"(Lebanon)",quhaos:"961"},
					{label:"(Lesotho)",quhaos:"266"},
					{label:"(Liberia)",quhaos:"231"},
					{label:"(Libyan Arab Jamahiriya)",quhaos:"218"},
					{label:"(Liechtenstein)",quhaos:"423"},
					{label:"(Lithuania)",quhaos:"370"},
					{label:"(Luxembourg)",quhaos:"352"},
					{label:"(Madagascar)",quhaos:"261"},
					{label:"(Malawi)",quhaos:"265"},
					{label:"(Malaysia)",quhaos:"60"},
					{label:"(Maldives)",quhaos:"960"},
					{label:"(Mali)",quhaos:"223"},
					{label:"(Malta)",quhaos:"356"},
					{label:"(Martinique)",quhaos:"596"},
					{label:"(Mauritania)",quhaos:"222"},
					{label:"(Mauritius)",quhaos:"230"},
					{label:"(Mayotte)",quhaos:"262"},
					{label:"(Mexico)",quhaos:"52"},
					{label:"(Micronesia)",quhaos:"691"},
					{label:"(Moldova)",quhaos:"373"},
					{label:"(Monaco)",quhaos:"377"},
					{label:"(Mongolia)",quhaos:"976"},
					{label:"(Montenegro)",quhaos:"382"},
					{label:"(Montserrat)",quhaos:"1664"},
					{label:"(Morocco)",quhaos:"212"},
					{label:"(Mozambique)",quhaos:"258"},
					{label:"(Myanmar)",quhaos:"95"},
					{label:"(Namibia)",quhaos:"264"},
					{label:"(Nauru)",quhaos:"674"},
					{label:"(Nepal)",quhaos:"977"},
					{label:"(Netherlands)",quhaos:"31"},
					{label:"(Netherlands Antilles)",quhaos:"599"},
					{label:"(New Caledonia)",quhaos:"687"},
					{label:"(New Zealand)",quhaos:"64"},
					{label:"(Nicaragua)",quhaos:"505"},
					{label:"(Niger)",quhaos:"227"},
					{label:"(Nigeria)",quhaos:"234"},
					{label:"(Norfolk Island)",quhaos:"6723"},
					{label:"(North Korea)",quhaos:"850"},
					{label:"(Northern Mariana Islands)",quhaos:"1670"},
					{label:"(Norway)",quhaos:"47"},
					{label:"(Oman)",quhaos:"968"},
					{label:"(Pakistan)",quhaos:"92"},
					{label:"(Palau)",quhaos:"680"},
					{label:"(Palestine)",quhaos:"970"},
					{label:"(Panama)",quhaos:"507"},
					{label:"(Papua New Guinea)",quhaos:"675"},
					{label:"(Paraguay)",quhaos:"595"},
					{label:"(Peru)",quhaos:"51"},
					{label:"(Philippines)",quhaos:"63"},
					{label:"(Pitcairn)",quhaos:"64"},
					{label:"(Poland)",quhaos:"48"},
					{label:"(Portugal)",quhaos:"351"},
					{label:"(Puerto Rico)",quhaos:"1787"},
					{label:"(Qatar)",quhaos:"974"},
					{label:"(Reunion)",quhaos:"262"},
					{label:"(Romania)",quhaos:"40"},
					{label:"(Russian Federation)",quhaos:"7"},
					{label:"(Rwanda)",quhaos:"250"},
					{label:"(Samoa)",quhaos:"685"},
					{label:"(San Marino)",quhaos:"378"},
					{label:"(Saudi Arabia)",quhaos:"966"},
					{label:"(Senegal)",quhaos:"221"},
					{label:"(Serbia)",quhaos:"381"},
					{label:"(Seychelles)",quhaos:"248"},
					{label:"(Sierra Leone)",quhaos:"232"},
					{label:"(Singapore)",quhaos:"65"},
					{label:"(Slovakia (Slovak Republic))",quhaos:"421"},
					{label:"(Slovenia)",quhaos:"386"},
					{label:"(Solomon Islands)",quhaos:"677"},
					{label:"(Somalia)",quhaos:"252"},
					{label:"(South Africa)",quhaos:"27"},
					{label:"(Spain)",quhaos:"34"},
					{label:"(Sri Lanka)",quhaos:"94"},
					{label:"(Sudan)",quhaos:"249"},
					{label:"(Suriname)",quhaos:"597"},
					{label:"(Swaziland)",quhaos:"268"},
					{label:"(Sweden)",quhaos:"46"},
					{label:"(Switzerland)",quhaos:"41"},
					{label:"(Syrian Arab Republic)",quhaos:"963"},
					{label:"(Tajikistan)",quhaos:"992"},
					{label:"(Tanzania)",quhaos:"255"},
					{label:"(Thailand)",quhaos:"66"},
					{label:"(Togo)",quhaos:"228"},
					{label:"(Tonga)",quhaos:"676"},
					{label:"(Trinidad and Tobago)",quhaos:"1868"},
					{label:"(Tunisia)",quhaos:"216"},
					{label:"(Turkey)",quhaos:"90"},
					{label:"(Turkmenistan)",quhaos:"993"},
					{label:"(Turks and Caicos Islands)",quhaos:"1809"},
					{label:"(Uganda)",quhaos:"256"},
					{label:"(Ukraine)",quhaos:"380"},
					{label:"(United Arab Emirates)",quhaos:"971"},
					{label:"(United Kingdom)",quhaos:"44"},
					{label:"(Uruguay)",quhaos:"598"},
					{label:"(Uzbekistan)",quhaos:"998"},
					{label:"(Vanuatu)",quhaos:"678"},
					{label:"(Vatican City State (Holy See))",quhaos:"39"},
					{label:"(Venezuela)",quhaos:"58"},
					{label:"(Vietnam)",quhaos:"84"},
					{label:"(Virgin Islands (British))",quhaos:"1284"},
					{label:"(Virgin Islands (U.S.))",quhaos:"1340"},
					{label:"(Western Sahara)",quhaos:"685"},
					{label:"(Yemen)",quhaos:"967"},
					{label:"(Yugoslavia)",quhaos:"381"},
					{label:"(Zambia)",quhaos:"260"},
					{label:"(Zimbabwe)",quhaos:"263"},
					{label:"(the Republic of Abkhazia)",quhaos:"7"},
					{label:"(the Republic of South Ossetia)",quhaos:"7"},
					{label:"(Bailiwick of Jersey)",quhaos:"44"},
					{label:"(Lao People s Democratic Republic)",quhaos:"856"},
					{label:"(The Republic of Macedonia)",quhaos:"389"},
					{label:"(The Federation of Saint Kitts and Nevis)",quhaos:"1869"},
					{label:"(Santa Luzia Island)",quhaos:"1758"},
					{label:"(Saint Vincent and the Grenadines)",quhaos:"1784"},
					{label:"(Sao Tome and Principe)",quhaos:"239"},
					{label:"(The Republic of South Sudan)",quhaos:"211"}]
			}
		},
		methods:{
        getSrcList(){
        this.isShow=false;
            this.vmd = '';
            this.quhao = this.arrs
        },
//			改变时获取区号和国籍
			getQuhaos:function(e){
				this.quhao = this.arrs
                this.ctr = e.replace(/[0-9]/ig,"");//正则匹配
                this.ctr = this.ctr.replace(/\(|\)/g,'');//正则匹配
				this.isShow =false;
				this.$emit('childFn',{ name:this.ctr,quhao:this.quhao})//向父组件传值
			},
//			键盘事件
			search:function(){
				this.quhao = [];//清空渲染的国籍数组
				var country = '';//国籍
				var num = '';//区号
				for( var keys in this.arrs){
					country = this.arrs[keys].label.toUpperCase();
					num = this.arrs[keys].quhaos;
					if(country.indexOf(this.vmd.toUpperCase())!=-1 || num.indexOf(this.vmd)!=-1){//判断输入的值跟区号和国家是否匹配
						this.quhao.push(this.arrs[keys])//匹配合适时往渲染的国籍数组添加
					}
				}
			}
		},
		created(){
			this.quhao = this.arrs//渲染的国籍数组初始化
		},
		mounted(){
			window.addEventListener('click',this.getSrcList)//添加监听事件
		}
	}
</script>

<style scoped="scoped">
	#quhao{
		position: relative;
		text-align: left;
	}
	.couns{
		display: block;
		width: 100%;
		line-height: 40px;
		border-radius: 4px;
		color: #000;
		background: url(/../../static/select.png) no-repeat right center;
        background-color: #fff;
        border: 1px solid #EAEAEA;
		text-indent: 8px;
		cursor: pointer;
		/*overflow: hidden;*/
    white-space: nowrap;
    /*text-overflow: ellipsis;*/
	}
	#search{
    width: 380px;
    line-height: 30px;
    border-radius: 2px;
    font-size: 14px;
    background-color: #fff;
    border: 1px solid #EAEAEA;
    position: absolute;
    top: 45px;
    cursor: pointer;
    z-index: 888;
    max-height: 275px;
    overflow: auto;
	}
	#search li:hover{
		background-color: white;
		color: #0090FF;
	}
	/*自定义滚动条*/
	::-webkit-scrollbar {  
  width: 14px;  
  height: 14px;  
}
ul{
    list-style: none;
}
  
::-webkit-scrollbar-track,  
::-webkit-scrollbar-thumb {  
  border-radius: 999px;  
  border: 5px solid transparent;  
}  
  
::-webkit-scrollbar-track {  
  box-shadow: 1px 1px 5px rgba(0,0,0,.2) inset;  
}  
  
::-webkit-scrollbar-thumb {  
  min-height: 20px;  
  background-clip: content-box;  
  box-shadow: 0 0 0 5px rgba(0,0,0,.2) inset;  
}  
  
::-webkit-scrollbar-corner {  
  background: transparent;  
} 
</style>