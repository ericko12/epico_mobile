---
spec: EF-50620
tipo: plan-tecnico
autor: Marco Santero + Claude Code
revisado_por: <pendiente — Arquitecto OBLIGATORIO: toca PedidoService, servicio compartido>
generado_por: skill plan-tecnico v1.0
---

# Plan técnico — EF-50620 · SPEC-F1-003 · Ligar pedidos a Propuesta Comercial

## 1. Enfoque en una frase

Cerrar la trazabilidad Propuesta Comercial → Cotización → Pedido con atribución **por
línea**, sobre el flujo de cotizaciones que Epico ya tiene; en este repo el trabajo
restante es **front**: los nueve ajustes de la retro de QA del 02-10-2026 sobre lo ya
publicado.

- Rama base: `release/1.0.0-propuestas` — los MR de esta spec apuntan ahí (ADR-002).
- Spec: EF-50620 · SPEC-F1-003 · página 1659666439 (hash `f074de89`) · Versión 2.3 · Ready for Dev.
- UX: UX-SPEC-F1-003 · página 1659863055 (hash `b4309ad9`) · Versión 0.17 · **Ready for Dev** — el front no está bloqueado.
- Proyecto: PROJ-SPEC-SFEP-001 · página 1659863046 (hash `ece5e1b9`) · **Borrador**.
- Estado real del ambiente: `release/1.0.0-propuestas` en `55d77f72` desplegado a pruebas
  (job `deployToTestsecond`, pipeline #62493, 01-oct). Incluye la rama
  `feature/propuesta-en-cotizaciones` **completa**.

## 2. Servicios afectados

| Servicio | Acción | ¿Compartido? | Implicación |
|---|---|---|---|
| `PedidoService` | **Extender** — cotizaciones, atribución por línea, VigenteHasta en cabecera | ⚠ Sí (dueño Ferrari; consumidor Epico Móvil) | Cambios **aditivos** únicamente; regresión sobre v1/v3/v4 |
| Tabla relacional de Propuesta Comercial | Crear (SUP-01, RN-10, NFR-ARQ-03) | — | Unida por ID a cotizaciones/pedidos |
| JOB de sincronización (cada 5 min, RF-14) | Crear | — | Fuera del front; dueño por definir |
| Fuente estructurada del Coach (equipo de Juan Carlos) | Consumir | Externo | `<pendiente: DEP-07 — contrato técnico, latencia y timeout>` |
| `epico-movil` (este repo) | Extender — listado, detalle y conversión | No | Alcance de este plan |

## 3. ¿Extender o crear servicio?

**Extender.** El dominio de cotizaciones/pedidos ya tiene dueño (`PedidoService`); crear
uno nuevo exigiría ADR. No se propone. El JOB de sincronización y la tabla relacional son
piezas nuevas dentro de ese dominio, no un servicio aparte.

## 4. Contrato

`<pendiente: DEP-07 / RES-05>` — el contrato técnico exacto (webservice/API, parámetros
de latencia y timeout) con la tabla de Propuestas Comerciales sigue abierto en §9 de la
Spec. La frecuencia del JOB sí está cerrada: **5 minutos** (RF-14).

La UX trae en §0-ter una revisión del contrato de back del 24-09-2026 y en §0-quater las
equivalencias contrato ↔ front: es la referencia inmediata del front mientras el contrato
formal se congela.

## 5. Reutilización

- `features/quotation/` — listado, filtros y detalle de cotización ya existentes.
- `features/common/infrastructure/ui/` — antes de crear cualquier componente genérico.
- `handleRequestDto` para toda respuesta del gateway; `EPICO_API` como única instancia HTTP.
- UX-COMP-01/02/04 ya existen en el código publicado; el trabajo es de ajuste, no de alta.

## 6. Datos

Lado servidor: tabla relacional de Propuesta Comercial + indicador de origen e ID por
línea; `VigenteHasta` se traslada a la cabecera de la cotización sin recálculo (RN-07,
DAT-01). Migraciones **aditivas** por tratarse de un servicio compartido.
Lado front: sin persistencia nueva.

## 7. Seguridad

NFR-SEC-01: sólo Propuestas Comerciales del mismo cliente y dentro del alcance del
usuario. PER-02: el ID de origen no es editable desde el front. Idempotencia de la
conversión (RF-08, AC-13) y del JOB (AC-20) se resuelven en back.
`<pendiente: PER-04 — rol/perfil concreto de consulta, §9 de la Spec>`

## 8. Observabilidad

`<pendiente>` — Datadog RUM se retiró de producción el 28-jul-2026 y no hubo reemplazo
(CLAUDE.md). Hoy el front no tiene telemetría propia. Del lado servidor, NFR-INT-03 y
NFR-INT-04 exigen evidencia consultable de fallas y retención de trazabilidad por 1 año.

## 9. Riesgos

| Riesgo | Mitigación |
|---|---|
| RISG-06 / AC-23 — identificadores del Coach ≠ Epico | No confirmar atribución inconsistente; reintentos de RF-14 y registro con error |
| RISG-05 — salida sólo en PDF | DEP-01: fuente estructurada obligatoria; sin ella no hay liga |
| Deriva de la UX durante la construcción (0.17 ya va por delante de la funcional, §0) | Hash en `spec-ux.snapshot.md`; `--refresh` como commit visible |
| El lote U-1…U-17 de QA sigue sin entregarse | No cerrar la Spec sin él; pedirlo a Luis antes de dar por completa la retro |
| `PedidoService` compartido | Cambios aditivos y regresión sobre v1/v3/v4; revisión del Arquitecto obligatoria |

## 10. Estrategia de pruebas

- Jest + Testing Library en `__tests__/` espejando la ruta del feature.
- Los `UX-STATE-01..06` y `UX-INT-01..07` alimentan los escenarios; QA recorre
  ESC-30, ESC-37, ESC-42 y ESC-42b después de los cambios (acuerdo del traspaso).
- `behavior.feature` sobre los AC de la Spec: `<pendiente — se agrega en Construcción>`.
- Puerta de salida del repo: `npx tsc --noEmit`, `npm run lint`, `npx eslint features/`,
  `npm run testJest`, `npm run build:dev`.

## 11. Tareas propuestas (→ subtareas en Jira, con dueño)

Las nueve primeras son los ajustes de la retro de QA del 02-10-2026
(`F1-003_TRASPASO_AJUSTES_RETRO_FRONT.md`). U-26 y U-32 son el mismo defecto.

| # | Tarea | Dueño | Toca |
|---|---|---|---|
| T01 | U-21 · Elegir Estatus deja de arrastrar el filtro Origen (UX-INT-07) | `<por asignar>` | UX-VIEW-01 · filtros del listado |
| T02 | U-22 · Rótulo del buscador conforme a RF-19 / UX-INT-05 | `<por asignar>` | UX-VIEW-01 |
| T03 | U-24 · Chip «PC» por partida (UX-COMP-04) — **verificar primero**: el commit `daad0a7d` ya está en lo publicado | `<por asignar>` | UX-VIEW-02 |
| T04 | U-25 · Diálogo de retiro de partida con UX-MSG-03 | `<por asignar>` | UX-VIEW-02 |
| T05 | U-26 + U-32 · Propagar el mensaje del servidor (UX-MSG-07 en 500; UX-MSG-06 / UX-MSG-01 en conversión) | `<por asignar>` | UX-VIEW-02 · ConvertirPedido |
| T06 | U-27 · Aviso UX-MSG-10 con caja abierta (informa, no bloquea) | `<por asignar>` | UX-VIEW-02 |
| T07 | U-28 · Selector de promoción deshabilitado en partidas de propuesta, con motivo en texto | `<por asignar>` | UX-VIEW-02 |
| T08 | U-30 · Retiro de precio especial: modal Cancelar/Aceptar con UX-MSG-04 | `<por asignar>` | UX-VIEW-02 |
| T09 | Ajustes de documentación de la Spec UX (8 puntos del traspaso) | UX (Marco) | Confluence UX-SPEC-F1-003 |
| T10 | Pedir a QA el lote U-1…U-17 y el retiro de ESC-25b | QA (Luis) | — |
| T11 | Revisión del plan por el Arquitecto (servicio compartido) | ARQ (Jose Nuño) | — |

> Los ajustes de T09 se escriben **en la página de Confluence**, no en el snapshot ni en
> `docs/F1-003_UX-SPEC_v0.5.md`. Al cerrarlos hay que correr
> `/inicio-tarea EF-50620 --refresh` para que el hash vuelva a cuadrar.
