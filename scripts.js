// 1. Pegar os elementos do HTML que vamos usar
const tarefaInput = document.getElementById('TarefaInput');
const adicionarBtn = document.getElementById('adicionarBtn');
const listaTarefas = document.getElementById('ListaTarefas');
// 2. Array (lista) para guardar as tarefas na memória
let tarefas = [];

// 3. Carregar tarefas salvas do navegador quando a página abrir
function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('minhasTarefas');
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
        renderizarTarefas();
    }
}

// 4. Salvar tarefas no navegador (localStorage)
function salvarTarefas() {
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
}

// 5. Adicionar uma nova tarefa
  function adicionarTarefa() {
    const texto = tarefaInput.value.trim(); // Pega o texto e remove espaços extras
    
    if (texto === '') {
        alert('Digite uma tarefa válida!');
        return;
    }
    
    // Criar objeto da tarefa
    const novaTarefa = {
        id: Date.now(), // ID único baseado no horário atual
        texto: texto,
        concluida: false
    };
    
    tarefas.push(novaTarefa); // Adiciona ao array
    salvarTarefas(); // Salva no navegador
    renderizarTarefas(); // Atualiza a tela
    tarefaInput.value = ''; // Limpa o input
    tarefaInput.focus(); // Volta o cursor para o input
}

// 6. Remover uma tarefa
function removerTarefa(id) {
    // Filtra o array, mantendo apenas tarefas com ID diferente do que queremos remover
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    salvarTarefas();
    renderizarTarefas();
}

// 7. Marcar/Desmarcar tarefa como concluída
function toggleTarefa(id) {
    // Encontra a tarefa pelo ID e inverte o status 'concluida'
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        salvarTarefas();
        renderizarTarefas();
    }
}

// 8. Mostrar as tarefas na tela (Renderizar)
function renderizarTarefas() {
    // Limpa a lista antes de renderizar de novo
    listaTarefas.innerHTML = '';
    
    // Percorre todas as tarefas e cria elementos HTML para cada uma
    tarefas.forEach(tarefa => {
        // Criar o <li>
        const li = document.createElement('li');
        li.className = 'tarefa-item';
        
        // Criar o <span> que vai conter o texto
        const textoSpan = document.createElement('span');
        textoSpan.className = 'tarefa-texto';
        if (tarefa.concluida) {
            textoSpan.classList.add('tarefa-concluida');
        }
        textoSpan.textContent = tarefa.texto;
        
        // Adicionar evento de clique no texto para marcar como concluída
        textoSpan.onclick = () => toggleTarefa(tarefa.id);
        
        // Criar o botão de deletar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => removerTarefa(tarefa.id);
        
        // Montar o item da lista
        li.appendChild(textoSpan);
        li.appendChild(deleteBtn);
        listaTarefas.appendChild(li);
    });
}

// 9. Configurar os eventos (o que acontece quando o usuário interage)
adicionarBtn.addEventListener('click', adicionarTarefa);

// Permite adicionar tarefa apertando a tecla "Enter"
tarefaInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});

// 10. Inicializar o app: carregar tarefas salvas quando a página abrir
carregarTarefas();                                                                           