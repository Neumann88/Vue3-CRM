(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0de4e8"],{"84a7":function(e,t,n){"use strict";n.r(t);var a=n("7a23"),l={class:"page-title"},c={class:"switch"},i=Object(a["f"])(" Eng "),r=Object(a["g"])("span",{class:"lever"},null,-1),u=Object(a["f"])(" Rus "),o={class:"input-field"},b={for:"name"},s={class:"input-field"},d={for:"bill"},m={class:"btn waves-effect  blue darken-1",type:"submit"},j=Object(a["g"])("i",{class:"material-icons right"},"send",-1);function O(e,t,n,O,f,p){var g=this,h=Object(a["x"])("Field"),v=Object(a["x"])("ErrorMessage"),S=Object(a["x"])("Form");return Object(a["s"])(),Object(a["d"])("div",null,[Object(a["g"])("div",l,[Object(a["g"])("h3",null,Object(a["A"])(this.$locale("ProfileTitle")),1),Object(a["g"])("div",c,[Object(a["g"])("label",null,[i,Object(a["K"])(Object(a["g"])("input",{type:"checkbox","onUpdate:modelValue":t[1]||(t[1]=function(e){return f.isRu=e})},null,512),[[a["D"],f.isRu]]),r,u])])]),Object(a["g"])(S,{class:"form",onSubmit:p.onSubmit,"validation-schema":f.schema},{default:Object(a["J"])((function(){return[Object(a["g"])("div",o,[Object(a["g"])("label",b,Object(a["A"])(g.$locale("Message_EnterName")),1),Object(a["g"])(h,{id:"name",name:"name",type:"text",modelValue:f.nameStart,"onUpdate:modelValue":t[2]||(t[2]=function(e){return f.nameStart=e})},null,8,["modelValue"]),Object(a["g"])(v,{style:{color:"red"},name:"name"})]),Object(a["g"])("div",s,[Object(a["g"])("label",d,Object(a["A"])(g.$locale("Enter_Your_Amount")),1),Object(a["g"])(h,{id:"bill",name:"bill",type:"number",modelValue:f.billStart,"onUpdate:modelValue":t[3]||(t[3]=function(e){return f.billStart=e})},null,8,["modelValue"]),Object(a["g"])(v,{style:{color:"red"},name:"bill"})]),Object(a["g"])("button",m,[Object(a["f"])(Object(a["A"])(g.$locale("Update"))+" ",1),j])]})),_:1},8,["onSubmit","validation-schema"])])}n("b0c0"),n("96cf");var f=n("1da1"),p=n("5530"),g=n("7bb1"),h=n("506a"),v=n("5502"),S={name:"Profile",components:{Form:g["c"],Field:g["b"],ErrorMessage:g["a"]},data:function(){return{isRu:!0,nameStart:"",billStart:100,schema:h["b"]().shape({name:h["d"]().required(),bill:h["a"]().min(100).integer().required()})}},computed:Object(p["a"])({},Object(v["c"])(["info"])),mounted:function(){this.nameStart=this.info.name,this.billStart=this.info.bill,this.isRu="ru-RU"===this.info.locale,setTimeout((function(){return window.M.updateTextFields()}),0)},methods:Object(p["a"])(Object(p["a"])({},Object(v["b"])(["updateInfo"])),{},{onSubmit:function(){var e=this;return Object(f["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.updateInfo({name:e.nameStart,bill:e.billStart,locale:e.isRu?"ru-RU":"en-US"});case 3:t.next=7;break;case 5:t.prev=5,t.t0=t["catch"](0);case 7:case"end":return t.stop()}}),t,null,[[0,5]])})))()}})};S.render=O;t["default"]=S}}]);
//# sourceMappingURL=chunk-2d0de4e8.df5b45d9.js.map