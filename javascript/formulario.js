function validarInput(email, mensagem) {
	if (email == "" || mensagem == "") {
		return 1;
	}
	return 0;
}

function enviarEmail(url, email, mensagem) {
const options = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		email: email,
		mensagem: mensagem
	})
};

console.log(options.body)

fetch(url, options)
	.then(response => {
		if (!response.ok) {
			throw new Error('Erro na requisição');
		}
		return response.json();
	})
	.then(data => {
		console.log('Resposta recebida:', data);
	})
	.catch(error => {
		console.error('Erro:', error);
	});
}

function animacaoEnviar(response) {

}



const botao = document.getElementById("submit");
document.getElementById('form').addEventListener('submit', function(event) {
	event.preventDefault();

	botao.style.width = "3rem";
	botao.style.height = "3rem";
	botao.style.borderRadius = "50%";


	const email = document.getElementById("email").value;
	const mensagem = document.getElementById("mensagem").value;

	if (validarInput(email, mensagem) != 0) {
		return ;
	}

	enviarEmail("https://api-email-joy.vercel.app/mensagem", email, mensagem);


});
