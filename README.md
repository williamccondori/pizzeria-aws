# Caso de Uso: Pizzería

Para la creación del proyecto, se ejecuta:

```bash
serverless create --template aws-nodejs --name pedirPizzas
```

Para desplegar, se ejecuta:

```bash
serverless deploy
```

Para visualizar el log de la aplicación, se ejecuta:

```bash
sls logs -f hacerPedido -t
```

## Dependencias

UUID:

```bash
npm install uuid --save
```

AWS SDK:

```bash
npm install aws-sdk --save
```
