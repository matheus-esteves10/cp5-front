import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
   
  //interfaces
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
    }

  const baseUrl = 'https://todo-caio.azurewebsites.net/api/';
  const [target, setTargets] = useState<Target>();
  const [todo, setTodo] = useState<Todo>();
  const [todoId, setTodoId] = useState<number>(0);
  const [targetId, setTargetId] = useState<number>(0);
  const [targetTitle, setTargetTitle] = useState('');
  const [targetDescription, setTargetDescription] = useState('');
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [targetIdForTodo, setTargetIdForTodo] = useState('');


  const requestBase = axios.create({
    baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json', 
      },  
    })

    //REAQUISIÇÕES TARGET

    const getTarget = async () => {
      try {
        const response = await requestBase.get('Targets');   
        setTargets(response.data); // Armazena os dados recebidos no estado
        
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
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    const putTarget = async () => {
      try {
        const response = await requestBase.put(`targets/${targetId}`,{
          id: targetId,
          tittle: 'Comecando o cp',
          isComplete: false,
          description: 'Estou criando todos endpoints',
          todo: []

        })
      } catch (error) {
        console.error('Erro na requisição:', error)
      
      };
    }
    
    const deleteTarget = async () => {
      try {
        const response = await requestBase.delete(`targets/${targetId}`);
        setTargets(response.data)
      } catch (error) {
        console.error('Erro na requisição:', error);
      
      }
    }

    const getTargetById = async() => {
      try{
        const response = await requestBase.get(`targets/${targetId}`);   
        setTargets(response.data); // Armazena os dados recebidos no estado

      } catch (error) {
        console.error('Erro na requisição:', error);
      
      }
    }

    //REAQUISIÇÕES TODO

    const getTodo = async () => {
      try {
        const response = await requestBase.get('Todo');   
        setTodo(response.data); // Armazena os dados recebidos no estado
        
      } catch (error) {
          console.error('Erro na requisição:', error);
        
        } 
      };

      const getTodoById = async() => {
        try{
          const response = await requestBase.get(`todo/${todoId}`);   
          setTodo(response.data); // Armazena os dados recebidos no estado
  
        } catch (error) {
          console.error('Erro na requisição:', error);
        
        }
      }

      const postTodo = async () => {
        try {
          const response = await requestBase.post('Todo', {
            title: todoTitle,
            description: todoDescription,
            isComplete: false,
            targetId: parseInt(targetIdForTodo), 
          });
          console.log(response.data);
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      };
      
    const putTodo = async () => {   
      try {
        const response = await requestBase.put(`Todo/${todoId}`, {
        id: todoId,
        title: 'Segundo',
        description: 'Montar a estrutura do request - URL e Headers',
        isComplete: false,
        targetId: 22
        });
          console.log(response.data);
      
      } catch (error) {
        console.error('Erro na requisição:', error)
   
      };
    };
      
    const DeleteTodo = async () => {
      try {
        const response = await requestBase.delete(`todo/${todoId}`);
        setTodo(response.data); // Armazena os dados recebidos no estado
      
      } catch (error) {
        console.error('Erro na requisição:', error);
      
      }
      
    };



    return (
      <>
      <div className="App">
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
      </>
    );
  }

export default App
