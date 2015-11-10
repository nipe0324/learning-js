import TodoApp from './js/components/todo_app';

document.addEventListener('DOMContentLoaded', function() {
  React.render(
    <TodoApp />,
    document.getElementsByClassName('todoapp')[0]
  );
}, false);
