$(document).ready(function() {
    function fetchAndDisplayData(url) {
        $("#sessão-jogadores").empty();
        $("#texto-espera").show();
        
        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                $("#texto-espera").hide();
                
                data.forEach(function(player) {
                    $("#sessão-jogadores").append(
                        `<div class="jogador">
                            <img src="${player.imagem}" alt="Imagem de ${player.nome}" class="imagem-jogador" data-jogador='${JSON.stringify(player)}'>
                            <div class="detalhes-jogador">
                                <h3>${player.nome}</h3>
                            </div>
                        </div>`
                    );
                });

                $(".imagem-jogador").on("click", function() {
                    const player = $(this).data("jogador");
                    showModal(player);
                });
            },
            error: function() {
                $("#texto-espera").hide();
                $("#sessão-jogadores").append("<p>Erro ao carregar os dados. Tente novamente.</p>");
            }
        });
    }

    function showModal(player) {
        $("#modal-imagem").attr("src", player.imagem);
        $("#modal-detalhes-jogador").html(
            `<h3>${player.nome}</h3>
            <p><strong>Posição:</strong> ${player.posicao}</p>
            <p><strong>Nascimento:</strong> ${player.nascimento}</p>
            <p><strong>Naturalidade:</strong> ${player.naturalidade}</p>
            <p><strong>Desde de quando está no Botafogo:</strong> ${player.no_botafogo_desde}</p>
            <p><strong>Número de Jogos:</strong> ${player.n_jogos}</p>
            <p><strong>Altura:</strong> ${player.altura}</p>
            <p><strong>Detalhes:</strong> ${player.detalhes}</p>`
        );
        $("#modal-jogador").show();
    }

    $(".botões-da-seleção").on("click", function() {
        const value = $(this).val();
        let url = '';

        switch(value) {
            case 'masculino':
                url = 'https://botafogo-atletas.mange.li/2024-1/masculino';
                break;
            case 'feminino':
                url = 'https://botafogo-atletas.mange.li/2024-1/feminino';
                break;
            case 'all':
                url = 'https://botafogo-atletas.mange.li/2024-1/all';
                break;
        }

        fetchAndDisplayData(url);
    });

    $("#opções").on("change", function() {
        const value = $(this).val();
        let url = '';

        switch(value) {
            case 'masculino':
                url = 'https://botafogo-atletas.mange.li/2024-1/masculino';
                break;
            case 'feminino':
                url = 'https://botafogo-atletas.mange.li/2024-1/feminino';
                break;
            case 'all':
                url = 'https://botafogo-atletas.mange.li/2024-1/all';
                break;
        }

        fetchAndDisplayData(url);
    });

    $("#input-nome").on("input", function() {
        const searchValue = $(this).val().toLowerCase();
        
        $(".jogador").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1);
        });
    });

    $(".close-button").on("click", function() {
        $("#modal-jogador").hide();
    });

    $(window).on("click", function(event) {
        if ($(event.target).is("#modal-jogador")) {
            $("#modal-jogador").hide();
        }
    });
});
