/* eslint-disable no-use-before-define */
const submitForm = document.querySelector('.add');
const addButton = document.querySelector('.add-todo');
const todoList = document.querySelector('.todos');
const list = document.querySelectorAll('.todos li');

let listLength = list.length;


submitForm.addEventListener('submit', addTodos);
addButton.addEventListener('click', addTodos);
// 新增
function addTodos(e) {
  e.preventDefault();
  const todo = submitForm.add.value.trim();
  if (todo.length) {
    listLength += 1; // 更新
    generateTemplate(todo);
    submitForm.reset();
  }
}
// generateTemplate(todo)
const generateTemplate = (todo) => {
  const html = `<li>
                    <input type="checkbox" id="todo-${listLength}" />
                    <label for="todo-${listLength}">
                        <span class="check"></span>${escapeHtml(todo)}
                    </label>
                    <i class="far fa-trash-alt delete"></i>
                  </li>`;
  todoList.innerHTML += html;
};

// 當輸入html標籤時，會印出標籤
function escapeHtml(todo) {
  return todo
    // eslint-disable-next-line quotes
    .replace(/&/g, "&amp;")
    // eslint-disable-next-line quotes
    .replace(/</g, "&lt;")
    // eslint-disable-next-line quotes
    .replace(/>/g, "&gt;")
    // eslint-disable-next-line quotes
    .replace(/"/g, "&quot;")
    // eslint-disable-next-line quotes
    .replace(/'/g, "&#039;");
}


// 刪除
// eslint-disable-next-line no-use-before-define
todoList.addEventListener('click', deleteTodos);

function deleteTodos(e) {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
}
