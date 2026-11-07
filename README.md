# CRM Clínica Dental Dra. Bianca 🦷✨
### Plataforma de Gestión Clínica Odontológica & Asistente Virtual de WhatsApp con IA

Sistema integral de gestión clínica y atención automatizada desarrollado para la **Clínica Dental Dra. Bianca** (Odontología Especializada & Estética Dental). Incorpora un asistente virtual inteligente (**Sofía**) capaz de atender consultas sobre tratamientos, resolver dudas sobre salud bucal y agendar citas en tiempo real mediante WhatsApp.

---

## 🌟 Características Principales

1. **Bandeja Compartida de WhatsApp (Multiagente):**
   - Conexión en vivo con WhatsApp vía `@whiskeysockets/baileys` mediante código QR.
   - Alternancia ágil entre modo automático (IA Sofía) y control manual por recepcionistas.
   - Actualización en tiempo real vía Server-Sent Events (SSE).

2. **Asistente Virtual con IA (Sofía):**
   - Personalidad empática, profesional y capacitada para responder dudas odontológicas.
   - Ejecución autónoma de herramientas (Function Calling con OpenRouter / Gemini):
     - `consultar_servicios_precios`: Información de tratamientos y tarifas en USD.
     - `consultar_disponibilidad`: Búsqueda de horarios libres garantizando cero colisiones.
     - `reservar_cita`: Confirmación y registro de citas con la Dra. Bianca.
     - `consultar_mis_citas`, `reprogramar_cita` y `cancelar_cita`.
     - `escalar_a_humano`: Derivación inmediata a recepción ante urgencias o casos complejos.
   - Guardrails clínicos para no formular diagnósticos definitivos ni recetar antibióticos sin valoración presencial.

3. **Calendario y Agenda Odontológica:**
   - Vista diaria, semanal y mensual con prevención matemática de solapamientos.
   - Asignación por especialista y control de tiempos por procedimiento.

4. **Directorio y Expediente de Pacientes:**
   - Normalización automática de números telefónicos (+503 El Salvador).
   - Historial de citas, etiquetas personalizadas (Ortodoncia, Limpieza, etc.) y notas clínicas.

5. **Catálogo de Servicios Dentales:**
   - **Valoración Odontológica Inicial:** 30 min • $25 USD
   - **Limpieza Dental Ultrasónica & Pulido:** 45 min • $45 USD
   - **Blanqueamiento Dental LED:** 60 min • $120 USD
   - **Consulta de Ortodoncia / Brackets:** 30 min • $30 USD

6. **Control de Acceso Basado en Roles (RBAC):**
   - **ADMIN:** Acceso total, configuración de WhatsApp, simulador de IA y gestión de personal.
   - **RECEPTIONIST:** Gestión de agenda, lista de espera, directorio de pacientes y chat de WhatsApp.
   - **DENTIST (Dra. Bianca):** Vista enfocada en su agenda de pacientes y consultas asignadas.

---

## 🛠️ Stack Tecnológico

- **Frontend & Fullstack:** [Next.js 14](https://nextjs.org/) (App Router), React 18, TypeScript.
- **Estilos:** Tailwind CSS (Paleta médica azul/celeste clínica), Lucide Icons.
- **Base de Datos & ORM:** [Prisma ORM](https://www.prisma.io/) con soporte para SQLite (`dev.db`) en local y PostgreSQL en producción.
- **WhatsApp Daemon:** `@whiskeysockets/baileys` con autenticación persistente y generación de QR.
- **Inteligencia Artificial:** OpenAI SDK conectado a [OpenRouter](https://openrouter.ai/) (`google/gemini-2.5-flash`).
- **Autenticación:** JWT con cookies HttpOnly firmadas mediante `jose`.

---

## 🚀 Inicio Rápido (Desarrollo Local)

### 1. Clonar el repositorio
```bash
git clone https://github.com/daniautoma/crm-demo-dental.git
cd crm-demo-dental
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copia la plantilla de entorno:
```bash
cp .env.example .env
```
*(En Windows PowerShell: `Copy-Item .env.example .env`)*

Asegúrate de configurar en tu `.env`:
- `JWT_SECRET`: Cadena aleatoria segura (mínimo 32 caracteres).
- `OPENROUTER_API_KEY`: Tu clave de OpenRouter para activar la IA en vivo.

### 4. Inicializar base de datos y datos semilla (Seed)
```bash
npx prisma generate
npx prisma db push --force-reset
npm run seed
```

### 5. Iniciar el servidor
```bash
npm run dev
```
Abre en tu navegador: [http://localhost:3000/login](http://localhost:3000/login)

---

## 🔐 Credenciales de Acceso Rápido (Demo)

En la pantalla de inicio de sesión puedes hacer clic en los botones de acceso rápido para rellenar los datos automáticamente:

| Rol | Correo Electrónico | Contraseña |
| :--- | :--- | :--- |
| **Administrador** | `admin@drabianca.daniautoma.cloud` | `AdminDental2025!` |
| **Recepción** | `recepcion@drabianca.daniautoma.cloud` | `Recepcion2025!` |
| **Dra. Bianca (Odontóloga)** | `dra.bianca@drabianca.daniautoma.cloud` | `DraBianca2025!` |

---

## 🐳 Despliegue con Docker / Dokploy

El proyecto incluye un `Dockerfile` optimizado (Node 22) para despliegue automatizado en Dokploy, Railway o VPS con Docker:

```bash
docker build -t crm-clinica-bianca .
docker run -p 3000:3000 --env-file .env crm-clinica-bianca
```

---

## 📄 Licencia

Desarrollado para la **Clínica Dental Dra. Bianca**. Todos los derechos reservados.
