import TodoApp from './js/components/todo_app';

$(() => {
  React.render(
    <TodoApp />,
    document.getElementsByClassName('todoapp')[0]
  );
});

