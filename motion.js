// 动画仅呈现原有数据；循环副本不代表新增业务记录。
(() => {
 const ns='http://www.w3.org/2000/svg';
 const board=document.querySelector('#dashboard');
 const fx=document.createElementNS(ns,'svg');
 fx.setAttribute('viewBox','0 0 1672 941');fx.setAttribute('class','circuit-effects');fx.setAttribute('aria-hidden','true');
 const outlines=[
  'M2 8 L470 8 L518 56 L1155 56 L1201 8 L1670 8 L1627 65 L1407 65 L1431 24 L1200 24 L1160 67 L509 67 L468 24 L245 24 L268 65 L45 65 Z',
  ...[[14,94,391,317],[1282,94,377,317],[14,435,391,420],[1282,435,377,422]].map(([x,y,w,h])=>`M${x+8} ${y} H${x+w-8} L${x+w} ${y+8} V${y+h-8} L${x+w-8} ${y+h} H${x+8} L${x} ${y+h-8} V${y+8} Z`)
 ];
 fx.innerHTML='<defs><filter id="circuit-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="2.4"/></filter></defs>'+outlines.map((d,i)=>`<g style="--phase:${-i*1.7}s;--circuit-time:${i?9+i:14}s"><path class="circuit-halo" d="${d}" pathLength="1000"/><path class="circuit-run" d="${d}" pathLength="1000"/><path class="circuit-run violet" d="${d}" pathLength="1000"/></g>`).join('')+
 [[21,12],[470,8],[519,57],[1157,57],[1201,9],[1650,12],[22,97],[397,96],[20,405],[397,405],[1289,96],[1650,97],[1290,405],[1650,405],[22,438],[397,438],[22,849],[397,849],[1289,438],[1650,438],[1289,850],[1650,850]].map(([x,y],i)=>`<circle class="circuit-node" cx="${x}" cy="${y}" r="2.2" style="animation-delay:${-i*.27}s"/>`).join('');
 board.append(fx);
 const orbit=document.createElementNS(ns,'svg');orbit.setAttribute('viewBox','0 0 1672 941');orbit.setAttribute('class','orbit-effects');orbit.setAttribute('aria-hidden','true');
 orbit.innerHTML='<ellipse class="orbit-track" cx="835" cy="650" rx="411" ry="145"/><ellipse class="orbit-pulse" cx="835" cy="650" rx="411" ry="145" pathLength="1000"/><ellipse class="orbit-pulse orbit-purple" cx="835" cy="650" rx="422" ry="153" pathLength="1000"/>';
 document.querySelector('.map-area').prepend(orbit);
 document.querySelectorAll('.icon-subject').forEach((el,i)=>el.style.animationDelay=`${-i*.43}s`);
 // 只让图表内容上移，坐标轴、网格和标题固定。
 for(const [selector,height,duration] of [['#enterprise-chart',224,32],['#output-chart',214,26]]) {
  const svg=document.querySelector(`${selector} svg`);
  const group=document.createElementNS(ns,'g');group.setAttribute('class','chart-scroll-track');
  [...svg.children].filter(e=>e.tagName.toLowerCase()==='rect'||e.classList.contains('chart-value')||e.classList.contains('chart-label')||e.classList.contains('pending-svg')).forEach(e=>group.append(e));
  const viewport=document.createElementNS(ns,'g');
  const id=selector.slice(1)+'-clip';
  const defs=document.createElementNS(ns,'defs');defs.innerHTML=`<clipPath id="${id}"><rect width="351" height="${height}"/></clipPath>`;svg.append(defs);
  viewport.setAttribute('clip-path',`url(#${id})`);
  const copy=group.cloneNode(true);copy.removeAttribute('class');copy.setAttribute('transform',`translate(0 ${height})`);copy.setAttribute('aria-hidden','true');
  group.append(copy);group.style.setProperty('--scroll-distance',`-${height}px`);group.style.setProperty('--scroll-time',duration+'s');
  viewport.append(group);svg.append(viewport);
 }
 for(const selector of ['#talent-table','#jobs-table']) {
  const host=document.querySelector(selector),table=host.querySelector('table');
  const head=table.cloneNode(true);head.querySelector('tbody').remove();head.classList.add('fixed-table-head');
  table.querySelector('thead').remove();
  const viewport=document.createElement('div');viewport.className='table-scroll-viewport';
  const track=document.createElement('div');track.className='table-scroll-track';
  const copy=table.cloneNode(true);copy.setAttribute('aria-hidden','true');
  host.prepend(head);viewport.append(track);track.append(table,copy);host.append(viewport);
  track.style.setProperty('--scroll-distance',`-${table.offsetHeight}px`);
  track.style.setProperty('--scroll-time',selector.includes('talent')?'35s':'32s');
 }
})();
