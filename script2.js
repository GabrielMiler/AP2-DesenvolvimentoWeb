const alvo = '1e9b3eba8d62f12ee39f4c2d9dc4ec84';
const sal = 'ENTRAR';

document.getElementById('botão-entrar').onclick = () => {
    const entrada = document.getElementById('entrada-senha').value; 
    const mensagem = document.getElementById('mensagem');

    if (hex_sha256(entrada + sal) === alvo){
        mensagem.innerHTML = '<h2>Senha correta</h2>';
        sessionStorage.setItem('logado', 1);
        window.location.href = 'pagina_times.html';
    } else {
        mensagem.innerHTML = '<h2 style="color: violet">A senha está errada!!!!!!!!</h2>';
    }
}