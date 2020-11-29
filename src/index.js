const express = require("express");
const axios = require("axios");
var parser = require("xml2json");
const validate = require("./validate");

const app = express();
app.use(express.json());

app.post("/calculate", async (req, res) => {
  const data = req.body;

  const error = await validate(data);
  if (error) return res.json(error);

  try {
    const response = await axios.post(
      "http://ws.correios.com.br:80/calculador/CalcPrecoPrazo.asmx",
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
           <tem:CalcPrecoPrazo>
              <tem:nCdEmpresa></tem:nCdEmpresa>
              <tem:sDsSenha></tem:sDsSenha>
              <tem:nCdServico>${data.nCdServico}</tem:nCdServico>
              <tem:sCepOrigem>${data.sCepOrigem}</tem:sCepOrigem>
              <tem:sCepDestino>${data.sCepDestino}</tem:sCepDestino>
              <tem:nVlPeso>${data.nVlPeso}</tem:nVlPeso>
              <tem:nCdFormato>${data.nCdFormato}</tem:nCdFormato>
              <tem:nVlComprimento>${data.nVlComprimento}</tem:nVlComprimento>
              <tem:nVlAltura>${data.nVlAltura}</tem:nVlAltura>
              <tem:nVlLargura>${data.nVlLargura}</tem:nVlLargura>
              <tem:nVlDiametro>${data.nVlDiametro}</tem:nVlDiametro>
              <tem:sCdMaoPropria>${data.sCdMaoPropria}</tem:sCdMaoPropria>
              <tem:nVlValorDeclarado>${data.nVlValorDeclarado}</tem:nVlValorDeclarado>
              <tem:sCdAvisoRecebimento>${data.sCdAvisoRecebimento}</tem:sCdAvisoRecebimento>
           </tem:CalcPrecoPrazo>
        </soapenv:Body>
     </soapenv:Envelope>`,
      {
        headers: {
          "Accept-Encoding": "gzip,deflate",
          "Content-Type": "text/xml",
        },
      }
    );

    const xml = response.data;
    const json = parser.toJson(xml, { object: true });

    const { Servicos } = json["soap:Envelope"][
      "soap:Body"
    ].CalcPrecoPrazoResponse.CalcPrecoPrazoResult;

    return res.json(Servicos);
  } catch (err) {
    const message = err.message;

    if (message.includes("failed with status code 500")) {
      return res.json(message);
    }

    return res.json(err.stack);
  }
});

app.listen(3777);
