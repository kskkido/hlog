(()=>{var ho=Object.create;var it=Object.defineProperty;var To=Object.getOwnPropertyDescriptor;var So=Object.getOwnPropertyNames;var vo=Object.getPrototypeOf,Mo=Object.prototype.hasOwnProperty;var J=t=>it(t,"__esModule",{value:!0});var e=(t=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(t,{get:(r,s)=>(typeof require!="undefined"?require:r)[s]}):t)(function(t){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+t+'" is not supported')});var p=(t,r)=>{J(t);for(var s in r)it(t,s,{get:r[s],enumerable:!0})},wo=(t,r,s)=>{if(r&&typeof r=="object"||typeof r=="function")for(let a of So(r))!Mo.call(t,a)&&a!=="default"&&it(t,a,{get:()=>r[a],enumerable:!(s=To(r,a))||s.enumerable});return t},o=t=>wo(J(it(t!=null?ho(vo(t)):{},"default",t&&t.__esModule&&"default"in t?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);var O=o(e("rxjs"));var E=o(e("rxjs"));var he=o(e("fp-ts/function"));var Bo=o(e("fp-ts/function"));var jo=t=>r=>t;var Lo=t=>r=>s=>r(s)(t(s));var Sp=Lo(jo);var Do=o(e("fp-ts/function")),Q=o(e("fp-ts/Option"));var Io=o(e("fp-ts/function")),Te=o(e("fp-ts/Option"));var R={};p(R,{between:()=>Go,clamp:()=>Bt,degree:()=>Ko,hypotenuse:()=>Yo,lerp:()=>ve,lerpW:()=>Uo,margin:()=>Se,percent:()=>No,radian:()=>$o,range:()=>Xo});var Bt=(t,r,s)=>s>=r?Math.min(Math.max(t,r),s):Bt(t,s,r),No=t=>Bt(100*t,0,100),Yo=(t,r)=>Math.sqrt(Math.pow(t,2)+Math.pow(r,2)),$o=t=>t*(Math.PI/180),Ko=t=>t*180/Math.PI,Se=(t,r)=>r===0?t:-(1-t/r),ve=(t,r,s)=>(1-s)*t+s*r,Uo=(t,r,s)=>a=>ve(t,r,Math.abs(Se(t,r))<a?1:s),Xo=(t,r)=>r>=t?[t,r]:[r,t],Go=t=>r=>t[0]<=r&&r<=t[1];var Jo=o(e("fp-ts/function")),Qo=o(e("fp-ts/Option"));var tr=o(e("fp-ts/function")),Me=o(e("fp-ts/Option"));var we=o(e("fp-ts/Option"));var rr=o(e("fp-ts/function"));var i={};p(i,{action:()=>jt,actionCreator:()=>f,reducer:()=>T,types:()=>Lt});var jt={};p(jt,{noop:()=>nr});var nr={type:"@noop",payload:void 0};var f={};p(f,{from:()=>ar});var ar=t=>r=>Object.assign(s=>({payload:t(s),type:r}),{type:r});var T={};p(T,{combine:()=>mr,from:()=>ir});var ir=(t,r)=>(s=t,a)=>{let m=r[a.type];return m?m(s,a):s},mr=(t,r)=>(s=r,a)=>Object.keys(t).reduce((m,g)=>(m[g]=t[g](s[g],a),m),s);var Lt={};J(Lt);var mt={};p(mt,{empty:()=>lr,types:()=>Ct});var Ct={};J(Ct);var lr={};var b={};p(b,{cursor:()=>Ft,history:()=>Gt,phase:()=>Zt,postFilter:()=>oe,postMetadataRecord:()=>pe,root:()=>nt,scroll:()=>ie,tagFilter:()=>ye,tagMetadataRecord:()=>ue});var Ft={};p(Ft,{actions:()=>kt,reducers:()=>B});var kt={};p(kt,{set:()=>Ht});var je=o(e("fp-ts/function"));var Ht=f.from(je.identity)("cursor/set");var B={};p(B,{initialState:()=>Le,main:()=>cr});var Le=[0,0],cr=T.from(Le,{[Ht.type]:(t,r)=>r.payload});var Gt={};p(Gt,{actions:()=>Dt,reducers:()=>z});var Dt={};p(Dt,{back:()=>Pt,forward:()=>Wt,push:()=>Vt});var lt=o(e("fp-ts/function"));var Vt=f.from(lt.identity)("history/push"),Pt=f.from(lt.identity)("history/back"),Wt=f.from(lt.identity)("history/forward");var z={};p(z,{initialState:()=>so,main:()=>pp});var tt=o(e("io-ts")),Vp=tt.tuple([tt.number,tt.number]);var xr=o(e("fp-ts/function")),Ce=o(e("fp-ts/Array")),Ar=o(e("fp-ts/Option"));var j=o(e("io-ts")),dr=new j.Type("Element",t=>t instanceof HTMLElement,(t,r)=>t instanceof HTMLElement?j.success(t):j.failure(t,r),t=>t);var Tr=o(e("fp-ts/function")),ke=o(e("fp-ts/ReadonlyArray")),Sr=o(e("fp-ts/Option"));var L=o(e("io-ts")),gr=new L.Type("HTMLElement",t=>t instanceof HTMLElement,(t,r)=>t instanceof HTMLElement?L.success(t):L.failure(t,r),t=>t);var Rr=o(e("fp-ts/function")),Fe=o(e("fp-ts/ReadonlyArray")),Br=o(e("fp-ts/Option"));var C=o(e("io-ts")),Mr=new C.Type("HTMLElement",t=>t instanceof HTMLElement,(t,r)=>t instanceof HTMLElement?C.success(t):C.failure(t,r),t=>t);var Fr=o(e("fp-ts/function")),Ve=o(e("fp-ts/ReadonlyArray")),Vr=o(e("fp-ts/Option"));var H=o(e("io-ts")),Hr=new H.Type("HTMLElement",t=>t instanceof HTMLElement,(t,r)=>t instanceof HTMLElement?H.success(t):H.failure(t,r),t=>t);var P={};p(P,{lib:()=>qt,types:()=>It});var qt={};p(qt,{back:()=>qr,forward:()=>Ir,push:()=>_r});var k=o(e("fp-ts/function")),A=o(e("fp-ts/Option")),ct=o(e("fp-ts/ReadonlyArray")),_r=t=>r=>(0,k.pipe)(A.fromNullable(r.present),A.fold(()=>({...r,present:t}),s=>({...r,past:[...r.past,s],present:t}))),qr=t=>(0,k.pipe)(t.past,ct.matchRight(()=>t,(r,s)=>(0,k.pipe)(A.fromNullable(t.present),A.fold(()=>({...t,past:r,present:s}),a=>({past:r,present:s,future:[a,...t.future]}))))),Ir=t=>(0,k.pipe)(t.future,ct.matchLeft(()=>t,(r,s)=>(0,k.pipe)(A.fromNullable(t.present),A.fold(()=>({...t,future:s,present:r}),a=>({past:[...t.past,a],present:r,future:s})))));var It={};p(It,{History:()=>Yr});var u=o(e("io-ts"));var V={};p(V,{Location:()=>Nr});var F=o(e("io-ts")),Nr=F.type({path:F.string,state:F.unknown});var Yr=u.type({past:u.readonlyArray(V.Location),present:u.union([V.Location,u.null]),future:u.readonlyArray(V.Location)});var Ur=o(e("fp-ts/function")),We=o(e("fp-ts/ReadonlyArray")),zt=o(e("fp-ts/Option"));var l=o(e("io-ts")),$r=l.intersection([new l.Type("HTMLElement",t=>t instanceof HTMLElement,(t,r)=>t instanceof HTMLElement?l.success(t):l.failure(t,r),t=>t),l.type({href:l.string})]);var Qr=o(e("fp-ts/function")),_e=o(e("fp-ts/ReadonlyArray")),Zr=o(e("fp-ts/Option"));var W=o(e("io-ts")),Gr=new W.Type("HTMLElement",t=>t instanceof HTMLElement,(t,r)=>t instanceof HTMLElement?W.success(t):W.failure(t,r),t=>t);var rs=o(e("fp-ts/function")),qe=o(e("fp-ts/ReadonlyArray")),ss=o(e("fp-ts/Option"));var D=o(e("io-ts")),es=new D.Type("HTMLElement",t=>t instanceof HTMLElement,(t,r)=>t instanceof HTMLElement?D.success(t):D.failure(t,r),t=>t);var et=o(e("io-ts")),Jp=et.type({clientX:et.number,clientY:et.number});var S=o(e("io-ts")),Qp=S.union([S.literal("preload"),S.literal("intro"),S.literal("main"),S.literal("outro")]);var Os=o(e("fp-ts/function"));var fs=o(e("fp-ts/function")),yt=o(e("fp-ts/Option"));var c=o(e("io-ts")),Ne=o(e("io-ts-types")),cs=c.type({identifier:c.string,title:c.string,author:c.string,date:Ne.date,url:c.string,length:c.number,tags:c.array(c.string)});var ft=o(e("fp-ts/Ord")),en=ft.fromCompare((t,r)=>t.date.getTime()-r.date.getTime()>0?1:-1),on=ft.fromCompare((t,r)=>t.title.localeCompare(r.title)>0?1:-1),rn=ft.fromCompare((t,r)=>t.length-r.length>0?1:-1);var dt={};p(dt,{PostSortType:()=>xs});var _=o(e("io-ts")),xs=_.union([_.literal("date"),_.literal("title"),_.literal("length")]);var As=o(e("fp-ts/function")),bs=o(e("fp-ts/Ord"));var q={};p(q,{OrderType:()=>Es});var ot=o(e("io-ts")),Es=ot.union([ot.literal("ascending"),ot.literal("descending")]);var Ke=o(e("io-ts"));var yn=Ke.type({order:q.OrderType,sort:dt.PostSortType});var Ue=o(e("fp-ts/function")),Yt=o(e("fp-ts/Option")),Xe=o(e("fp-ts/ReadonlyArray"));var y=o(e("io-ts")),Ss=y.type({identifier:y.string,title:y.string,author:y.string,date:y.string,url:y.string,length:y.string,tags:y.array(y.string)});var rt=o(e("io-ts")),un=rt.union([rt.literal("in"),rt.literal("out")]);var ut=o(e("io-ts")),xn=ut.type({y:ut.number});var At={};p(At,{types:()=>$t});var $t={};p($t,{ScrollToEvent:()=>Cs});var xt=o(e("io-ts")),Cs=xt.type({detail:xt.number});var Ds=o(e("fp-ts/function"));var Fs=o(e("fp-ts/function")),bt=o(e("fp-ts/Option"));var v=o(e("io-ts")),Hs=v.type({name:v.string,size:v.number,url:v.string});var Kt=o(e("fp-ts/Ord")),En=Kt.fromCompare((t,r)=>t.name.localeCompare(r.name)>0?1:-1),On=Kt.fromCompare((t,r)=>t.size-r.size>0?1:-1);var Et={};p(Et,{TagSortType:()=>Ws});var st=o(e("io-ts")),Ws=st.union([st.literal("name"),st.literal("size")]);var Qe=o(e("io-ts"));var wn=Qe.type({order:q.OrderType,sort:Et.TagSortType});var Ze=o(e("fp-ts/function")),Ut=o(e("fp-ts/Option")),to=o(e("fp-ts/ReadonlyArray"));var I=o(e("io-ts")),zs=I.type({name:I.string,size:I.string,url:I.string});var Js=o(e("fp-ts/function")),eo=o(e("fp-ts/ReadonlyArray")),Qs=o(e("fp-ts/Option"));var d=o(e("io-ts"));var Ot={};p(Ot,{TransitionTrigger:()=>Ks});var pt=o(e("io-ts")),Ks=pt.union([pt.literal("load"),pt.literal("viewport")]);var Xs=d.intersection([new d.Type("Element",t=>t instanceof Element,(t,r)=>t instanceof Element?d.success(t):d.failure(t,r),t=>t),d.type({dataset:d.type({transition_trigger:Ot.TransitionTrigger})})]);var oo=o(e("fp-ts/Ord")),Cn=oo.fromCompare((t,r)=>t.getBoundingClientRect().top>=r.getBoundingClientRect().top?1:-1);var ht={};p(ht,{types:()=>Xt});var Xt={};p(Xt,{WheelEvent:()=>sp});var gt=o(e("io-ts")),sp=gt.type({wheelDeltaY:gt.number});var so={past:[],present:null,future:[]},pp=i.reducer.from(so,{[Vt.type]:(t,r)=>P.lib.push(r.payload)(t),[Pt.type]:t=>P.lib.back(t),[Wt.type]:t=>P.lib.forward(t)});var Zt={};p(Zt,{actions:()=>Qt,reducers:()=>N});var Qt={};p(Qt,{set:()=>Jt});var po=o(e("fp-ts/function")),Jt=i.actionCreator.from(po.identity)("phase/set");var N={};p(N,{initialState:()=>no,main:()=>np});var no="preload",np=i.reducer.from(no,{[Jt.type]:(t,r)=>r.payload});var oe={};p(oe,{actions:()=>ee,reducers:()=>Y});var ee={};p(ee,{set:()=>te});var ao=o(e("fp-ts/function")),te=i.actionCreator.from(ao.identity)("postFilter/set");var Y={};p(Y,{initialState:()=>io,main:()=>ap});var io={sort:"date",order:"ascending"},ap=i.reducer.from(io,{[te.type]:(t,r)=>r.payload});var pe={};p(pe,{actions:()=>se,reducers:()=>$});var se={};p(se,{set:()=>re});var mo=o(e("fp-ts/function")),re=i.actionCreator.from(mo.identity)("postMetadataRecord/set");var $={};p($,{initialState:()=>lo,main:()=>ip});var lo={},ip=i.reducer.from(lo,{[re.type]:(t,r)=>r.payload});var ie={};p(ie,{actions:()=>ae,reducers:()=>K});var ae={};p(ae,{set:()=>ne});var co=o(e("fp-ts/function"));var ne=f.from(co.identity)("scroll/set");var K={};p(K,{initialState:()=>yo,main:()=>mp});var yo={y:0},mp=T.from(yo,{[ne.type]:(t,r)=>r.payload});var nt={};p(nt,{actions:()=>me,reducers:()=>xe});var me={};J(me);var xe={};p(xe,{initialState:()=>bo,main:()=>yp});var ye={};p(ye,{actions:()=>ce,reducers:()=>U});var ce={};p(ce,{set:()=>le});var fo=o(e("fp-ts/function")),le=i.actionCreator.from(fo.identity)("tagFilter/set");var U={};p(U,{initialState:()=>uo,main:()=>lp});var uo={sort:"name",order:"ascending"},lp=i.reducer.from(uo,{[le.type]:(t,r)=>r.payload});var ue={};p(ue,{actions:()=>de,reducers:()=>X});var de={};p(de,{set:()=>fe});var xo=o(e("fp-ts/function")),fe=i.actionCreator.from(xo.identity)("tagMetadataRecord/set");var X={};p(X,{initialState:()=>Ao,main:()=>cp});var Ao={},cp=i.reducer.from(Ao,{[fe.type]:(t,r)=>r.payload});var bo={cursor:B.initialState,history:z.initialState,phase:N.initialState,postFilter:Y.initialState,postMetadataRecord:$.initialState,scroll:K.initialState,tagFilter:U.initialState,tagMetadataRecord:X.initialState},yp=i.reducer.combine({cursor:B.main,history:z.main,phase:N.main,postFilter:Y.main,postMetadataRecord:$.main,scroll:K.main,tagFilter:U.main,tagMetadataRecord:X.main},bo);var Eo=(t=nt.reducers.initialState)=>r=>{let s=new E.BehaviorSubject(i.action.noop);return[s.pipe(E.scan(nt.reducers.main,t),E.share(),E.startWith(t)),a=>{s.next(a)}]};var Tt=o(e("fp-ts/function")),dp=o(e("fp-ts/ReadonlyArray")),up=o(e("fp-ts/Either")),x=o(e("rxjs"));var St=o(e("fp-ts/function")),G=o(e("fp-ts/Option")),at=o(e("rxjs"));var vt={};p(vt,{main:()=>bp,offset:()=>go,scroll:()=>Oo});var M=o(e("fp-ts/function")),Ae=o(e("fp-ts/Either")),n=o(e("rxjs"));var bp=t=>r=>s=>n.combineLatest([Oo(t)(r)(s),go(t)(r)(s)]).pipe(n.map((0,M.constant)(null))),Oo=t=>([r])=>s=>r.pipe(n.map(a=>a.scroll),n.tap(a=>{s.scroll(0,a.y)})),go=t=>([r,s])=>a=>n.fromEvent(a,"wheel",{passive:!1}).pipe(n.map(ht.types.WheelEvent.decode),n.map(Ae.fold((0,M.constant)(null),M.identity)),n.filter(m=>m!==null),n.map(m=>m.wheelDeltaY*.4*-1),n.startWith(0),n.switchScan((m,g)=>n.merge(n.of(m+g),n.fromEvent(a,"scrollTo").pipe(n.map(At.types.ScrollToEvent.decode),n.map(Ae.fold((0,M.constant)(null),M.identity)),n.filter(h=>h!==null),n.map(h=>h.detail))).pipe(n.map(h=>R.clamp(h,0,a.document.body.scrollHeight-a.document.body.clientHeight))),a.document.body.scrollTop),n.switchScan((m,g)=>t.pipe(n.scan(h=>R.lerpW(h,g,.1)(1e-4),m),n.distinctUntilChanged()),a.scrollY),n.tap(m=>{s(b.scroll.actions.set({y:m}))}));var Mt=o(e("fp-ts/function")),be=o(e("fp-ts/ReadonlyArray")),wt=o(e("rxjs"));var Ee=t=>{let r=O.interval(0,O.animationFrameScheduler).pipe(O.share()),s=Eo(b.root.reducers.initialState)(mt.empty);return O.combineLatest([vt.main(r)(s)(t)]).subscribe()};window.document.readyState==="loading"?window.document.addEventListener("DOMContentLoaded",()=>Ee(window)):Ee(window);})();
