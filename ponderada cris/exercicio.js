var notas = [7.2, 3.0, 5.0];
var soma = 0;
var media;

for(var i = 0; i < notas[i]; i++){
    soma += notas[i];
    media = soma / 3;
}
if(media >= 0.7){
    console.log('media:', media.toFixed(2));
    console.log('Status: Aprovado');
} else{
    console.log('media', media.toFixed(2));
    console.log('Status: Reprovado');
}