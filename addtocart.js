const priceInput = document.getElementById("price");
const nameInput = document.getElementById("pname");
const addBtn = document.getElementById("add");
const cartList = document.getElementById("cartlist");
let total = 0;
const totalPrice=document.getElementById("totalprice")

addBtn.addEventListener("click", function(e) {
  e.preventDefault();
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
});
function showOutput(item){
    const listItem = document.createElement("li");
  listItem.innerHTML = `Price: ${item.price} Name: ${item.name}`;
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.addEventListener("click", function() {
    cartList.removeChild(listItem);
    total -= parseInt(item.price);
    totalPrice.innerHTML = total;
    axios.delete(`https://crudcrud.com/api/882038c176894f398a4f556c2706ce72/cartlist/${item._id}`)
    .then((response)=>console.log(response))
    .catch((err)=>console.log(err));
    
  });
  listItem.appendChild(deleteBtn);
  cartList.appendChild(listItem);
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