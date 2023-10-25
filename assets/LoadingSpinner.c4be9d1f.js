import{n as c}from"./js/app-ebd2c7ed.js";const p=[{value:"IVSSwitch",text:"IVS Switch"},{value:"LinuxBridge",text:"Linux Bridge"},{value:"OVSBridge",text:"OVS Bridge"},{value:"OVSSwitch",text:"OVS Switch"},{value:"UserSwitch",text:"User Switch"}],I=[{value:"secure",text:"Secure"},{value:"standalone",text:"Standalone"}],F=[{value:"kernel",text:"Kernel"},{value:"user",text:"User"}],H=[{value:"OpenFlow12",text:"OpenFlow 1.2"},{value:"OpenFlow13",text:"OpenFlow 1.3"},{value:"OpenFlow14",text:"OpenFlow 1.4"},{value:"OpenFlow15",text:"OpenFlow 1.5"}],d=[{value:"Controller",text:"OpenFlow Reference Implementation"},{value:"NOX",text:"NOX"},{value:"OVSController",text:"OVS Controller"},{value:"RemoteController",text:"Remote Controller"},{value:"Ryu",text:"Ryu Controller"}],$=[{value:"tcp",text:"TCP"},{value:"ssl",text:"SSL"}],C=[{value:"cfs",text:"CFS"},{value:"rt",text:"RT"}],k=[{value:"debug",text:"Debug"},{value:"info",text:"Info"},{value:"output",text:"Output"},{value:"warning",text:"Warning"},{value:"error",text:"Error"},{value:"critical",text:"Critical"}];function o(t,e){return t[e.value]=e.text,t}const M=d.reduce(o,Object.create(null)),L=p.reduce(o,Object.create(null)),f=t=>/^\d+$/.test(t)&&t>=0&&t<=32,m=t=>/^\d+$/.test(t)&&t>=0&&t<=128,r=t=>/^\d+\.\d+\.\d+\.\d+$/.test(t)&&t.split(".").every(e=>e>=0&&e<=255),i=t=>{if(!/^[a-fA-F0-9:]+$/.test(t))return!1;const e=t.split(":");if(!e.every(a=>a.length<=4))return!1;const n=e.length,s=e.filter(a=>a.length===0).length;return s===0&&n===8||s===1&&n<=8},h=t=>{const[e,n,s]=t.split("/");return s===void 0&&e!=null&&r(e)&&n!=null&&f(n)},x=t=>{const[e,n,s]=t.split("/");return s===void 0&&e!=null&&i(e)&&n!=null&&m(n)},y=t=>r(t)||i(t),u=t=>h(t)||x(t),P=(t,e)=>n=>n==null||n===""||typeof n=="number"&&t<=n&&n<=e||`Has to be between ${t} and ${e} inclusive.`,R=()=>t=>t==null||t===""||typeof t=="number"&&Number.isFinite(t)||"Has to be a decimal number.",V=t=>e=>e==null||e===""||typeof e=="number"&&e%t===0||`Has to be divisible by ${t}.`,A=()=>t=>t==null||t===""||typeof t=="string"&&/^[0-9a-fA-F]+$/.test(t)||"Has to be in hexadecimal.",T=()=>t=>t==null||t===""||typeof t=="string"&&/^[a-zA-Z][a-zA-Z0-9]+$/.test(t)||"Has to start with a letter and contain only letters and numbers.",W=()=>t=>t==null||t===""||typeof t=="number"&&t%1===0||"Has to be an integer.",z=()=>t=>t==null||t===""||typeof t=="string"&&u(t)||"Has to contain a valid IP 4/6 address with a mask (CIDR notation).",j=()=>t=>t==null||t===""||typeof t=="string"&&y(t)||"Has to be valid IP 4/6 address.",B=()=>t=>t==null||t===""||Array.isArray(t)&&t.every(e=>u(e))||"Has to contain only valid IP 4/6 addresses with masks (CIDR notation), one per line.",D=t=>e=>e==null||e===""||typeof e=="string"&&e.length<=t||`Has to have at most ${t} character(s).`,N=t=>e=>e==null||e===""||typeof e=="string"&&e.length>=t||`Has to have at least ${t} character(s).`,U=t=>e=>e==null||e===""||typeof e=="number"&&e>=t||`Has to be at least ${t}.`,q=()=>t=>t==null||t===""||Array.isArray(t)&&t.every(e=>/^[0-9]+$/.test(e))||"Has to be a list of natural numbers.",E=()=>t=>t==null||t===""||typeof t=="number"&&t%1===0&&1<=t&&t<=65535||"Has to be valid port (1-65535).",X=()=>t=>t!=null&&t!==""||"Can'n be left empty.",Z=()=>t=>t==null||t===""||typeof t=="string"&&/^\d+(|m|u)s$/.test(t)||"Has to be expressed as time + unit (e.g. 10ms or 443us).";var g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-progress-circular",{staticClass:"loading-spinner",attrs:{size:100,color:"primary",indeterminate:""}})},b=[];const _={name:"LoadingSpinner"},l={};var w=c(_,g,b,!1,S,"4c4a8f86",null,null);function S(t){for(let e in l)this[e]=l[e]}var K=function(){return w.exports}();export{K as L,E as a,P as b,d as c,R as d,W as e,B as f,p as g,T as h,j as i,I as j,F as k,H as l,U as m,q as n,V as o,$ as p,A as q,X as r,C as s,Z as t,D as u,N as v,L as w,M as x,k as y,z};
