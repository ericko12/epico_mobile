---
spec: EF-50620
folio: SPEC-F1-003
tipo: funcional
titulo: Ligar Pedidos de clientes a Propuestas Comerciales en Epico
spec_proyecto: EF-50612 · PROJ-SPEC-SFEP-001 · página 1659863046
spec_ux: UX-SPEC-F1-003 · página 1659863055 · Ready for Dev
origen: Confluence · espacio PE · página 1659666439 «SPEC-F1-003_Ligar_pedido_a_propuesta_comercial» · modificada 2026-09-29 · cabecera Versión 2.3 · Estado Ready for Dev
resuelto_por: enlace-remoto
anexos: ninguno
contenido_hash: sha256:f074de8984bcc767abf96d0df694abf883635b0257cf48764ae8b7558eb9b577
estado_pagina_al_congelar: Ready for Dev
estado_issue_al_congelar: Development
rama: EF-50620/ligar-pedido-propuesta
generado_por: skill inicio-tarea v1.4
---

# ⚠ SNAPSHOT — Copia congelada de la página de Confluence de EF-50620 (SPEC-F1-003). No editar este archivo.
> La Spec se edita **en su página de Confluence**. Si la página cambia durante la
> construcción, el hash deja de coincidir: la skill lo avisa. El refresco es un commit
> visible (`/inicio-tarea EF-50620 --refresh`).

# 📄 Ligar Pedidos de clientes a Propuestas Comerciales en Epico

1. **Spec Funcional:** SPEC-F1-003
2. **Spec UX/UI asociada:** UX-SPEC-F1-003
3. **Spec de Proyecto / Iniciativa:** PROJ-SPEC-SFEP-001
4. **Responsable BA:** Jhonatan Sanchez
5. **Versión:** 2.3
6. **Última actualización:** 29-09-2026
7. **Estado:** Ready for Dev

> **Versión funcional 2.2:** Se ajusta la regla de vigencia de las cotizaciones derivadas de Propuesta Comercial. Epico ya no calcula una vigencia propia de 30 días desde la creación de la cotización: toma y conserva la fecha **VigenteHasta** proporcionada por la Propuesta Comercial de origen. Se mantienen los estados, cortes por fecha calendario, búsqueda y trazabilidad definidos previamente.

---

## 🎯 1. Resumen y Contexto

- **Necesidad / Problema específico:** La primera versión de la Propuesta Comercial es generada por el equipo de Juan Carlos mediante el Coach externo, sus nueve recomendadores, históricos, IA y retroalimentación del piloto, y normalmente puede quedar como PDF o registros en base de datos. Los pedidos, en cambio, ya se crean en Epico, donde existen catálogo y buscador de productos, clientes y direcciones. Sin una liga estructurada, no puede saberse cuántas propuestas se concretaron ni cuáles de sus productos llegaron a un pedido.
- **Objetivo:** Cerrar en Epico el círculo de trazabilidad al relacionar una Propuesta Comercial y sus productos con el pedido y las líneas que los incorporan, permitiendo pedidos mixtos y pedidos que no provienen de una propuesta.
- **Relación con el objetivo del Proyecto:** Es la única entrega de construcción del equipo de Diseño y Desarrollo en la Fase 1. Completa el MVP al ligar la Propuesta Comercial generada por el equipo de Juan Carlos con los pedidos que ya se crean en Epico y deja una trazabilidad reutilizable por las fases posteriores.
- **Valor de negocio específico:** Medir cuántas propuestas se convierten total o parcialmente en pedidos y distinguir la venta atribuible a una propuesta de la venta orgánica, sin inflar la efectividad del Coach.
- **Glosario de términos:**
    - **Propuesta Comercial:** Paquete de productos recomendados generado por el equipo de Juan Carlos mediante el Coach Comercial externo (sus nueve recomendadores, históricos, IA y retroalimentación del piloto), resguardado en la tabla de Propuestas Comerciales del Coach con un **periodo de disponibilidad de 30 días naturales** para ser procesado por la integración (ver RN-07). En este spec el término se usa siempre en su forma completa "Propuesta Comercial"; se evita usar la palabra "propuesta" de forma aislada.
    - **Cotización:** Objeto ya existente en Epico, dentro de su tabla de cotizaciones/pedidos, en el que se inserta automáticamente cada Propuesta Comercial disponible para procesamiento (ver SUP-02, RF-11).
    - **Nota:** Propuesta Comercial y Cotización son conceptos distintos y no deben interpretarse como equivalentes entre sí, independientemente de la terminología que utilice REQ-24222 (por ejemplo, si ese requerimiento usa la palabra "propuesta" para referirse a la cotización como oportunidad de venta). Resuelve parcialmente **PD-040** de la auditoría de UI/UX del 21-09-2026 (definición aportada por BA — Jhonatan Sanchez, 22-09-2026; ver Sección 9).

---

## 👥 2. Usuarios y Responsables

- **Público objetivo:**
    - **Usuarios y Áreas beneficiadas:** Fuerza de ventas, corporativos, Comercial, BI y Data Analytics; Operaciones se beneficia indirectamente de una medición más confiable.
    - **Usuarios y Áreas que utilizarán la funcionalidad:** Asesores autorizados que generan pedidos para clientes registrados en Epico y responsables autorizados de dar seguimiento a la propuesta.
    - **Usuarios y Áreas impactadas:** Proceso de pedido de Epico, Coach Comercial, Propuesta Comercial y, posteriormente, cotización/facturación; Crédito y Cobranza por posibles ventas incrementales.
- **Responsables de la Spec:**
    - **PO / coordinación de Diseño y Desarrollo:** Dioni Miramontes (DM)
    - **Equipo responsable de la entrega:** FE-05
    - **BA:** Jhonatan Sanchez
    - **UX:** Marco Santero
    - **DEV:** Alfredo Silva
    - **QA:** Luis Garnica
    - **ARQ:** Jose Nuño
    - **TL:** Jonatan Cardenas
    - **Proveedor de Propuesta Comercial:** Equipo de Juan Carlos, BI y Data Analytics

---

## 💡 3. Alcance y Consideraciones Iniciales

- **En el alcance (In Scope):**
    - Acordar con el equipo de Juan Carlos el mecanismo estructurado mediante el cual Epico identifica y consulta la Propuesta Comercial disponible para el cliente; un PDF aislado no es suficiente para la liga automática.
    - Insertar automáticamente toda Propuesta Comercial **disponible para procesamiento** como una **cotización** dentro de la tabla de cotizaciones/pedidos ya existente en Epico, reutilizando su flujo y ciclo de vida actuales, sin crear un módulo "Propuestas" separado en la UI.
    - Precargar o trasladar productos de la Propuesta Comercial al pedido/cotización sin obligar a aceptar todos.
    - Permitir que el pedido contenga productos provenientes de Propuesta Comercial y productos habituales o adicionales (pedido híbrido/mixto).
    - Registrar por línea/código del pedido si proviene de una Propuesta Comercial y su ID de origen; el estado de cabecera (mixto vs. 100% Propuesta Comercial) se infiere a partir de esos indicadores por línea, sin un campo de cabecera separado.
    - Conservar la cantidad propuesta y la cantidad incorporada al pedido para medir conversión parcial.
    - Permitir pedidos sin Propuesta Comercial.
    - Diseño técnico de la relación **ya definido y aprobado** (confirmado en sesión del 17-09-2026): tabla relacional adicional para datos propios de la Propuesta Comercial (recomendador, ID origen, periodo de disponibilidad), unida por ID/join a la tabla de cotizaciones/pedidos de Epico, más indicador de origen a nivel línea; el estado funcional de cabecera se infiere a partir de las líneas y no requiere un indicador funcional independiente.
    - Restringir la descarga del PDF original de la propuesta (generado por el Coach) desde Epico; el documento enviado al cliente es el PDF de la cotización generada en Epico.
    - El alcance de los productos elegibles para Propuesta Comercial es venta incremental: productos que el cliente actualmente no compra, más reactivación de productos que dejó de comprar; no sustituye ni reemplaza el surtido habitual ya comprado por el cliente (confirmado por negocio — Luis Enrique Galván Ortega, 21-09-2026).
    - Permitir localizar una cotización desde el listado utilizando indistintamente su **ID de cotización** o el **ID de la Propuesta Comercial** que le dio origen; el resultado mostrado siempre es la cotización relacionada.
    - Gestionar automáticamente el **Estatus de cotización** para cotizaciones derivadas de una Propuesta Comercial mediante los valores **Vigente**, **Próxima a vencer**, **Vencida** y **Concluida**. Los tres primeros representan la condición temporal de una cotización aún abierta; **Concluida** aplica cuando la cotización se convierte exitosamente en pedido y tiene precedencia sobre las transiciones posteriores de vigencia. Se considera **Próxima a vencer** cuando resten **3 días calendario o menos** para la fecha de vencimiento. La vigencia se evalúa por fecha calendario: la cotización permanece vigente hasta las 23:59:59 de su fecha de vencimiento y pasa a Vencida a las 00:00:00 del día siguiente, usando la zona horaria configurada para Epico. Una aprobación interna no pausa, reinicia ni extiende la vigencia.
- **Fuera del alcance (Out of Scope):**
    - Construir los nueve recomendadores o la captura de retroalimentación; SPEC-F1-001 y SPEC-F1-002 son entregas del equipo de Juan Carlos.
    - Construir o rediseñar la aplicación Demo conversacional del Coach en Fase 1.
    - Construir cotizaciones dentro del aplicativo Coach; la llamada confirma que no existen en la fase inicial.
    - Embeber dentro de Epico el Coach Comercial externo; corresponde a SPEC-F3-003 en la Fase 3.
    - Construir dashboard o reportería adicional.
    - Construir la pantalla, bandeja, permisos o flujo mediante los cuales se realiza una aprobación interna. F1-003 únicamente reconoce el resultado de dicha aprobación y reacciona a él.
    - Reactivar cotizaciones vencidas. La reactivación corresponde al modelo futuro y no forma parte del MVP de F1-003.
    - Implementar el funnel de gestión comercial de la cotización, incluyendo estados o transiciones de presentación al cliente, seguimiento/negociación, descarte o rechazo, escalamiento al gerente, cierre ganado y cierre perdido. Estos conceptos corresponden al modelo futuro y no constituyen comportamiento requerido para el MVP de F1-003.
    - Definir premios, castigos o comisiones por efectividad de Propuestas Comerciales.
    - Periodos alternativos de disponibilidad de 15, 60 o 90 días, o de dos/tres meses, para la Propuesta Comercial; se definió un único periodo de **30 días naturales** para que pueda ser procesada por la integración (ver RN-07).
    - Generar un pedido directamente desde una Propuesta Comercial sin pasar por el flujo de cotización; toda Propuesta Comercial se inserta primero como cotización (ver Flujo Principal y RN-05).
    - Calcular o generar el indicador/métrica de conversión de Propuestas Comerciales a pedido; esta Spec únicamente genera los datos base (trazabilidad Propuesta Comercial–Cotización–Pedido) para que reportería los calcule después.
    - Conciliación retroactiva de Propuestas Comerciales o pedidos previos a la entrada en producción; el alcance es estrictamente hacia adelante desde el despliegue.
- **Criterios de éxito:**
    - **CRI-01.** En un pedido mixto puede distinguirse cada línea derivada de una Propuesta Comercial de cada línea habitual.
    - **CRI-02.** La relación se obtiene de una Propuesta Comercial/producto identificados y no de texto libre capturado manualmente.
    - **CRI-03.** El asesor puede incluir todos, algunos o ninguno de los productos de la Propuesta Comercial sin perder la operación habitual del pedido.
    - **CRI-04.** El mismo reintento de conversión de cotización a pedido no duplica líneas ni relaciones de Propuesta Comercial.
    - **CRI-05.** Puede determinarse si el pedido/cotización es 100% Propuesta Comercial o mixto a partir del indicador de origen por línea; no se requiere un indicador de cabecera registrado por separado.
- **Riesgos a considerar:**
    - **RISG-01.** Relacionar sólo la cabecera del pedido atribuiría erróneamente productos orgánicos a la Propuesta Comercial.
    - **RISG-02.** Permitir seleccionar manualmente cualquier Propuesta Comercial/producto puede inflar la medición.
    - **RISG-04.** La venta incremental puede agotar la línea de crédito del cliente. *(Pendiente, no bloqueante — ver Sección 9)*.
    - **RISG-05.** Una salida disponible sólo como PDF, sin IDs y datos estructurados, impide una relación automática y confiable con el pedido.
    - **RISG-06.** Diferencias entre identificadores de cliente, dirección o producto del Coach y los de Epico pueden impedir o atribuir incorrectamente la liga.
- **Dependencias a considerar:**
    - **DEP-01.** Registro persistente y estructurado de la Propuesta Comercial y sus productos entregado por el equipo de Juan Carlos; el PDF puede ser una representación, pero no el único medio de integración.
    - **DEP-02.** Identificador estable de Propuesta Comercial, cliente y producto.
    - **DEP-03.** Proceso, pantallas, servicios y modelo de datos vigente del pedido de Epico.
    - **DEP-04.** SPEC-F1-001 y SPEC-F1-002 como entregas externas del equipo de Juan Carlos que forman la Propuesta Comercial de origen.
    - **DEP-05.** Política de Crédito y Cobranza para venta incremental. *\[NEEDS CLARIFICATION\] — pendiente, no bloqueante (ver Sección 9)*.
    - **DEP-06.** Catálogos e identificadores de cliente, dirección y producto de Epico, que deberán conciliarse con los utilizados por el Coach.
    - **DEP-07.** *\[NEEDS CLARIFICATION\]* Contrato técnico exacto (webservice/API y parámetros de latencia/timeout) con el que Epico consulta la tabla de Propuestas Comerciales del equipo de Juan Carlos. La frecuencia del JOB ya está definida en cada 5 minutos (ver RF-14 y Sección 9).
- **Supuestos validados (sesión 17-09-2026):**
    - **SUP-01.** El modelo de pedidos de Epico se extiende mediante una tabla relacional adicional para la Propuesta Comercial, unida por ID a la tabla de cotizaciones/pedidos, más un indicador de origen a nivel línea. La condición funcional de cabecera se infiere a partir de los indicadores de origen por línea y no requiere un campo independiente de cabecera.
    - **SUP-02.** El asesor no captura manualmente el ID de Propuesta Comercial. El sistema inserta automáticamente como cotización cada Propuesta Comercial disponible para procesamiento del cliente; cada Propuesta Comercial disponible genera su propia cotización independiente (ver SUP-03 y RN-08).
    - **SUP-03.** Un cliente puede tener más de una Propuesta Comercial disponible al mismo tiempo. Ver RN-08 para el mecanismo de cotización independiente por Propuesta Comercial.
- **Supuesto validado adicional:**
    - **SUP-04.** La relación entre Propuesta Comercial y cotización es 1:1: cada Propuesta Comercial genera una única cotización. Esa cotización puede convertirse en un único pedido; la Propuesta Comercial no se reutiliza para generar cotizaciones o pedidos adicionales (ver RN-11).

---

## 🔄 4. Flujo y Comportamiento Esperado

- **Flujo principal:**
    1. El asesor solicita al Coach Comercial (externo) una Propuesta Comercial para un cliente; el Coach guarda el resultado (productos, cantidades, precios y recomendador de origen por producto) en una tabla estructurada.
    2. El **JOB de sincronización, ejecutado cada 5 minutos**, consulta la tabla estructurada y, si identifica una o más Propuestas Comerciales disponibles y pendientes de procesar, las **inserta automáticamente como cotizaciones** en la tabla de cotizaciones/pedidos de Epico, ligadas por ID a la tabla de Propuesta Comercial. La inserción no depende de que el asesor ubique o consulte al cliente en Epico.
    3. Un cliente puede tener más de una Propuesta Comercial disponible al mismo tiempo. Cada Propuesta Comercial disponible genera una cotización independiente, sin selección manual del asesor al momento de la inserción.
    4. Los productos de la Propuesta Comercial se cargan como líneas candidatas en la cotización; cada línea derivada conserva un indicador booleano de origen e ID de Propuesta Comercial. El estado de cabecera (mixta o 100% Propuesta Comercial) se infiere a partir de esos indicadores por línea, sin un campo de cabecera separado.
    5. El asesor conserva, retira o ajusta cantidades de los productos de la Propuesta Comercial, y puede agregar productos adicionales no derivados de la Propuesta Comercial; estas líneas no reciben atribución de origen.
    6. Los precios de las líneas derivadas de la Propuesta Comercial quedan **congelados mientras la cotización permanezca vigente**, hasta la fecha **VigenteHasta** heredada de la Propuesta Comercial, independientemente de cambios en el precio de lista. Las líneas no derivadas siguen las reglas normales de actualización de precio de las cotizaciones de Epico.
    7. Al guardar el pedido en Epico, cada línea derivada conserva indicador de origen e ID de Propuesta Comercial; las líneas ajenas a la Propuesta Comercial no reciben esa atribución.
    8. El pedido queda disponible para el proceso comercial posterior con la relación trazable.
- **Subflujo de estatus de la cotización:** una vez creada la cotización, Epico administra su **Estatus de cotización**. Mientras permanezca abierta, evoluciona por vigencia como **Vigente → Próxima a vencer (cuando resten 3 días calendario o menos) → Vencida**. Si estando Vigente o Próxima a vencer se convierte exitosamente en pedido, cambia a **Concluida** y deja de participar en las transiciones automáticas de vigencia; por tanto, una cotización Concluida no cambia posteriormente a Vencida. Si llega a Vencida antes de convertirse, la conversión a pedido se bloquea conforme a RN-07 y EX-06. **Concluida** representa únicamente el resultado de la conversión cotización → pedido y no incorpora el funnel de gestión comercial futuro.
- **Escenarios alternos / excepciones:**
    - **EX-01.** Si no existe Propuesta Comercial aplicable, el asesor continúa un pedido habitual sin ID de Propuesta Comercial.
    - **EX-02.** Si sólo se aceptan algunos productos, se relacionan exclusivamente esas líneas; los descartados permanecen fuera del pedido.
    - **EX-03.** Si el pedido agrega productos no contenidos en la Propuesta Comercial, esas líneas se guardan sin origen de Propuesta Comercial.
    - **EX-04.** Toda Propuesta Comercial se inserta como cotización antes de poder convertirse en pedido; no existe una ruta de Propuesta Comercial → pedido directo sin cotización (ver RN-05).
    - **EX-05.** Si un cliente tiene varias Propuestas Comerciales disponibles al mismo tiempo, cada una se inserta automáticamente como una cotización independiente, sin selección manual del asesor entre ellas (ver RN-08).
    - **EX-06.** Si la fecha **VigenteHasta** heredada de la Propuesta Comercial se alcanza antes de que la cotización se convierta en pedido, la cotización pasa a Vencida y ya no puede convertirse en pedido bajo esta relación. Epico no recalcula ni extiende esta fecha por el momento en que el JOB genere la cotización. Ver RN-07.
    - **EX-07.** Si se remueve una línea derivada de Propuesta Comercial del pedido y posteriormente se vuelve a agregar, pierde su indicador de origen y su protección de precio; se trata como línea agregada manualmente.
    - **EX-08.** Si se aplica un precio especial o promoción sobre una línea derivada de Propuesta Comercial y luego se retira, el precio debe regresar al de la Propuesta Comercial (no al precio de lista), mientras la cotización permanezca vigente conforme a su fecha **VigenteHasta**.
    - **EX-09.** Ante una falla al consultar o ligar la tabla de Propuestas Comerciales (desconexión, servicio caído), el JOB aplica el mecanismo de reintentos definido técnicamente. Si la falla persiste, el registro queda identificado con error y consultable para intervención manual. No se asume un canal de notificación activa al asesor (ver RF-14 y AC-16).

---

## ⚙️ 5. Requisitos y Reglas de Negocio

### Requisitos funcionales

- **RF-01.** El JOB debe identificar en la fuente estructurada las Propuestas Comerciales persistidas que se encuentren dentro de su **periodo de disponibilidad de 30 días** y pendientes de procesar, asociadas a un cliente válido de Epico, para generar su cotización correspondiente.
- **RF-01A.** Epico debe obtener la Propuesta Comercial desde una fuente estructurada proporcionada por el equipo de Juan Carlos; no debe inferir la relación leyendo o interpretando manualmente un PDF.
- **RF-02.** El sistema debe trasladar a la cotización los productos de la Propuesta Comercial sin exigir que todos sean incluidos posteriormente en el pedido.
- **RF-03.** El asesor debe poder retirar productos de la Propuesta Comercial, ajustar cantidades y agregar productos adicionales dentro de la misma cotización.
- **RF-04.** Cada línea derivada de Propuesta Comercial debe conservar un indicador de origen y el ID de la Propuesta Comercial.
- **RF-05.** Cada línea agregada manualmente y no derivada de Propuesta Comercial debe permanecer sin atribución a dicha Propuesta Comercial.
- **RF-06.** El sistema debe conservar la cantidad propuesta y la cantidad finalmente incorporada al pedido cuando aplique.
- **RF-07.** El sistema debe soportar cotizaciones y pedidos sin Propuesta Comercial, siguiendo el flujo habitual de Epico.
- **RF-08.** El sistema debe impedir que una misma cotización produzca más de un pedido, incluso ante reintentos o solicitudes concurrentes.
- **RF-09.** El sistema debe conservar suficiente trazabilidad para permitir que fases posteriores extiendan la relación hasta facturación y analítica.
- **RF-10.** La implementación debe conciliar los identificadores de cliente, dirección y producto del Coach con las entidades canónicas de Epico antes de confirmar la atribución.
- **RF-11.** Toda Propuesta Comercial **disponible para procesamiento** y pendiente de procesar debe insertarse automáticamente como una única cotización en Epico, ligada por ID a la tabla relacional de propuesta. La definición del creador/propietario de la cotización automática permanece como decisión de ARQ/DEV y se documenta en la Sección 9.
- **RF-12.** El sistema no registra un indicador funcional de cabecera como campo independiente; la condición de la cotización/pedido (mixta vs. 100% Propuesta Comercial) se infiere a partir del indicador de origen por línea.
- **RF-13.** El sistema no debe permitir la descarga desde Epico del PDF original generado por el Coach; el documento utilizable para el cliente es el PDF de la cotización generado por Epico.
- **RF-14.** La sincronización Propuesta Comercial → Cotización se implementa mediante un **JOB ejecutado cada 5 minutos**. Ante una falla, se aplican reintentos conforme a la definición técnica; si persiste, el registro queda identificado con error y disponible para consulta/intervención manual, sin asumir una notificación activa al asesor.
- **RF-15.** El sistema debe permitir filtrar/buscar cotizaciones por su origen y, cuando provengan de una Propuesta Comercial, consultar de forma informativa si la Propuesta Comercial de origen **continúa dentro de su periodo de disponibilidad**. Esta condición no modifica la vigencia ni el Estatus de cotización ya creada. La búsqueda directa por identificador se define en RF-19.
- **RF-16.** Epico deberá determinar automáticamente el **Estatus de cotización** de cada cotización derivada de una Propuesta Comercial usando como fecha de vencimiento la **VigenteHasta** proporcionada por la Propuesta Comercial de origen. Epico no recalcula una nueva vigencia a partir de la fecha de creación de la cotización. La cotización permanece válida hasta las **23:59:59** de VigenteHasta y pasa a **Vencida** a las **00:00:00** del día siguiente, conforme a la zona horaria configurada para Epico. Una aprobación interna no pausa, reinicia ni extiende dicha fecha. Los valores del MVP son **Vigente, Próxima a vencer, Vencida y Concluida**. Si la cotización se convierte exitosamente en pedido antes de vencer, pasa a **Concluida** y no debe transicionar posteriormente a Vencida.
- **RF-17.** Cuando una cotización haya sido generada automáticamente a partir de una Propuesta Comercial proveniente del Coach Comercial, Epico deberá identificarla visualmente en el listado con el valor de origen **“Propuesta comercial”**. Esta identificación no sustituye la trazabilidad técnica hacia la Propuesta Comercial.
- **RF-18.** En el listado de cotizaciones, la columna que presenta la condición vigente de la cotización deberá denominarse **“Estatus de cotización”** y, para cotizaciones derivadas de Propuesta Comercial, podrá mostrar **Vigente, Próxima a vencer, Vencida o Concluida**.
- **RF-19.** El campo de búsqueda del listado de cotizaciones deberá permitir ingresar indistintamente un **ID de cotización** o un **ID de Propuesta Comercial**. Si el valor corresponde a una cotización existente, Epico deberá mostrar dicha cotización. Si corresponde a una Propuesta Comercial ya procesada, Epico deberá resolver la relación 1:1 y mostrar la cotización asociada. Si no existe una cotización relacionada —incluyendo el caso en que la Propuesta Comercial aún no haya sido procesada por el JOB— Epico deberá conservar el comportamiento estándar vigente para búsquedas sin resultados. El texto visible del campo deberá ser **“Buscar por ID de cotización o ID de Propuesta Comercial”**.

### Reglas de negocio

- **RN-01.** No todos los pedidos ni todas sus líneas deben estar ligados a una Propuesta Comercial.
- **RN-02.** Un pedido puede contener líneas derivadas de Propuesta Comercial y líneas habituales/adicionales.
- **RN-03.** La atribución debe conservarse por producto/línea y no únicamente por cabecera.
- **RN-04.** Una Propuesta Comercial puede no convertirse en pedido; la ausencia de conversión no elimina su trazabilidad.
- **RN-05.** Toda Propuesta Comercial debe pasar primero por cotización; no existe una ruta directa Propuesta Comercial → Pedido.
- **RN-06.** La relación de origen no debe capturarse como texto libre ni asignarse manualmente a productos que no proceden de la Propuesta Comercial.
- **RN-07.** La Propuesta Comercial cuenta con una fecha de vigencia **VigenteHasta**, proporcionada por su sistema de origen. Cuando el JOB genera la cotización en Epico, esta fecha se traslada a la cabecera de la cotización y se utiliza como su fecha de vencimiento. **Epico no calcula ni reinicia un periodo adicional de 30 días a partir de la creación de la cotización.** Por ello, si la cotización se genera días después de la Propuesta Comercial, únicamente conserva el tiempo restante hasta VigenteHasta. La cotización permanece válida hasta las **23:59:59** de VigenteHasta y pasa a **Vencida** a las **00:00:00** del día siguiente, conforme a la zona horaria configurada para Epico. Mientras permanezca abierta, evoluciona como **Vigente → Próxima a vencer → Vencida**; se considera **Próxima a vencer cuando resten 3 días calendario o menos**. Si se convierte exitosamente en pedido estando Vigente o Próxima a vencer, pasa a **Concluida**, estado que tiene precedencia y evita una transición posterior a Vencida. La aprobación interna no pausa, reinicia ni extiende VigenteHasta. Durante la vigencia, el precio de las líneas derivadas permanece congelado. Una cotización Vencida no puede convertirse a pedido bajo esta relación.
- **RN-08.** Un cliente puede tener dos o más Propuestas Comerciales **disponibles para procesamiento** al mismo tiempo. Cada una genera su propia cotización independiente, sin selección manual del asesor. Las líneas de cotizaciones distintas no se combinan entre sí para generar un único pedido. Dentro de una misma cotización sí pueden agregarse códigos o partidas adicionales.
- **RN-09.** Si una línea derivada de Propuesta Comercial se retira de la cotización/pedido y posteriormente se agrega nuevamente de forma manual, pierde su indicador de origen y su protección de precio.
- **RN-10.** La trazabilidad se implementa mediante una tabla relacional ligada por ID a cotizaciones/pedidos más un indicador de origen por línea; la condición funcional de cabecera se infiere de las líneas.
- **RN-11.** La relación funcional es **1 Propuesta Comercial → 1 Cotización → 1 Pedido**. Una Propuesta Comercial ya procesada no se reutiliza para generar otra cotización ni para alimentar un pedido adicional.

### Datos y validaciones

- **DAT-01. ID de Propuesta Comercial.** El ID es el identificador estable de la Propuesta Comercial de origen; es obligatorio para líneas atribuidas, no editable y debe pertenecer al mismo cliente. Al generar la cotización, Epico también toma **VigenteHasta** de la Propuesta Comercial y la registra como fecha de vencimiento de la cotización, sin recalcularla.
- **DAT-02. Producto de Propuesta Comercial.** El código debe existir en la Propuesta Comercial indicada y poder conciliarse con Epico. Si no puede conciliarse, el sistema no debe confirmar silenciosamente la atribución como si fuera válida; el caso debe quedar disponible para resolución conforme al mecanismo técnico definido.
- **DAT-03. ID y línea de pedido.** La línea debe pertenecer al pedido y cliente actuales. No es editable y la relación no se confirma si existe inconsistencia.
- **DAT-04. Cantidades propuesta y pedida.** Deben conservarse por separado cuando aplique; la cantidad del pedido es editable conforme al proceso vigente.
- **DAT-05. Recomendador de origen por producto.** Se conserva para líneas derivadas de Propuesta Comercial. Si llega nulo o vacío se registra “N/A” sin bloquear la atribución; F1-003 no valida el valor contra un catálogo cerrado.
- **DAT-06. Identificador de búsqueda.** El campo de búsqueda admite un ID de cotización o un ID de Propuesta Comercial. Ambos criterios resuelven contra cotizaciones existentes; el ID de Propuesta Comercial no provoca la creación de una cotización ni adelanta la ejecución del JOB.

### Permisos

- **PER-01.** Un asesor autorizado puede gestionar dentro de la cotización las líneas originadas por una Propuesta Comercial del mismo cliente, retirando productos, ajustando cantidades y agregando partidas adicionales. No selecciona ni asigna manualmente la Propuesta Comercial de origen.
- **PER-02.** El asesor no puede modificar el ID de origen, cancelar una Propuesta Comercial desde Epico ni atribuir una línea a una Propuesta Comercial de otro cliente.
- **PER-03.** La coexistencia de varias Propuestas Comerciales no requiere selección manual: cada Propuesta Comercial disponible genera su propia cotización. Una vez convertida a pedido, F1-003 no contempla reasignación posterior de la relación de origen.
- **PER-04.** Usuarios de consulta autorizados pueden ver la información de origen sin modificarla. El rol/perfil concreto de Epico permanece pendiente en Sección 9.

---

## ✅ 6. Criterios de Aceptación

- **AC-01 — Generación automática de cotización:** Dada una Propuesta Comercial persistida, disponible y pendiente de procesar, cuando el JOB la procesa, entonces Epico genera una única cotización ligada a dicha Propuesta Comercial.
- **AC-02 — Conversión parcial:** Dada una cotización derivada de Propuesta Comercial, cuando el asesor conserva sólo parte de los productos o modifica cantidades, entonces la trazabilidad conserva por separado lo propuesto y lo aceptado.
- **AC-03 — Cotización mixta:** Dada una cotización derivada de Propuesta Comercial, cuando el asesor agrega partidas adicionales, entonces esas nuevas líneas permanecen sin origen de Propuesta Comercial y conviven dentro de la misma cotización.
- **AC-04 — Flujo sin propuesta:** Dada una cotización/pedido que no proviene de Propuesta Comercial, cuando se opera en Epico, entonces continúa el flujo habitual sin exigir ID de Propuesta Comercial.
- **AC-05 — Trazabilidad por línea:** Dada una línea originada en Propuesta Comercial, cuando la cotización se convierte a pedido, entonces conserva indicador de origen e ID de Propuesta Comercial.
- **AC-06 — Múltiples propuestas:** Dado un cliente con varias Propuestas Comerciales disponibles, cuando el JOB las procesa, entonces cada una genera una cotización independiente.
- **AC-07 — Sin captura manual del origen:** Dada una cotización derivada de Propuesta Comercial, cuando el asesor la gestiona, entonces no captura ni modifica manualmente el ID de Propuesta Comercial.
- **AC-08 — Sin combinación entre cotizaciones:** Dadas dos cotizaciones originadas por Propuestas Comerciales distintas, cuando se convierten a pedido, entonces sus líneas no se combinan entre sí para formar un único pedido.
- **AC-09 — Línea retirada y reingresada:** Dada una línea derivada de Propuesta Comercial que fue retirada, cuando se agrega nuevamente de forma manual, entonces pierde su indicador de origen y protección de precio.
- **AC-10 — Precio congelado:** Dada una línea derivada de Propuesta Comercial en una cotización abierta y vigente, cuando cambia el precio de lista, entonces la línea conserva el precio proveniente de la Propuesta Comercial durante la vigencia.
- **AC-11 — Bloqueo por vencimiento:** Dada una cotización Vencida, cuando se intenta convertir a pedido bajo la relación de Propuesta Comercial, entonces el sistema bloquea la conversión.
- **AC-12 — Retiro de precio especial/promoción:** Dada una línea derivada de Propuesta Comercial con precio especial/promoción, cuando dicho precio se retira mientras la cotización sigue vigente, entonces regresa al precio de la propuesta y no al precio de lista.
- **AC-13 — Conversión única pese a concurrencia o reintentos:** Dada una cotización que recibe más de una solicitud de conversión, cuando el sistema procesa las solicitudes, entonces genera un único pedido.
- **AC-14 — Falla en la conversión:** Dada una conversión que no puede completarse, cuando el usuario reintenta, entonces el sistema evita pedidos duplicados y permite recuperar/reintentar la operación conforme al mecanismo implementado.
- **AC-15 — Traslado del precio congelado:** Dada una línea con precio congelado, cuando la cotización se convierte a pedido, entonces el pedido conserva dicho precio.
- **AC-16 — Falla definitiva del JOB:** Dada una Propuesta Comercial que el JOB no logra procesar después de los reintentos técnicos, entonces queda identificada con error y disponible para intervención manual sin generar una cotización duplicada.
- **AC-17 — Cotización Vigente:** Dada una cotización abierta cuya fecha **VigenteHasta** heredada de la Propuesta Comercial tiene más de 3 días calendario restantes, cuando Epico determina su Estatus de cotización, entonces la identifica como **Vigente**.
- **AC-18 — Cotización Próxima a vencer:** Dada una cotización abierta, cuando resten **3 días calendario o menos** para la fecha **VigenteHasta** heredada de la Propuesta Comercial, entonces la identifica como **Próxima a vencer**.
- **AC-19 — Cotización Vencida:** Dada una cotización abierta que alcanza la fecha **VigenteHasta** heredada de la Propuesta Comercial, cuando transcurren las **23:59:59** de esa fecha y comienza el día siguiente a las **00:00:00** según la zona horaria configurada para Epico, entonces la identifica como **Vencida** y bloquea su conversión a pedido.
- **AC-20 — Idempotencia Propuesta Comercial → Cotización:** Dada una Propuesta Comercial ya procesada con cotización asociada, cuando el JOB vuelve a procesarla, entonces no genera una segunda cotización.
- **AC-21 — PDF de origen no descargable:** Dada una cotización originada en Propuesta Comercial, cuando un usuario opera la cotización en Epico, entonces el PDF original del Coach no se ofrece para descarga; el documento utilizable es el PDF de la cotización de Epico.
- **AC-22 — Filtro por origen y disponibilidad:** Dadas cotizaciones con y sin origen en Propuesta Comercial, cuando el usuario utiliza los filtros definidos por UX, entonces puede distinguir su origen y, cuando aplique, consultar si la Propuesta Comercial de origen continúa dentro de su periodo de disponibilidad, sin alterar el Estatus de cotización.
- **AC-23 — Conciliación de identificadores:** Dada una Propuesta Comercial cuyos identificadores no pueden conciliarse con Epico, cuando la integración intenta procesarla, entonces no confirma una atribución inconsistente y aplica el mismo mecanismo de reintentos de RF-14; si la falla persiste, el registro queda identificado con el mismo estado de error de AC-16, disponible para intervención manual.
- **AC-24 — Visualización del origen “Propuesta comercial”:** Dada una cotización generada a partir de una Propuesta Comercial, cuando el usuario consulta el listado, entonces se muestra **“Propuesta comercial”** en la columna **Origen**.
- **AC-25 — Cotización sin origen en Propuesta Comercial:** Dada una cotización creada por el flujo habitual de Epico, cuando el usuario consulta el listado, entonces no se identifica como “Propuesta comercial” y muestra el origen correspondiente al flujo vigente.
- **AC-26 — Cotización Concluida:** Dada una cotización **Vigente** o **Próxima a vencer**, cuando su conversión a pedido se completa exitosamente, entonces su **Estatus de cotización** cambia a **Concluida**, conserva su trazabilidad y fechas históricas, deja de participar en las transiciones automáticas de vigencia y no cambia posteriormente a Vencida.
- **AC-27 — Búsqueda por ID de cotización:** Dada una cotización existente en Epico, cuando el usuario ingresa su ID en el campo **“Buscar por ID de cotización o ID de Propuesta Comercial”** y ejecuta la búsqueda, entonces el listado muestra la cotización correspondiente.
- **AC-28 — Búsqueda por ID de Propuesta Comercial:** Dada una Propuesta Comercial que ya fue procesada y tiene una cotización asociada, cuando el usuario ingresa el ID de la Propuesta Comercial y ejecuta la búsqueda, entonces Epico muestra la cotización relacionada. Si la Propuesta Comercial aún no tiene cotización asociada, el sistema conserva el comportamiento estándar vigente de Epico para búsquedas sin resultados.

---

## 🛡️ 7. Requisitos No Funcionales

- **NFR-SEC-01.** La relación sólo puede consultar Propuestas Comerciales del mismo cliente y dentro del alcance del usuario.
- **NFR-ARQ-01.** El modelo debe soportar trazabilidad por línea y no depender exclusivamente de una relación en cabecera.
- **NFR-ARQ-02.** La relación Propuesta Comercial–Cotización–Pedido debe conservar el ID de origen y permitir extensión posterior hacia facturación.
- **NFR-ARQ-03.** La arquitectura contempla una tabla relacional adicional ligada por ID/join a cotizaciones/pedidos y un indicador de origen por línea.
- **NFR-INT-01.** Una línea originada por Propuesta Comercial no debe quedar confirmada perdiendo silenciosamente su trazabilidad; si la relación no puede registrarse, la operación debe recuperarse o quedar identificada con error consultable.
- **NFR-INT-02.** Los identificadores deben ser estables y los reintentos idempotentes.
- **NFR-INT-03.** Las fallas persistentes de integración deben conservar evidencia consultable para intervención manual.
- **NFR-INT-04.** La trazabilidad/logs de la relación Propuesta Comercial–Cotización–Pedido debe conservarse durante **1 año**.

---

## 🔗 8. Impactos, Restricciones y Referencias

### Impactos

- **IMP-01.** Epico incorpora trazabilidad de origen a nivel línea; la condición de cabecera se infiere a partir de las líneas.
- **IMP-02.** La Propuesta Comercial puede reflejar conversión parcial sin convertirse directamente en pedido.
- **IMP-03.** La relación podrá extenderse posteriormente hacia facturación y analítica de conversión.
- **IMP-04.** La venta incremental puede requerir política específica de línea de crédito; permanece pendiente y no bloqueante.
- **IMP-05.** El PDF original del Coach no se descarga desde Epico; se utiliza el PDF de la cotización de Epico.

### Restricciones

- **RES-01.** El aplicativo Coach no contiene cotizaciones; éstas se generan en Epico.
- **RES-02.** Toda Propuesta Comercial pasa por cotización antes de pedido.
- **RES-03.** Una cotización derivada de Propuesta Comercial utiliza como vencimiento la fecha **VigenteHasta** recibida de su Propuesta Comercial de origen; Epico no genera una vigencia adicional desde la creación de la cotización. Una vez Vencida se bloquea para conversión; si se convierte antes, pasa a Concluida.
- **RES-04.** No existe conversión directa Propuesta Comercial → Pedido.
- **RES-05.** La sincronización se ejecuta mediante JOB cada 5 minutos; el contrato técnico exacto de integración permanece pendiente.
- **RES-06.** La búsqueda por ID de Propuesta Comercial únicamente consulta relaciones ya existentes; no ejecuta ni adelanta el JOB ni crea cotizaciones.

### Referencias

- **Spec de Proyecto:** PROJ-SPEC-SFEP-001.
- **Spec UX/UI:** UX-SPEC-F1-003.
- **Specs relacionadas:** SPEC-F1-001, SPEC-F1-002, SPEC-F3-003.
- **Sesiones de negocio:** Confirmación de reglas de negocio del Coach Comercial y sesiones posteriores de definición funcional del 17 al 23-09-2026.
- **BDD .feature:** se agrega durante Construcción; la cardinalidad funcional queda definida como 1:1:1.

---

## ❓ 9. Pendientes de Definición

Los siguientes puntos permanecen abiertos; no alteran las reglas funcionales cerradas anteriores:

- **Integración — equipo de Juan Carlos + ARQ.** Definir contrato técnico exacto (webservice/API, latencia y timeout). La frecuencia del JOB ya está definida en **5 minutos**.
- **Crédito — PO EF + Crédito y Cobranza.** Definir tratamiento de línea de crédito para productos incrementales. No bloqueante para esta Spec.
- **Propietario de la cotización — ARQ + DEV.** Definir el creador/propietario técnico de la cotización auto-generada.
- **Permisos — PO EF + Accesos/Seguridad Epico.** Identificar el rol/perfil concreto que implementa PER-04; no se crea un rol nuevo por esta Spec.
- **Mapeo físico de columnas — PO + negocio + ARQ.** Resolver el mapeo físico entre los conceptos de F1-003 y REQ-24222 cuando existan nombres similares. Compartir nombre no implica compartir semántica.

---

## ✅ Validación para Ready for Dev

* [x] Objetivo y alcance funcional definidos.
* [x] Flujo Propuesta Comercial → Cotización → Pedido definido.
* [x] Cardinalidad 1:1:1 definida.
* [x] Fecha VigenteHasta de Propuesta Comercial trasladada como vencimiento de la Cotización, sin recálculo.
* [x] Estatus de cotización definidos: Vigente, Próxima a vencer, Vencida y Concluida.
* [x] Regla de vencimiento por fecha calendario definida.
* [x] Trazabilidad por línea y origen visual definidos.
* [x] Búsqueda unificada por ID de cotización o ID de Propuesta Comercial definida.
* [x] Escenarios de reintento, idempotencia y error considerados.
* [x] Criterios de aceptación funcionales definidos.
* [x] NFR específicos de esta Spec definidos.
* [ ] NFR transversales del Proyecto considerados.
* [x] Spec UX/UI asociada en Ready for Dev.
* [ ] Pendientes técnicos/no bloqueantes de Sección 9 resueltos.
