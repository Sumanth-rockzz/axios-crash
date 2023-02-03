const price=document.getElementById('price');
const itemname=document.getElementById('name');
const table=document.getElementById('table');
const addbtn=document.getElementById('add');

const table1list=document.getElementById('table1');
const table2list=document.getElementById('table2');
const table3list=document.getElementById('table3');


addbtn.addEventListener('click',addorder)

function addorder(e){
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
    axios.post(`https://crudcrud.com/api/344a867818ec44e388d75109569dc518/orderlist`,orderdeatils)
    .then((response)=>{
        Showoutput(response.data)
    })
    .catch((err)=>console.log(err))
    }
    document.getElementById('myform').reset();
}
function Showoutput(res){
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
    delbtn.addEventListener('click',()=>{
        let storetable=res.table;
        axios.delete(`https://crudcrud.com/api/344a867818ec44e388d75109569dc518/orderlist/${res._id}`)
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
window.addEventListener('DOMContentLoaded',()=>{
    axios.get(`https://crudcrud.com/api/344a867818ec44e388d75109569dc518/orderlist`)
        .then((response)=>{
           for(let i=0;i<response.data.length;i++)
           {
            Showoutput(response.data[i])
           }
        })
        .catch((err)=>console.log(err))

}) 