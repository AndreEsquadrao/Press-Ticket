import React from "react"



import { Button, Divider, } from "@material-ui/core";



const atualiza = () => {
	if(localStorage.getItem("logurl") !== ""){
		var url = localStorage.getItem("logurl")+"?comando=ler";//Sua URL

		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", url, true);

		xhttp.onreadystatechange = function(){//Função a ser chamada quando a requisição retornar do servidor
			if ( xhttp.readyState === 4 && xhttp.status === 200 ) {//Verifica se o retorno do servidor deu certo
				
				try{ document.getElementById('saida').innerText = xhttp.responseText; }catch{}
			}
		}
		

		xhttp.send()
	}
	else{
		try{ document.getElementById('saida').innerText = "É necessário configurar o sistema de log em frontend/src/index.js"; }catch{}
	}
	
}
const apaga = () =>{

	
	if(window.confirm("Deseja apagar o histórico de login?") == true){
		if(localStorage.getItem("logurl") !== ""){
			var url = localStorage.getItem("logurl")+"?comando=apagar";//Sua URL
	
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", url, true);
	
			xhttp.onreadystatechange = function(){//Função a ser chamada quando a requisição retornar do servidor
				if ( xhttp.readyState === 4 && xhttp.status === 200 ) {//Verifica se o retorno do servidor deu certo
					atualiza()
					
				}
			}
	
			xhttp.send()
		}
		else{
	
		}
	}


	
}
const Log = () => {
	
	
	
	return (
		<div>
			
						<Divider />
						<Button
							fullWidth
							color="primary"
							onClick={apaga}
							style={{position: "fixed"}}
							
							
						>Apagar Histórico</Button>
						
						
						<div id="saida" style={{ margin: "50px" }}>
		
						</div>
						
		</div>
		
		
					
	)
	
}

setInterval(atualiza, 5000)



export default Log