var form = document.getElementById('addForm');
var itemList = document.getElementById('items');


form.addEventListener('submit', addItem);
itemList.addEventListener('click',deleteEditItem);

 function addItem(e){
    e.preventDefault();
    
    var newExpense = document.getElementById('expense').value;
    var newDescription = document.getElementById('description').value;
    var newType = document.getElementById('type').value;
  
  let myObj = {
    expense : newExpense,
    description : newDescription,
    type : newType
  }

  var res;

  axios.post("https://crudcrud.com/api/411ba3631d604206b6aeafaffa06a292/storeData",myObj)
  .then((response)=>{
    res=response.data;
    console.log(response.data);
  })
  .catch((err)=>{
    console.log(err);
  })


  
  let myObj_String = JSON.stringify(myObj);
  
  localStorage.setItem(newDescription,myObj_String);

  
    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(newExpense));
    li.appendChild(document.createTextNode(" - "));
    li.appendChild(document.createTextNode(newDescription));
    li.appendChild(document.createTextNode(" - "));  
    li.appendChild(document.createTextNode(newType));
  
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  
    deleteBtn.appendChild(document.createTextNode('X'));
    li.appendChild(deleteBtn);
  
    var editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm float-right edit';
  
    editBtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(editBtn);
  
    
    itemList.appendChild(li);
  }
  

  function deleteEditItem(e){
    e.preventDefault();
    if(e.target.classList.contains('delete')){
      if(confirm('Are you sure ?')){
        var liRem = e.target.parentElement;      
        var textVal = liRem.childNodes[2].textContent;
        localStorage.removeItem(textVal);
        itemList.removeChild(liRem);
      }
    }
  
    if(e.target.classList.contains('edit')){
      
         var liRem = e.target.parentElement;  
         document.getElementById('expense').value = liRem.childNodes[0].textContent;
         document.getElementById('description').value = liRem.childNodes[2].textContent;
        document.getElementById('type').value = liRem.childNodes[4].textContent;
  
         var textVal = liRem.childNodes[2].textContent;
         localStorage.removeItem(textVal);
         itemList.removeChild(liRem);  
    }
  }