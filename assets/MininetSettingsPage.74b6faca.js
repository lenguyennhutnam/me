import{L as i,e as l,x as o,a as c,y as p}from"./LoadingSpinner.c9a8a2f8.js";import{T as m}from"./ThreeStateCheckbox.e39f24fd.js";import{m as u,n as v}from"./js/app-fb0dc478.js";var x=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-container",{attrs:{"grid-list-md":""}},[t.loading!==!1?e("LoadingSpinner"):[e("v-layout",{attrs:{wrap:""}},[e("v-flex",{class:{"pr-4":t.$vuetify.breakpoint.lgAndUp},attrs:{xs12:"",lg6:""}},[e("v-layout",{attrs:{wrap:""}},[e("v-flex",{attrs:{xs12:""}},[e("v-text-field",{attrs:{clearable:"","data-cy":"mininet-settings-project-name",label:"Project Name"},model:{value:t.projectName,callback:function(a){t.projectName=a},expression:"projectName"}})],1),e("v-flex",{attrs:{xs12:"","data-cy":"mininet-settings-log-level"}},[e("v-select",{attrs:{items:t.logLevels,clearable:"",label:"Log Level"},model:{value:t.logLevel,callback:function(a){t.logLevel=a},expression:"logLevel"}})],1),e("v-flex",{attrs:{xs12:""}},[e("v-text-field",{attrs:{"error-messages":t.errors.ipBase,clearable:"","data-cy":"mininet-settings-ip-base",label:"IP Base"},model:{value:t.ipBase,callback:function(a){t.ipBase=a},expression:"ipBase"}})],1),e("v-flex",{attrs:{xs12:""}},[e("v-text-field",{ref:"listenPortBase",attrs:{rules:[t.badNumberRule("listenPortBase")],"error-messages":t.errors.listenPortBase,clearable:"","data-cy":"mininet-settings-listen-port-base",label:"Base Listening Port",max:"65535",min:"1",type:"number"},model:{value:t.listenPortBase,callback:function(a){t.listenPortBase=t._n(a)},expression:"listenPortBase"}})],1),e("v-flex",{attrs:{xs12:""}},[e("ThreeStateCheckbox",{attrs:{"data-cy":"mininet-settings-auto-set-mac",label:"Automatic MAC Addresses"},model:{value:t.autoSetMAC,callback:function(a){t.autoSetMAC=a},expression:"autoSetMAC"}})],1),e("v-flex",{attrs:{xs12:""}},[e("ThreeStateCheckbox",{attrs:{"data-cy":"mininet-settings-auto-static-arp",label:"Automatic Static ARP"},model:{value:t.autoStaticARP,callback:function(a){t.autoStaticARP=a},expression:"autoStaticARP"}})],1),e("v-flex",{attrs:{xs12:""}},[e("ThreeStateCheckbox",{attrs:{"data-cy":"mininet-settings-in-namespace",label:"In Namespace"},model:{value:t.inNamespace,callback:function(a){t.inNamespace=a},expression:"inNamespace"}})],1),e("v-flex",{attrs:{xs12:""}},[e("ThreeStateCheckbox",{attrs:{"data-cy":"mininet-settings-spawn-terminals",label:"Spawn Terminals"},model:{value:t.spawnTerminals,callback:function(a){t.spawnTerminals=a},expression:"spawnTerminals"}})],1)],1)],1),e("v-flex",{class:{"pl-4":t.$vuetify.breakpoint.lgAndUp},attrs:{xs12:"",lg6:""}},[e("v-layout",{attrs:{wrap:""}},[e("v-flex",{attrs:{xs12:""}},[e("v-textarea",{staticClass:"monospace-input",attrs:{"auto-grow":"",clearable:"","data-cy":"mininet-settings-start-script",label:"Startup Script"},model:{value:t.startScript,callback:function(a){t.startScript=a},expression:"startScript"}})],1),e("v-flex",{attrs:{xs12:""}},[e("v-textarea",{staticClass:"monospace-input",attrs:{"auto-grow":"",clearable:"","data-cy":"mininet-settings-stop-script",label:"Shutdown Script"},model:{value:t.stopScript,callback:function(a){t.stopScript=a},expression:"stopScript"}})],1)],1)],1)],1)]],2)},d=[];function s(t){this.get=function(){return this.data[t]},this.set=function(n){this.$store.commit("topology/setValues",{[t]:n})}}const f={name:"MininetSettiongsPage",components:{LoadingSpinner:i,ThreeStateCheckbox:m},mixins:[l],data:()=>({logLevels:o}),computed:{...u("topology",["data"]),loading(){return this.$store.state.loading},autoSetMAC:new s("autoSetMAC"),autoStaticARP:new s("autoStaticARP"),inNamespace:new s("inNamespace"),ipBase:new s("ipBase"),listenPortBase:new s("listenPortBase"),logLevel:new s("logLevel"),projectName:new s("projectName"),spawnTerminals:new s("spawnTerminals"),startScript:new s("startScript"),stopScript:new s("stopScript")},validations:{listenPortBase:{port:c},ipBase:{ipWithMask:p}}},r={};var g=v(f,x,d,!1,b,null,null,null);function b(t){for(let n in r)this[n]=r[n]}var h=function(){return g.exports}();export{h as default};
