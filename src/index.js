const prompt = require("prompt-sync")();

let listaDeTarefas = [];

function iniciarApp() {
  while (true) {
    console.clear();
    const opcao = menuInicial();
    if (!selecionarOpcao(opcao)) {
      console.clear();
      if (listaDeTarefas) {
        console.log("\nSua lista ficou:\n");
        for (let i = 0; i < listaDeTarefas.length; i++) {
          console.log(`${i + 1}: ${listaDeTarefas[i]}`);
        }
      }
      console.log("\nPrograma encerrado!\n");
      break;
    }
  }
}

function menuInicial() {
  console.log("\n======= Menu =======\n");
  console.log("1. Adicionar uma tarefa");
  console.log("2. Editar uma tarefa");
  console.log("3. Remover uma tarefa");
  console.log("4. Listar todas as tarefas");
  console.log("5. Obter uma tarefa por ID");
  console.log("6. Sair\n");
  console.log("7. Digite uma senha\n");
  const opcao = prompt("Escolha uma das opções acima: ");

  return opcao;
}

function adicionarTarefa() {
  console.clear();
  console.log("\n======= Adicionar uma tarefa =======\n");
  let novaTarefa = prompt("Digite a nova tarefa: ").trim();

  while (!novaTarefa) {
    console.log("\nPor favor, insira uma tarefa válida.");
    novaTarefa = prompt("Digite a nova tarefa: ").trim();
  }

  const tarefaJaExiste = listaDeTarefas
    .map((tarefa) => tarefa.toLowerCase())
    .includes(novaTarefa.toLowerCase());
  if (tarefaJaExiste) {
    console.clear();
    console.log("\nEsta tarefa já existe na lista de tarefas.\n");
  } else {
    const tarefaFormatada =
      novaTarefa.charAt(0).toUpperCase() + novaTarefa.slice(1).toLowerCase();

    listaDeTarefas.push(tarefaFormatada);
    console.log(`\nTarefa "${tarefaFormatada}" adicionada com sucesso!\n`);
  }
}

function editarTarefa() {
  console.clear();
  console.log("\n======= Editar Tarefa =======\n");

  if (listaDeTarefas.length === 0) {
    console.log("A lista de tarefas está vazia.\n");
  } else {
    listarTarefas();
    const idTarefa = parseInt(
      prompt("Digite o ID da tarefa que deseja editar: ")
    );

    if (idTarefa > 0 && idTarefa < listaDeTarefas.length) {
      const novaDescricao = prompt("Digite a nova descrição da tarefa: ");
      const id = idTarefa - 1;
      listaDeTarefas[idTarefa - 1] = novaDescricao;
      console.log("Tarefa editada com sucesso!\n");
    } else {
      console.log("Tarefa não encontrada.\n");
    }
  }
}

function removerTarefa() {
  console.clear();

  const tarefas = listaDeTarefas.length;

  if (!tarefas) {
    const aviso = console.log("\nNão existe nenhuma tarefa cadastrada.\n");
    return aviso;
  }

  console.log("\n====== Remover Tarefas ======");
  console.log("\nQual tarefa você quer deletar?\n");
  listarTarefas();


  
  let pegarId = prompt(
    "Insira a posição da tarefa a qual deseja remover: "
  ).trim();

  const id = Number(pegarId);

  if (id === 1) {
    console.clear();
    listaDeTarefas.shift();
    console.log("\nTarefa Removida com sucesso!\n");
  }
  if (id > 1 && id <= tarefas) {
    console.clear();
    listaDeTarefas.splice(id - 1, 1);
    console.log("\nTarefa Removida com sucesso!\n");
  }
  if (id > tarefas || id <= 0) {
    console.clear();
    console.log("\nErro: Posição Inválida.\n");
  }
}

function listarTarefas() {
  console.clear();
  if (listaDeTarefas.length === 0) {
    console.log(`\nNenhuma tarefa registrada.\n`);
    const resposta = prompt(
      'Deseja adicionar uma tarefa? "S" para adicionar ou "N" para parar: '
    );
    if (resposta.toLowerCase().trim() === "s") {
      adicionarTarefa();
    } else if (resposta.toLowerCase().trim() === "n") {
      console.clear();
      return false;
    } else {
      console.clear();
      console.log(
        "\nAção incorreta. Por favor, digite 'S' para continuar ou 'N' para parar.\n"
      );
    }
  } else {
    console.log(`\n======= Tarefas =======\n`);
    for (const tarefa of listaDeTarefas) {
      console.log(`- ${tarefa}`);
    }
    console.log("\n");
  }
}

function obterTarefaPorId() {
  console.clear();
  console.log("======= Obter Tarefa por ID =======");

  if (listaDeTarefas.length === 0) {
    console.log("A lista de tarefas está vazia.");
  } else {
    listarTarefas();
    const posicaoTarefa = parseInt(
      prompt("Digite a posição da tarefa que deseja obter: ")
    );
    const posicaoDoItem = Number(posicaoTarefa) - 1;
    if (posicaoDoItem >= 0 && posicaoDoItem < listaDeTarefas.length) {
      console.clear();
      const tarefaEncontrada = listaDeTarefas[posicaoDoItem];
      console.log(
        `\nTarefa encontrada (Posição ${
          posicaoDoItem + 1
        }): ${tarefaEncontrada}.\n`
      );
    } else {
      console.log("Tarefa não encontrada. Posição inválida.\n");
    }
  }
}

function querContinuar() {
  while (true) {
    const resposta = prompt(
      'Deseja continuar? Digite "S" para continuar ou "N" para parar: '
    );
    if (resposta.toLowerCase().trim() === "s") {
      return true;
    } else if (resposta.toLowerCase().trim() === "n") {
      return false;
    } else {
      console.clear();
      console.log(
        "Ação incorreta. Por favor, digite 'S' para continuar ou 'N' para parar.\n"
      );
    }
  }
}

function verificarSenha() {
  console.clear();
  console.log("\n======= Verificar Senha =======\n");
  const senha = prompt("Digite a senha: ");

  const senhaCorreta = 'mopucmuuohnagecov';

  if (senha === senhaCorreta) {
    console.log( `${senhaCorreta.split("").reverse().join("")}`);
  } else {
    console.log("\nSenha incorreta. Acesso negado!\n");
  }
}



function selecionarOpcao(op) {
  switch (op) {
    case "1":
      adicionarTarefa();
      break;
    case "2":
      editarTarefa();
      break;
    case "3":
      removerTarefa();
      break;
    case "4":
      listarTarefas();
      break;
    case "5":
      obterTarefaPorId();
      break;
    case "6":
      return false;
    case "7":
      verificarSenha();
      break;
    default:
      console.clear();
      console.log("\nOpção inválida.\n");
  }

  if (querContinuar()) {
    return true;
  } else {
    return false;
  }
}

iniciarApp();
