import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import App from "./App";
let inatividade
ReactDOM.render(
	<CssBaseline>
		<App />
	</CssBaseline>,
	document.getElementById("root")
);
localStorage.setItem("logurl", "")



////////////CONFIGURAÇÃO DO LOG DE LGOIN E LOGOUT////////////////
//copie o arquivo "log.php" localizado em frontend/src/ para para seu servidor PHP
//////adicione a url do arquivo log.php 
const logUrl = "https://esquadraodavidapg.com.br/gerente/log.php"

localStorage.setItem("logurl", logUrl)


//////////marcar como logout ao fechar a janela
if(localStorage.getItem("logurl") !== ""){
	window.onbeforeunload = () => { 
		if(localStorage.getItem("logado") === "sim"){
			var url = localStorage.getItem("logurl")+"?nome="+localStorage.getItem("nomeLogado")+"&email="+localStorage.getItem("emailLogado")+"&tipo=logout&comando=inserir";//Sua URL
			localStorage.setItem("logado", "nao");
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", url, true);

			xhttp.onreadystatechange = function(){
				if ( xhttp.readyState === 4 && xhttp.status === 200 ) {
					localStorage.setItem("nomeLogado", "")
					localStorage.setItem("emailLogado", "")
				}
			}

			xhttp.send()
		}
	};
}


///tempo de inatividade em segundos

const inatividadeTempo = 1800

//////////////////////////////
function desloga(){
	try{
	document.querySelectorAll('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit')[2].click()
	document.querySelectorAll('.MuiButtonBase-root.MuiListItem-root.MuiMenuItem-root.MuiMenuItem-gutters.MuiListItem-gutters.MuiListItem-button')[1].click()
	}catch{}
}
inatividade = setTimeout(function(){
 desloga()
},inatividadeTempo*1000)
document.addEventListener('keydown', function(){
	clearTimeout(inatividade)
	inatividade = setTimeout(function(){
		desloga()
	},inatividadeTempo*1000)
});
document.addEventListener('mousemove', function(){
	clearTimeout(inatividade)
	inatividade = setTimeout(function(){
		desloga()
	},inatividadeTempo*1000)
});




////////////////////////////////////////
// ReactDOM.render(
// 	<React.StrictMode>
// 		<CssBaseline>
// 			<App />
// 		</CssBaseline>,
//   </React.StrictMode>

// 	document.getElementById("root")
// );
