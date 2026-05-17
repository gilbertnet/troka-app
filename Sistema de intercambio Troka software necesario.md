**PASO 1 — Crear repositorio en GitHub**

Ir a:

GitHub



Crear un repositorio llamado: troka-app

Configuración:

Public o Private

NO agregar README

NO agregar .gitignore

NO agregar licencia



Luego:

Create Repository



**PASO 2 — Instalar herramientas en tu PC**

1\. Node.js LTS version

2\. Git

3\. Visual Studio Code



**PASO 3 — Crear proyecto real**

Abrir terminal y ejecutar:

npx create-next-app@latest troka-app



Selecciona:



TypeScript → Yes

ESLint → Yes

Tailwind → Yes

App Router → Yes

src folder → Yes

Turbopack → Yes



**PASO 4 — Entrar al proyecto**

cd troka-app



PASO 5 — Instalar dependencias oficiales

npm install @supabase/supabase-js

npm install next-intl

npm install zustand

npm install framer-motion

npm install lucide-react

npm install react-hook-form

npm install zod

npm install sonner

npm install clsx tailwind-merge



**PASO 6 — Crear variables de entorno**



Crear archivo:



.env.local



Y pegar:

NEXT\_PUBLIC\_SUPABASE\_URL=https://oqraytdlkqnmqnjuvlor.supabase.co



NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY=TU\_ANON\_KEY



PASO 7 — Ejecutar proyecto

npm run dev



Abrirá:

http://localhost:3000



**PASO 8 — Conectar GitHub**

git init

git add .

git commit -m "Initial Troka setup"





MÓDULO 1 — Publicaciones reales

Funciones



Los usuarios podrán:



Crear publicaciones

Subir imágenes

Agregar descripción

Agregar categoría

Agregar ubicación

Definir valor aproximado

Definir qué desean recibir a cambio

Estructura de base de datos

Tabla: listings

create table listings (

&#x20; id uuid primary key default gen\_random\_uuid(),

&#x20; user\_id uuid references auth.users(id),

&#x20; title text not null,

&#x20; description text,

&#x20; category text,

&#x20; desired\_trade text,

&#x20; estimated\_value numeric,

&#x20; city text,

&#x20; country text,

&#x20; image\_url text,

&#x20; created\_at timestamptz default now()

);

MÓDULO 2 — Feed principal

Página Home



Mostrará:



publicaciones recientes

imágenes

categorías

ubicación

sistema de búsqueda

filtros

MÓDULO 3 — Sistema de ofertas

Funciones



Un usuario podrá:



abrir publicación

enviar propuesta

ofrecer otro artículo

agregar dinero adicional

aceptar o rechazar oferta

MÓDULO 4 — Chat realtime

Tecnologías

Supabase Realtime

PostgreSQL

Suscripciones websocket

Funciones

mensajes instantáneos

notificaciones

conversaciones privadas

estado online

MÓDULO 5 — Perfil de usuario

Perfil incluirá

foto

reputación

cantidad de intercambios

publicaciones activas

valoraciones

ubicación

MÓDULO 6 — Sistema de reputación

Los usuarios podrán:

calificar intercambios

dejar comentarios

reportar usuarios

MÓDULO 7 — Subida de imágenes

Storage



Usaremos:



Supabase Storage

Funciones

upload de fotos

imágenes optimizadas

perfil de usuario

múltiples imágenes por publicación

MÓDULO 8 — Multiidioma



Idiomas iniciales:



Español

Inglés

Francés

Portugués

MÓDULO 9 — Seguridad

Implementaremos

RLS policies

protección anti spam

rate limits

validaciones

moderación

MÓDULO 10 — Monetización futura

Opciones

publicaciones premium

anuncios destacados

membresía PRO

verificación premium

escrow system

