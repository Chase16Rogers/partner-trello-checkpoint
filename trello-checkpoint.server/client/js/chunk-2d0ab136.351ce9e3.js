(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ab136"],{1474:function(c,e,t){"use strict";t.r(e);var a=t("7a23");const o=Object(a["I"])("data-v-cb3c309e");Object(a["u"])("data-v-cb3c309e");const b={class:"container"},r={class:"row"},d={class:"col text-light"},s={class:"card bg-dark mt-5"},n={class:"card-body d-flex align-items-center"},l=Object(a["h"])("h2",null,"Create a new Board",-1),j={class:"row mt-3"};Object(a["s"])();const O=o((c,e,t,o,O,p)=>{const i=Object(a["y"])("modal-component"),u=Object(a["y"])("boards-component");return Object(a["r"])(),Object(a["e"])("div",b,[Object(a["h"])("div",r,[Object(a["h"])("div",d,[Object(a["h"])("div",s,[Object(a["h"])("div",n,[l,Object(a["h"])(i,{"modal-prop":{name:"board",id:"board"}})])])])]),Object(a["h"])("div",j,[(Object(a["r"])(!0),Object(a["e"])(a["a"],null,Object(a["x"])(o.state.boards,c=>(Object(a["r"])(),Object(a["e"])(u,{key:c._id,"board-prop":c},null,8,["board-prop"]))),128))])])});var p=t("8a4e"),i=t("37c0"),u=t("83fc"),h=t("a55d"),v={components:{ModalComponent:h["default"]},setup(){const c=Object(a["v"])({boards:Object(a["c"])(()=>u["a"].boards)});return Object(a["p"])(async()=>{try{await i["a"].getAll()}catch(c){p["a"].error(c)}}),{state:c}}};v.render=O,v.__scopeId="data-v-cb3c309e";e["default"]=v}}]);