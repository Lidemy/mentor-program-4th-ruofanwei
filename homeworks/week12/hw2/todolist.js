/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

// 當輸入html標籤時，會印出標籤
function escapeHtml(todo) {
  return todo
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const template = `
<div class="card">
        <div class="card-body">
          <div class="add-todo">
           <div class="check-btn {todoClass}" id="todo-{id}">⬜</div>
            <div for="todo-{id}" id="{id}" class="content">{content}</div>
          </div>
          <div class="edit-todo">
            <i class="far fa-trash-alt delete"></i>
            <i class="fas fa-pencil-alt edit" data-toggle="modal" data-target="#edit-content"></i>
          </div>
        </div>
      </div>
`;

let id = 1;

const searchParams = new URLSearchParams(window.location.search);
const todoId = searchParams.get('id');
// 載入對應的資料

if (todoId) {
  $.getJSON(`http://mentor-program.co/mtr04group2/Ruofan/wk12/todolist/get_lists.php?id=${todoId}`, (data) => {
    const todos = JSON.parse(data.data.todo);
    restoreTodos(todos);
  });
}


function restoreTodos(todos) {
  console.log(todos);
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    $('.comments').prepend(
      template
        .replace('{content}', escapeHtml(todo.content))
        .replace(/{id}/g, todo.id)
        .replace('{todoClass}', todo.done ? 'checked' : ''),
    );
    if (todo.done) {
      $(`#todo-${todo.id}`).prop('checked', true);
      $(`#todo-${todo.id}`).html('✔️');
      $(`#todo-${todo.id}`).next().toggleClass('line-through');
    }
  }
}


// 新增 todo
$('.btn-add-data').click((e) => {
  const value = escapeHtml($('.add-input-text').val());
  // 錯誤處理
  if (!value) {
    alert('아니요❗還沒填入資料喔(ㆆᴗㆆ)❗');
    return;
  } if (value.trim() == '') {
    alert(' 안 돼 ❗只有空白❓❓(✘﹏✘ა)');
    return;
  }

  // 把拿到的資料顯示在下方

  $('.comments').prepend(
    template
      .replace('{content}', escapeHtml(value))
      .replace(/{id}/g, id),

  );
  id += 1;

  // 拿到資料後清空 // 用傳空字串的方式
  $('.add-input-text').val('');
});

// 清空所有todo
$('.filter-delete').click(() => {
  alert('Are you sure to delete?');
  $('.comments').empty();
});

// 刪除選到的todo
$('.comments').on('click', '.delete', (e) => {
  $(e.target).parent().parent().fadeOut();
});

// 完成or未完成 todo
$('.comments').on('click', '.check-btn', (e) => {
  if ($(e.target).hasClass('checked')) {
    $(e.target).html('⬜');
  } else {
    $(e.target).html('✔️');
  }
  $(e.target).toggleClass('checked');

  $(event.target).parent().parent().parent()
    .toggleClass('completed');
  $(e.target).next().toggleClass('line-through');
});

// 編輯 todo
$('.comments').on('click', '.edit', (e) => {
  const oldTodo = $(e.target).parent().parent().find('.content')
    .text();
  $('.edit-todo-input').val(oldTodo);
  $('.container').on('click', '.confirm', () => {
    const newTodo = escapeHtml($('.edit-todo-input').val());
    // 錯誤處理
    if (!newTodo) {
      alert(' 아니요❗更新的資料不能空白喔(ㆆᴗㆆ)❗');
      return;
    } if (newTodo.trim() == '') {
      alert(' 안 돼 ❗只有空白❓❓(✘﹏✘ა)');
      return;
    }


    $(e.target).parent().parent().find('.content')
      .text(newTodo);
    $('.container').off();
  });
});

// 全部的todo
$('.container').on('click', '.all', () => {
  $('.card').addClass('d-flex').show();
});

// 還沒完成的todo
$('.container').on('click', '.active', () => {
  $('.card.completed').removeClass('d-flex').hide();
  $('.card:not(.completed)').addClass('d-flex').show();
});

// 已完成的todo
$('.container').on('click', '.done', () => {
  $('.card').removeClass('d-flex').hide();
  $('.card.completed').addClass('d-flex').show();
});

// 儲存功能
$('.save').click(() => {
// 先拿到要存到資料庫的內容
  const todos = [];
  $('.card').each((i, element) => {
    const check = $(element).find('.check-btn');
    const content = $(element).find('.content');
    todos.push({
      id: check.attr('id').replace('todo-', ''),
      content: content.text(),
      done: check.hasClass('checked'),
    });
  });
  // 把陣列轉成JSON格式的字串
  const data = JSON.stringify(todos);
  // 把todo的資料存到資料庫
  $.ajax({
    type: 'POST',
    url: 'http://mentor-program.co/mtr04group2/Ruofan/wk12/todolist/save_lists.php',
    data: {
      todo: data,
    },
    success(res) {
      const resId = res.id;
      window.location = `http://mentor-program.co/mtr04group2/Ruofan/wk12/todolist/todolist.html?id=${resId}`;
      alert('儲存成功');
    },
    error() {
      alert('尚未成功');
    },
  });
});
