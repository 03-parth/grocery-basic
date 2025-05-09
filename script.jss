let groceryList = JSON.parse(localStorage.getItem('groceryList')) || [];
let filteredCategory = 'All';

document.addEventListener('DOMContentLoaded', () => {
  renderList();
});

function addItem() {
  const itemInput = document.getElementById('itemInput');
  const itemText = itemInput.value.trim();
  const category = prompt("Enter category (Fruits, Vegetables, Dairy)");

  if (itemText === '') return;

  const newItem = { text: itemText, category: category || 'Misc', checked: false };
  groceryList.push(newItem);
  saveToLocalStorage();
  itemInput.value = '';
  renderList();
}

function toggleChecked(index) {
  groceryList[index].checked = !groceryList[index].checked;
  saveToLocalStorage();
  renderList();
}

function deleteItem(index) {
  groceryList.splice(index, 1);
  saveToLocalStorage();
  renderList();
}

function filterCategory(category) {
  filteredCategory = category;
  renderList();
}

function renderList() {
  const groceryListElement = document.getElementById('groceryList');
  groceryListElement.innerHTML = '';

  const filteredItems = groceryList.filter(item => filteredCategory === 'All' || item.category === filteredCategory);

  filteredItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.toggle('checked', item.checked);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.checked;
    checkbox.onclick = () => toggleChecked(index);

    const text = document.createElement('span');
    text.textContent = `${item.text} - (${item.category})`;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = '❌';
    deleteButton.onclick = () => deleteItem(index);

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteButton);

    groceryListElement.appendChild(li);
  });
}

function saveToLocalStorage() {
  localStorage.setItem('groceryList', JSON.stringify(groceryList));
}
