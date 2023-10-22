import{w as o,n as b}from"./js/app-059f31b8.js";const c={$default:({type:t})=>`Missing string for \u201C${t}\u201D.`,between:({min:t,max:e})=>`Has to be between ${t} and ${e} inclusive.`,divisible:({divisor:t})=>`Has to be divisible by ${t}.`,hexData:()=>"Has to be in hexadecimal.",hostname:()=>"Has to start with a letter and contain only letters and numbers.",integer:()=>"Has to be an integer.",ip:()=>"Has to be valid IP 4/6 address.",ipWithMask:()=>"Has to contain a valid IP 4/6 address with a mask (CIDR notation).",ips:()=>"Has to contain only valid IP 4/6 addresses, one per line.",ipsWithMasks:()=>"Has to contain only valid IP 4/6 addresses with masks (CIDR notation), one per line.",maxLength:({max:t})=>`Has to have at most ${t} character(s).`,maxValue:({max:t})=>`Has to be at most ${t}.`,minLength:({min:t})=>`Has to have at least ${t} character(s).`,minValue:({min:t})=>`Has to be at least ${t}.`,naturalNumberList:()=>"Has to be a list of natural numbers.",port:()=>"Has to be valid port (1-65535).",required:()=>"Can'n be left empty.",timeWithUnit:()=>"Has to be expressed as time + unit (e.g. 10ms or 443us)."};function p(t){const e=[];return Object.keys(t).filter(n=>!n.startsWith("$")||n==="$each").forEach(n=>{const i=t.$params[n];i?t[n]||e.push((c[n]||c.$default)(i)):e[n]=p(t[n])}),e}var R={computed:{errors(){return p(this.$v)},badNumberRule(){return t=>this.$refs[t]?()=>this.$refs[t].badInput?"Has to be valid number.":!0:!0}}};const g=[{value:"IVSSwitch",text:"IVS Switch"},{value:"LinuxBridge",text:"Linux Bridge"},{value:"OVSBridge",text:"OVS Bridge"},{value:"OVSSwitch",text:"OVS Switch"},{value:"UserSwitch",text:"User Switch"}],T=[{value:"secure",text:"Secure"},{value:"standalone",text:"Standalone"}],V=[{value:"kernel",text:"Kernel"},{value:"user",text:"User"}],A=[{value:"OpenFlow12",text:"OpenFlow 1.2"},{value:"OpenFlow13",text:"OpenFlow 1.3"},{value:"OpenFlow14",text:"OpenFlow 1.4"},{value:"OpenFlow15",text:"OpenFlow 1.5"}],y=[{value:"Controller",text:"OpenFlow Reference Implementation"},{value:"NOX",text:"NOX"},{value:"OVSController",text:"OVS Controller"},{value:"RemoteController",text:"Remote Controller"},{value:"Ryu",text:"Ryu Controller"}],D=[{value:"tcp",text:"TCP"},{value:"ssl",text:"SSL"}],N=[{value:"cfs",text:"CFS"},{value:"rt",text:"RT"}],U=[{value:"debug",text:"Debug"},{value:"info",text:"Info"},{value:"output",text:"Output"},{value:"warning",text:"Warning"},{value:"error",text:"Error"},{value:"critical",text:"Critical"}];function d(t,e){return t[e.value]=e.text,t}const q=y.reduce(d,Object.create(null)),z=g.reduce(d,Object.create(null)),l=t=>{if(Array.isArray(t))return!!t.length;if(t==null)return!1;if(t===!1)return!0;if(t instanceof Date)return!isNaN(t.getTime());if(typeof t=="object"){for(let e in t)return!0;return!1}return!!String(t).length},v=t=>Array.isArray(t)?t.length:typeof t=="object"?Object.keys(t).length:String(t).length,_=(t,e,s)=>typeof t=="function"?t.call(e,s):s[t],h=(t,e)=>o({type:t},s=>!l(s)||e.test(s));var w=Object.freeze(Object.defineProperty({__proto__:null,withParams:o,req:l,len:v,ref:_,regex:h},Symbol.toStringTag,{value:"Module"})),$=(t,e)=>o({type:"between",min:t,max:e},s=>!l(s)||(!/\s/.test(s)||s instanceof Date)&&+t<=+s&&+e>=+s),S=h("integer",/(^[0-9]*$)|(^-[0-9]+$)/);const{req:a,withParams:r}=w,O=t=>/^\d+$/.test(t)&&t>=0&&t<=32,I=t=>/^\d+$/.test(t)&&t>=0&&t<=128,f=t=>/^\d+\.\d+\.\d+\.\d+$/.test(t)&&t.split(".").every(e=>e>=0&&e<=255),m=t=>{if(!/^[a-fA-F0-9:]+$/.test(t))return!1;const e=t.split(":");if(!e.every(i=>i.length<=4))return!1;const s=e.length,n=e.filter(i=>i.length===0).length;return n===0&&s===8||n===1&&s<=8},M=t=>{const[e,s,n]=t.split("/");return n===void 0&&e!=null&&f(e)&&s!=null&&O(s)},H=t=>{const[e,s,n]=t.split("/");return n===void 0&&e!=null&&m(e)&&s!=null&&I(s)},k=t=>f(t)||m(t),x=t=>M(t)||H(t),B=r({type:"hostname"},t=>!a(t)||/^[a-zA-Z][a-zA-Z0-9]*$/.test(t)),E=r({type:"ip"},t=>!a(t)||k(t)),X=r({type:"ipWithMask"},t=>!a(t)||x(t)),Z=r({type:"ipsWithMasks"},t=>!a(t)||t.every(x)),K=r({type:"port"},t=>!a(t)||S(t)&&$(1,65535)(t)),G=r({type:"timeWithUnit"},t=>!a(t)||/^\d+(|m|u)s$/.test(t)),J=t=>r({type:"divisible",divisor:t},e=>!a(e)||e%t===0),Q=r({type:"hexData"},t=>!a(t)||/^[0-9a-fA-F]*$/.test(t)),Y=r({type:"naturalNumberList"},t=>!a(t)||t.every(e=>/^[0-9]+$/.test(e)));var P=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-progress-circular",{staticClass:"loading-spinner",attrs:{size:100,color:"primary",indeterminate:""}})},C=[];const F={name:"LoadingSpinner"},u={};var W=b(F,P,C,!1,L,"4c4a8f86",null,null);function L(t){for(let e in u)this[e]=u[e]}var tt=function(){return W.exports}();export{tt as L,K as a,$ as b,y as c,S as d,R as e,Z as f,g,B as h,E as i,T as j,V as k,v as l,A as m,Y as n,Q as o,D as p,J as q,l as r,N as s,G as t,h as u,z as v,q as w,U as x,X as y};
