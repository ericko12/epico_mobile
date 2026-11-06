---
spec: EF-50612
folio: PROJ-SPEC-SFEP-001
tipo: proyecto
titulo: Migración de Salesforce a Epico e integración del Coach Comercial
origen: Confluence · espacio PE · página 1659863046 «00_SPEC_PROYECTO_Migracion_Salesforce_Epico» · modificada 2026-09-18 · cabecera Versión 0.3 · Estado Borrador
resuelto_por: titulo-proyecto
anexos: ninguno
contenido_hash: sha256:ece5e1b9430b236e75592e616df5e1039e664d4478c477500ca4bcb8947755a8
estado_pagina_al_congelar: Borrador
estado_issue_al_congelar: n/a (es el #Release padre)
rama: EF-50620/ligar-pedido-propuesta
generado_por: skill inicio-tarea v1.4
---

# ⚠ SNAPSHOT PROYECTO — Copia congelada de la página de Confluence PROJ-SPEC-SFEP-001 (#Release EF-50612). No editar este archivo.
> Es **contexto**: de aquí no se construye, pero sus restricciones transversales (§4)
> obligan. La página está en `Borrador`; sus definiciones pueden moverse.

# 📘 Migración de Salesforce a Epico e integración del Coach Comercial

1. **Spec de Proyecto:** PROJ-SPEC-SFEP-001
2. **Responsable PO:** Dioni Miramontes (DM)
3. **Versión:** 0.3
4. **Última actualización:** 17-09-2026
5. **Estado:** Borrador

---

## 🎯 1. Resumen y Contexto

- **Necesidad / Problema actual:** Epico es el CRM interno actualmente operativo de la compañía, pero su alcance se concentra principalmente en el levantamiento de pedidos y en las capacidades que lo habilitan: catálogo y buscador de productos, clientes, direcciones, precios y entidades comerciales relacionadas. Salesforce se contrató para cubrir capacidades de CRM que Epico no tenía. La licencia de Salesforce concluye el **16 de diciembre de 2026** y no será renovada ni sustituida por otra aplicación; por ello, las funciones priorizadas que sí viven en Salesforce deberán operar en Epico antes del corte. La capacidad actual de desarrollo asistido por IA permite construir más rápido estas funciones a la medida, incorporarlas al producto interno y robustecer Epico como CRM. El programa también incluye trabajos que no son migraciones: conectar Respond\_io con Epico para leads, crear una capacidad nueva de solicitudes de crédito e integrar el Coach Comercial y la Propuesta Comercial desarrollados por el equipo de Juan Carlos en BI y Data Analytics.
- **Objetivo del Proyecto:** Asegurar la continuidad de la operación comercial y robustecer el CRM interno mediante cuatro líneas coordinadas: cerrar en Epico la trazabilidad entre Propuesta Comercial y pedido; migrar a Epico las capacidades priorizadas que hoy viven en Salesforce; integrar en Epico el Coach Comercial desarrollado externamente por BI y Data Analytics; y habilitar las nuevas integraciones o funciones comerciales priorizadas para leads y crédito. El resultado debe permitir que el asesor planee, ejecute, documente y convierta su actividad comercial en una experiencia conectada y trazable, sin presentar como migración aquello que hoy no reside en Salesforce.
- **Valor de negocio:**
- Evitar la interrupción de la operación de ventas al concluir Salesforce.
- Convertir a Epico en una plataforma CRM interna más completa, controlable y adaptable a la operación de la compañía, conservando su fortaleza actual en pedidos y maestros comerciales.
- Concentrar en Epico el contexto de cliente, dirección, contacto, visita, diagnóstico, vehículo, tarea, propuesta, pedido y solicitud que necesita la fuerza de ventas.
- Convertir la inteligencia de BI en acciones concretas del asesor y conservar evidencia de qué se recomendó, qué se propuso, qué aceptó o rechazó el cliente y qué terminó en pedido o factura.
- Reducir la dependencia de procesos dispersos, recapturas, búsquedas manuales y conocimiento no documentado.
- Crear una base común de datos, reglas, permisos, integraciones y experiencia que permita evolucionar las siguientes fases del backlog sin volver a descubrir el contexto completo.
- Probar el modelo operativo con IA mediante artefactos trazables y mantenibles por humanos e IA durante Discovery, Definición, Desarrollo, Validación y Despliegue.
- **Impacto esperado:** Continuidad operativa de la fuerza de ventas; sustitución funcional priorizada de Salesforce dentro de Epico; operación comercial más trazable; datos útiles para enriquecer el Coach; reducción del riesgo de perder seguimiento de clientes, visitas y solicitudes durante la transición.
- **Métricas / KPI:**
- **KPI-P-01 — Continuidad al corte:** las 15 capacidades de las fases 1 a 4 cuentan con decisión de alcance, versión aprobada, estrategia correspondiente —migración, integración, construcción nueva o dependencia externa— y responsable antes de su despliegue.
- **KPI-P-02 — Cobertura operativa:** cada flujo crítico que se retire de Salesforce dispone de su equivalente validado en Epico, incluidos roles, excepciones, datos, permisos y evidencia de aceptación.
- **KPI-P-03 — Preparación para el 16-12-2026:** no existen bloqueadores críticos abiertos para que los usuarios incluidos en el MVP trabajen sin Salesforce a partir del corte.
- **KPI-P-04 — Calidad de migración:** los conteos, llaves, relaciones y muestras de datos acordadas para cada objeto migrado concilian contra la fuente y tienen evidencia de aprobación del dueño de información.
- **KPI-P-05 — Adopción:** los usuarios objetivo completan capacitación, pruebas por rol y escenarios operativos definidos antes del cambio productivo.
- **KPI-P-06 — Trazabilidad comercial:** las propuestas comerciales y sus productos pueden relacionarse con el pedido y sus líneas en Epico, sin impedir pedidos ordinarios o mixtos y sin atribuir a la propuesta productos que no provinieron de ella.
- **KPI-P-07 — Utilidad del Coach:** con los datos que entregue BI y Data Analytics se puede medir recomendación presentada, retroalimentación capturada, propuesta generada y resultado comercial. El equipo de Diseño y Desarrollo es responsable de la trazabilidad propuesta-pedido en Epico; la definición y evolución de los recomendadores y de la retroalimentación corresponde al equipo de Juan Carlos.
- **KPI-P-08 — Estabilidad posterior al despliegue:** incidentes críticos, errores de integración y discrepancias de datos se monitorean con criterios y umbrales que deberán cerrarse en Definición.

---

## 👥 2. Usuarios, Áreas y Responsables

- **Público objetivo:**
- **Usuarios y Áreas beneficiadas:**
- Asesores de venta de campo, responsables de Empresas, Talleres, Motopartes y Refaccionarias.
- Gerentes comerciales, gerentes territoriales y gerentes divisionales.
- KAM/CAMP y responsables de cuentas nacionales o multicentro.
- Personal GUN, Logística e Inventarios que prepara, entrega y recibe mercancía a bordo.
- Crédito y Jurídico, involucrados en revisión documental, decisiones y seguimiento de solicitudes de crédito.
- Telemarketing, Campañas, Omnicanalidad y la operación de Oscar Villalobos, actualmente soportada en Respond\_io para captar y trabajar leads provenientes de WhatsApp, Facebook, campañas y otras fuentes.
- 
    - 
        - Dirección Comercial y el equipo de Juan Carlos en BI y Data Analytics, responsables de los nueve algoritmos recomendadores, la retroalimentación del cliente, el Coach Comercial y la generación inicial de la Propuesta Comercial.
- Clientes registrados, como beneficiarios indirectos de visitas mejor preparadas, propuestas pertinentes y seguimiento continuo.
- **Usuarios y Áreas que utilizarán la solución:**
- Fuerza de ventas en movilidad para agenda, ruta, visita, captura de información, propuestas y seguimiento.
- Gerencias comerciales en Epico web para consulta, autorización, seguimiento y supervisión.
- Equipos operativos de GUN, Logística, Inventarios, Crédito y Jurídico en los pasos que correspondan a cada flujo.
- Administradores funcionales y de seguridad para catálogos, usuarios, roles, territorios, sucursales y configuración.
- Soporte, QA y Operaciones para monitoreo, diagnóstico de errores, conciliación y atención de incidentes.
- **Usuarios y Áreas impactadas:**
- Producto Epico, Desarrollo Front End/Back End, Arquitectura, Datos, Integraciones, Seguridad, UX/UI y QA.
- Equipo de Juan Carlos en BI y Data Analytics, por los contratos de datos, APIs y servicios que conectarán los recomendadores, el Coach y la Propuesta Comercial con Epico.
- Erick Frias, Jorge Quintero y Oscar Villalobos, como participantes indicados por EF | JQ | OV para definir la transición de leads desde Respond\_io hacia Epico.
- 
    - 
        - Dueños de sistemas maestros de clientes, direcciones, productos, precios, inventario, pedidos, facturación y crédito.
- Gestión del cambio, capacitación y mesa de ayuda, por el retiro definitivo de Salesforce.
- Finanzas y Compras/Tecnología, por el término de la licencia y la indisponibilidad posterior de la plataforma.

---

## 💡 3. Alcance y Consideraciones Iniciales

- **En el alcance (In Scope):**
- **Fase 1 — Cierre de trazabilidad de la Propuesta Comercial:** el equipo de Juan Carlos en BI y Data Analytics desarrolla Utilizar recomendadores JC y Retroalimentación del Cliente JC. Sus nueve algoritmos parten de históricos de venta y generan oportunidades como productos dejados de comprar, productos nuevos o productos comprados por clientes con características semejantes. La aplicación Demo del Coach conversa con el asesor, combina sus respuestas, IA, históricos y aprendizaje de usuarios piloto, y junto con los recomendadores genera una primera Propuesta Comercial, usualmente disponible como PDF o registro en base de datos. El alcance del equipo de Diseño y Desarrollo en esta fase se limita a Ligar el Pedido a la Propuesta comercial: recibir la propuesta y sus productos, y conservar en Epico la relación con el pedido y sus líneas. El Discovery será ligero y puntual sobre UX/UI, identificadores, contrato de datos y alternativa técnica; una tabla relacional es una opción a evaluar, no una arquitectura aprobada.
- **Fase 2 — Migración Salesforce a Epico, MVP Parte 1:** las seis capacidades viven actualmente en Salesforce y deberán trasladarse a Epico mediante extensión de módulos existentes o creación de módulos nuevos: Agenda; Check-in/Check-out y formulario de visita; Tareas; Diagnóstico del cliente e información adicional; Parque vehicular asociado a dirección; Registro de contactos asociados al cliente, para empresas por dirección.
- **Fase 3 — Enriquecimiento e integración del Coach Comercial:** el equipo de Juan Carlos en BI y Data Analytics es responsable de complementar los algoritmos de Fase 1 con los datos de Fase 2 y disponibilizar el Coach Comercial mediante APIs. La responsabilidad principal del equipo de Diseño y Desarrollo es integrar en Epico la aplicación externa del Coach, definir con UX si conserva el patrón conversacional tipo chat/copilot o adopta otro patrón y conectar la Propuesta Comercial con la operación de Epico.
- **Fase 4 — Migraciones y capacidades adicionales:** se migra desde Salesforce únicamente Solicitud de mercancía a bordo. Gestión de leads/contactos \<\> conversión a cliente es una integración nueva para que la operación actual de Respond\_io sincronice los leads con Epico en lugar de Salesforce, con participación EF | JQ | OV. Solicitudes de crédito es una capacidad nueva que hoy no vive en Salesforce ni en Epico y busca conectar en un mismo flujo o conversación al asesor, al cliente y al responsable de Crédito.
- 
    - Levantamiento y definición de flujos As-Is y To-Be, reglas, datos, permisos, estados, excepciones, criterios de aceptación, NFR, impactos, integraciones y experiencia para las capacidades priorizadas.
- Migración o transición de los datos necesarios para operar las capacidades incluidas, conservando llaves, relaciones, trazabilidad y criterios de calidad acordados.
- Convivencia temporal, ensayo de corte, respaldo consultable y retiro controlado de Salesforce según lo que permita el contrato y el plan técnico.
- Integración de Epico con las fuentes y servicios necesarios para clientes, direcciones, productos, precios, pedidos, facturación, inventario, crédito, geolocalización, Respond\_io y Coach, una vez que los contratos sean definidos y aprobados.
- 
    - Experiencia web y móvil/responsive según el rol y el contexto operativo. El patrón visual existente de Epico será la referencia inicial; el Design System y los prototipos deberán formalizarse en Discovery/Definición.
- Seguridad por rol, segregación de funciones, auditoría, privacidad, observabilidad, recuperación ante error y soporte operativo.
- Preparación de pruebas end-to-end, capacitación, gestión del cambio, despliegue, monitoreo y estabilización previa al retiro de Salesforce.
- **Fuera del alcance (Out of Scope):**
- Las fases 5 a 8 del backlog y cualquier elemento que el backlog no haya priorizado dentro de las fases 1 a 4.
- Los módulos marcados fuera del MVP prioritario en el inventario funcional, salvo una dependencia mínima que deba resolverse para que una capacidad incluida opere.
- Renovar Salesforce o contratar una plataforma CRM sustituta distinta de Epico.
- Replicar Salesforce pantalla por pantalla o migrar campos, automatizaciones y reportes sin un uso demostrado o una decisión explícita.
- Desarrollar en esta etapa una solución general para público no registrado; la Fase 1 se limita a clientes registrados.
- Incorporar Contact Center o Telemarketing como usuarios primarios del MVP del Coach, salvo que Discovery apruebe expresamente el cambio.
- Definir como comprometidas integraciones de Crédito 360 con Exodus, Respond\_io o Webdox sólo porque aparecen en la presentación. El modelo de destino debe validarse para Epico, ya que la presentación usa Salesforce como canal central. Esta restricción corresponde a Crédito y no elimina la integración Respond\_io→Epico que sí forma parte del dominio de leads en SPEC-F4-002.
- 
    - Reimplementar en Epico los algoritmos recomendadores, la lógica de retroalimentación del cliente o las APIs del Coach que son entregables del equipo de Juan Carlos, salvo adaptadores o contratos de integración explícitamente acordados.
- Automatizar decisiones crediticias, cargos por mercancía, fusiones de clientes o recomendaciones comerciales sin reglas aprobadas, trazabilidad y control humano.
- Rediseñar todo Epico o crear un Design System completo como parte de una sola Spec; únicamente se diseñarán las superficies y extensiones necesarias para las capacidades incluidas.
- **Criterios de éxito del Proyecto:**
- **CRI-P-01.** El equipo de Diseño y Desarrollo completa en Fase 1 la vinculación trazable entre Propuesta Comercial, productos propuestos, pedido y líneas de pedido en Epico, sin bloquear ventas ordinarias o mixtas; los recomendadores y la retroalimentación se consumen como entregables del equipo de Juan Carlos.
- **CRI-P-02.** Las capacidades de Fase 2 están operativas en Epico con los datos, permisos y escenarios críticos que permiten planear y documentar una visita comercial.
- **CRI-P-03.** El equipo de Juan Carlos disponibiliza APIs versionadas y enriquece los algoritmos con información aprobada de Fase 2; el equipo de Diseño y Desarrollo integra el Coach externo en Epico con un patrón UX validado y sin duplicar la lógica analítica.
- **CRI-P-04.** En Fase 4, mercancía a bordo opera en Epico como migración de Salesforce; los leads fluyen desde Respond\_io hacia Epico con reglas de conversión y deduplicación; y las solicitudes de crédito operan como una capacidad nueva con participantes, documentos, decisiones y trazabilidad definidos.
- 
    - **CRI-P-05.** Cada fase pasa por un único Discovery de fase, cierra sus decisiones bloqueantes en Definición y conserva sus Specs como fuente de verdad durante Desarrollo, Validación y Despliegue.
- **CRI-P-06.** Antes del 16-12-2026 se ha ejecutado un ensayo de corte, conciliación de datos, UAT por rol, capacitación, plan de contingencia y decisión formal Go/No-Go.
- **CRI-P-07.** El negocio puede consultar evidencia auditada de las operaciones críticas y sus resultados después de retirar Salesforce.
- **CRI-P-08.** La solución desplegada cuenta con responsables de soporte, monitoreo y corrección durante estabilización.
- **Riesgos generales a considerar:**
- **RISG-P-01.** La fecha fija del 16-12-2026 deja poco margen para decisiones tardías; cualquier retraso en datos, ambientes, accesos o aprobaciones amenaza la continuidad operativa.
- **RISG-P-02.** Las transcripciones muestran el As-Is, pero no cierran todas las reglas, estados, excepciones ni permisos. Implementar por inferencia puede reproducir errores o crear comportamientos no aprobados.
- **RISG-P-03.** Agenda, geolocalización, clientes, direcciones y territorios dependen de coordenadas y llaves consistentes; baja calidad puede impedir rutas, visibilidad o asociación correcta.
- **RISG-P-04.** No existe evidencia completa para Tareas como módulo independiente ni para la transición Respond\_io→Epico y conversión Lead→Cliente; ambos requieren definición focalizada antes de construir.
- **RISG-P-05.** El negocio confirma que existen nueve algoritmos recomendadores, pero la evidencia disponible sólo permite identificar ocho de forma individual. La definición del noveno, junto con elegibilidad, vigencia, deduplicación, métricas y contratos, debe ser confirmada por el equipo de Juan Carlos sin inventarla en estas Specs.
- **RISG-P-06.** Relacionar propuesta, cotización, pedido y factura a nivel incorrecto puede perder trazabilidad en pedidos mixtos o atribuir resultados indebidamente.
- **RISG-P-07.** Solicitudes de crédito no es una migración y hoy no vive en Salesforce ni en Epico. La presentación de Crédito 360 propone Salesforce como núcleo, lo cual contradice el retiro de Salesforce; la arquitectura, el canal compartido entre asesor, cliente y Crédito, y las integraciones futuras deben resolverse sin asumir que la propuesta está aprobada.
- **RISG-P-08.** Tareas, notificaciones, aprobaciones, inventario y movimientos pueden duplicarse ante reintentos si no se diseñan idempotencia y conciliación.
- **RISG-P-09.** Datos personales, ubicación, contactos, evidencias fotográficas y expedientes fiscales/crediticios requieren controles de acceso, retención, cifrado y auditoría.
- **RISG-P-10.** Una migración técnica que replique datos obsoletos o sin dueño puede degradar Epico y dificultar la adopción.
- **RISG-P-11.** La convivencia de Salesforce, Respond\_io, la aplicación Demo externa del Coach y Epico puede generar duplicidad, versiones divergentes o captura en el sistema equivocado si no se definen autoridades y sincronización.
- 
    - **RISG-P-12.** El cambio de hábitos de 100+ a 600+ usuarios según el módulo, así como diferencias entre móvil y web, exige pruebas representativas y gestión del cambio.
- **RISG-P-13.** La secuencia F1→F2→F3 crea dependencia entre equipos; F3 puede bloquearse si F2 no define contratos y datos a tiempo.
- **RISG-P-14.** La disponibilidad posterior de Salesforce, sus adjuntos y su historial no está confirmada; perder acceso antes de validar exportaciones generaría una brecha de evidencia.
- **Dependencias generales:**
- **DEP-P-01.** Disponibilidad de Epico, sus repositorios, ambientes, arquitectura, autenticación, roles, catálogos y capacidad de despliegue.
- **DEP-P-02.** Acceso controlado a Salesforce y a sus datos, metadatos, adjuntos y configuraciones antes del vencimiento.
- **DEP-P-03.** Dueños y contratos de los maestros de cliente/cuenta, dirección/base, contacto, vendedor/SellerId, producto, precio, sucursal, inventario, pedido, factura y crédito.
- **DEP-P-04.** Servicio geoespacial/ruteo y condiciones de licencia, costo, cuotas, precisión y operación móvil.
- **DEP-P-05.** Equipo de Juan Carlos en BI y Data Analytics: nueve algoritmos recomendadores, retroalimentación del cliente, aplicación Demo del Coach, generación y persistencia de propuestas, datos de entrada, métricas y APIs.
- **DEP-P-06.** Integraciones operativas con pedidos, facturación, inventario/subalmacén, Exodus u otros sistemas que resulten autoridades de información.
- **DEP-P-07.** Arquitectura, Seguridad, Datos, UX, Desarrollo y QA disponibles en microcélulas por fase.
- **DEP-P-08.** Usuarios clave, dueños de proceso y responsables de negocio disponibles para Discovery, Definition, UAT y Go/No-Go.
- **DEP-P-09.** Plan de migración, limpieza, reconciliación, cutover, contingencia y retención histórica.
- **DEP-P-10.** Gestión del cambio: comunicación, dispositivos, conectividad, capacitación, soporte y seguimiento de adopción.
- **DEP-P-11.** Resolución de identificadores y relaciones canónicas entre Lead, Cuenta/Cliente, Dirección, Persona/Contacto, Visita, Propuesta, Pedido y Factura.
- **DEP-P-12.** Inventario de licencias y componentes de terceros usados actualmente por mapas, archivos, mensajería o firma.
- **DEP-P-13.** Operación de Oscar Villalobos, configuración y contratos de Respond\_io, fuentes de leads y disponibilidad de EF | JQ | OV para acordar sincronización, conversión, deduplicación y transición desde Salesforce.
- 
    - **DEP-P-14.** Equipo de Crédito y canales de interacción con el cliente para definir participantes, documentos, identidad, privacidad, tiempos de respuesta y una conversación sin triangulación por el asesor.
- **Supuestos no validados:**
- **SUP-P-01.** Epico, CRM interno actualmente operativo y orientado principalmente al levantamiento de pedidos, tendrá capacidad técnica para incorporar las extensiones CRM, integraciones y funciones nuevas de las cuatro fases y será la aplicación operativa principal de la fuerza de ventas después del 16-12-2026.
- **SUP-P-02.** Septiembre y octubre de 2026 se dedicarán principalmente a definición y desarrollo asistido por IA, noviembre a pruebas y estabilización y diciembre a migración y corte. El plan detallado, capacidad y ruta crítica aún requieren aprobación.
- **SUP-P-03.** Las filas priorizadas en verde del inventario funcional representan las capacidades prioritarias de las fases 2 y 4; el backlog es la autoridad para segmentarlas y su clasificación individual determina si corresponden a migración, integración o capacidad nueva.
- **SUP-P-04.** Los clientes incluidos en Fase 1 ya están registrados y cuentan con identificadores reconciliables con Epico.
- **SUP-P-05.** La aplicación Demo externa del Coach, con experiencia conversacional tipo chat/copilot y usuarios piloto, puede operar transitoriamente hasta que la Fase 3 complete su integración en Epico.
- **SUP-P-06.** Los datos de Fase 2 aportarán contexto útil y legalmente utilizable por el Coach en Fase 3.
- **SUP-P-07.** Los usuarios dispondrán de dispositivos, permisos de ubicación y conectividad suficientes; la necesidad y alcance de operación offline deberán validarse por capacidad.
- **SUP-P-08.** Los patrones visibles actuales de Epico pueden reutilizarse como base de navegación, tablas, formularios, perfil y menú, sujetos a validación UX y accesibilidad.
- **SUP-P-09.** El negocio podrá asignar dueños de catálogo, datos, reglas y aprobaciones durante Discovery.
- **SUP-P-10.** Será posible conservar historial o un archivo consultable de Salesforce dentro de las restricciones contractuales y de seguridad.
- **SUP-P-11.** La Propuesta Comercial generada por BI y Data Analytics podrá representarse para el usuario como PDF u otro formato acordado, pero la integración entregará además una fuente estructurada o contrato con identificadores estables de propuesta, cliente y productos para correlacionarlos con pedidos y líneas de pedido de Epico. Un PDF aislado no se considera suficiente para la liga automática.

---

## 🧭 4. Definiciones y Restricciones Transversales

- **Restricciones generales:**
- **RES-P-01.** Salesforce deja de ser una plataforma disponible para la operación a partir del vencimiento contractual; el proyecto no puede depender de su renovación.
- **RES-P-02.** Sólo se consideran las fases 1 a 4 del backlog para este paquete de Pre Discovery.
- **RES-P-03.** Una transcripción, imagen o inventario demuestra contexto, no necesariamente una regla aprobada. Toda contradicción se registra como pendiente y no se completa con invenciones.
- **RES-P-04.** Fase 1 tendrá un Discovery ligero y puntual; Fases 2, 3 y 4 tendrán un Discovery único por fase, con mesas por dominio si son necesarias.
- **RES-P-05.** Ninguna Spec pasa a Ready for Dev con pendientes críticos de reglas, estados, datos, permisos, contratos, seguridad o UX.
- **RES-P-06.** La migración no copiará datos o automatizaciones sin dueño, propósito, relación canónica y criterio de retención.
- **RES-P-07.** Se debe mantener operación móvil segura para la fuerza de ventas y experiencia web adecuada para roles de supervisión y operación; la matriz dispositivo-capacidad se cerrará en Discovery.
- **RES-P-08.** Las decisiones automatizadas del Coach son recomendaciones asistidas: el asesor conserva control sobre selección, ajuste y presentación al cliente, y su acción debe quedar trazada.
- **RES-P-09.** No se codificarán personas como responsables fijos; se utilizarán roles, colas, territorios y reglas de sustitución configurables.
- **RES-P-10.** Las fechas, horas, SLA y días hábiles deberán definir zona horaria, calendario, feriados y comportamiento ante vencimientos.
- **RES-P-11.** Los contratos de integración deberán ser versionados, idempotentes, observables y recuperables; los errores no podrán dejar operaciones parciales silenciosas.
- **RES-P-12.** El alcance de cada fase debe poder desplegarse, validarse y monitorearse como incremento de valor, aunque comparta componentes o datos con otra fase.
- **Sistemas / Integraciones involucradas:**
- **INT-P-01.** Epico: CRM interno actualmente operativo, con fortaleza principal en levantamiento de pedidos y capacidades existentes de navegación, autenticación, roles, clientes, direcciones, catálogo/buscador de productos, precios, pedidos y otros módulos comerciales.
- **INT-P-02.** Salesforce: fuente As-Is y origen temporal de datos/historial a retirar.
- **INT-P-03.** Coach Comercial/BI y Data Analytics: aplicación Demo externa tipo asistente conversacional, nueve algoritmos recomendadores, retroalimentación, generación de propuesta y servicios/APIs de recomendación bajo responsabilidad del equipo de Juan Carlos.
- **INT-P-04.** Maestros de clientes/cuentas y direcciones, incluido el identificador de cliente, SellerId y ExternalId de dirección.
- **INT-P-05.** Catálogo de productos, familias, precios y disponibilidad.
- **INT-P-06.** Pedidos, cotizaciones y facturación para atribución de propuesta y resultado comercial.
- **INT-P-07.** Inventario, sucursales, GUN, Logística y subalmacenes para mercancía a bordo.
- **INT-P-08.** Servicio de mapas, geocodificación, distancias y ruteo; proveedor definitivo pendiente.
- **INT-P-09.** Respond\_io: sistema actual de la operación de Oscar Villalobos para trabajar leads de WhatsApp, Facebook, campañas y otras fuentes; en Fase 4 deberá sincronizar hacia Epico en lugar de Salesforce.
- 
    - **INT-P-10.** Identidad, autorización, auditoría, notificaciones, tareas, archivos y observabilidad.
- **INT-P-11.** Crédito/Finanzas y, sujeto a decisión arquitectónica, canales o servicios como Exodus y Webdox. La nueva solicitud de crédito no parte de una función existente en Salesforce o Epico.
- **Consideraciones de Seguridad:**
- Aplicar mínimo privilegio y segregación de funciones: quien solicita no debe aprobar cuando el proceso lo requiera; los estados sensibles sólo cambian por roles autorizados.
- Proteger datos personales, geolocalización, contactos, documentos fiscales/crediticios, evidencia fotográfica y resultados del Coach mediante cifrado, autorización, auditoría y políticas de retención.
- Auditar creación, consulta sensible, descarga, edición, aprobación, rechazo, cambio de estado, reasignación, exportación y eliminación/desactivación.
- Definir consentimiento, finalidad, opt-out y uso permitido de medios de contacto antes de habilitar campañas o canales conversacionales.
- Evitar exposición de clientes o leads fuera del territorio, equipo de cuenta o rol autorizado; validar reglas para información pública como DENUE.
- Incluir protección de archivos, validación de tipo/tamaño, análisis antimalware y trazabilidad de versión en expedientes y evidencias.
- Acordar retención, respaldo, recuperación y acceso al histórico de Salesforce antes del corte.
- **Consideraciones de Arquitectura:**
- Definir un modelo canónico con identificadores estables para Lead, Cuenta/Cliente, Dirección, Persona/Contacto, Agenda/Evento, Visita, Tarea, Diagnóstico, Parque Vehicular, Propuesta, Línea de Propuesta, Pedido, Línea de Pedido, Caso y Documento.
- Separar persona de sus relaciones con cuenta y dirección para evitar duplicados y permitir funciones locales o centrales.
- Relacionar propuestas y pedidos a nivel de línea cuando exista mezcla de productos con distinto origen; no forzar que todo el pedido provenga de una sola propuesta.
- Diseñar APIs y eventos versionados con autenticación, idempotencia, correlación, manejo de errores, reintentos, timeouts, observabilidad y conciliación.
- Mantener autoridades de datos explícitas y evitar doble escritura sin estrategia de sincronización.
- Diseñar migración incremental/ensayo, congelamiento, delta final, conciliación, rollback operativo y archivo histórico.
- Instrumentar métricas técnicas y funcionales desde el inicio: latencia, errores, sincronización, tareas duplicadas, resultados del Coach y conversiones.
- Resolver estrategia de conectividad intermitente, almacenamiento local, sincronización y conflictos para las experiencias de campo que lo requieran.
- **Consideraciones UX/UI:**
- Mantener continuidad con la navegación lateral, búsqueda, tablas, tarjetas, perfil y módulos ya visibles en Epico, sin asumir que constituyen un Design System formal.
- Priorizar operación móvil para asesor de campo: acciones breves, información esencial, geolocalización explicable, captura de evidencia y recuperación ante pérdida de red.
- Priorizar web para supervisión, autorización, crédito, inventario y administración, con estado, responsable, SLA, historial y acciones claramente separados.
- No copiar la interfaz de Salesforce de forma literal; conservar el significado operativo y simplificar recapturas, campos redundantes y saltos entre objetos.
- Hacer visibles origen, actualización y confiabilidad de una recomendación; permitir al asesor seleccionar, omitir o ajustar sin ocultar su responsabilidad.
- Definir estados vacío, carga, error, parcial, sin conexión, éxito, permisos insuficientes y conflictos de sincronización por flujo.
- Prototipos/Figma, catálogo de componentes, reglas DS y estándares Front son entregables de Discovery/Definición y permanecen pendientes al cierre de Pre Discovery.
- **Otras definiciones aplicables a todas las Specs:**
- **Jerarquía de fuentes:** el backlog define fase y alcance; las transcripciones y evidencia visual describen el As-Is; el inventario aporta volumen, actores e integración contextual; la llamada con Juan Carlos contextualiza Coach/Propuesta; las decisiones formalmente aprobadas durante Discovery sustituyen hipótesis.
- **Nombre del producto:** en todos los artefactos se escribe Epico, sin acento.
- **Clasificación del alcance:** migración aplica sólo a una capacidad que hoy vive en Salesforce y se traslada a Epico; integración conecta Epico con un producto o sistema existente; capacidad nueva describe un flujo que hoy no vive en Salesforce ni en Epico; dependencia externa identifica entregables de otro equipo.
- **Clave de responsables:** JC en el backlog significa que el equipo de Juan Carlos en BI y Data Analytics desarrolla la capacidad. EF | JQ | OV identifica la participación de Erick Frias, Jorge Quintero y Oscar Villalobos.
- **Trazabilidad de certeza:** los hechos observados se redactan como comportamiento actual; las propuestas To-Be y supuestos se identifican; todo vacío que cambie construcción se marca \[NEEDS CLARIFICATION\].
- **Una Discovery por fase:** cada fase mantiene una agenda común, decisiones transversales y salida única. Puede dividir talleres por capacidad, pero no reiniciar el contexto en cada Spec.
- **Discovery Fase 1 — ligero y puntual:** para el equipo de Diseño y Desarrollo se limita a cerrar cómo se presenta o selecciona en UX/UI la Propuesta Comercial al crear un pedido, identificadores y granularidad de la relación propuesta-producto-pedido-línea, contrato de datos, pedidos mixtos, errores, permisos y métricas de conversión. No redescubre ni redefine los recomendadores o la retroalimentación que construye el equipo de Juan Carlos.
- **Discovery Fase 2:** cerrar, para los seis módulos provenientes de Salesforce, el modelo cliente-dirección-visita, roles, sistemas de registro, catálogos, distancias/tiempos, tareas, contactos por dirección, datos/contratos, operación móvil, ajuste a módulos existentes o creación de módulos y migración.
- **Discovery Fase 3:** cerrar con BI y Data Analytics los contratos/APIs del Coach y las fuentes de Fase 2; y con Diseño y Desarrollo la integración en Epico, el patrón conversacional o alternativo, navegación, contexto, permisos, historial, errores y relación de la propuesta con la operación.
- **Discovery Fase 4:** separar tres dominios: migración de mercancía a bordo; integración Respond\_io→Epico y conversión Lead→Cliente con EF | JQ | OV; y diseño desde cero de solicitudes de crédito con asesor, cliente y responsable de Crédito en una interacción compartida que reduzca triangulación.
- **Ciclo de vida completo del modelo operativo:**

1. **Pre Discovery:** contextualizar, delimitar, priorizar, registrar riesgos/dependencias/supuestos, inicializar esta Spec y habilitar Specs Funcionales/UX y microcélulas.
2. **Discovery:** documentar As-Is, hallazgos funcionales/UX/técnicos/QA, dolores y oportunidades; validar supuestos; definir To-Be y factibilidad; enriquecer Specs con evidencia.
3. **Definición:** cerrar flujos, variantes, reglas, datos, permisos, integraciones, criterios de aceptación, NFR, UX, arquitectura y contratos; resolver pendientes críticos y declarar Ready for Dev.
4. **Desarrollo:** construir Front/Back desde las Specs; usar estándares vigentes; revisar lo generado por IA; producir behavior.feature, openapi.yaml, [spec.snapshot.md](http://spec.snapshot.md) y [plan.md](http://plan.md) cuando apliquen; integrar y dejar trazabilidad para Code Review.
5. **Validación:** probar end-to-end, escenarios funcionales, datos e integraciones; ejecutar pruebas de usuario y revisión con usuarios clave; corregir discrepancias, actualizar Specs y aprobar versión para despliegue.
6. **Despliegue:** preparar release y checklist; desplegar, ejecutar smoke/sanity, confirmar estabilidad y datos; resolver incidentes, comunicar el cambio, actualizar artefactos y registrar aprendizaje/valor.

- **Gobierno de cambios:** cualquier cambio que amplíe fases, usuarios o automatización debe reflejarse primero en esta Spec y en el backlog, con impacto en fecha y dependencias.

---

## 📚 5. Backlog de Specs Funcionales

- **SPEC-F1-003 — Vinculación del pedido con la Propuesta Comercial**
- **Objetivo:** Cerrar en Epico el ciclo de trazabilidad entre la Propuesta Comercial y el pedido, relacionando sus productos con las líneas de pedido sin impedir pedidos ordinarios o mixtos.
- **Prioridad:** Alta — Fase 1
- **Estado:** Habilitada
- **Dependencia entre Specs:** Ninguna
- **Microcélula:** Equipo de Diseño y Desarrollo. Requiere colaboración puntual con BI y Data Analytics para contrato e identificadores.
- **SPEC-F2-001 — Agenda comercial y planeación de visitas**
- **Objetivo:** Permitir que el asesor localice clientes/direcciones asignados, programe visitas y consulte su agenda/ruta.
- **Prioridad:** Alta — Fase 2
- **Estado:** Habilitada
- **Dependencia entre Specs:** Maestro cliente-dirección-vendedor y servicio geoespacial.
- **Microcélula:** Fase 2 — Por asignar.
- **SPEC-F2-002 — Check-in, visita efectiva y Check-out**
- **Objetivo:** Registrar inicio, contexto, actividad y cierre de una visita con evidencia temporal y geográfica.
- **Prioridad:** Alta — Fase 2
- **Estado:** Habilitada
- **Dependencia entre Specs:** SPEC-F2-001; cliente/dirección, geolocalización, pedidos/cotizaciones.
- **Microcélula:** Fase 2 — Por asignar.
- **SPEC-F2-003 — Gestión de Tareas**
- **Objetivo:** Concentrar tareas manuales y automáticas relacionadas con clientes, visitas y casos, con responsable, vencimiento, recordatorio y cierre trazable.
- **Prioridad:** Alta — Fase 2
- **Estado:** Habilitada
- **Dependencia entre Specs:** Notificaciones, identidad y objetos de negocio; se utiliza transversalmente en Fases 2 y 4.
- **Microcélula:** Fase 2 — Por asignar.
- **SPEC-F2-004 — Diagnóstico del cliente e información adicional**
- **Objetivo:** Consultar y mantener el contexto comercial y estratégico del cliente necesario para preparar acciones y recomendaciones.
- **Prioridad:** Alta — Fase 2
- **Estado:** Habilitada
- **Dependencia entre Specs:** Maestro de clientes, catálogos comerciales, historial y autoridad de datos.
- **Microcélula:** Fase 2 — Por asignar.
- **SPEC-F2-005 — Parque vehicular por dirección**
- **Objetivo:** Consultar y registrar grupos de vehículos asociados a una dirección/base para contextualizar la oportunidad comercial.
- **Prioridad:** Alta — Fase 2
- **Estado:** Habilitada
- **Dependencia entre Specs:** Cliente-dirección, catálogos vehiculares y permisos territoriales.
- **Microcélula:** Fase 2 — Por asignar.
- **SPEC-F2-006 — Contactos de empresas asociados por dirección**
- **Objetivo:** Mantener contactos y roles locales o centrales por base/dirección sin duplicar personas ni perder el vínculo con la cuenta nacional.
- **Prioridad:** Alta — Fase 2
- **Estado:** Habilitada
- **Dependencia entre Specs:** Maestro Cuenta-Dirección, SellerId/territorios y catálogos de contacto. SPEC-F4-002 consume el modelo de contactos que entrega esta Spec para la conversión Lead→Cliente; la relación no opera en sentido inverso.
- **Microcélula:** Fase 2 — Por asignar. Migración desde Salesforce.
- **SPEC-F3-001 — Algoritmo del Coach enriquecido con capacidades migradas**
- **Objetivo:** Complementar los recomendadores con agenda, visitas, tareas, diagnóstico, parque, propuestas, pedidos y otros contextos aprobados para evitar recomendaciones redundantes y mejorar pertinencia.
- **Prioridad:** Alta — Fase 3
- **Estado:** Dependencia externa habilitada; entrega a cargo de JC.
- **Dependencia entre Specs:** Fase 1 completa y datos/contratos de SPEC-F2-001 a SPEC-F2-006.
- **Microcélula:** Equipo de Juan Carlos — BI y Data Analytics. Los equipos responsables de Fase 2 disponibilizan datos/contratos aprobados.
- **SPEC-F3-002 — APIs del Coach Comercial**
- **Objetivo:** Exponer de forma segura, versionada y observable las recomendaciones, propuestas, retroalimentación y resultados requeridos por Epico.
- **Prioridad:** Alta — Fase 3
- **Estado:** Dependencia externa habilitada; entrega a cargo de JC.
- **Dependencia entre Specs:** SPEC-F3-001 y arquitectura/seguridad/integraciones.
- **Microcélula:** Equipo de Juan Carlos — BI y Data Analytics, con participación de Arquitectura, Seguridad e Integraciones para acordar contratos consumibles por Epico.
- **SPEC-F3-003 — Integración del Coach Comercial y Propuesta Comercial en Epico**
- **Objetivo:** Integrar en Epico la aplicación externa del Coach y la Propuesta Comercial, validando si la experiencia conserva el patrón conversacional tipo chat/copilot o adopta otro patrón más adecuado al flujo del asesor.
- **Prioridad:** Alta — Fase 3
- **Estado:** Habilitada
- **Dependencia entre Specs:** SPEC-F3-001, SPEC-F3-002 y Fase 1.
- **Microcélula:** Equipo de Diseño y Desarrollo, UX/UI, Arquitectura e Integraciones, con el equipo de Juan Carlos como proveedor del Coach y sus APIs.
- **SPEC-F4-001 — Solicitud de mercancía a bordo**
- **Objetivo:** Controlar solicitud, autorización, custodia, entrega, retorno, evidencia y cierre de mercancía usada en una visita comercial.
- **Prioridad:** Alta — Fase 4
- **Estado:** Habilitada
- **Dependencia entre Specs:** Productos/precios, inventario/subalmacén, sucursales, tareas, notificaciones, pedidos y facturación.
- **Microcélula:** Equipo de Diseño y Desarrollo — migración desde Salesforce.
- **SPEC-F4-002 — Gestión de leads/contactos y conversión a cliente**
- **Objetivo:** Sincronizar hacia Epico, en lugar de Salesforce, los leads que la operación de Oscar Villalobos trabaja actualmente en Respond\_io desde WhatsApp, Facebook, campañas y otras fuentes; calificarlos y convertirlos o vincularlos con las entidades canónicas de cliente sin duplicidad y con trazabilidad.
- **Prioridad:** Alta — Fase 4
- **Estado:** Habilitada
- **Dependencia entre Specs:** Respond\_io, fuentes de prospectos, modelo Lead-Cuenta-Dirección-Persona, deduplicación, territorios, consentimiento y SPEC-F2-006 como modelo de contactos por dirección.
- **Microcélula:** EF | JQ | OV — Erick Frias, Jorge Quintero y Oscar Villalobos, con Diseño y Desarrollo, Integraciones y la operación de Respond\_io. Es una integración nueva, no una migración funcional desde Salesforce.
- **SPEC-F4-003 — Solicitudes de crédito**
- **Objetivo:** Crear desde Epico una solicitud de crédito ágil y una interacción compartida entre asesor, cliente y responsable de Crédito para requisitos, documentos, preguntas y respuestas, reduciendo la triangulación actual y conservando segregación de funciones y trazabilidad documental.
- **Prioridad:** Alta — Fase 4
- **Estado:** Habilitada
- **Dependencia entre Specs:** Cliente, identidad/canales de participantes, archivos, plantillas, Crédito, Jurídico y arquitectura futura de Crédito 360/Exodus/Webdox por definir.
- **Microcélula:** Equipo de Diseño y Desarrollo con Crédito, Jurídico, UX/UI, Arquitectura y Seguridad. Es una capacidad nueva; no vive actualmente en Salesforce ni en Epico.

---

## 🔗 6. Referencias

- **Contexto de IA / Conversación con IA:** Solicitud y archivos adjuntos de la conversación que originó PROJ-SPEC-SFEP-001; debe conservarse como referencia de Pre Discovery en el repositorio del proyecto.
- **Documentación existente:**
- SALESFORCE\\Documentacion\\Transcripciones\\ — transcripciones, evidencia, walkthroughs, reportes de calidad y cuadros extraídos de los módulos de Salesforce.
- SALESFORCE\\Referencias\\Inventario funcional SF.xlsx — inventario de capacidades, usuarios, frecuencias, datos, integraciones y priorización visual.
- SALESFORCE\\Referencias\\Credito 360 Finanzas.pptx — visión y flujo propuesto de Crédito 360; contiene decisiones que deben reinterpretarse para Epico.
- Llamada con Juan Carlos Garcia Vides.vtt — contexto del Coach Comercial, Propuesta Comercial, recomendadores, piloto y evolución.
- SALESFORCE\\Referencias\\Backlog - Migración de Salesforce — autoridad de fases, capacidades y priorización considerada hasta Fase 4.
- **Procesos actuales:** Videos y VTT de SALESFORCE\\Referencias\\ y sus expedientes analíticos correspondientes en Documentacion\\Transcripciones\\.
- **Sistemas actuales:**
- Salesforce como fuente As-Is temporal.
- Coach Comercial/BI como producto en desarrollo y fuente de recomendaciones.

---

## ✅ Definición de Terminado

* [x] Necesidad / problema general definido.
* [x] Objetivo del proyecto definido.
* [x] Valor e indicadores de éxito identificados.
* [x] Usuarios y áreas involucradas identificados.
* [x] Alcance general delimitado.
* [x] Fuera de alcance identificado.
* [x] Riesgos generales conocidos registrados.
* [x] Dependencias generales identificadas.
* [x] Supuestos iniciales registrados.
* [x] Restricciones transversales conocidas documentadas.
* [x] Proyecto segmentado en Specs funcionales.
* [x] Specs iniciales priorizadas.
* [x] Dependencias principales entre Specs identificadas.
* [ ] PO y TL tienen claridad de la capacidad requerida. Requiere revisión conjunta de esta versión y asignación formal de TL/microcélulas.
* [x] No existen pendientes críticos que impidan habilitar el backlog. Los pendientes identificados impiden Ready for Dev, pero están visibles y forman la agenda de Discovery de cada fase.
