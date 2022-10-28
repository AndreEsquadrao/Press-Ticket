import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import openSocket from "../../services/socket-io";

import { toast } from "react-toastify";

import { i18n } from "../../translate/i18n";
import api from "../../services/api";
import toastError from "../../errors/toastError";
const socket = openSocket();
const useAuth = () => {
	const history = useHistory();
	const [isAuth, setIsAuth] = useState(false);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({});
	if(loading === false){
		if(isAuth === true){
			//logou
			let data = new Date();
			let diaHoje = ("0" + data.getDate()).slice(-2);
			let mesHoje = ("0" + (data.getMonth() + 1)).slice(-2);
			let anoHoje = data.getFullYear();
			let horaHoje = ("0" + data.getHours()).slice(-2);
			let minutosHoje = ("0" + data.getMinutes()).slice(-2);
			let segundosHoje = ("0" + data.getSeconds()).slice(-2);
			localStorage.setItem("userName", user.name)
			localStorage.setItem("userEmail", user.email)
			if(localStorage.getItem("fechado")){

				if(localStorage.getItem("fechado") !== ""){
					let retro = localStorage.getItem("fechado");
					localStorage.setItem("fechado", "");
					socket.emit("saida", {
						"data": diaHoje+"-"+mesHoje+"-"+anoHoje,
						"registro": `<tr class="MuiTableRow-root"><td class="MuiTableCell-root MuiTableCell-body MuiTableCell-alignCenter MuiTableCell-sizeSmall">`+localStorage.getItem("prevEmail")+`</td><td class="MuiTableCell-root MuiTableCell-body MuiTableCell-alignCenter MuiTableCell-sizeSmall" style="color: rgb(0, 0, 255);">`+localStorage.getItem("prevIn")+`</td><td class="MuiTableCell-root MuiTableCell-body MuiTableCell-alignCenter MuiTableCell-sizeSmall" style="color: rgb(255, 0, 0);">`+retro+`</td></tr>`
					})
				}
			}
			localStorage.setItem("dataSaida", "");
			localStorage.setItem("logado", "sim");
			localStorage.setItem("dataEntrada", diaHoje+"-"+mesHoje+"-"+anoHoje+" "+horaHoje+":"+minutosHoje+":"+segundosHoje)
			socket.emit("entrada", {
				"registro": "entrou no login"
			})
		}
	}
	api.interceptors.request.use(
		config => {
			const token = localStorage.getItem("token");
			if (token) {
				config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
				setIsAuth(true);
			}
			return config;
		},
		error => {
			Promise.reject(error);
		}
	);

	api.interceptors.response.use(
		response => {
			return response;
		},
		async error => {
			const originalRequest = error.config;
			if (error?.response?.status === 403 && !originalRequest._retry) {
				originalRequest._retry = true;

				const { data } = await api.post("/auth/refresh_token");
				if (data) {
					localStorage.setItem("token", JSON.stringify(data.token));
					api.defaults.headers.Authorization = `Bearer ${data.token}`;
				}
				return api(originalRequest);
			}
			if (error?.response?.status === 401) {
				localStorage.removeItem("token");
				api.defaults.headers.Authorization = undefined;
				setIsAuth(false);
			}
			return Promise.reject(error);
		}
	);

	useEffect(() => {
		const token = localStorage.getItem("token");
		(async () => {
			if (token) {
				try {
					const { data } = await api.post("/auth/refresh_token");
					api.defaults.headers.Authorization = `Bearer ${data.token}`;
					setIsAuth(true);
					setUser(data.user);
				} catch (err) {
					toastError(err);
				}
			}
			setLoading(false);
		})();
	}, []);

	useEffect(() => {
		const socket = openSocket();

		socket.on("user", data => {
			if (data.action === "update" && data.user.id === user.id) {
				setUser(data.user);
			}
		});

		return () => {
			socket.disconnect();
		};
	}, [user]);

	const handleLogin = async userData => {
		
		setLoading(true);

		try {
			const { data } = await api.post("/auth/login", userData);
			localStorage.setItem("token", JSON.stringify(data.token));
			api.defaults.headers.Authorization = `Bearer ${data.token}`;
			setUser(data.user);
			setIsAuth(true);
			toast.success(i18n.t("auth.toasts.success"));
			history.push("/tickets");
			setLoading(false);
		} catch (err) {
			toastError(err);
			setLoading(false);
		}
	};

	const handleLogout = async () => {
		
		setLoading(true);

		try {
			await api.delete("/auth/logout");
			setIsAuth(false);
			setUser({});
			localStorage.removeItem("token");
			api.defaults.headers.Authorization = undefined;
			setLoading(false);
			history.push("/login");
			let data = new Date();
			let diaHoje = ("0" + data.getDate()).slice(-2);
			let mesHoje = ("0" + (data.getMonth() + 1)).slice(-2);
			let anoHoje = data.getFullYear();
			let horaHoje = ("0" + data.getHours()).slice(-2);
			let minutosHoje = ("0" + data.getMinutes()).slice(-2);
			let segundosHoje = ("0" + data.getSeconds()).slice(-2);
			localStorage.setItem("logado", "");
			localStorage.setItem("dataSaida", diaHoje+"-"+mesHoje+"-"+anoHoje+" "+horaHoje+":"+minutosHoje+":"+segundosHoje)
			socket.emit("saida", {
				"data": diaHoje+"-"+mesHoje+"-"+anoHoje,
				"registro": `<tr class="MuiTableRow-root"><td class="MuiTableCell-root MuiTableCell-body MuiTableCell-alignCenter MuiTableCell-sizeSmall">`+localStorage.getItem("userEmail")+`</td><td class="MuiTableCell-root MuiTableCell-body MuiTableCell-alignCenter MuiTableCell-sizeSmall" style="color: rgb(0, 0, 255);">`+localStorage.getItem("dataEntrada")+`</td><td class="MuiTableCell-root MuiTableCell-body MuiTableCell-alignCenter MuiTableCell-sizeSmall" style="color: rgb(255, 0, 0);">`+localStorage.getItem("dataSaida")+`</td></tr>`
			})
		} catch (err) {
			toastError(err);
			setLoading(false);
		}
	};

	return { isAuth, user, loading, handleLogin, handleLogout };
};

export default useAuth;
