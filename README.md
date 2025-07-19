# Technical Challenge - VIP Medical Group

## Requisitos previos

- Node.js (v18 o superior recomendado)
- Yarn o npm
- PostgreSQL

---

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd technical-challenge
```

---

## 2. Backend

### Instalación de dependencias

```bash
cd red-valley-tecnical-challenge-backend
yarn install
# o
npm install
```

### Configuración de la base de datos

Asegúrate de tener PostgreSQL corriendo y crea una base de datos llamada `red_valley_test`.  
Por defecto, la configuración es:

- **Usuario:** scp682
- **Contraseña:** komachi22
- **Base de datos:** red_valley_test
- **Host:** localhost
- **Puerto:** 3008

Puedes modificar estos valores en `config/config.js` si lo necesitas.

### Migraciones y seeders

Ejecuta las migraciones para crear las tablas:

```bash
yarn sequelize db:migrate
# o
npx sequelize db:migrate
```

Carga los estados clínicos iniciales:

```bash
yarn sequelize db:seed:all
# o
npx sequelize db:seed:all
```

### Iniciar el servidor backend

```bash
yarn dev
# o
npm run dev
```

El backend estará disponible en `http://localhost:3001` (o el puerto configurado en `server.js`).

---

## 3. Frontend

### Instalación de dependencias

```bash
cd ../red-valley-tecnical-challenge-frontend
yarn install
# o
npm install
```

### Iniciar el servidor frontend

```bash
yarn dev
# o
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

---

## 4. Notas adicionales

- El frontend está construido con Next.js, TailwindCSS, Redux Toolkit y Tanstack Query.
- El backend utiliza Express, Sequelize y PostgreSQL.
- Si necesitas cambiar la configuración de la base de datos, edita el archivo `red-valley-tecnical-challenge-backend/config/config.js`.
- Para recargar los datos de estados clínicos, puedes volver a ejecutar el comando de seeders.

---

## 5. Estructura de carpetas

- `red-valley-tecnical-challenge-backend/`: API y lógica de negocio.
- `red-valley-tecnical-challenge-frontend/`: Interfaz de usuario.
