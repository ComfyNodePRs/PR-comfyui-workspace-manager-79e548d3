import{r as l,j as S}from"./input.js";import{app as s}from"/scripts/app.js";import{Z as D,f as C,ah as j,i as x,T as W,E as d,ai as _,aj as I,x as r,k as h,ak as L}from"./App-YT7a4Gj6.js";import{u as R}from"./useDebounceFn-ld478fd0.js";import"/scripts/api.js";function F(){const{isDirty:p,setIsDirty:w,setRoute:g,saveCurWorkflow:y}=l.useContext(D),k=l.useRef(p),[m,E]=l.useState(!1);C();const v=l.useRef(null);l.useEffect(()=>{k.current=p},[p]),l.useEffect(()=>{var i,c;const n=t=>{var u;if(document.visibilityState==="hidden")return;const e=I(t);if(e)switch(e===d.openSpotlightSearch&&t.preventDefault(),window.dispatchEvent(new CustomEvent(_,{detail:{shortcutType:e}})),e){case d.SAVE:y();break;case d.SAVE_AS:g("saveAsModal");break;case d.openSpotlightSearch:g("spotlightSearch");break}else(u=t.target)!=null&&u.matches("input, textarea")&&Object.keys(s.canvas.selected_nodes??{}).length&&f()},o=s.canvas.onAfterChange;s.graph.onAfterChange=function(){o==null||o.apply(this,arguments),f()};const a=s.graph.onConfigure;return s.graph.onConfigure=function(){a==null||a.apply(this,arguments),setTimeout(()=>{var e,u;j(s.graph.serialize(),JSON.parse(((u=(e=r)==null?void 0:e.curWorkflow)==null?void 0:u.json)??"{}"))||f()},1e3)},document.addEventListener("click",t=>{Object.keys(s.canvas.selected_nodes??{}).length&&(s.canvas.node_over!=null||s.canvas.node_capturing_input!=null||s.canvas.node_widget!=null)&&f()}),document.addEventListener("keydown",n),(c=(i=h)==null?void 0:i.settings)!=null&&c.autoSave&&h.settings.autoSaveDuration&&(v.current=setInterval(()=>{T()},h.settings.autoSaveDuration*1e3)),()=>{document.removeEventListener("keydown",n),v.current&&clearInterval(v.current)}},[]);const T=async()=>{var o,a,i,c,t,e;if((a=(o=r)==null?void 0:o.curWorkflow)!=null&&a.saveLock||!((c=(i=r)==null?void 0:i.curWorkflow)!=null&&c.id)||!k.current)return;const n=JSON.stringify(s.graph.serialize());await((t=r)==null?void 0:t.updateFlow(r.curWorkflow.id,{json:n})),(e=L)==null||e.create({workflowID:r.curWorkflow.id,isAutoSave:!0,json:n}),w(!1)},b=async()=>{var n,o,a,i,c,t,e;(o=(n=r)==null?void 0:n.curWorkflow)!=null&&o.saveLock||k.current||(w(!0),(i=(a=h)==null?void 0:a.settings)!=null&&i.autoSave&&((t=(c=r)==null?void 0:c.curWorkflow)!=null&&t.id)&&!m&&(await((e=r)==null?void 0:e.latestVersionCheck())||E(!0)))},[f,A]=R(b,900);return m?S.jsx(x,{label:"This workflow was changed by another tab, so you are not working on the latest version. Please refresh page to see the latest version of this workflow.",children:S.jsx(W,{colorScheme:"yellow",children:"⚠️Outdated version"})}):null}export{F as default};
