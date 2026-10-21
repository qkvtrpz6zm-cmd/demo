// 视觉稿转录数据，仅用于静态还原；不是已核验的业务数据。
const assets = 'assets/04-icons/';
const iconNames = ['01-全疆企业数量', '02-产业产值', '03-上市企业', '04-世界500强', '05-产教融合型企业', '06-人才需求', '07-技术需求', '08-培训需求'];
function icon(index) {
  const name = iconNames[index];
  return `<div class="icon-stack" aria-hidden="true"><img class="icon-base" src="${assets}${name}-底座.png" alt=""><img class="icon-subject" src="${assets}${name}-主体.png" alt=""></div>`;
}
const overview = [
  ['645710', '全疆企业数量', 420], ['71093.96', '产业产值（亿元）', 595],
  ['100', '上市企业', 784], ['3', '世界500强', 942], ['19', '产教融合型企业', 1090]
];
document.querySelector('#overview').innerHTML = overview.map(([value, label, x], i) => `<div class="metric" style="left:${x}px">${icon(i)}<div class="metric-copy"><p class="metric-value">${value}</p><p class="metric-label">${label}</p></div></div>`).join('');
document.querySelector('#demands').innerHTML = [['20', '人才需求', 526], ['10', '技术需求', 767], ['10', '培训需求', 1008]].map(([value, label, x], i) => `<div class="demand" style="left:${x}px">${icon(i + 5)}<div class="metric-copy"><p class="metric-value">${value}</p><p class="metric-label">${label}</p></div></div>`).join('');

const enterpriseValues = [44634, 27510, 19181, 10199, 10199, 6649, 6292, 4773, 3918, 2118, 2128, 1033, 780, 637, 219];
// 图中标签与条形数量不同，按可见位置分别排布；完整名称待确认。
const industryLabels = ['先进制造和…', '现代物流产…', '绿色建材产…', '生物医药产…', '新型电力系…', '先进装备…', '待确认', '轻纺产业…', '绿建材料产…'];
const svg = (width, height, body) => `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
let bars = '<defs><linearGradient id="bar"><stop stop-color="#00a6fb"/><stop offset="1" stop-color="#00edf3"/></linearGradient></defs>';
for (let i = 0; i <= 5; i++) {
  const x = 80 + i * 49.4;
  bars += `<path d="M${x} 7V218" stroke="#235273" stroke-dasharray="3 3" stroke-width=".8"/><text class="chart-axis" x="${x}" y="237" text-anchor="middle">${i ? i + 'w' : 0}</text>`;
}
enterpriseValues.forEach((value, i) => {
  const y = 8 + i * 14;
  bars += `<rect x="80" y="${y}" width="247" height="11" rx="4" fill="#01263c"/><rect x="80" y="${y}" width="${value / 50000 * 235}" height="11" rx="4" fill="url(#bar)"/><text class="chart-value" x="${84 + value / 50000 * 235}" y="${y + 10}">${value}</text>`;
});
industryLabels.forEach((label, i) => {
  bars += `<text class="chart-label" x="0" y="${17 + i * 23.5}"><title>名称待确认：原图截断或不清晰</title>${label}</text>`;
});
bars += '<text class="pending-svg" x="0" y="223">名称待确认</text>';
document.querySelector('#enterprise-chart').innerHTML = svg(351, 243, bars);

let output = '<defs><linearGradient id="outputBar"><stop stop-color="#00a4fb"/><stop offset="1" stop-color="#00f4f0"/></linearGradient></defs>';
for (let i = 0; i <= 5; i++) {
  const x = 80 + i * 48;
  output += `<path d="M${x} 3V215" stroke="#315474" stroke-dasharray="3 3" stroke-width=".8"/>`;
  if (i === 0 || i === 1 || i === 3) output += `<text class="chart-axis" x="${x}" y="230" text-anchor="middle">${i * 1000}亿元</text>`;
}
output += '<text class="chart-label" x="0" y="108">软件和信息…</text><text class="pending-svg" x="0" y="121">名称待确认</text><rect x="80" y="102" width="199" height="10" rx="4" fill="url(#outputBar)"/><text class="chart-value" x="282" y="112" textLength="67" lengthAdjust="spacingAndGlyphs" style="font-size:13px">4537.78亿元</text>';
document.querySelector('#output-chart').innerHTML = svg(346, 237, output);

const regions = [
  [860, 260, '阿勒泰地区', '5,024'], [903, 289, '北屯市', '5,024'],
  [804, 346, '塔城地区', '5,024'], [614, 371, '博尔塔拉蒙古自治州', '5,024'],
  [787, 372, '胡杨河市', '5,024'], [594, 403, '可克达拉市', '5,024'],
  [787, 397, '石河子市', '5,024'], [883, 393, '五家渠市', '5,024'],
  [981, 393, '昌吉回族自治州', '7,666'], [662, 430, '伊犁哈萨克自治州', '13,113'],
  [883, 422, '乌鲁木齐市', '45,692'], [960, 467, '吐鲁番市', '5,024'],
  [1098, 447, '哈密市', '5,024'], [660, 492, '阿克苏地区', '9,761'],
  [808, 485, '铁门关市', '5,024'], [660, 525, '阿拉尔市', '5,024'],
  [436, 557, '克孜勒苏柯尔克孜自治州', null], [611, 550, '图木舒克市', '5,024'],
  [856, 576, '巴音郭楞蒙古自治州', '6,015'], [514, 611, '喀什地区', '16,476'],
  [601, 642, '昆玉市', '5,024'], [599, 682, '和田地区', '7,405']
];
document.querySelector('#map-labels').innerHTML = regions.map(([x, y, name, value]) => `<div class="map-label" style="left:${x - 419}px;top:${y - 174}px" title="${name}：${value || '数值待确认'}（效果图转录，未核验）"><span>${name}</span>${value ? `<strong>${value}</strong>` : '<small>待确认</small>'}</div>`).join('');

const talentRows = [
  ['连锁经营管理师', '文化和旅游', '17107', '20.79'], ['营销员', '文化和旅游', '12100', '14.71'],
  ['市场营销专业人员', '文化和旅游', '7811', '9.49'], ['商品营业员', '文化和旅游', '6482', '7.88'],
  ['互联网营销师', '文化和旅游', '5414', '6.58'], ['全媒体运营师', '文化和旅游', '4944', '6.01'],
  ['呼叫中心服务员', '文化和旅游', '4852', '5.9'], ['餐厅服务员', '文化和旅游', '4414', '5.37'],
  ['中式烹调师', '文化和旅游', '4255', '5.17'], ['导游', '文化和旅游', '3513', '4.27']
];
const jobRows = [
  ['网络客服', '文化艺术业', '42543', '6.80%'], ['普工/操作工', '商务服务业', '22271', '3.56%'],
  ['安检员', '商务服务业', '21587', '3.45%'], ['网络推广', '科技推广和应用服…', '10507', '1.68%'],
  ['客服专员', '文化艺术业', '10196', '1.63%'], ['风电工程师', '商务服务业', '9886', '1.58%'],
  ['安检员', '房地产业', '9269', '1.48%'], ['保险顾问', '保险业', '8309', '1.33%'],
  ['主持人', '娱乐业', '8307', '1.33%']
];
function table(headers, rows, widths) {
  return `<table><colgroup>${widths.map(w => `<col style="width:${w}%">`).join('')}</colgroup><thead><tr>${headers.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((v, i) => `<td class="${i === 2 ? 'number' : i === 3 ? 'ratio' : ''}"${v.includes('…') ? ' title="完整名称待确认"' : ''}>${v}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}
document.querySelector('#talent-table').innerHTML = table(['岗位名称', '所属行业', '人数', '占比'], talentRows, [32, 29, 16, 23]);
document.querySelector('#jobs-table').innerHTML = table(['岗位类型', '所属行业', '需求人数', '需求占比'], jobRows, [31, 31, 19, 19]);
function fit() {
  const scale = Math.min(innerWidth / 1672, innerHeight / 941);
  const el = document.querySelector('#dashboard');
  el.style.transform = `scale(${scale})`;
  el.style.left = `${(innerWidth - 1672 * scale) / 2}px`;
  el.style.top = `${(innerHeight - 941 * scale) / 2}px`;
}
addEventListener('resize', fit);
fit();
