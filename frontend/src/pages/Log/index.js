import React, { useState, useEffect, useReducer } from "react"

import openSocket from "../../services/socket-io";
import Grid from "@material-ui/core/Grid";
import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import MainHeaderButtonsWrapper from "../../components/MainHeaderButtonsWrapper";
import Title from "../../components/Title";
import TableRowSkeleton from "../../components/TableRowSkeleton";
import UserModal from "../../components/UserModal";
import ConfirmationModal from "../../components/ConfirmationModal";

import { makeStyles } from "@material-ui/core/styles";

import {
	Button,
	IconButton,
	InputAdornment,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Tooltip,
	Select,
	Input
  } from "@material-ui/core";
import { Socket } from "socket.io-client";

const useStyles = makeStyles((theme) => ({
	mainPaper: {
	  flex: 2,
	  padding: theme.spacing(2),
	  margin: theme.spacing(1),
	  overflowY: "scroll",
	  ...theme.scrollbarStyles,
	},
  }));
const socket = openSocket();
const buscaLog = () => {
	socket.emit("log", {
		"data": document.getElementById('data').value.split('-').reverse().join('-')
	})
};
const atLog = () => {
	let data = new Date();
	let diaHoje = ("0" + data.getDate()).slice(-2);
	let mesHoje = ("0" + (data.getMonth() + 1)).slice(-2);
	let anoHoje = data.getFullYear();
	socket.emit("log", {
		"data": diaHoje+"-"+mesHoje+"-"+anoHoje
	})
}
socket.on("retorno", (data) => {
	if(data === " undefined"){
		alert("Nenhum registro nesta data")
	}
	else{
	document.getElementById('corpo').innerHTML = data;
	}
})
const deleta = () =>{
	let r = window.confirm("Deseja deletar o Log mostrado?")
	if(r){
		let data = new Date();
	let diaHoje = ("0" + data.getDate()).slice(-2);
	let mesHoje = ("0" + (data.getMonth() + 1)).slice(-2);
	let anoHoje = data.getFullYear();
	if(document.getElementById('data').value === ""){
		socket.emit("deleta", {
			"data": diaHoje+"-"+mesHoje+"-"+anoHoje
		})
	}
	else{
		socket.emit("deleta", {
			"data": document.getElementById('data').value.split('-').reverse().join('-')
		})
	}
	
	}
}
const Log = () => {
	const classes = useStyles();
	atLog();
	return (
		<MainContainer>
			<MainHeader>
			<Title>LOG </Title>
			<MainHeaderButtonsWrapper>
			<Button
              variant="contained"
              color="primary"
              onClick={deleta}
            >
            APAGAR ESTE LOG
            </Button>
				<Input
					id="data"
					type="date"
					onChange={buscaLog}
					
				/>
				
			</MainHeaderButtonsWrapper>
			</MainHeader>
			<Grid container spacing={0}>
			<Grid item xs={12} md={8}>
				<Paper
					className={classes.mainPaper}
					variant="outlined"
					style={{"height":"500px"}}
					// onScroll={handleScroll}
				>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell align="center">E-mail</TableCell>
								<TableCell align="center">LogIn</TableCell>
								<TableCell align="center">LogOut</TableCell>
								
							</TableRow>
						</TableHead>
						<TableBody id="corpo">
							
						</TableBody>
					</Table>
				</Paper>
			</Grid>
			<Grid item xs={12} md={4}>
				<Paper
					className={classes.mainPaper}
					variant="outlined"
					// onScroll={handleScroll}
				>
					<div>

					</div>
				</Paper>
			</Grid>
			</Grid>
		</MainContainer>

	)

}

export default Log