var form = document.getElementById('addForm');
var eitemList = document.getElementById('eitems');
var fitemList = document.getElementById('fitems');
var sitemList = document.getElementById('sitems');
const endPoint = "https://crudcrud.com/api/6365d767c87d43cdbe341d96d54e186b";

window.addEventListener("DOMContentLoaded", () => {
  axios.get(endPoint+"/eitems")
    .then((response) => {
      console.log(response.data);
      response.data.forEach(element => {
        showData(element, eitemList);
      });
    })
    .catch((err) => {
      console.log(err);
    })
    axios.get(endPoint+"/fitems")
    .then((response) => {
      console.log(response.data);
      response.data.forEach(element => {
        showData(element, fitemList);
      });
    })
    .catch((err) => {
      console.log(err);
    })
    axios.get(endPoint+"/sitems")
    .then((response) => {
      console.log(response.data);
      response.data.forEach(element => {
        showData(element, sitemList);
      });
    })
    .catch((err) => {
      console.log(err);
    })
})

form.addEventListener('submit', addItem);
eitemList.addEventListener('click', deleteEItem);
fitemList.addEventListener('click', deleteFItem);
sitemList.addEventListener('click', deleteSItem);




function addItem(e) {
  e.preventDefault();

  var newsp = document.getElementById('sp').value;
  var newpn = document.getElementById('pn').value;
  var newCategory = document.getElementById('category').value;

  let myObj = {
    sellingPrice: newsp,
    productName: newpn,
    category: newCategory
  }

  
  if(newCategory === "Electronic")
  axios.post(endPoint+"/eitems", myObj)
    .then((response) => {
      showData(response.data, eitemList);      
    })
    .catch((err) => {
      console.log(err);
    });
    else   if(newCategory === "Food")
    axios.post(endPoint+"/fitems", myObj)
      .then((response) => {
        showData(response.data, fitemList);      
      })
      .catch((err) => {
        console.log(err);
      });
      else if (newCategory === "Skincare")
      axios.post(endPoint+"/sitems", myObj)
        .then((response) => {
          showData(response.data, sitemList);      
        })
        .catch((err) => {
          console.log(err);
        });

}

function showData(obj, listname) {
  var li = document.createElement('li');
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(obj._id));
  li.appendChild(document.createTextNode(" ----------- "));
  li.appendChild(document.createTextNode(obj.sellingPrice));
  li.appendChild(document.createTextNode(" - "));
  li.appendChild(document.createTextNode(obj.productName));
  li.appendChild(document.createTextNode(" - "));
  li.appendChild(document.createTextNode(obj.category));

  li.childNodes[0].type = "hidden";

  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

  deleteBtn.appendChild(document.createTextNode('X'));
  li.appendChild(deleteBtn);

listname.appendChild(li);
}

function deleteEItem(e) {
  e.preventDefault();
  if (e.target.classList.contains('delete')) {
    if (confirm('Are you sure ?')) {
      var liRem = e.target.parentElement;
      var textVal = liRem.childNodes[0].textContent;
      axios.delete(endPoint+"/eitems/"+textVal)
      .then((resp)=>{
        console.log(resp);        
      eitemList.removeChild(liRem);
      })
      .catch((err)=>{
        console.log(err);
      });
     // localStorage.removeItem(textVal);
    }
  }

  

}


function deleteFItem(e) {
    e.preventDefault();
    if (e.target.classList.contains('delete')) {
      if (confirm('Are you sure ?')) {
        var liRem = e.target.parentElement;
        var textVal = liRem.childNodes[0].textContent;
        axios.delete(endPoint+"/fitems/"+textVal)
        .then((resp)=>{
          console.log(resp);        
        fitemList.removeChild(liRem);
        })
        .catch((err)=>{
          console.log(err);
        });
       // localStorage.removeItem(textVal);
      }
    }
  
    
  
  }

  
function deleteSItem(e) {
    e.preventDefault();
    if (e.target.classList.contains('delete')) {
      if (confirm('Are you sure ?')) {
        var liRem = e.target.parentElement;
        var textVal = liRem.childNodes[0].textContent;
        axios.delete(endPoint+"/sitems/"+textVal)
        .then((resp)=>{
          console.log(resp);        
        sitemList.removeChild(liRem);
        })
        .catch((err)=>{
          console.log(err);
        });
       // localStorage.removeItem(textVal);
      }
    }
  
    
  
  }