import{n as i}from"./js/app-249c9def.js";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-checkbox",{staticClass:"primary--text",attrs:{title:e.state.title,label:e.label,"input-value":e.state.value===!0,indeterminate:e.state.value===void 0,color:e.color,readonly:"","on-icon":"$vuetify.icons.checkboxTrue","off-icon":"$vuetify.icons.checkboxFalse","indeterminate-icon":"$vuetify.icons.checkboxUndefined"},on:{click:e.cycle}})},l=[];const o={props:{value:{type:Boolean,default:void 0},color:{type:String,default:"primary"},label:{type:String,default:""}},data:()=>({states:[{value:void 0,title:"Default"},{value:!0,title:"Enabled"},{value:!1,title:"Disabled"}].map((e,t)=>({...e,index:t}))}),computed:{state(){return this.states.find(({value:e})=>e===this.value)||this.states[0]}},methods:{cycle(){const t=(this.state.index+1)%this.states.length;this.$emit("input",this.states[t].value)}}},n={};var r=i(o,s,l,!1,c,null,null,null);function c(e){for(let t in n)this[t]=n[t]}var d=function(){return r.exports}();export{d as T};
