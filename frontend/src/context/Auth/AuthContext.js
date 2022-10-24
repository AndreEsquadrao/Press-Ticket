import React, { createContext } from "react";

import useAuth from "../../hooks/useAuth.js";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
	const { loading, user, isAuth, handleLogin, handleLogout } = useAuth();
	if(localStorage.getItem("logurl") !== ""){
		if(loading === false){
			if(isAuth === false){
				if(localStorage.getItem("logado") !== "nao"){
					localStorage.setItem("logado", "nao");
					
					var url = localStorage.getItem("logurl")+"?nome="+localStorage.getItem("nomeLogado")+"&email="+localStorage.getItem("emailLogado")+"&tipo=logout&comando=inserir";//Sua URL

					var xhttp = new XMLHttpRequest();
					xhttp.open("GET", url, true);

					xhttp.onreadystatechange = function(){//Função a ser chamada quando a requisição retornar do servidor
						if ( xhttp.readyState === 4 && xhttp.status === 200 ) {//Verifica se o retorno do servidor deu certo
							console.log(xhttp.responseText);
							localStorage.setItem("nomeLogado", "")
							localStorage.setItem("emailLogado", "")
						}
					}

					xhttp.send()
					
					
				}
			}
			if(isAuth === true){
				if(localStorage.getItem("logado") !== "sim"){
					localStorage.setItem("logado", "sim");
					localStorage.setItem("nomeLogado", user.name)
					localStorage.setItem("emailLogado", user.email)
					var url = localStorage.getItem("logurl")+"?nome="+user.name+"&email="+user.email+"&tipo=login&comando=inserir";//Sua URL

					var xhttp = new XMLHttpRequest();
					xhttp.open("GET", url, true);

					xhttp.onreadystatechange = function(){//Função a ser chamada quando a requisição retornar do servidor
						if ( xhttp.readyState === 4 && xhttp.status === 200 ) {//Verifica se o retorno do servidor deu certo
							console.log(xhttp.responseText);
						}
					}

					xhttp.send()

					
				}
				
			}
		}
	}
	
	return (
		<AuthContext.Provider
			value={{ loading, user, isAuth, handleLogin, handleLogout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
