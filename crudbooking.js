const body=document.querySelector('body');
const myform=document.querySelector('#my-form');
const nameinput=document.querySelector('#name');
const emailinput=document.querySelector('#email');
const numberinput=document.querySelector('#number');
const dateinput=document.querySelector('#date');
const timeinput=document.querySelector('#time');


const msg=document.querySelector('.msg');
const userlist=document.querySelector('#users');
const btun=document.querySelector('.btn btn-primary');

//add event listener to form 
myform.addEventListener('submit',onsubmit);
function onsubmit(e){
    e.preventDefault();
     if(nameinput.value==='' || emailinput.value===''||numberinput.value===''||dateinput.value===''||timeinput.value==='')
     {
    
     msg.innerHTML='Please enter all details!';
     msg.classList.add('error');
    
     
     setTimeout(()=>msg.remove(),3000)
     }
     else
     {
        //add to storage
   // localStorage.setItem('User1Details',`${nameinput.value}:${emailinput.value}:${numberinput.value}:${dateinput.value}:${timeinput.value}`);
    //console.log(localStorage.getItem('User1Details')); 

    // convert objects to string
    const myobj={
        nameinput:nameinput.value,
        emailinput:emailinput.value,
        numberinput:numberinput.value,
        timeinput:timeinput.value,
        dateinput:dateinput.value
    };
    axios.post('https://crudcrud.com/api/c1df67f7241a4ef9999121247b825754/appointmentData',myobj)
    .then((response)=>{
        console.log(response)
        showingoutput(response.data)
    })
    .catch((err)=>{
      document.body.innerHTML=document.body.innerHTML+"<li>Something Went wrong</li>";

    })
    }
}
    window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/c1df67f7241a4ef9999121247b825754/appointmentData')
    .then((response)=>{
        console.log(response)
        for(let i=0;i<response.data.length;i++)
        {
            showingoutput(response.data[i]);
        }
    })
    .catch((err)=>{
        console.log(err)
    
      })
    })
   

   /*  const myobj_serialised=JSON.stringify(myobj);
    localStorage.setItem(emailinput.value,myobj_serialised); */
     function showingoutput(res)
     {
    const li=document.createElement('li');
    const userinfo=document.createTextNode(`${res.nameinput}:${res.emailinput}:${res.numberinput}:${res.dateinput}:${res.timeinput}`);
    const delbtn=document.createElement('button');
    const delbtnname=document.createTextNode('x');
    const editbtn=document.createElement('button');
    editbtn.appendChild(document.createTextNode('Edit'));
    delbtn.appendChild(delbtnname);
    delbtn.className='btn btn-danger btn-sm float-right delete';
    editbtn.className='btn btn-primary btn-sm float-right edit';
    delbtn.onclick=()=>{
        
            if(confirm('Are you sure?'))
            {
            userlist.removeChild(li);
            axios.delete(`https://crudcrud.com/api/c1df67f7241a4ef9999121247b825754/appointmentData/${res._id}`)
            .then((res)=>{
                console.log("this is ",res);
            })
            .catch((err)=>{
                console.log(err)
            
              })
            }
        }
    editbtn.onclick=()=>{

           
        document.getElementById('name').value=res.nameinput;
        document.getElementById('email').value=res.emailinput;
        document.getElementById('number').value=res.numberinput;
        document.getElementById('date').value=res.dateinput;
        document.getElementById('time').value=res.timeinput;

        userlist.removeChild(li);
        axios.delete(`https://crudcrud.com/api/c1df67f7241a4ef9999121247b825754/appointmentData/${res._id}`)
        .then((res)=>{
            console.log("this is ",res);
        })
        .catch((err)=>{
            console.log(err)
        
          })

        
    }

    
    li.appendChild(userinfo);
    li.appendChild(delbtn);
    li.appendChild(editbtn);

    userlist.appendChild(li);

    //clear fields
    nameinput.value='';
    emailinput.value='';
    numberinput.value='';
    dateinput.value='';
    timeinput.value='';
     }






    const valid=document.querySelector('#my-form');
    valid.addEventListener('submit',e=>
    {
        if(!valid.checkValidity())
        {
            e.preventDefault();
        }
        valid.classList.add('was-validated');
    });