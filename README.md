# Cajero Automático

Proyecto base para un sistema de Cajero Automático en Node.js.

## Requisitos
- Node.js 18+ (recomendado)
- npm 9+

## Puesta en marcha
```bash
# Instalar dependencias (si agregas paquetes)
npm install

# Ejecutar en modo normal
npm start

# Instalacion de mysql2
npm install mysql2 dotenv  

# Ejecutar en modo desarrollo
npm run dev
```


## Estructura
```
Cajero-automatico-
├─ src/
│  └─ index.js
├─ package.json
├─ package-lock.json
├─ .gitignore
└─ README.md
```

## Git: inicialización y remoto
```bash
# Inicializado (ya realizado)
git init

# Agregar remoto (reemplaza <URL> por el de tu repositorio)
git remote add origin <URL>

# Primer commit y push inicial
git add .
git commit -m "Inicialización del proyecto"
git branch -M main
git push -u origin main
```

## Próximos pasos sugeridos
- Definir las funcionalidades del cajero: autenticación, consulta de saldo, retiros, depósitos.
- Agregar pruebas (Jest) y linter (ESLint/Prettier) si lo deseas.
- Crear una arquitectura por módulos en `src/` para mantener el código organizado.