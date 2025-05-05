// Classe Fila (Queue)
class Fila {
  constructor() {
    this.itens = [];
  }

  adicionarAluno(nome) {
    this.itens.push(nome);
    console.log(`Aluno "${nome}" adicionado à fila.`);
  }

  atenderAluno() {
    if (this.itens.length === 0) {
      console.log("Nenhum aluno na fila para atender.");
      return;
    }
    const atendido = this.itens.shift();
    console.log(`Aluno atendido: ${atendido}`);
  }

  proximoAluno() {
    if (this.itens.length === 0) {
      console.log("Fila vazia.");
    } else {
      console.log(`Próximo aluno a ser atendido: ${this.itens[0]}`);
    }
  }

  mostrarFila() {
    console.log("Alunos na fila:", this.itens.length > 0 ? this.itens.join(", ") : "Fila vazia");
  }
}

// Classe Pilha (Stack)
class Pilha {
  constructor() {
    this.itens = [];
  }

  adicionarDocumento(doc) {
    this.itens.push(doc);
    console.log(`Documento "${doc}" adicionado à pilha de urgência.`);
  }

  resolverDocumento() {
    if (this.itens.length === 0) {
      console.log("Nenhum documento para resolver.");
      return;
    }
    const resolvido = this.itens.pop();
    console.log(`Documento resolvido: ${resolvido}`);
  }

  documentoTopo() {
    if (this.itens.length === 0) {
      console.log("Pilha de documentos está vazia.");
    } else {
      console.log(`Documento no topo: ${this.itens[this.itens.length - 1]}`);
    }
  }

  mostrarPilha() {
    console.log("Documentos pendentes:", this.itens.length > 0 ? this.itens.join(", ") : "Nenhum documento pendente");
  }
}

// Execução simulada
const fila = new Fila();
const pilha = new Pilha();

console.log(" Simulando o sistema de fila e pilha...");

// Fila
fila.adicionarAluno("Ana");
fila.adicionarAluno("Bruno");
fila.adicionarAluno("Carlos");
fila.mostrarFila();
fila.proximoAluno();
fila.atenderAluno();
fila.mostrarFila();

// Pilha
pilha.adicionarDocumento("Doc1");
pilha.adicionarDocumento("Doc2");
pilha.adicionarDocumento("Doc3");
pilha.mostrarPilha();
pilha.documentoTopo();
pilha.resolverDocumento();
pilha.mostrarPilha();

// Estado final
console.log(" Estado final do sistema:");
fila.mostrarFila();
pilha.mostrarPilha();
