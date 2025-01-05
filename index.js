

//  FIX REFRESH BUG: why items on local storage only show on refreshing

// setting targets & creating variables
const textInput = document.querySelector('.text-input');
const addBtn = document.querySelector('.add-button');

// displaying previously listed tasks
let localStorageData = getPastLocalStorageData() || []; // to store in browser locally
displayPastLocalStorageData(localStorageData); // showing past lists

// events handling
textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && textInput.value.trim() !== '')
        addTODOitemInList(e);
});
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (textInput.value.trim() !== '')
        addTODOitemInList(e);
});

// user-defined functions
// adding new item in the list
function addTODOitemInList(e) {
    e.preventDefault();
    let userInputValue = textInput.value.trim(); // storing value
    textInput.value = ''; // flushing old value

    localStorageData.push(userInputValue); // add value to local storage array
    createListAddItem(userInputValue); // creates & adds item in list
    // adding the new data fed array to the local storage
    localStorage.setItem('myTodoLists', JSON.stringify(localStorageData));
}

// the main method's child function, who actually works in the background
function createListAddItem(itemContent) {
    const todoList = document.querySelector('.todo-list'); // accessed lists-container

    const newLi = document.createElement('li'); // creates li
    const editBtn = document.createElement('div'); // creates div for ✏️
    editBtn.innerText = '✏️';
    editBtn.classList.add('edit');
    editBtn.addEventListener('click', (e) => {
        editBtnAction(e);
    });
    const newPara = document.createElement('p'); // creates new p tag
    newPara.innerText = itemContent;
    const removeBtn = document.createElement('div'); // creates div for ❌
    removeBtn.innerText = '❌';
    removeBtn.classList.add('remove');
    removeBtn.addEventListener('click', (e) => {
        removeBtnAction(e);
    });

    newLi.append(editBtn, newPara, removeBtn);
    newLi.style.backgroundColor = `${randomColor()}`;
    todoList.append(newLi);
}

// action on edit button ''✏️ click
function editBtnAction(e) {
    let newValue = prompt('Enter new | edited data ');
    if (newValue.trim() !== '') {
        let index = localStorageData.indexOf(e.target.nextSibling.innerText); // to update value in browser local storage
        localStorageData[index] = newValue;
        e.target.nextSibling.innerText = newValue;
        localStorage.setItem('myTodoLists', JSON.stringify(localStorageData));
    }
}

// action on remove button 'X' click
function removeBtnAction(e) {
    e.preventDefault();
    let index = localStorageData.indexOf(e.target.previousElementSibling.textContent); // to delete value in browser local storage
    localStorageData.splice(index, 1); // deletes an item at index location
    localStorage.setItem('myTodoLists', JSON.stringify(localStorageData));
    e.target.parentNode.remove();
}

function randomColor() {
    const hashCodes = ['#233d03', '#e6526d', '#ffffff0d', '#7140b6', '#a148ae', '#ac3368', '#2b955a', '#d2691e', '#adff2f', '#673fb7', '#ffffff0d'];
    return hashCodes[Math.floor(Math.random() * 11)];
}

function getPastLocalStorageData() {
    // returns the stored data by converting string format to array
    return JSON.parse(localStorage.getItem('myTodoLists'));
}

function displayPastLocalStorageData(pastList) {
    pastList.forEach(item => { // adding each item to the list
        createListAddItem(item);
    });
}

