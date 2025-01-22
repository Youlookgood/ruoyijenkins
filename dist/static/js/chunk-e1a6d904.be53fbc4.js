(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e1a6d904"],{"9f66":function(e,t,a){"use strict";a.r(t);var c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:8}},[a("el-card",{staticStyle:{height:"calc(100vh - 125px)"}},[a("div",{attrs:{slot:"header"},slot:"header"},[a("span",[a("i",{staticClass:"el-icon-collection"}),e._v(" 缓存列表")]),a("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text",icon:"el-icon-refresh-right"},on:{click:function(t){return e.refreshCacheNames()}}})],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.cacheNames,height:e.tableHeight,"highlight-current-row":""},on:{"row-click":e.getCacheKeys}},[a("el-table-column",{attrs:{label:"序号",width:"60",type:"index"}}),a("el-table-column",{attrs:{label:"缓存名称",align:"center",prop:"cacheName","show-overflow-tooltip":!0,formatter:e.nameFormatter}}),a("el-table-column",{attrs:{label:"备注",align:"center",prop:"remark","show-overflow-tooltip":!0}}),a("el-table-column",{attrs:{label:"操作",width:"60",align:"center","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"text",icon:"el-icon-delete"},on:{click:function(a){return e.handleClearCacheName(t.row)}}})]}}])})],1)],1)],1),a("el-col",{attrs:{span:8}},[a("el-card",{staticStyle:{height:"calc(100vh - 125px)"}},[a("div",{attrs:{slot:"header"},slot:"header"},[a("span",[a("i",{staticClass:"el-icon-key"}),e._v(" 键名列表")]),a("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text",icon:"el-icon-refresh-right"},on:{click:function(t){return e.refreshCacheKeys()}}})],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.subLoading,expression:"subLoading"}],staticStyle:{width:"100%"},attrs:{data:e.cacheKeys,height:e.tableHeight,"highlight-current-row":""},on:{"row-click":e.handleCacheValue}},[a("el-table-column",{attrs:{label:"序号",width:"60",type:"index"}}),a("el-table-column",{attrs:{label:"缓存键名",align:"center","show-overflow-tooltip":!0,formatter:e.keyFormatter}}),a("el-table-column",{attrs:{label:"操作",width:"60",align:"center","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"text",icon:"el-icon-delete"},on:{click:function(a){return e.handleClearCacheKey(t.row)}}})]}}])})],1)],1)],1),a("el-col",{attrs:{span:8}},[a("el-card",{staticStyle:{height:"calc(100vh - 125px)"},attrs:{bordered:!1}},[a("div",{attrs:{slot:"header"},slot:"header"},[a("span",[a("i",{staticClass:"el-icon-document"}),e._v(" 缓存内容")]),a("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text",icon:"el-icon-refresh-right"},on:{click:function(t){return e.handleClearCacheAll()}}},[e._v("清理全部")])],1),a("el-form",{attrs:{model:e.cacheForm}},[a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{offset:1,span:22}},[a("el-form-item",{attrs:{label:"缓存名称:",prop:"cacheName"}},[a("el-input",{attrs:{readOnly:!0},model:{value:e.cacheForm.cacheName,callback:function(t){e.$set(e.cacheForm,"cacheName",t)},expression:"cacheForm.cacheName"}})],1)],1),a("el-col",{attrs:{offset:1,span:22}},[a("el-form-item",{attrs:{label:"缓存键名:",prop:"cacheKey"}},[a("el-input",{attrs:{readOnly:!0},model:{value:e.cacheForm.cacheKey,callback:function(t){e.$set(e.cacheForm,"cacheKey",t)},expression:"cacheForm.cacheKey"}})],1)],1),a("el-col",{attrs:{offset:1,span:22}},[a("el-form-item",{attrs:{label:"缓存内容:",prop:"cacheValue"}},[a("el-input",{attrs:{type:"textarea",rows:8,readOnly:!0},model:{value:e.cacheForm.cacheValue,callback:function(t){e.$set(e.cacheForm,"cacheValue",t)},expression:"cacheForm.cacheValue"}})],1)],1)],1)],1)],1)],1)],1)],1)},n=[],r=(a("dda1"),a("d013"),a("ceee")),l={name:"CacheList",data:function(){return{cacheNames:[],cacheKeys:[],cacheForm:{},loading:!0,subLoading:!1,nowCacheName:"",tableHeight:window.innerHeight-200}},created:function(){this.getCacheNames()},methods:{getCacheNames:function(){var e=this;this.loading=!0,Object(r["g"])().then((function(t){e.cacheNames=t.data,e.loading=!1}))},refreshCacheNames:function(){this.getCacheNames(),this.$modal.msgSuccess("刷新缓存列表成功")},handleClearCacheName:function(e){var t=this;Object(r["c"])(e.cacheName).then((function(a){t.$modal.msgSuccess("清理缓存名称["+e.cacheName+"]成功"),t.getCacheKeys()}))},getCacheKeys:function(e){var t=this,a=void 0!==e?e.cacheName:this.nowCacheName;""!==a&&(this.subLoading=!0,Object(r["f"])(a).then((function(e){t.cacheKeys=e.data,t.subLoading=!1,t.nowCacheName=a})))},refreshCacheKeys:function(){this.getCacheKeys(),this.$modal.msgSuccess("刷新键名列表成功")},handleClearCacheKey:function(e){var t=this;Object(r["b"])(e).then((function(a){t.$modal.msgSuccess("清理缓存键名["+e+"]成功"),t.getCacheKeys()}))},nameFormatter:function(e){return e.cacheName.replace(":","")},keyFormatter:function(e){return e.replace(this.nowCacheName,"")},handleCacheValue:function(e){var t=this;Object(r["e"])(this.nowCacheName,e).then((function(e){t.cacheForm=e.data}))},handleClearCacheAll:function(){var e=this;Object(r["a"])().then((function(t){e.$modal.msgSuccess("清理全部缓存成功")}))}}},o=l,i=a("1805"),s=Object(i["a"])(o,c,n,!1,null,null,null);t["default"]=s.exports},ceee:function(e,t,a){"use strict";a.d(t,"d",(function(){return n})),a.d(t,"g",(function(){return r})),a.d(t,"f",(function(){return l})),a.d(t,"e",(function(){return o})),a.d(t,"c",(function(){return i})),a.d(t,"b",(function(){return s})),a.d(t,"a",(function(){return h}));var c=a("b775");function n(){return Object(c["a"])({url:"/monitor/cache",method:"get"})}function r(){return Object(c["a"])({url:"/monitor/cache/getNames",method:"get"})}function l(e){return Object(c["a"])({url:"/monitor/cache/getKeys/"+e,method:"get"})}function o(e,t){return Object(c["a"])({url:"/monitor/cache/getValue/"+e+"/"+t,method:"get"})}function i(e){return Object(c["a"])({url:"/monitor/cache/clearCacheName/"+e,method:"delete"})}function s(e){return Object(c["a"])({url:"/monitor/cache/clearCacheKey/"+e,method:"delete"})}function h(){return Object(c["a"])({url:"/monitor/cache/clearCacheAll",method:"delete"})}}}]);