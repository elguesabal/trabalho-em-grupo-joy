function validarInput(email, mensagem) {
	const erroEmail = document.getElementById("erroEmail");
	const erroMensagem = document.getElementById("erroMensagem");

	erroEmail.innerText = "";
	erroMensagem.innerText = "";
	if (email == "") {
		erroEmail.innerText = "Caixa de email em branco!";
		return 1;
	} else if (email.includes("@") == false || email.includes(".com") == false) {
		erroEmail.innerText = "Dominío do email ausente!";
		return 1;
	} else if (mensagem == "") {
		erroMensagem.innerText = "Caixa de mensagem em branco!";
		return 1;
	} else if (mensagem.length < 20) {
		erroMensagem.innerText = "Mensagem muito curta! Tente descrever ao máximo o motivo do seu contato.";
		return 1;
	}
	return 0;
}

function animacaoEnviar(span, botao, icone) {
	span.style.display = "none";
	botao.style.width = "3rem";
	botao.style.height = "3rem";
	botao.style.borderRadius = "50%";
	icone.classList.remove("ri-check-line");
	icone.classList.remove("ri-close-line");
	icone.classList.add("ri-refresh-line");
	icone.style.animation = "rotacao 2s linear infinite";
}

function enviarEmail(url, email, mensagem, botao, icone) {
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

	fetch(url, options)
	.then(res => {return res.text()})
	.then(res => {
		setTimeout(() => {
			icone.style.animation = "none";
			icone.classList.remove("ri-refresh-line");
			botao.disabled = true;
			res == "sucess" ? icone.classList.add("ri-check-line") : icone.classList.add("ri-close-line");
		}, 2000);
	})
	.catch(error => {
		setTimeout(() => {
			icone.style.animation = "none";
			icone.classList.remove("ri-refresh-line");
			icone.classList.add("ri-close-line");
		}, 2000);
	});
}

document.getElementById('form').addEventListener('submit', (event) => {
	event.preventDefault();
	const email = document.getElementById("email").value;
	const mensagem = document.getElementById("mensagem").value;
	const span = document.getElementById("spanSubmit");
	const botao = document.getElementById("submit");
	const icone = document.getElementById("iconeForm");

	if (validarInput(email, mensagem) != 0) {
		return ;
	}
	animacaoEnviar(span, botao, icone);
	enviarEmail("https://api-email-joy.vercel.app/mensagem", email, mensagem, botao, icone);
});
