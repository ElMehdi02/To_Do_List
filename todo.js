// ADD new To do
const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const popup = document.querySelector('.popup');
const gPop = document.querySelector('.popup-wrapper');
const btn = document.querySelector('.btn');
const search = document.querySelector('.search input');
gPop.style.display = "none";

/***************reusable function********************/

// Function for the alert and popup that will be displayed (time control)
function start(duration) {
   var o = document.getElementById("sp");
   if (duration > 0) {
      o.innerHTML = duration;
      gPop.style.display = "block";
      setTimeout(() => start(duration - 1), 1000);
   } else {
      alert("Enter a valid to-do");
      o.innerHTML = "Goodbye";
      gPop.style.display = "none";
      popup.style.visibility = "hidden";
   }
}

// Function to dynamically create the POPUP
function create() {
   const div = document.createElement('div');
   div.classList.add('popup-close');
   div.setAttribute('id', 'closing');
   const text = document.createTextNode('X');
   div.appendChild(text);
   popup.append(div);
   const div2 = document.createElement('div');
   div2.classList.add('popup-content');
   const html = `
      <span id="sp">1</span>
      <h2>Fill the Input</h2>
      <p>Don't forget</p>
      <a href="#">Return</a>`;
   div2.innerHTML = html;
   popup.append(div2);
}

// Function for dynamically generating TODOS
const generateTemp = todo => {
   const html = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
         <span>${todo}</span>
         <i class="fas fa-trash delete"></i>
      </li>`;
   list.innerHTML += html;
};

// Function to control the event and avoid repetition on each click
function onetime(node, type, callback) {
   node.addEventListener(type, function (e) {
      e.target.removeEventListener(e.type, arguments.callee);
      return callback(e);
   });
}

onetime(gPop, 'click', handler);

function handler(e) {
   if (e.target.id === 'closing') {
      gPop.style.display = "none";
   }
}

/***************End reusable function********************/

/************* Adding TO DO**************/

// Event listener Add TODOS
btn.addEventListener('click', e => {
   e.preventDefault();
   let nbr = 3;
   if (document.querySelector('.popup-content') === null) {
      create();
   }
   if (addForm.add.value === "") {
      start(nbr);
      popup.style.visibility = "visible";
   } else {
      generateTemp(addForm.add.value);
      localStorage.getItem(addForm.add.value);
   }
});

/************* End Adding TO DO**************/

/************* Deleting TO DO**************/

list.addEventListener('click', e => {
   if (e.target.classList.contains('delete')) {
      e.target.parentElement.remove();
   }
});

/************* End Deleting TO DO**************/

/************************************* SEARCH ITEM ********************************************/
// Filtering Todos:

// We will apply a class to the Todos that don't match and that class will

// have keyup event

// const retrieve = (term) => {
//   // Function to filter items
// };

// Event for keyword search
search.addEventListener('keyup', () => {
   var filter, li, a, i, txtValue;
   filter = search.value.toUpperCase();
   li = list.getElementsByTagName("li");
   for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("span")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
         li[i].style.display = "";
      } else {
         li[i].style.setProperty('display', 'none', 'important');
      }
   }
});

/*************************************End SEARCH ITEM********************************************/

