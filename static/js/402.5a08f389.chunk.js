"use strict";(self.webpackChunkreact_training_1=self.webpackChunkreact_training_1||[]).push([[402],{3402:function(s,e,r){r.r(e),r.d(e,{AddMessageFormRedux:function(){return L},default:function(){return K}});var n=r(2791),i=r(8687),a=r(704),t=r(2847),o=r(3079),d=r(5956),l=r(1523),u="Dialogs_dialogs__Chnkj",c="Dialogs_dialogsItemsWrapper__Coa82",g="Dialogs_dialogsItems__z1e36",h="Dialogs_active__c-9aL",f="Dialogs_dialog__GyEkq",m="Dialogs_messagesWrapper__+3yyH",x="Dialogs_messages__lqNfK",p="Dialogs_message__bEAwF",v="Dialogs_messageInformation__hZFJt",j="Dialogs_sanderName__JzyA2",_="Dialogs_messageBody__3jr4x",y="Dialogs_messageBodyOfSender__fHEwo",I=r(4353),w=r(184),N=function(s){var e=(0,i.I0)();return(0,w.jsx)("div",{className:f+" "+h,children:(0,w.jsx)(l.OL,{onClick:function(){e((0,t.CB)(s.id))},to:"/dialogs/"+s.id+"/messages",children:(0,w.jsxs)("div",{children:[s.photo?(0,w.jsx)("img",{src:s.photo,alt:"userPhoto",style:{width:"35px",borderRadius:"50%"}}):(0,w.jsx)("img",{src:I,alt:"userPhoto",width:"35px"}),(0,w.jsxs)("span",{children:[" ",s.name]})]})})})},D=r(1413),b=r(5987),Z=r(9271),P=["isAuth"],A=function(s){return{isAuth:s.auth.isAuth}};var H,M=function(s){return s.dialogsPage},k=r(5861),C=r(9439),E=r(4687),S=r.n(E),F=r(2381),R=r(6301),B=r(8595),z=r(5466),T=r(4476),W=function(s){var e=s.authorizedUserId,r=s.message,n=s.dialogPhoto,a=(0,i.v9)(T.HH);return(0,w.jsxs)("div",{className:p,children:[(0,w.jsxs)("div",{className:"".concat(e===r.senderId&&v),children:[null!==n&&void 0!==n&&n.small&&e!==r.senderId?(0,w.jsx)("img",{style:{width:"30px",borderRadius:"50%"},src:null===n||void 0===n?void 0:n.small,alt:"userPhoto"}):e===r.senderId?(0,w.jsx)("img",{style:{width:"30px",borderRadius:"50%"},src:a,alt:"userPhoto"}):(0,w.jsx)("img",{style:{width:"30px",borderRadius:"50%"},src:I,alt:"userPhoto"}),(0,w.jsx)("span",{className:j,children:r.senderName})]}),(0,w.jsx)("div",{className:"".concat(e===r.senderId?y:_),children:r.body})]})},q=function(s){var e=s.dialogs,r=s.messages,a=(0,i.I0)(),o=(0,i.v9)(B.DQ),d=(0,Z.UO)(),l=function(s,e){for(var r=0;r<s.length;r++){var n=s[r];for(var i in n)if("id"===i&&n[i].toString()===e.userId)return n}}(e,d),u=(0,n.useRef)(null),c=(0,n.useState)(!0),g=(0,C.Z)(c,2),h=g[0],f=g[1];(0,n.useEffect)((function(){a((0,t.CB)(+d.userId)),o&&a((0,R.om)(o))}),[]),(0,n.useEffect)((function(){var s;h&&(null===(s=u.current)||void 0===s||s.scrollIntoView({behavior:"smooth"}))}),[r]);var p=r.map((function(s){return(0,w.jsx)(W,{authorizedUserId:o,dialogPhoto:null===l||void 0===l?void 0:l.photos,message:s},s.id)})),v=function(){var s=(0,k.Z)(S().mark((function s(e){return S().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:a((0,t.q2)(+d.userId,e.newMessageBody)),a((0,F.mc)("dialogAddMessageForm"));case 2:case"end":return s.stop()}}),s)})));return function(e){return s.apply(this,arguments)}}();return r?(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)("div",{className:m,onScroll:function(s){var e=s.currentTarget;Math.abs(e.scrollHeight-e.scrollTop)-e.clientHeight<300?!h&&f(!0):h&&f(!1)},children:(0,w.jsxs)("div",{className:x,children:[p,(0,w.jsx)("div",{ref:u})]})}),(0,w.jsx)(L,{onSubmit:v})]}):(0,w.jsx)(z.Z,{})},O=r(8686),U=r(9603),G=r(3649),J=(0,o.D)(50),L=(0,a.Z)({form:"dialogAddMessageForm"})((function(s){return(0,w.jsx)("form",{onSubmit:s.handleSubmit,children:(0,w.jsxs)(O.Z,{children:[(0,w.jsx)(U.Z,{span:12,children:(0,w.jsx)("div",{style:{width:"600px",marginTop:"20px",padding:"0 10px"},children:(0,d.Gr)("Enter your message","newMessageBody",[o.C,J],d.gx)})}),(0,w.jsx)(U.Z,{span:12}),(0,w.jsx)(U.Z,{span:12,children:(0,w.jsx)("div",{style:{width:"600px",paddingRight:"10px"},children:(0,w.jsx)(G.Z,{htmlType:"submit",style:{float:"right"},children:"Send"})})})]})})})),K=(H=function(){var s=(0,i.v9)(M),e=s.dialogs,r=s.messages,a=(0,i.I0)();(0,n.useEffect)((function(){a((0,t.MH)())}),[]),(0,n.useEffect)((function(){a((0,t.MH)())}),[r]);var o=e.map((function(s){return(0,w.jsx)(N,{name:s.userName,id:s.id,photo:s.photos.small},s.id)}));return e?(0,w.jsxs)("div",{className:u,children:[(0,w.jsx)("div",{className:c,children:(0,w.jsx)("div",{className:g,children:o})}),(0,w.jsx)("div",{className:x,children:(0,w.jsx)("div",{children:(0,w.jsx)(Z.AW,{path:"/dialogs/:userId/messages",render:function(){return(0,w.jsx)(q,{dialogs:e,messages:r})}})})})]}):(0,w.jsx)(z.Z,{})},(0,i.$j)(A,{})((function(s){var e=s.isAuth,r=(0,b.Z)(s,P);return e?(0,w.jsx)(H,(0,D.Z)({},r)):(0,w.jsx)(Z.l_,{to:"/login"})})))},4476:function(s,e,r){r.d(e,{HH:function(){return i},NF:function(){return t},mW:function(){return a},tM:function(){return n}});var n=function(s){return s.profilePage.profile},i=function(s){var e;return null===(e=s.profilePage.profile)||void 0===e?void 0:e.photos.small},a=function(s){return s.profilePage.status},t=function(s){return s.profilePage.postsData}}}]);
//# sourceMappingURL=402.5a08f389.chunk.js.map