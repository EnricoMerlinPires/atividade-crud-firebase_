const ref = db.ref("fornecedores");

let idcapturado = null;
$("#cancelar").hide();



$("#salvar").click(function () {
    let nome = $("#nome").val();
    let cnpj = $("#cnpj").val();
    let email = $("#email").val();
    let estado = $("input[name='estado']:checked").val();

    if (nome === "" || cnpj === "" || email === "" || !estado) {
        alert('Preencha todos os campos');
        return;
    }

    
    if (idcapturado) {//editar
        ref.child(idcapturado).update({ nome, email, cnpj, estado });
        idcapturado = null;
        $("#salvar").text("Salvar");

        $("#cancelar").hide();
         $("#salvar").removeClass("btn-success").addClass("btn-primary");
         $("#status"). text("");

    } else {//salvar
       ref.push({ nome, email, cnpj, estado });
    }

    

    limpar();
});


//--------------------------------------------------------


ref.on("value", dados_tabela => {
    $('#lista').empty();

    $("#lista").append(`
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                 <th>Cnpj</th>
                  <th>Estado</th>
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
                <td>${reg.email}</td>
                <td>${reg.cnpj}</td>
                <td>${reg.estado}</td>
                <td>
                    <button class ="btn btn-danger btn-sm">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                     <button class="btn btn-outline-warning btn-sm" onclick="editar('${id}','${reg.nome}','${reg.email}','${reg.cnpj}', '${reg.estado}',)">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            </tr>
            `);
    });
});





//--------------------------------------------------------


function limpar() {
    $("#nome").val("");
    $("#email").val("");
    $("#cnpj").val("");
    $("input[name='estado']").prop("checked", false);
    $("#cnpj").val();
    $("#nome").focus();
    
};


function editar(id, nome, email, cnpj, input, ) {
    $("#nome").val(nome);
    $("#email").val(email);
    $("#cnpj").val(cnpj);
    $("#input").val(input);
    

    idcapturado = id;

    $("#cancelar").show();

    $("#salvar")
        .text("Atualizar")
        .removeClass("btn-primary")
        .addClass("btn-success");

    $("#status"). text("Editando registro...");
}