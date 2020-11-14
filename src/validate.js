module.exports = (data) => {
  let errors = [];

  if (!data.nCdServico) errors.push("nCdServico");
  if (!data.sCepOrigem) errors.push("sCepOrigem");
  if (!data.sCepDestino) errors.push("sCepDestino");
  if (!data.nVlPeso) errors.push("nVlPeso");
  if (!data.nCdFormato) errors.push("nCdFormato");
  if (!data.nVlComprimento) errors.push("nVlComprimento");
  if (!data.nVlAltura) errors.push("nVlAltura");
  if (!data.nVlLargura) errors.push("nVlLargura");
  if (!data.nVlDiametro) errors.push("nVlDiametro");
  if (!data.sCdMaoPropria) errors.push("sCdMaoPropria");
  if (!data.nVlValorDeclarado) errors.push("nVlValorDeclarado");
  if (!data.sCdAvisoRecebimento) errors.push("sCdAvisoRecebimento");

  if (errors.length)
    return { error: "Voce esqueceu de prencher os campos", required: errors };

  return null;
};
