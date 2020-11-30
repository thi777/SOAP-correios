# SOAP-correios
Calcule frete e prazo diretamente do webservice dos correios

``
curl --request POST \ --url http://localhost:3777/calculate \ --header 'Content-Type: application/json' \ --data '{ "nCdServico": "04014", "sCepOrigem": "08773380", "sCepDestino": "07273491", "nVlPeso": 1, "nCdFormato": 1, "nVlComprimento": "16", "nVlAltura": "16", "nVlLargura": "16", "nVlDiametro": 1, "nVlValorDeclarado": 75.0 }'
``
