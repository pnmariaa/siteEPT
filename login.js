const tabs = document.querySelectorAll("[data-auth-tab]");
const loginForm = document.getElementById("form-login");
const cadastroForm = document.getElementById("form-cadastro");
const loginMsg = document.getElementById("login-msg");
const cadastroMsg = document.getElementById("cadastro-msg");

function mostrarFormulario(tipo) {
  tabs.forEach((tab) => {
    tab.classList.toggle("ativo", tab.dataset.authTab === tipo);
  });

  loginForm.classList.toggle("ativo", tipo === "login");
  cadastroForm.classList.toggle("ativo", tipo === "cadastro");
  loginMsg.textContent = "";
  cadastroMsg.textContent = "";
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => mostrarFormulario(tab.dataset.authTab));
});

cadastroForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const usuario = {
    nome: document.getElementById("cadastro-nome").value,
    email: document.getElementById("cadastro-email").value,
    turma: document.getElementById("cadastro-turma").value,
    senha: document.getElementById("cadastro-senha").value
  };

  localStorage.setItem("usuario3cpm", JSON.stringify(usuario));
  cadastroMsg.textContent = "Cadastro realizado com sucesso!";
  cadastroForm.reset();
  mostrarFormulario("login");
  loginMsg.textContent = "Agora faça login com seu e-mail e senha.";
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario3cpm"));
  const email = document.getElementById("login-email").value;
  const senha = document.getElementById("login-senha").value;

  if (!usuarioSalvo) {
    loginMsg.textContent = "Nenhum cadastro encontrado. Crie sua conta primeiro.";
    mostrarFormulario("cadastro");
    cadastroMsg.textContent = "Preencha os dados para criar sua conta.";
    return;
  }

  if (usuarioSalvo.email === email && usuarioSalvo.senha === senha) {
    loginMsg.textContent = `Bem-vindo(a), ${usuarioSalvo.nome}!`;
    loginForm.reset();
  } else {
    loginMsg.textContent = "E-mail ou senha incorretos.";
  }
});
