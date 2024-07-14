function validarInput(email, mensagem) {
	if (email == "" || mensagem == "") {
		return 1;
	}
	return 0;
}

function animacaoEnviar(span, botao, icone) {
	span.style.display = "none";
	botao.style.width = "3rem";
	botao.style.height = "3rem";
	botao.style.borderRadius = "50%";
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
			icone.classList.remove("ri-check-line");
			icone.classList.remove("ri-close-line");
			botao.disabled = true;
			if (res == "sucess") {
				icone.classList.add("ri-check-line");
			} else if (res == "error") {
				icone.classList.add("ri-close-line");
			}
		}, 2000);
	})
	.catch(error => {
		setTimeout(() => {
			icone.style.animation = "none";
			icone.classList.remove("ri-refresh-line");
			icone.classList.remove("ri-check-line");
			icone.classList.add("ri-close-line");
		}, 2000);
	});
}

document.getElementById('form').addEventListener('submit', (event) => {
	event.preventDefault();
	const email = document.getElementById("email").value;
	const mensagem = document.getElementById("mensagem").value;
	const botao = document.getElementById("submit");
	const span = document.getElementById("spanSubmit");
	const icone = document.getElementById("iconeForm");

	if (validarInput(email, mensagem) != 0) {
		return ;
	}

	animacaoEnviar(span, botao, icone);

	enviarEmail("https://api-email-joy.vercel.app/mensagem", email, mensagem, botao, icone);
});
