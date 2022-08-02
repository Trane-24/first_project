import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import TodosAsynk from '../../store/todo/todosAsync';
import { selectTodos } from '../../store/todo/todosSelector';

const HomePage: React.FC = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(TodosAsynk.fetchTodos({}))
  }, []);

  return <>
    <div>HomePage</div>
    <p>{JSON.stringify(todos)}</p>
    </>;
};

export default HomePage;
