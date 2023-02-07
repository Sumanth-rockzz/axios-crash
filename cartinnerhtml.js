const price=document.getElementById('price')
const pname=document.getElementById('pname');
const addbtn=document.getElementById('add');
let total=0;
const totalprice=document.getElementById('totalprice')
const cartlist=document.getElementById('cartlist')

addbtn.addEventListener('click',e=>{
    e.preventDefault();
     if(price.value==''|| pname.value=='')
     {
        alert('please fill all');
     }
     else{
    const product={
        price:price.value,
        name:pname.value
    }
    axios.post('https://crudcrud.com/api/e95373090f704e6db480bfa0b016b6fe/cartlist',product)
    .then((response)=>{
        total+=parseInt(product.price)
        totalprice.innerHTML=total; 
        display(response.data)
    })
    .catch((err)=>{
        console.log(err);
    })
    /* price.value=''
    pname.value='' */
}
    
})
function deleteitem(id,price){
   
        total-=parseInt(price)
      totalprice.innerHTML=total;
    axios.delete(`https://crudcrud.com/api/e95373090f704e6db480bfa0b016b6fe/cartlist/${id}`)
    .then((response)=>{
      cartlist.innerHTML='';
      showOutput();
    })
    .catch((err)=>{
        console.log(err);
    }) 
    
}
function display(product){

        cartlist.innerHTML+=`<tr><td>${product.name}</td><td>${product.price}</td><td>
        <button class="btn btn-primary" onclick="deleteitem('${product._id}','${product.price}')">Delete</button></td></tr>` 
   
}
window.addEventListener('DOMContentLoaded',showOutput)

    function showOutput(){
        
    axios.get(`https://crudcrud.com/api/e95373090f704e6db480bfa0b016b6fe/cartlist`)
    .then((response)=>{
        total=0;
        for(let i=0;i<response.data.length;i++)
        {
            total+=parseInt(response.data[i].price);
           display(response.data[i]);
        }
        totalprice.innerHTML=total;
    })
    .catch((err)=>{
        console.log(err);
    })
}