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
        title: 'Demo da aula',
        description: 'Mostando como fazer um post com axios',
        isComplete: false,
        todo:[]
          
        });  
        console.log(response.data);   

      } catch (error) {
        console.error('Erro na requisição:', error)
      };   
    }

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
        title: 'Primeiro',
        description: 'Montar a estrutura do request - URL e Headers',
        isComplete: false,
        targetId: 22
        });
        console.log(response.data);
      
      } catch (error) {
        console.error('Erro na requisição:', error)
      
      };
      
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

    </>
  )
}

export default App
