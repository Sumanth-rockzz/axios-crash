const price =document.getElementById('price');
const pname=document.getElementById('pname');
const addbtn=document.getElementById('add');
const cartlist=document.getElementById('cartlist');  
var totalprice=localStorage.getItem("totalprice")||0;
document.getElementById('totalprice').value=totalprice;
addbtn.addEventListener('click',onadding);
function onadding(e){
    e.preventDefault();
const myobj={
 price:price.value,
 name:pname.value
}
totalprice=parseInt(myobj.price)+parseInt(totalprice);
document.getElementById('totalprice').value=totalprice;
localStorage.setItem("totalprice",totalprice);
axios.post('https://crudcrud.com/api/9564e073ceab42d1b2fc2a0a99c91641/cartlist',myobj)
.then((response)=>display(response.data))
.catch((err)=>console.log(err))

price.value='';
pname.value='';

}



window.addEventListener('DOMContentLoaded',()=>
{
    
    axios.get('https://crudcrud.com/api/9564e073ceab42d1b2fc2a0a99c91641/cartlist')
.then((response)=> {
    if(response.data.length==0)
    localStorage.removeItem("totalprice");
    for(let i=0;i<response.data.length;i++)
    {
        display(response.data[i]);
    }
})
.catch((err)=>console.log(err))

})

function display(res){
 
    const info=document.createTextNode(`Price=${res.price}: Product name=${res.name}`)
    const li=document.createElement('li');
    li.appendChild(info);
    cartlist.appendChild(li);
    const delbtn=document.createElement('button');
    const delbtnname=document.createTextNode('Delete');
    delbtn.appendChild(delbtnname);
    delbtn.className='btn btn-danger btn-sm float-right delete';
    delbtn.onclick=()=>{
       
    cartlist.removeChild(li);
       var itemprice=res.price;
        axios.delete(`https://crudcrud.com/api/9564e073ceab42d1b2fc2a0a99c91641/cartlist/${res._id}`)
        .then((res)=>{
            totalprice=parseInt(totalprice)-parseInt(itemprice);
            document.getElementById('totalprice').value=totalprice;
        })
        .catch((err)=>{
            console.log(err)
        
          })
        }
        li.appendChild(delbtn);
    }



