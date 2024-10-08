import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Interfaces
  interface Todo {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
    targetId: number;
  }

  interface Target {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
    todo: Todo[]; // Mudança: adicionando o array de TODOs
  }

  const baseUrl = 'https://todo-caio.azurewebsites.net/api/';
  const [targets, setTargets] = useState<Target[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTargetId, setSelectedTargetId] = useState<number | null>(null);

  const [targetId, setTargetId] = useState<number>(0);
  const [targetTitle, setTargetTitle] = useState('');
  const [targetDescription, setTargetDescription] = useState('');
  const [todoId, setTodoId] = useState<number>(0);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [targetIdForTodo, setTargetIdForTodo] = useState('');

  const requestBase = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Requisições para Target
  const getTarget = async () => {
    try {
      const response = await requestBase.get('Targets');
      setTargets(response.data);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const postTarget = async () => {
    try {
      const response = await requestBase.post('targets', {
        title: targetTitle,
        description: targetDescription,
        isComplete: false,
        todo: [],
      });
      console.log(response.data);
      getTarget(); // Atualiza a lista de targets após a criação
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const putTarget = async () => {
    try {
      const response = await requestBase.put(`targets/${targetId}`, {
        id: targetId,
        title: targetTitle,
        description: targetDescription,
        isComplete: false,
      });
      console.log(response.data);
      getTarget(); // Atualiza a lista de targets após a alteração
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const deleteTarget = async () => {
    try {
      await requestBase.delete(`targets/${targetId}`);
      getTarget(); // Atualiza a lista de targets após exclusão
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  // Requisições para TODO
  const getTodo = async () => {
    try {
      const response = await requestBase.get('Todo');
      setTodos(response.data);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const postTodo = async () => {
    try {
      const response = await requestBase.post('Todo', {
        title: todoTitle,
        description: todoDescription,
        isComplete: false,
        targetId: parseInt(targetIdForTodo),
      });
      console.log(response.data);
      getTodo(); // Atualiza a lista de todos após a criação
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const putTodo = async () => {
    try {
      const response = await requestBase.put(`Todo/${todoId}`, {
        id: todoId,
        title: todoTitle,
        description: todoDescription,
        isComplete: false,
        targetId: parseInt(targetIdForTodo),
      });
      console.log(response.data);
      getTodo(); // Atualiza a lista de todos após a alteração
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const deleteTodo = async () => {
    try {
      await requestBase.delete(`todo/${todoId}`);
      getTodo(); // Atualiza a lista de todos após exclusão
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  useEffect(() => {
    // Carregar targets na inicialização
    getTarget();
  }, []);

  // Função para lidar com o clique no target e buscar os TODOs
  const handleTargetClick = (targetId: number) => {
    setSelectedTargetId(targetId);

    // Encontrar o target no estado e obter seus TODOs
    const selectedTarget = targets.find((target) => target.id === targetId);

    // Se existir, setar o array de TODOs deste target
    if (selectedTarget) {
      setTodos(selectedTarget.todo);
    } else {
      setTodos([]);
    }
  };

  return (
    <div className="App">
        <header className='app-header'>
          <h1>TODO APP</h1>
        </header>
      <div className="all-content">
      <div className="gets">
        <div className="target-list">
          <h1>Lista de Targets</h1>
          {targets.length === 0 ? (
            <p>Carregando targets...</p>
          ) : (
            <ul>
              {targets.map((target) => (
                <li key={target.id} onClick={() => handleTargetClick(target.id)}>
                  <h3>{target.title}</h3>
                  <p>{target.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        
        <div className="todo-list">
          <h2>Lista de TODOS para o Target Selecionado</h2>
          {selectedTargetId === null ? (
            <p>Selecione um target para ver seus TODOS</p>
          ) : todos.length === 0 ? (
            <p>Sem TODOS para este target</p>
          ) : (
            <ul>
              {todos.map((todo) => (
                <li key={todo.id}>
                  <h4>{todo.title}</h4>
                  <p>{todo.description}</p>
                  <p>Status: {todo.isComplete ? 'Completo' : 'Incompleto'}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="post">
        <h2>Criar Target</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postTarget();
          }}
        >
          <input
            type="text"
            placeholder="Título do Target"
            value={targetTitle}
            onChange={(e) => setTargetTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Descrição do Target"
            value={targetDescription}
            onChange={(e) => setTargetDescription(e.target.value)}
            required
          />
          <button type="submit">Criar Target</button>
        </form>

        <h2>Criar TODO</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postTodo();
          }}
        >
          <input
            type="text"
            placeholder="Título do TODO"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Descrição do TODO"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="ID do Target"
            value={targetIdForTodo}
            onChange={(e) => setTargetIdForTodo(e.target.value)}
            required
          />
          <button type="submit">Criar TODO</button>
        </form>
      </div>

      <div className="put">
        <h2>Alterar Target</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            putTarget();
          }}
        >
          <input
            type="number"
            placeholder="ID do Target"
            value={targetId}
            onChange={(e) => setTargetId(parseInt(e.target.value))}
            required
          />
          <input
            type="text"
            placeholder="Novo Título do Target"
            value={targetTitle}
            onChange={(e) => setTargetTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nova Descrição do Target"
            value={targetDescription}
            onChange={(e) => setTargetDescription(e.target.value)}
            required
          />
          <button type="submit">Alterar Target</button>
        </form>

        <h2>Alterar TODO</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            putTodo();
          }}
        >
          <input
            type="number"
            placeholder="ID do TODO"
            value={todoId}
            onChange={(e) => setTodoId(parseInt(e.target.value))}
            required
          />
          <input
            type="text"
            placeholder="Novo Título do TODO"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nova Descrição do TODO"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="ID do Target"
            value={targetIdForTodo}
            onChange={(e) => setTargetIdForTodo(e.target.value)}
            required
          />
          <button type="submit">Alterar TODO</button>
        </form>
      </div>

      <div className="delete">
        <h2>Excluir Target</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            deleteTarget();
          }}
        >
          <input
            type="number"
            placeholder="ID do Target para excluir"
            value={targetId}
            onChange={(e) => setTargetId(parseInt(e.target.value))}
            required
          />
          <button type="submit">Excluir Target</button>
        </form>

        <h2>Excluir TODO</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            deleteTodo();
          }}
        >
          <input
            type="number"
            placeholder="ID do TODO para excluir"
            value={todoId}
            onChange={(e) => setTodoId(parseInt(e.target.value))}
            required
          />
          <button type="submit">Excluir TODO</button>
        </form>
      </div>
      </div>
      
    </div>
  );
}

export default App;
