# Sistema de Jerarquía de Status de Pacientes

## Descripción General

El sistema implementa un método para cambiar el status de los pacientes que respeta una jerarquía predefinida de estados. Esto asegura que las transiciones de status sean lógicas y controladas.

## Estructura de la Jerarquía

### Estados Raíz (Nivel 0)

- **Scheduled**: Estado inicial cuando se programa una cita

### Estados Hijos de Scheduled (Nivel 1)

- **Checked-In**: Paciente ha llegado y se ha registrado
- **No-Show**: Paciente no se presentó a la cita

### Estados Hijos de Checked-In (Nivel 2)

- **In Consultation**: Paciente está siendo atendido por el proveedor
- **Cancelled**: Cita fue cancelada

## Reglas de Transición

### Transiciones Válidas

1. **Progresión**: Movimiento hacia estados hijos (ej: Scheduled → Checked-In)
2. **Retroceso**: Movimiento hacia estados padre (ej: Checked-In → Scheduled)
3. **Alternativas**: Movimiento entre estados hermanos (ej: Checked-In → No-Show)
4. **Estados Raíz**: Movimiento hacia cualquier estado raíz desde cualquier nivel

### Transiciones Especiales

- **Estados Críticos**: Los estados "Cancelled" y "No-Show" requieren confirmación antes del cambio
- **Validación Local**: El sistema valida las transiciones tanto en el frontend como en el backend

## Componentes Implementados

### 1. StatusDropdown

- **Ubicación**: `apps/frontend/src/components/patients/StatusDropdown.tsx`
- **Funcionalidad**:
  - Muestra solo las transiciones válidas según la jerarquía
  - Indica el tipo de transición (Progresión, Retroceso, Alternativa)
  - Requiere confirmación para estados críticos
  - Muestra el nivel jerárquico de cada estado

### 2. Funciones de Validación

- **Ubicación**: `apps/frontend/src/lib/organizeStatuses.ts`
- **Funciones principales**:
  - `getValidTransitions()`: Obtiene transiciones válidas para un status
  - `isValidTransition()`: Valida si una transición es permitida
  - `getStatusLevel()`: Obtiene el nivel jerárquico de un status
  - `getStatusPath()`: Obtiene la ruta completa de un status

### 3. Servicios de API

- **Backend**: `apps/backend/src/statuses/statuses.service.ts`
  - `getAvailableTransitions()`: Obtiene transiciones desde el servidor
- **Frontend**: `apps/frontend/src/services/statusesService.ts`
  - `getStatusTransitions()`: Llama al endpoint de transiciones

## Flujo de Actualización

1. **Usuario selecciona un nuevo status** en el dropdown
2. **Sistema valida** si la transición es permitida
3. **Si es estado crítico**, muestra modal de confirmación
4. **Se envía la actualización** al backend
5. **Se actualiza el historial** automáticamente
6. **Se muestra notificación** de éxito o error
7. **Se recarga la lista** de pacientes

## Características de Seguridad

### Validación Doble

- **Frontend**: Validación inmediata para mejor UX
- **Backend**: Validación final para seguridad

### Confirmación para Estados Críticos

- **Cancelled**: Requiere confirmación explícita
- **No-Show**: Requiere confirmación explícita

### Historial Automático

- Cada cambio de status se registra automáticamente
- Incluye timestamp y estado anterior
- Accesible desde la página de historial del paciente

## Uso en la Interfaz

### Vista de Tabla

- Dropdown de status en la columna "Actions"
- Muestra transiciones válidas con iconos descriptivos

### Vista de Tarjetas

- Dropdown de status en cada tarjeta de paciente
- Misma funcionalidad que en la vista de tabla

### Notificaciones

- Toast de éxito cuando se actualiza correctamente
- Toast de error si falla la actualización
- Auto-desaparición después de 4 segundos

## Configuración de la Base de Datos

### Tabla Statuses

```sql
CREATE TABLE statuses (
    id UUID PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    parent_id UUID REFERENCES statuses(id),
    order INTEGER NOT NULL
);
```

### Tabla StatusHistory

```sql
CREATE TABLE status_history (
    id UUID PRIMARY KEY,
    patient_id UUID REFERENCES patients(id),
    status_id UUID REFERENCES statuses(id),
    changed_at TIMESTAMP DEFAULT NOW()
);
```

## Extensibilidad

El sistema está diseñado para ser fácilmente extensible:

1. **Nuevos Estados**: Agregar registros en la tabla `statuses`
2. **Nuevas Reglas**: Modificar las funciones de validación
3. **Nuevos Tipos de Transición**: Extender la lógica en `getValidTransitions()`
4. **Estados Críticos**: Agregar condiciones en `handleStatusSelect()`

## Consideraciones de Rendimiento

- **Caché de Transiciones**: Las transiciones se cargan una vez por status
- **Validación Local**: Reduce llamadas al servidor
- **Lazy Loading**: Solo se cargan las transiciones cuando se abre el dropdown
