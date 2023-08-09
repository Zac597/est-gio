const express = require('express');
const puppeteer = require('puppeteer');

const app = express()

const htmlPdf = (async () => {
  try {


const browser = await puppeteer.launch();

const page = await browser.newPage();

const htmlContent = `
<h1> Olá, Mundo </h1>
<p>Este é um exemplo de conversão de HTML para PDF usando Puppeteer.</p>
<button>Clique</button>
`

const pdfPath = 'Teste.pdf';

await page.setContent(htmlContent, {waitUntil: 'domcontentloaded'});

await page.pdf({ path: pdfPath, format: 'A4'})

console.log(`Arquivo PDF gereado com sucesso em ${pdfPath}`)

await browser.close()

}
catch(error) {
  console.error('Ocorreu um erro:', error);
}
})()

const PORT = 3333;

app.listen(PORT, () => console.log(`Servidor executando na porta ${PORT}`))

app.get("/", (request, response) => {
  response.send(htmlPdf)
})
