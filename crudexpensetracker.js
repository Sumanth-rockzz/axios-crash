const Expenselist =document.getElementById('expenseslist');
const add=document.querySelector('#add');
const amount=document.querySelector('#amount');
const date=document.querySelector('#date');
const reason=document.querySelector('#reason');
const category=document.querySelector('#category');
const msg=document.querySelector('.msg');
let total=0;
const totalexpense=document.getElementById('totalexpense');
add.addEventListener('click',addexpense);
async function addexpense(e){

 try{
    e.preventDefault();
    if(amount.value===''||date.value===''||reason.value===''||category.value==='')
    {
        msg.innerHTML="Please fill in all the Details";
        setTimeout(()=>msg.innerHTML='',3000)
    }
    else  {
    const myobj={
       amount:amount.value,
       date:date.value,
       reason:reason.value,
       category:category.value
    };
    total+=parseInt(amount.value);
    totalexpense.innerHTML=total;
    const response =await axios.post('https://crudcrud.com/api/499626c58eb24f4d824b561f05292409/tracklist',myobj)
         create(response.data);
}
}
catch(err){
    console.log("Error at add Function:",err);
}
}
function create(data){
    try{
    Expenselist.innerHTML=Expenselist.innerHTML+`<tr id="${data._id}"><td>${data.date}</td><td>${data.amount}</td>
    <td>${data.reason}</td><td>${data.category}</td>
    <td><button class="btn btn-danger" onclick="del('${data._id}','${data.amount}')">Delete</button></td>
    <td><button class="btn btn-primary" onclick="edit('${data._id}','${data.amount}','${data.date}','${data.reason}','${data.category}')">Edit</button></td></tr>`;
    document.getElementById('myform').reset();
    }
    catch(err){
        console.log("Error at Delete Function:",err);
    } 
    
}  
window.addEventListener('DOMContentLoaded',async ()=>{

    try{
    const response =await axios.get(`https://crudcrud.com/api/499626c58eb24f4d824b561f05292409/tracklist`)
  
        total=0;
        for(let i=0;i<response.data.length;i++)
        {
            total+=parseInt(response.data[i].amount);
            create(response.data[i]);
        }
        totalexpense.innerHTML=total;
    }
    catch(err){
        console.log("Error at Delete Function:",err);
    } 
})

    async function del(id,amount){
    try{
        total-=parseInt(amount);
        totalexpense.innerHTML=total;
       const tr=document.getElementById(`${id}`);
       const response= await axios.delete(`https://crudcrud.com/api/499626c58eb24f4d824b561f05292409/tracklist/${id}`)
       Expenselist.removeChild(tr);
    }
    catch(err){
        console.log("Error at Delete Function:",err);
    }  
    }

    async function edit(id,amount,date,reason,category){
        try{
            total-=parseInt(amount);
            totalexpense.innerHTML=total;
        const tr=document.getElementById(`${id}`);
        document.getElementById('amount').value=amount;
        document.getElementById('date').value=date;
        document.getElementById('reason').value=reason;
        document.getElementById('category').value=category;

        const response = await axios.delete(`https://crudcrud.com/api/499626c58eb24f4d824b561f05292409/tracklist/${id}`)
        Expenselist.removeChild(tr);
        }
        catch(err){
            console.log("Error at Edit Function:",err);
        }  
    }


    /* const searchbtn=document.getElementById('searchbtn');

searchbtn.addEventListener('click',searchdate)

function searchdate(e){
const searchtext=document.getElementById('search').value;
const list=document.getElementsByTagName('tr');
//console.log(searchtext);
Array.from(list).forEach(function(item){
    console.log(item.firstChild.textContent)
    var dateinsidetable=item.firstChild.textContent;
    //console.log(date)
    if(dateinsidetable.indexOf(searchtext)!=-1)
    {
        item.style.display='block';
    }
    else 
    {
        item.style.display='none';
    }

})

} */