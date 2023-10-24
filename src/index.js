const prompt = require('prompt-sync')();

let listaDeTarefas = [];

function iniciarApp() {
  while (true) {
    const opcao = menuInicial();
    if (!selecionarOpcao(opcao)) {
      console.log("\nPrograma encerrado!")
      break;
    }
  }
}

function querContinuar() {
  while (true) {
    const resposta = prompt('Deseja continuar? Digite "S" para continuar ou "N" para parar: ');
    if (resposta.toLowerCase().trim() === 's') {
      return true;
    } else if (resposta.toLowerCase().trim() === 'n') {
      return false;
    } else {
      console.log("Ação incorreta. Por favor, digite 'S' para continuar ou 'N' para parar.");
    }
  }
}

function menuInicial() {
  console.log("\n======= Menu =======");
  console.log("1. Adicionar uma tarefa");
  console.log("2. Editar uma tarefa");
  console.log("3. Remover uma tarefa");
  console.log("4. Listar todas as tarefas");
  console.log("5. Obter uma tarefa por ID");
  console.log("6. Sair");
  const opcao = prompt('Escolha uma das opções acima: ');

  return opcao;
}

function selecionarOpcao(op) {
  switch (op) {
    case '1':
      adicionarTarefa();
      break;
    case '2':
      console.log("\nTestando a opção 2");
      break;
    case '3':
      console.log("\nTestando a opção 3");
      break;
    case '4':
      console.log(listaDeTarefas);
      break;
    case '5':
      console.log("\nTestando a opção 5");
      break;
    case '6':
      console.log("\nPrograma encerrado!");
      return false;
    default:
      console.log("\nOpção inválida");
  }

  if (querContinuar()) {
    return true;
  } else {
    return false;
  }
}

function adicionarTarefa() {

  console.log("\n======= Adicionar uma tarefa =======");
  let novaTarefa = prompt('Digite a nova tarefa: ').trim(); // trim() elimina espaços desnecessários na string

  // Valida a entrada e repete caso seja inválido
  while (!novaTarefa || novaTarefa.length === 0) {
    console.log("\nPor favor, insira uma tarefa válida.");
    novaTarefa = prompt('Digite a nova tarefa: ').trim();
  }

  // Valida se a tarefa adicionada já existe 
  const tarefaJaExiste = listaDeTarefas.map(tarefa => tarefa.tarefa.toLowerCase()).includes(novaTarefa.toLowerCase());
  if (tarefaJaExiste) {
    console.log("\nEsta tarefa já existe na lista de tarefas.");
  } else {
    const tarefaFormatado = novaTarefa.charAt(0).toUpperCase() + novaTarefa.slice(1).toLowerCase(); 
    //criando o objeto
    const novaTarefaObjeto = {
      id: listaDeTarefas.length + 1,
      tarefa: tarefaFormatado
    };
    //adicionando o objeto na lista de tarefas
    listaDeTarefas.push(novaTarefaObjeto);
    console.log(`\nTarefa "${tarefaFormatado}" adicionada com sucesso com ID ${novaTarefaObjeto.id}!`); //mensagem de confirmação
  }
}

iniciarApp();