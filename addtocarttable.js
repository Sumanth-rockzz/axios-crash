const priceInput = document.getElementById("price");
const nameInput = document.getElementById("pname");
const addBtn = document.getElementById("add");
const cartList = document.getElementById("cartlist");
let total = 0;
const totalPrice=document.getElementById("totalprice")


addBtn.addEventListener("click", function(e) {
  e.preventDefault();
  if(price.value==''|| pname.value=='')
  {
    const msg=document.getElementById('msg')
    msg.innerHTML="Please Fill All Details!"
      setTimeout(() => {
        msg.innerHTML=''

      }, 3000);
  }
  else{
  const item = {
    price: priceInput.value,
    name: nameInput.value 
  };
  total += parseInt(item.price);
  totalPrice.innerHTML = total;
  axios.post('https://crudcrud.com/api/882038c176894f398a4f556c2706ce72/cartlist',item)
  .then((response)=>{
    showOutput(response.data);
  })
  .catch((err)=>{
    console.log(err);
  })
  document.getElementById('my-form').reset();
}
});


function showOutput(item){
    const row = document.createElement("tr");
    const pricedata=document.createElement("td");
    pricedata.innerHTML=`${item.price}`;
    const namedata=document.createElement("td");
    namedata.innerHTML=`${item.name}`;
    const deldata=document.createElement('td');
    const delbtn=document.createElement("button");
    delbtn.innerHTML="Delete";
    delbtn.className='btn btn-danger';
    deldata.appendChild(delbtn);
    delbtn.addEventListener('click',()=>{
        console.log(item._id)
        cartList.removeChild(row);
        total -= parseInt(item.price);
        totalPrice.innerHTML = total;
        axios.delete(`https://crudcrud.com/api/882038c176894f398a4f556c2706ce72/cartlist/${item._id}`)
        .then((response)=>console.log(response))
        .catch((err)=>console.log(err));
    })
row.append(namedata);
row.append(pricedata);
row.append(deldata); 
cartList.appendChild(row);
}

window.addEventListener('DOMContentLoaded',e=>{
    axios.get(`https://crudcrud.com/api/882038c176894f398a4f556c2706ce72/cartlist`)
    .then((response)=>{
        for(let i=0;i<response.data.length;i++)
        {
            total+=parseInt(response.data[i].price);
            showOutput(response.data[i]);
        }
        totalPrice.innerHTML=total;
    })
    .catch((err)=>{
        console.log(err);
    })
})
