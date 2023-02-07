const price=document.getElementById('price');
const itemname=document.getElementById('name');
const table=document.getElementById('table');
const addbtn=document.getElementById('add');

const table1list=document.getElementById('table1');
const table2list=document.getElementById('table2');
const table3list=document.getElementById('table3');


addbtn.addEventListener('click',addorder)

async function addorder(e){
    try{
    e.preventDefault();
    if(price.value==''||itemname.value=='')
    {
        document.getElementById('msg').innerHTML="Please Fill All the Details";
        setTimeout(()=>{
            
            document.getElementById('msg').innerHTML='';

        },3000)
    }
    else{
    const orderdeatils={
        price:price.value,
        name:itemname.value,
        table:table.value
    }
    response=await axios.post(`https://crudcrud.com/api/0f3df511812847d8ac892c369ee3420f/orderlist`,orderdeatils)
        Showoutput(response.data)
    document.getElementById('myform').reset();
    }
} 
catch(err){
    console.log("Error at add Function:",err);
} 
}
function Showoutput(res){
    try{
    const row=document.createElement('tr');
    const itemnamedata=document.createElement('td');
    itemnamedata.innerHTML=`${res.name}`
    const pricedata=document.createElement('td');
    pricedata.innerHTML=`${res.price}`
    const tabledata=document.createElement('td');
    tabledata.innerHTML=`${res.table}`
    const delbtn=document.createElement('button');
    delbtn.innerHTML="Delete";
    delbtn.className="btn btn-danger";
    const delbtndata=document.createElement('td');
    delbtndata.appendChild(delbtn);
    row.appendChild(itemnamedata);
    row.appendChild(pricedata);
    row.appendChild(tabledata);
    row.appendChild(delbtndata);
    delbtn.addEventListener('click',async ()=>{
        let storetable=res.table;
       const response=await axios.delete(`https://crudcrud.com/api/0f3df511812847d8ac892c369ee3420f/orderlist/${res._id}`)
        .then((response)=>{
           console.log(response)
        })
        .catch((err)=>console.log(err))
        if(storetable=="Table1")
        {
            table1list.removeChild(row);
        }
        else if(storetable=="Table2")
        {
            table2list.removeChild(row);
        }
        else{
            table3list.removeChild(row);
        }

    })
    if(res.table=="Table1")
    {
        table1list.appendChild(row);
    }
    else if(res.table=="Table2")
    {
        table2list.appendChild(row);
    }
    else{
        table3list.appendChild(row);
    }
}
catch(err){
    console.log("Error at show Function:",err);
}
}
window.addEventListener('DOMContentLoaded',async ()=>{
    try{
    const response= await axios.get(`https://crudcrud.com/api/0f3df511812847d8ac892c369ee3420f/orderlist`)
      
           for(let i=0;i<response.data.length;i++)
           {
            Showoutput(response.data[i])
           }
        }
        catch(err){
            console.log("Error at refresh Function:",err);
        } 

}) 