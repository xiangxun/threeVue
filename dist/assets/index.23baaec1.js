var y=Object.defineProperty;var _=(r,e,n)=>e in r?y(r,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[e]=n;var c=(r,e,n)=>(_(r,typeof e!="symbol"?e+"":e,n),n);import{W as b,S as v,P as T,V as p,T as x,a as A,L as E,D as C,G as O,B as D,O as M,M as f,A as R,b as F,c as P,d as z,r as S,o as k,e as B,f as j,g as G}from"./vendor.8873fd80.js";const W=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}};W();class N{constructor(e){c(this,"dom");c(this,"renderer");c(this,"scene");c(this,"camera");c(this,"loader");this.dom=e,this.renderer=new b,this.scene=new v,this.camera=new T(45,e.offsetWidth/e.offsetHeight,.1,1e3),this.camera.lookAt(new p(0,0,0)),this.loader=new x;const n=this.loader.load("https://i.loli.net/2021/11/09/bdgf4T5D1siRpvK.jpg",()=>{const a=new A(n.image.height);a.fromEquirectangularTexture(this.renderer,n),this.scene.background=a.texture}),i=new E(()=>{console.log("\u8F7D\u5165\u5B8C\u6210"),console.log("scene===",this.scene)},(a,s,h)=>{console.log("\u8F7D\u5165\u4E2D...",s)}),t=new C;t.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.4.3/");const o=new O(i);o.setDRACOLoader(t),o.load("./src/loader/dracoModel/dracoRoom.gltf",a=>{const s=a.scene||a.scene[0],h=new D().setFromObject(s),l=h.getSize(new p).length(),u=h.getCenter(new p);s.position.x+=s.position.x-u.x,s.position.y+=s.position.y-u.y,s.position.z+=s.position.z-u.z,this.camera.near=l/100,this.camera.far=l*100,this.camera.updateProjectionMatrix(),this.camera.position.copy(u),this.camera.position.x+=l/2,this.camera.position.y+=l/2,this.camera.position.z+=l/2,this.camera.lookAt(u),this.scene.add(s),console.log("scene===",this.scene)});const d=new M(this.camera,this.renderer.domElement);d.mouseButtons={LEFT:f.ROTATE,MIDDLE:f.PAN,RIGHT:f.ROTATE},console.log(e),e.appendChild(this.renderer.domElement),this.renderer.setSize(e.offsetWidth,e.offsetHeight,!0);const w=new R(65535);this.scene.add(w);const m=new F(16777215,5,100);m.position.set(50,50,50),this.scene.add(m);const g=P();e.appendChild(g.domElement);const L=()=>{console.log(1),this.renderer.render(this.scene,this.camera),g.update(),requestAnimationFrame(L)};L(),e.appendChild(this.renderer.domElement)}}var $=(r,e)=>{for(const[n,i]of e)r[n]=i;return r};const q=z({setup(){const r=S(null);return k(()=>{new N(r.value)}),{threeTarget:r}}}),H={class:"three-canvas",ref:"threeTarget"};function I(r,e,n,i,t,o){return j(),B("div",H,null,512)}var K=$(q,[["render",I]]);G(K).mount("#app");
