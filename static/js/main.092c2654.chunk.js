(this.webpackJsonpwebim=this.webpackJsonpwebim||[]).push([[0],{251:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),s=t(10),i=t.n(s),o=t(15),c=t(304),l=t(294),u=t(303),d=t(295),m=t(289),p=t(292),b=t(60),j=t(61),h=t(112),x=t(55),g=t.n(x),O=t(12),f=t(6),v=Object(m.a)((function(e){return{container:{maxWidth:"500px",boxShadow:"0px 0px 8px 0px rgba(34, 60, 80, 0.2)"},typography:{marginTop:"20px"},paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2),marginBottom:"40px"}}})),w=j.a().shape({username:j.b().required("\u041f\u043e\u043b\u0435 username \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u0434\u043b\u044f \u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f"),password:j.b().required("\u041f\u043e\u043b\u0435 password \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u0434\u043b\u044f \u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,"\u041f\u0430\u0440\u043e\u043b\u044c \u0434\u043e\u043b\u0436\u0435\u043d \u0441\u043e\u0441\u0442\u043e\u044f\u0442\u044c \u0438\u0437 \u0446\u0438\u0444\u0440 \u0438 \u043b\u0430\u0442\u0438\u043d\u0441\u043a\u0438\u0445 \u0431\u0443\u043a\u0432 \u0432\u0435\u0440\u0445\u043d\u0435\u0433\u043e \u0438 \u043d\u0438\u0436\u043d\u0435\u0433\u043e \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430")}),S=function(){var e,a,t=v(),r=Object(b.b)({resolver:Object(h.a)(w)}),s=r.register,i=r.handleSubmit,m=r.errors,j=Object(n.useState)(""),x=Object(o.a)(j,2),S=x[0],C=x[1],y=Object(n.useState)(""),k=Object(o.a)(y,2),N=k[0],T=k[1],I=Object(n.useState)(!1),W=Object(o.a)(I,2),q=W[0],B=W[1];return q?Object(f.jsx)(O.a,{to:"/users"}):Object(f.jsxs)(p.a,{className:t.container,component:"main",maxWidth:"xs",children:[Object(f.jsx)(l.a,{}),Object(f.jsxs)("div",{className:t.paper,children:[Object(f.jsx)(d.a,{className:t.typography,component:"h1",variant:"h5",children:"Sign in"}),Object(f.jsxs)("form",{className:t.form,noValidate:!0,onSubmit:i((function(e,a){a.preventDefault(),g.a.post("https://emphasoft-test-assignment.herokuapp.com/api-token-auth/",{username:S,password:N}).then((function(e){localStorage.setItem("token",e.data.token),200===e.request.status&&B(!0)}))})),children:[Object(f.jsx)(u.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,inputRef:s,id:"username",label:"Username",name:"username",autoComplete:"email",autoFocus:!0,onChange:function(e){C(e.target.value)},value:S,error:!!m.username,helperText:null===m||void 0===m||null===(e=m.username)||void 0===e?void 0:e.message}),Object(f.jsx)(u.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,inputRef:s,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",onChange:function(e){T(e.target.value)},value:N,error:!!m.password,helperText:null===m||void 0===m||null===(a=m.password)||void 0===a?void 0:a.message}),Object(f.jsx)(c.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit,children:"Sign In"})]})]})]})},C=t(8),y=t(298),k=t(302),N=t(301),T=t(297),I=t(299),W=t(300),q=t(296),B=Object(m.a)({tableContainer:{maxWidth:"500px",margin:"0 auto"},table:{width:"auto",tableLayout:"auto",margin:"0 auto",boxShadow:"0px 0px 8px 0px rgba(34, 60, 80, 0.2)",marginBottom:"30px"},button:{left:"50%",transform:"translateX(-50%)",margin:"20px 0px"},idButton:{paddingRight:"15px"},idTableCell:{padding:"0"}}),D=function(){var e=B(),a=Object(n.useState)([]),t=Object(o.a)(a,2),r=t[0],s=t[1],i=Object(n.useState)(""),l=Object(o.a)(i,2),d=l[0],m=l[1];return Object(f.jsxs)(T.a,{className:e.tableContainer,component:q.a,children:[Object(f.jsx)(c.a,{className:e.button,variant:"contained",color:"primary",onClick:function(e){e.preventDefault();var a={headers:{Authorization:"Token "+localStorage.getItem("token")}};g.a.get("https://emphasoft-test-assignment.herokuapp.com/api/v1/users/",a).then((function(e){s(e.data),console.log(e.data)}))},children:"Get users"}),Object(f.jsxs)(y.a,{className:e.table,size:"small","aria-label":"a dense table",children:[Object(f.jsx)(I.a,{children:Object(f.jsxs)(W.a,{children:[Object(f.jsx)(N.a,{className:e.idTableCell,onClick:function(){var e=Object(C.a)(r);e.sort((function(e,a){return e.id-a.id})),s(e)},children:Object(f.jsx)(c.a,{className:e.idButton,color:"primary",children:"ID"})}),Object(f.jsx)(N.a,{align:"left",children:Object(f.jsx)(u.a,{onChange:function(e){m(e.target.value)},id:"outlined-basic",label:"Search...",variant:"outlined"})})]})}),Object(f.jsx)(k.a,{children:r.filter((function(e){return""===d||e.username.toLowerCase().includes(d.toLowerCase())?e:void 0})).map((function(e){return Object(f.jsxs)(W.a,{children:[Object(f.jsx)(N.a,{component:"th",scope:"row",children:e.id}),Object(f.jsx)(N.a,{align:"left",children:e.username})]},e.id)}))})]})]})},z=t(70);var L=function(){return Object(f.jsx)("div",{children:Object(f.jsxs)(z.a,{basename:"/webim",children:[Object(f.jsx)(O.b,{exact:!0,path:"/",component:S}),Object(f.jsx)(O.b,{path:"/users",component:D})]})})};i.a.render(Object(f.jsx)(r.a.StrictMode,{children:Object(f.jsx)(L,{})}),document.getElementById("root"))}},[[251,1,2]]]);
//# sourceMappingURL=main.092c2654.chunk.js.map