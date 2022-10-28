import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import openSocket from "./services/socket-io";

let data = new Date();
let diaHoje = ("0" + data.getDate()).slice(-2);
let mesHoje = ("0" + (data.getMonth() + 1)).slice(-2);
let anoHoje = data.getFullYear();
const dmy = diaHoje+"-"+mesHoje+"-"+anoHoje;
const socket = openSocket();
socket.emit("checkLog", dmy)


let inatividade
ReactDOM.render(
	<CssBaseline>
		<App />
	</CssBaseline>,
	document.getElementById("root")
);


	window.onbeforeunload = () => { 
		if(localStorage.getItem("logado") === "sim"){
		let data = new Date();
		let diaHoje = ("0" + data.getDate()).slice(-2);
		let mesHoje = ("0" + (data.getMonth() + 1)).slice(-2);
		let anoHoje = data.getFullYear();
		let horaHoje = ("0" + data.getHours()).slice(-2);
		let minutosHoje = ("0" + data.getMinutes()).slice(-2);
		let segundosHoje = ("0" + data.getSeconds()).slice(-2);
		localStorage.setItem("prevEmail", localStorage.getItem("userEmail"))
		localStorage.setItem("fechado", diaHoje+"-"+mesHoje+"-"+anoHoje+" "+horaHoje+":"+minutosHoje+":"+segundosHoje)
		localStorage.setItem("prevIn", localStorage.getItem("dataEntrada"))
		
	}
};
	



// if(localStorage.getItem("logado") !== ""){
// 	socket.emit("entrada", {
// 		"registro": "saindo"
// 	})
// 	window.onbeforeunload = () => { 
// 		localStorage.setItem("logado", "");
// 		let data = new Date();
// 		let diaHoje = ("0" + data.getDate()).slice(-2);
// 		let mesHoje = ("0" + (data.getMonth() + 1)).slice(-2);
// 		let anoHoje = data.getFullYear();
// 		let horaHoje = ("0" + data.getHours()).slice(-2);
// 		let minutosHoje = ("0" + data.getMinutes()).slice(-2);
// 		let segundosHoje = ("0" + data.getSeconds()).slice(-2);
		
// 		localStorage.setItem("dataSaida", diaHoje+"-"+mesHoje+"-"+anoHoje+" "+horaHoje+":"+minutosHoje+":"+segundosHoje)
// 		socket.emit("saida", {
// 			"data": diaHoje+"-"+mesHoje+"-"+anoHoje,
// 			"registro": `<tr class="MuiTableRow-root"><td class="MuiTableCell-root MuiTableCell-body MuiTableCell-alignCenter MuiTableCell-sizeSmall">`+localStorage.getItem("userEmail")+`</td><td class="MuiTableCell-root MuiTableCell-body MuiTableCell-alignCenter MuiTableCell-sizeSmall" style="color: rgb(0, 0, 255);">`+localStorage.getItem("dataEntrada")+`</td><td class="MuiTableCell-root MuiTableCell-body MuiTableCell-alignCenter MuiTableCell-sizeSmall" style="color: rgb(255, 0, 0);">`+localStorage.getItem("dataSaida")+`</td></tr>`
// 		})
// 	};
// }







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
