(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0f0bf2"],{"9e4d":function(t,e,c){"use strict";c.r(e);var a=c("7a23");const s=Object(a["I"])("data-v-378e61e8");Object(a["u"])("data-v-378e61e8");const n={class:"container-fluid"},i={class:"row"},l={class:"col"},d={class:"card text-white bg-dark mb-3"},o={class:"card-header list-head d-flex align-items-center justify-content-center"},r=Object(a["h"])("h5",{class:"ml-5 mr-1 mb-0"}," Create new list ",-1),b={class:"row"};Object(a["s"])();const j=s((t,e,c,s,j,O)=>{const p=Object(a["y"])("modal-component"),m=Object(a["y"])("list-component");return Object(a["r"])(),Object(a["e"])("div",n,[Object(a["h"])("div",i,[Object(a["h"])("div",l,[Object(a["h"])("div",d,[Object(a["h"])("div",o,[Object(a["h"])("h2",null,Object(a["B"])(s.state.active.title),1),r,Object(a["h"])(p,{"modal-prop":{name:"list",id:s.state.active._id}},null,8,["modal-prop"])])]),Object(a["h"])("div",b,[(Object(a["r"])(!0),Object(a["e"])(a["a"],null,Object(a["x"])(s.state.list,t=>(Object(a["r"])(),Object(a["e"])(m,{key:t._id,"list-prop":t},null,8,["list-prop"]))),128))])])])])});var O=c("83fc"),p=c("37c0"),m=c("6c02"),u=c("8a4e"),v=c("15c1"),h=c("3524"),w=c("a55d"),f={components:{ListComponent:v["default"],ModalComponent:w["default"]},name:"ActiveBoardPage",setup(){const t=Object(m["c"])(),e=Object(a["v"])({active:Object(a["c"])(()=>O["a"].activeBoard),list:Object(a["c"])(()=>O["a"].lists)});return Object(a["p"])(async()=>{try{await p["a"].getOne(t.params.id),await h["a"].getAll(t.params.id)}catch(e){u["a"].error(e)}}),{state:e}}};f.render=j,f.__scopeId="data-v-378e61e8";e["default"]=f}}]);