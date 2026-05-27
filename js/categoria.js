
const ref = db.ref("categoria");
let idcapturado = null;
$("#cancelar").hide();


$("#salvar").click(function () {
    let nome = $("#nome").val().toUpperCase();
    let Informacoes = $("#Informacoes").val();

    if (nome === "" || Informacoes === "") {
        alert('Preencha todos os campos');
        return;
    }


 if (idcapturado) {//editar
        ref.child(idcapturado).update({ nome, Informacoes });
        idcapturado = null;
        $("#salvar").text("Salvar");

        $("#cancelar").hide();
         $("#salvar").removeClass("btn-success").addClass("btn-primary");
         $("#status"). text("");

    } else {//salvar
        ref.push({ nome, Informacoes });
    }


    ref.push({ nome, Informacoes });

    limpar();
});

ref.on("value", dados_tabela => {
    $('#lista').empty();
    $("#lista").append(`
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Informações</th>
                <th colspan="2">Opções</th>
            </tr>
            `);

    dados_tabela.forEach(registro => {
        let reg = registro.val();
        let id = registro.key;
        
        $("#lista").append(`
            <tr>
                <td>${id}</td>
                <td>${reg.nome}</td>
                <td>${reg.Informacoes}</td>
                <td>
                     <button class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class ="btn btn-warning btn-sm" onclick="editar('${id}','${reg.nome}','${reg.Informacoes}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            </tr>
            `);
    });
});



function limpar() {
    $("#nome").val("");
    $("#Informacoes").val("");
    $("#nome").focus();
};

function editar(id, nome, Informacoes) {
    $("#nome").val(nome);
    $("#Informacoes").val(Informacoes);

    idcapturado = id;

    $("#cancelar").show();

    $("#salvar")
        .text("Atualizar")
        .removeClass("btn-primary")
        .addClass("btn-success");

    $("#status"). text("Editando registro...");
}


