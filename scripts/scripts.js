
const showloader=()=>{
    const loader= document.getElementById('loader').style.display='block';
}
const hideloader=()=>{
    const loader= document.getElementById('loader').style.display='none';
}

function getRes() {
  const sem = document.getElementById("sem").value;
  const id  = document.getElementById("s_id").value;
  loadData(sem,id);
  
}


const loadData= async (sem,id)=>{
    showloader();
    const res= await fetch(`http://software.diu.edu.bd:8189/result?grecaptcha=&semesterId=${sem}&studentId=${id}`);
    const data= await res.json();
    
    console.log(data);
    hideloader();
    appendTr(data);



}
const appendTr=(data)=> {
    const tbody= document.getElementById('tbody');
    tbody.innerHTML='';
    let totalSgpa=0;
    let totalCredit=0;
    
    for(data of data){
        const tr= document.createElement('tr');
        totalCredit+=data.totalCredit;
        totalSgpa+= data.totalCredit * data.pointEquivalent;
        tr.innerHTML=`
    
    <th>${data.customCourseId
    }</th>
    <td>${data.courseTitle}</td>
    <td>${data.totalCredit}</td>
    <td>${data.gradeLetter}</td>
    <td>${data.pointEquivalent}</td>
  `;
  tbody.appendChild(tr);
    }
    totalSgpa/=totalCredit;
    const sgpa= document.getElementById('total-sgpa');
    sgpa.innerHTML=`Total SGPA : ${totalSgpa.toFixed(2)}`;
    const resultSec= document.getElementById('result-sec').style.display='block';
    
  


}