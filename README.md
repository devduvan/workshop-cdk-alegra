# Proyecto realizado en el worshop de Alegra de CDK

Para usar este proyecto debes crear un archivo .env basado en el archivo .env.example dónde
definiras el id y la region de la cuenta de AWS dónde vamos a desplegar nuestro proyecto

## Comandos utiles

- `npm run deploy` despliega todos los stacks en la cuenta destino
- `npm run destroy` destruye todos los stacks de la cuenta destino
- `npm run diff` retorna las diferencias con respecto a los stacks

## ¿Quieres prácticar?

- Intenta crear un endpoint que permita actualizar un jugador del equipo.
- Crea una notificación SNS que se suscriba a tu correo de alegra y se dispare cada vez
  que se agregue un nuevo jugador al equipo.
