import React, { useState, useEffect } from 'react'
import "./ListaDeTarefas.css"

import firebase from './firebaseConfig'
import Navbar from './Navbar';

import TaskAPI from './daoTask';

let userId = null;

function ListaDeTarefas() {
    //let userId = 'unkn'

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            userId = user.uid

        } else {
            window.location.href = "/cadastro"
        }
    })

    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState('');
    const [novaQtde, setNovaQtde] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {

        const fetchTasks = async () => {
        try {
            const tasksFromAPI = await TaskAPI.readTasks(userId);
            setTarefas(tasksFromAPI);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
        };

        fetchTasks();
    }, [tarefas]);

    const adicionarTarefa = async () => {
        try {
          const newTaskId = await TaskAPI.createTask({ "descricao": novaTarefa, "quantidade": novaQtde}, userId);
          // Atualize a lista de tarefas após a adição
          const updatedTasks = [...tarefas, { id: newTaskId, descricao: novaTarefa, quantidade: novaQtde },userId];
          setTarefas(updatedTasks);
          setNovaTarefa('');
          setNovaQtde('');

          setMostrarFormulario(false);
          //setNewTaskTitle(''); // Limpa o campo de entrada após a adição da tarefa
        } catch (error) {
          console.error('Erro ao adicionar tarefa:', error);
        }
      };

    const removerTarefa = async (taskId,userId) => {
        try {
          await TaskAPI.deleteTask(taskId,userId);
          // Atualize a lista de tarefas após a remoção
          const updatedTasks = tarefas.filter(task => task.id !== taskId);
          setTarefas(updatedTasks);
        } catch (error) {
          console.error('Erro ao excluir tarefa:', error);
        }
      };

    return (
        
        <div className="lista-de-tarefas">
            <Navbar />
            {mostrarFormulario && (
                <div className="adicionar-tarefa">
                    <input
                        type="text"
                        value={novaTarefa}
                        onChange={(e) => setNovaTarefa(e.target.value)}
                        placeholder="Digite um produto"
                    />
                    <input 
                        type='number'
                        value={novaQtde}
                        onChange={(e) => setNovaQtde(e.target.value)}
                        placeholder='Digite a quantidade'
                    />
                    <button onClick={adicionarTarefa}>Adicionar</button>
                </div>
            )}
            {!mostrarFormulario && (
                <button className="botao-flutuante" onClick={() => setMostrarFormulario(true)}>+</button>
            )}
            <ul class='input-tarefa'>
                {tarefas.map(task => (
                    <li key={task.id} className="tarefa">
                        <div>{task.descricao} - Quantidade: {task.quantidade}</div>
                        <div className="remover-tarefa" onClick={() => removerTarefa(task.id,userId)}>Excluir</div>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default ListaDeTarefas