<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set('America/Sao_Paulo');
$hora = date("d/m/Y - H:i:s");
if($_REQUEST["comando"] == "inserir"){
$fo = fopen("log.txt", "a+");
fwrite($fo, $_REQUEST["tipo"]." - ".$_REQUEST["nome"]." - ".$_REQUEST["email"]." - ".$hora."\n");
fclose($fo);
}
if($_REQUEST["comando"] == "apagar"){
    $fo = fopen("log.txt", "w+");
    fwrite($fo, "");
    fclose($fo);
}
if($_REQUEST["comando"] == "ler"){
    $saida = file_get_contents("log.txt");
    echo $saida;
}
?>