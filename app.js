let RAW=[];
let VIEW=[];

const tbody=document.querySelector("#tbl tbody");
const countEl=document.getElementById("count");
const fileCsv=document.getElementById("file_csv");

function render(){
  tbody.innerHTML="";
  VIEW.forEach(r=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`
      <td>${r["企業コード"]||""}</td>
      <td>${r["企業名"]||""}</td>
      <td>${r["決算期"]||""}</td>
      <td>${r["開示日"]||""}</td>
      <td>${r["スコア"]||""}</td>
      <td>${r["検出キーワード"]||""}</td>
      <td>${r["差分"]||""}</td>
      <td>${r["URL"]?`<a href="${r["URL"]}" target="_blank">開く</a>`:""}</td>
    `;
    tbody.appendChild(tr);
  });
  countEl.textContent=VIEW.length+"件";
}

fileCsv.addEventListener("change",(e)=>{
  const f=e.target.files[0];
  if(!f)return;
  Papa.parse(f,{
    header:true,
    skipEmptyLines:true,
    complete:(res)=>{
      RAW=res.data||[];
      VIEW=[...RAW];
      render();
    }
  });
});
