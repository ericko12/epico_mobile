---
spec: EF-50620
folio: UX-SPEC-F1-003
tipo: ux
spec_funcional: SPEC-F1-003 · página 1659666439
titulo: Ligar Pedidos de clientes a Propuestas Comerciales en Epico · experiencia
spec_proyecto: EF-50612 · PROJ-SPEC-SFEP-001 · página 1659863046
origen: Confluence · espacio PE · página 1659863055 «UX-SPEC-F1-003_Ligar_pedido_a_propuesta_comercial» · modificada 2026-09-29 · cabecera Versión 0.17 · Estado Ready for Dev
resuelto_por: cabecera-funcional
anexos: ninguno
contenido_hash: sha256:b4309ad9742053340562042b94e01cfa13ac670e0727153e72402e67d4bda4e7
estado_pagina_al_congelar: Ready for Dev
estado_issue_al_congelar: Development
rama: EF-50620/ligar-pedido-propuesta
generado_por: skill inicio-tarea v1.4
---

# ⚠ SNAPSHOT UX — Copia congelada de la página de Confluence UX-SPEC-F1-003 (issue EF-50620). No editar este archivo.
> La experiencia se edita **en su página de Confluence**. Misma regla de deriva: si el
> hash deja de coincidir, la skill lo avisa y el refresco es un commit visible.

# 🎨 Ligar Pedidos de clientes a Propuestas Comerciales en Epico

1. **Spec UX/UI:** UX-SPEC-F1-003
2. **Spec Funcional:** SPEC-F1-003
3. **Spec de Proyecto / Iniciativa:** PROJ-SPEC-SFEP-001
4. **Responsable UX:** Marco Santero
5. **Versión:** 0.17
6. **Última actualización:** 29-09-2026
7. **Estado:** Ready for Dev

---

> ### Nota de la versión 0.17 (29-09-2026) — el prototipo se retira: la referencia visual es el front real
> 
> **Los prototipos de Discovery salieron del repositorio** (`2f2b80b69`, rama
`feature/propuesta-en-cotizaciones`). Esta versión mueve las referencias que los
apuntaban, que eran cuatro y todas de puntero: §3 en las tres vistas, la referencia 3
de §13, la §14.A y el criterio de prototipo de la checklist.
> 
> **El tick de «Prototipo / Figma disponible» no se debilita: se refuerza.** La checklist
pide uno u otro, y lo que ahora lo satisface no es una maqueta operable sino **la
pantalla misma**, construida, con la compuerta en verde y consumiendo el servicio real.
Un prototipo es una promesa de cómo se va a ver algo; el front es cómo se ve. Sigue sin
haber Figma y sigue sin hacer falta.
> 
> **Por qué se retiró, y no es solo higiene.** `/prototipos/f1-003` era una **ruta
alcanzable en cualquier build**, con el nombre y el CVID de un cliente real y citas
textuales del chat del proyecto con nombre y apellido — deliberación interna servida
como página, justo en el entorno donde negocio va a probar. Además vivía bajo `app/`,
el único directorio que el lint del repositorio revisa, y cargaba un catálogo `UX_MSG`
propio que había quedado desfasado: su texto de caducidad todavía afirmaba el plazo de
30 días que la funcional v2.3 eliminó, y su mensaje de coexistencia seguía prometiendo
combinar líneas de varias cotizaciones, que es el `UX-MSG-02` retirado en el Addendum
0.5.2. Un documento en el repositorio que contradice a la Spec es peor que no tenerlo.
> 
> **Nada se perdió.** El código de ambos prototipos queda accesible en `406bf4f03` de esa
misma rama, y las decisiones que produjeron —`D-01` a `D-07`, el umbral de 3 días, la
forma del bloqueo, la señal de origen— están en el cuerpo de esta Spec y en
`PENDIENTES_DE_DEFINICION.md`. Lo único que se descartó a propósito son los retoques de
su bitácora de cabecera posteriores a ese commit: notas de una pantalla que se retira.
> 
> **Contexto:** el trabajo de la rama quedó repartido el mismo día en **12 commits** sobre
`852b86140`, con la compuerta completa en verde al final (`tsc` limpio · `lint` con los 4
avisos preexistentes · **47/47 suites y 463/463 pruebas** · `build:dev` con 44 páginas, ya
sin las dos de `/prototipos`). El reparto separa en commits propios dos cosas que merecen
lectura aparte: la corrección del átomo `Label` —el único componente compartido que la
rama toca, la excepción que `UX-RES-02` permite— y la extensión del bloqueo por caducidad
a los cuatro controles que todavía exigían además que la cotización estuviera facturada.

---

> ### Nota de la versión 0.16 (29-09-2026) — la funcional **v2.3** borra los 30 días: la vigencia la hereda de la Propuesta Comercial
> 
> `PD-064`** queda cerrado, y no por arbitraje sino porque el BA le dio la razón al contrato.**
La v0.15 levantó la tensión: `RF-16` decía «fecha de creación + 30 días calendario» de la
cotización, y el contrato v3.4.0 decía que esa fecha **se toma de la tabla de origen de la
Propuesta Comercial** y que «PedidoService no la calcula». La funcional **v2.3** reescribe
la regla en los dos sentidos que hacían falta —de dónde sale la fecha, y qué pasa cuando
las dos no nacen el mismo día—:
> > «La Propuesta Comercial cuenta con una fecha de vigencia **VigenteHasta**, proporcionada
por su sistema de origen. Cuando el JOB genera la cotización en Epico, esta fecha se
traslada a la cabecera de la cotización y se utiliza como su fecha de vencimiento. **Epico
no calcula ni reinicia un periodo adicional de 30 días a partir de la creación de la
cotización.** Por ello, si la cotización se genera días después de la Propuesta Comercial,
únicamente conserva el tiempo restante hasta VigenteHasta.» (`RN-07`)
> 
> El cambio recorre toda la funcional: `RF-16`, `EX-06`, `EX-08`, `DAT-01`, `AC-17`, `AC-18`,
`AC-19` y `RES-03` dejan de hablar de 30 días y hablan de `VigenteHasta`.
> 
> `PD-057`** se retira, no se cierra «resuelto».** Vigilaba el supuesto de ARQ de que la
cotización y su propuesta **nacen el mismo día**; mientras ese supuesto se sostuviera, daba
igual qué reloj se usara. La v2.3 lo vuelve irrelevante por una vía mejor: **ya no hay dos
relojes**. Si la cotización se genera días después —una propuesta que se reprocesa (`EX-09`),
una carga inicial—, la Spec dice explícitamente que arranca con la vigencia ya consumida, que
es justo el escenario que `PD-057` temía. Deja de ser un riesgo silencioso y pasa a ser
comportamiento especificado.
> 
> **Para el front el cambio es de origen, no de cálculo.** `fechaCaducidadPrecio` nunca se
derivó de la creación en el prototipo: siempre se clasificó la fecha recibida. No hay nada
que recalcular. Lo que sí había que corregir eran **los textos que explicaban la regla
vieja** — y ahí sí había deuda:
> 
> `UX-MSG-01`** se reescribe.** El texto decía «Los precios de esta cotización se respetaron
**30 días desde que se creó**», que a partir de la v2.3 es **factualmente falso**: pudieron
ser 30 días o pudieron ser cuatro. El texto nuevo:
> > «Esta cotización ya no puede convertirse en pedido: sus precios se respetaron hasta el
**DD/MM/AAAA**, la vigencia que traía su propuesta comercial. Puedes levantar un pedido
nuevo con los precios de hoy.»
> 
> Tres decisiones, y una renuncia:
> 
> 1. **La consecuencia va primero.** El asesor abrió la cotización para convertirla; lo que
necesita saber en la primera línea es que eso no va a pasar. La explicación viene después,
porque es lo que justifica la negativa, no lo que la anuncia.
> 2. **La fecha se atribuye en seis palabras** —«la vigencia que traía su propuesta comercial»—
en vez de explicar la mecánica del traslado. Basta para que el asesor entienda que el
plazo no lo puso Epico y que no hay a quién reclamarle dentro del sistema.
> 3. **Se conserva «con los precios de hoy»**, aunque alargue. Es la única parte del mensaje
que administra una expectativa en vez de informar un hecho: si no está, el asesor levanta
el pedido nuevo esperando los mismos precios.
> 4. **Se elimina «Puedes consultarla»**, que era ruido: el asesor **ya está dentro** de la
cotización cuando lee el aviso. 33 palabras contra 41.
> 
> Los dos mensajes hermanos —`Vigente` y `Próxima a vencer`— **no se tocan**: ninguno de los
dos mencionaba los 30 días, los dos ya decían «se respetan hasta el DD/MM/AAAA», que es
exactamente la forma que la v2.3 vuelve canónica.
> 
> **En código** se corrigió el bloque de documentación de `vigenciaPropuesta.ts`, que todavía
citaba `RN-07` en su versión «creación + 30 días», y la nota de `EditQuotation.tsx` que daba
`PD-043` por escalado. Las tres menciones a «30 días» que quedan en ese archivo son
históricas o están negadas.
> 
> ⚠️ **Dos cosas quedan para Erick.** La funcional publicada trae el encabezado en **2.3** pero
su bloque de cambios sigue rotulado «Versión funcional 2.2» — hay que alinearlo antes de que
alguien cite la versión equivocada. Y falta marcar en su checklist
`[ ] Spec UX/UI asociada en Ready for Dev`, que desde la v0.15 ya es cierto.

---

> ### Nota de la versión 0.15 (29-09-2026) — contrato congelado, funcional v2.2, y esta Spec pasa a **Ready for Dev**
> 
> **El contrato se congeló el 29-09 en la v3.4.0**, en la rama `EF-50620/propuesta-comercial-pedidos`
de `pedidoservice` —el microservicio se movió, como ARQ había anunciado—. Y con él llegó
una frase que nos pone en el camino crítico, en sus notas de congelamiento:
> > «Riesgo aceptado: la Spec UX sigue en Borrador… **Mientras la UX no esté en Ready for
Dev, las tareas de front quedan bloqueadas.**»
> 
> Lo confirma el `spec.snapshot.md` de esa rama, cuyo front matter registra
`spec_ux: UX-SPEC-F1-003 · página 1659863055 · Borrador`, y por eso **no existe
**`spec-ux.snapshot.md`: la skill no lo congeló porque el estado no lo permitía. La
checklist de esta Spec está completa desde el 28-09, así que **lo único que faltaba era
el cambio de estado**. Esta versión lo hace.
> 
> **La funcional ya iba en v2.2** (Ready for Dev, 24-09) mientras nosotros citábamos la
v2.1. Lo que trae de nuevo y nos toca:
> 
> - `RF-19`** + **`AC-27`** + **`AC-28`** formalizan la búsqueda unificada** que esta Spec ya
describía en `UX-INT-05` desde la v0.11 — y **fijan el texto del campo**: «Buscar por ID
de cotización o ID de Propuesta Comercial». Adoptado literal.
> - `RN-11`** y **`SUP-04` cierran la cardinalidad en **1 Propuesta Comercial → 1 Cotización
→ 1 Pedido**, y añaden que una propuesta ya procesada **no se reutiliza**.
> - `RF-15`** conserva** la consulta informativa sobre el *periodo de disponibilidad* de la
propuesta de origen — ver `UX-INT-06`, donde se explica por qué sigue sin haber un
segundo filtro.
> 
> **Se resuelven los dos pendientes de UX que el contrato declaró** al congelarse: el texto
del rechazo al editar una cotización `Concluida` (nuevo `UX-MSG-12`) y la confirmación
de que `UX-MSG-01`** aplica también al intentar editar una **`Vencida`, no solo al
convertirla. Los dos entran al contrato por MR, como su propia nota indica.
> 
> ⚠️ **Y se levanta una tensión nueva, **`PD-064`**:** `RF-16` dice que la fecha de vencimiento
es «fecha de creación + 30 días calendario» de la **cotización**, y el contrato v3.4.0 dice
que esa fecha **se toma de la tabla de origen de la Propuesta Comercial** y que
«PedidoService no la calcula». Coinciden solo si ambas nacen el mismo día, que es el
supuesto vigilado en `PD-057`. No bloquea el handoff, pero alguien tiene que decidir cuál
de los dos textos manda.

---

> ### Nota de la versión 0.14 (28-09-2026) — `UX-INT-06` se resuelve por reducción, y ya no queda trabajo de UX pendiente
> 
> **El filtro doble de **`RF-15`**/**`AC-22`** se diseñó, y el diseño resultó ser: no hay un segundo
filtro.** `AC-22` pide poder filtrar dos cosas —si la cotización viene de una Propuesta
Comercial, y si **la propuesta de origen** sigue vigente—, y esa segunda dimensión existía
porque en la v2.0 de la funcional eran **dos relojes distintos**: la propuesta tenía 30
días de *disponibilidad* y la cotización 30 días de *vigencia*, contados desde momentos
diferentes.
> 
> **El contrato v3.2.0 los unificó**, y lo dice con todas sus letras en
`propuestaComercialVencimiento`:
> > «Fecha de vencimiento… **de la Propuesta Comercial y de su cotización derivada**
(`RN-07`, `RF-16`): fecha de creación de la Propuesta Comercial + 30 días calendario.
**Se toma de la creación de la Propuesta Comercial para que disponibilidad y vigencia
coincidan.**»
> 
> Con un solo vencimiento para las dos, «¿sigue vigente la propuesta de origen?» y «¿sigue
vigente esta cotización?» **son la misma pregunta y dan siempre la misma respuesta**. Un
filtro para cada una serían dos controles que nunca pueden discrepar: el asesor tendría
que elegir entre dos cosas idénticas y, peor, creería que significan algo distinto.
> 
> **Por eso **`UX-INT-06`** se reduce a lo que ya está construido:** el filtro de **Origen**
(`UX-INT-06`) y el de **Estatus** (`UX-INT-07`), independientes entre sí desde hoy. Juntos
cubren `RF-15` y la primera mitad de `AC-22` sin agregar superficie nueva.
> 
> **La segunda mitad de **`AC-22`** queda escalada al BA**, no descartada por nosotros: si
negocio quiere de verdad distinguir la vigencia de la propuesta de la de su cotización,
primero tiene que existir esa diferencia en el dato — hoy el contrato la eliminó por
decisión de ARQ. Ver `PD-063`.
> 
> **Se marca cumplido el criterio de prototipo.** La checklist pide «Prototipo / Figma», no
ambos: existe el prototipo funcional en `/prototipos/f1-003`, operable y verificado contra
las pantallas reales. **No habrá Figma para esta capacidad**, y no hace falta.
> 
> **Con esto no queda trabajo de UX pendiente para el gate.** Lo único que separa a
`F1-003` de `READY FOR DEV` es que ARQ **congele el contrato**.

---

> ### Nota de la versión 0.13 (25-09-2026) — el back ya entrega los campos, y el fixture se apaga
> 
> **El front dejó de inventarse los datos.** Alfredo Silva publicó los servicios con los
campos del contrato —«los servicios ya regresan los campos necesarios para el front»— y
el payload real trae `propuestaComercialId`, `propuestaComercialVencimiento`,
`tipoCotizacion` y `statusPropuestaComercial`** ya resuelto**. Marco Santero decidió
**apagar **`aplicarFixtureOrigenPropuesta`** por completo**, para que la pantalla muestre lo
que de verdad manda el servicio y no lo que el cliente sembraba.
> 
> **Qué queda en su lugar:** un único adaptador, `adaptarCotizacionDelBack`, que deriva el
origen de `propuestaComercialId > 0` y toma la fecha de `propuestaComercialVencimiento`.
Es la única traducción entre el contrato y la interfaz, así que al congelarse el
`openapi.json` se cambia ahí y en ningún otro lado — es la §0-quater hecha código. El
estado lo resuelve `resolverVigencia`: **manda el back, y si no manda o trae un valor
desconocido, se calcula**, degradando a guion antes que inventarle un color a un estatus
que no sabemos leer, como el propio contrato exige.
> 
> **El filtro gana **`Concluidas`** (**`UX-INT-07`**).** Faltaba, y se notó en uso: con el filtro de
vencidas puesto no había forma de aislar las ya convertidas. Ahora las opciones del filtro
son **exactamente los cuatro valores que pinta la columna**, que es la regla que se estaba
rompiendo: un filtro con menos estados de los que la tabla muestra deja al asesor sin
manera de llegar a lo que está viendo. En el mismo movimiento el copy se alineó al
vocabulario de negocio —«Caducadas» → **«Vencidas»**, «Por vencer» → **«Próximas a
vencer»**— y el select pasó de llamarse «Vigencia» a **«Estatus»**, igual que la columna
(`RF-18`): con `Concluida` adentro ya no habla solo de vigencia.
> 
> **Dos pendientes nuevos, los dos nacidos de usar la pantalla:**
> 
> - `PD-059` — elegir un estatus fija Origen en «Propuesta comercial». La conducta es
correcta y deliberada, pero **ocurre en silencio** y se lee como una falla del sistema.
Es de visibilidad, no de lógica.
> - `PD-060` — con el fixture apagado, `Vigente` y `Próxima a vencer` **no son
verificables en pantalla**: el ambiente de pruebas solo tiene propuestas viejas. Hacen
falta datos sembrados, los mismos que QA necesita.
> 
> Compuerta de verificación completa en verde tras el cambio: `tsc` limpio, `lint` con los
4 avisos preexistentes, **46 suites y 458 pruebas**, `build:dev` sin errores.

---

> ### Nota de la versión 0.12 (24-09-2026) — la búsqueda no distingue, y no es una petición al contrato
> 
> **Dos correcciones a la v0.11, ambas de Marco Santero, ambas simplifican.**
> 
> **1. **`PD-058`** se descarta: no hay nada que identificar.** La v0.11 lo levantó suponiendo que mezclar
una coincidencia por cotización con una por propuesta confundiría al asesor. No aplica: *«no hay que
identificar nada, por ahora no importa si al buscar 2 recibo la propuesta 2 y la cotización 2»*. El
buscador devuelve los renglones que coinciden y ya. Se retira de `UX-INT-05` el requisito de resaltar
el folio y de encabezar los resultados; si el volumen lo vuelve molesto, vuelve con este mismo id.
> 
> **2. El resultado siempre son cotizaciones — no hay dos universos.** La v0.11 hablaba de dos
identificadores «en universos distintos». Es una mala descripción: el listado devuelve
**cotizaciones**, y `propuestaComercialId` es **una columna más de ese mismo renglón**
(`CotizacionResumenDto`). Buscar por propuesta no trae propuestas: trae las cotizaciones cuyo
`propuestaComercialId` coincide. El OR no une dos entidades, compara dos campos de la misma fila.
> 
> **Consecuencia, y es la que importa: esto deja de ser una petición a ARQ.** La §0-ter de la v0.11
pedía que `GET /api/v3/Pedidos/Cotizaciones` aceptara el id de propuesta como filtro. **No hace
falta:** el endpoint **no tiene paginado** —lo confirmó DEV: «de inicio te retorna todo»— y ya
entrega `propuestaComercialId` en el resumen, así que el front tiene el dato completo en memoria y
puede filtrar sin pedir nada nuevo. Era exactamente la primera salida que propuso Alfredo Silva:
«pero en todo caso pudieras hacerlo desde el front». `PD-037` se cierra del todo.
> 
> ⚠️ **Único supuesto que sostiene esto: que el listado siga sin paginar.** El día que se pagine, el
filtro en cliente deja de ser correcto —buscaría solo dentro de la página cargada— y ahí sí hay que
pedirle el filtro al back. Queda anotado como riesgo, no como pendiente.
> 
> **Lo que sí sigue sin cubrirse, y no es un defecto:** una Propuesta Comercial que el JOB todavía no
ha insertado no tiene cotización, así que buscar su número no devuelve nada. Es correcto — no existe
aún lo que se busca.

---

> ### Nota de la versión 0.11 (24-09-2026) — vuelve la búsqueda por Propuesta Comercial
> 
> **Cambio de alcance, en sentido contrario al de la v0.8.** Por la tarde del 24-09 Dioni volvió a
pedir que se pueda buscar por Propuesta Comercial, y esta vez el equipo lo aceptó. `UX-INT-05`** se
restituye** y `PD-037` pasa de *descartado por alcance* a *resuelto en alcance*.
> 
> **Lo que lo volvió barato.** Marco lo consultó con Alfredo Silva (DEV) antes de comprometerlo:
«¿conllevaría mucho para meterlo de una vez?». La respuesta fue que no, y el motivo es técnico:
**el método que recupera las cotizaciones no tiene paginado** —«de inicio te retorna todo»—, así que
filtrar por un campo más no obliga a rediseñar la consulta. Hoy «desde el back solo se hace por
cotización id».
> 
> **La forma quedó decidida en ese mismo intercambio.** Alfredo propuso «un selector de buscar por y
poner 2 opciones»; Marco lo descartó por UX: «con el mismo buscador puedo mostrar lo coincidente no
importa si es cotización o propuesta… **para no poner otro selector**». Alfredo cerró: «o lo dejo
como un **or**, que busque en los 2 campos» → «simon». Es decir: **un solo campo de búsqueda, OR
entre **`CotizacionId`** y **`propuestaComercialId`. Una cotización nacida de propuesta se encuentra
tecleando cualquiera de los dos números. Alfredo lo tomó («lo agrego a mi lista de cosas») y en el
Daily Piloto Erick Sánchez confirmó que la funcional también se ajusta: «Ya andamos en eso».
> 
> **Lo que el cambio abre.** Los dos términos son numéricos y viven en universos distintos, así que
un mismo número puede coincidir por los dos lados sin que el asesor sepa por cuál. Alfredo lo dijo
textual: «se necesita distinguir qué es… las propuestas son ids también». Quedó como `PD-058`,
con la salida que proponía esta Spec: campo único y la coincidencia marcada en el renglón.
**↑ Descartado por la v0.12 el mismo día: no se identifica nada.**
> 
> ⚠️ **El contrato todavía no lo tiene.** `GET /api/v3/Pedidos/Cotizaciones` solo acepta
`CotizacionId` y su nota dice «no agrega filtros». Se suma a lo que hay que pedirle a ARQ junto con
el resto del ajuste — §0-ter.
**↑ Corregido por la v0.12: no hace falta pedirlo. El listado no está paginado y ya trae **`propuestaComercialId`**, así que el filtro vive en el front.**

---

> ### Nota de la versión 0.10 (24-09-2026) — ARQ responde las tres observaciones al contrato
> 
> José Nuño contestó en el chat del Daily Piloto (18:11) los tres puntos que la §0-ter dejaba
abiertos. **Los tres se cierran**, y dos de ellos cambian el trabajo pendiente del front:
> 
> 1. `Concluida`** entra y la calcula el back.** Textual: «Es correcto, ese valor **lo calcularemos
en el back** y no implicaría mucho el agregar N status». Consecuencia práctica: **el front deja de
necesitar **`UX-DAT-06` —la marca de conversión— porque el estatus llegará ya resuelto en
`statusPropuestaComercial`.
> 2. **El cálculo es por días completos.** Textual: «Son por días completos, sin considerar
horarios». Es exactamente lo que hace `calcularVigenciaPropuesta`, que compara inicios de día, así
que el prototipo queda alineado **sin tocar nada** y el riesgo de que una cotización muriera a las
18:00 en CDMX desaparece.
> 3. **El reloj sigue siendo el de la Propuesta Comercial**, apoyado en que «la cotización de la
propuesta comercial nacen el mismo día». **Con el punto 2 eso deja de importar:** si ambas nacen el
mismo día y se compara por días completos, la diferencia entre un reloj y otro es de horas dentro de
la misma fecha y se anula al truncar. El conflicto se cierra por aritmética, no por acuerdo — pero el
supuesto queda vigilado en `PD-057`.
> 
> **Se agrega además la tabla de equivalencias contrato ↔ front** (§0-quater), para que el día que el
contrato se congele el cambio sea mecánico.
> 
> ⚠️ **El contrato todavía no refleja nada de esto:** al 24-09 18:30 seguía byte a byte igual al de la
mañana, y ARQ anunció que moverá el microservicio de repositorio. Nada se renombra en el front hasta
tener el contrato congelado y en su ruta definitiva.

---

> ### Nota de la versión 0.9 (24-09-2026) — el tracking de conversión se resuelve por join, no por campos en la línea
> 
> **Decisión del PO, comunicada por Marco Santero el 24-09.** La medición de conversión parcial
—cuánto de lo propuesto acabó facturándose— **no requiere que la cotización persista la cantidad
propuesta ni el recomendador**. Ambos ya viven en la tabla de propuestas del Coach, unida por
`propuestaComercialId`, así que el back puede compararlos contra la cotización facturada cuando haga
falta. Lo único que la cotización conserva es el **identificador de origen por partida**
(`esPropuestaComercial`), que el contrato ya expone y que se ve en la edición de la cotización.
> 
> Encaja con el alcance: la funcional dice que F1-003 **solo genera los datos base** y que el
indicador lo calcula reportería después.
> 
> **Qué cambia aquí:**
> 
> - `UX-DAT-05`** se retira del MVP.** Mostraba la cifra original del Coach en solo lectura junto a
la cantidad editable. **El asesor no necesita verla mientras edita** (decisión del PO, 24-09): la
cantidad propuesta es dato de reportería, no de la pantalla.
> - **Los puntos 1 y 2 de la §0-ter dejan de ser huecos del contrato.** `cantidadPropuesta` y el
recomendador ya no se le piden a `pedidoservice`; cambian de dueño y de naturaleza — ver §0-ter.
> - **Aparecen dos condiciones nuevas** que sostienen la decisión, y sin las cuales la métrica no es
confiable: la inmutabilidad de lo persistido por el Coach y el criterio ante una partida reingresada.
Viven en `PD-035` y `PD-056`.

---

> ### Nota de la versión 0.8 (24-09-2026) — se retira la búsqueda por folio de propuesta y se revisa el contrato
> 
> ⚠️ **Su punto 1 quedó revertido esa misma tarde por la v0.11.** Se conserva tal cual para que el ida y vuelta de la decisión sea rastreable.
> 
> **Dos cambios, uno de alcance y uno de evidencia.**
> 
> **1. **`UX-INT-05`** sale del MVP.** El equipo decidió la mañana del 24-09 que el buscador del listado
**no** aceptará el folio de la Propuesta Comercial como término de búsqueda. Cae solo esa
interacción: `UX-INT-06`** —el filtro por origen de **`RF-15`**/**`AC-22`**— sigue vigente**, porque filtrar
por origen y buscar por un dato de la propuesta son cosas distintas. La columna **Origen** y el folio
en su tooltip tampoco se tocan: eso es mostrar, no buscar. `PD-037` se cierra por alcance y
`UX-MSG-11` pierde su segunda frase.
> 
> **2. Se revisó el contrato.** El `openapi.json` v3.1.0 de `pedidoservice` (rama `EF-50620/contrato`,
en BORRADOR) se leyó el 24-09 contra esta Spec. Resuelve tres cosas y deja cuatro; el detalle está en
la nueva **§0-ter**.

---

> ### Nota de la versión 0.7 (23-09-2026) — se cierran los dos pendientes, con `SPEC-F1-003` **v2.1**
> 
> Dos preguntas al equipo por la noche cerraron los dos puntos que la v0.6.1 dejaba
abiertos, y el BA publicó la **v2.1** de la funcional con ambas respuestas.
> 
> **1. El instante del vencimiento — resuelto a favor de la fecha calendario.** La §0-bis
de la v0.6.1 señalaba el choque entre la v2.0 («exactamente 30 días desde el timestamp»)
y el cuadro QA/BA del 22-09 («00:00 del día 31»). El BA resolvió por la segunda: «yo le di
esa indicación porque no recordaba, pero **me hace más sentido esto de que muera fuera del
horario laboral**» (Erick Sánchez, Teams 23-09-2026). La v2.1 lo escribe en `RN-07`,
`RF-16` y `AC-19`: **fecha de vencimiento = fecha de creación + 30 días calendario; válida
hasta las 23:59:59 de esa fecha y Vencida a las 00:00:00 del día siguiente**, en la zona
horaria configurada para Epico. **Es lo que el prototipo ya implementaba**, así que no hubo
que tocar el cálculo.
> 
> **2. **`PD-051`** — resuelto: **`Concluida`**.** A la pregunta de qué estatus temporal debe tener
una cotización ya convertida en pedido, Luis Galván respondió: «Podemos ponerle de momento
como **Concluida**» (Teams, 23-09-2026 23:20). La v2.1 lo formalizó mejor de lo pedido: el
nuevo `AC-26`, junto con `RN-07` y `RF-16`, le da **precedencia sobre la vigencia** —una
cotización Concluida «deja de participar en las transiciones automáticas de vigencia y no
cambia posteriormente a Vencida»—. Eso resuelve el defecto de raíz y no solo la etiqueta.
> 
> **Qué más cambia aquí:**
> 
> - **El copy se alinea al vocabulario de negocio:** la pastilla decía «Caducada» y ahora
dice **«Vencida»**, que es como la nombran el catálogo oficial y todos los criterios de la
Spec.
> - **La columna se renombra.** `RF-18` (nuevo en la v2.1) nombra el concepto **«Estatus de
cotización»**, porque con `Concluida` adentro ya no habla solo de vigencia. En la tabla se
escribe **«Estatus»**, por ancho — ver `UX-RES-06`.
> - `Concluida`** va en azul** (`VariantLabel.info`), no en verde ni en texto plano — ver
`UX-DAT-02`.
> 
> **Consecuencia sobre el veredicto:** los dos puntos que impedían el `Ready for Dev`
quedaron cerrados. Ver la Validación al final.

---

> ### Nota de la versión 0.6.1 (23-09-2026) — reanclaje a `SPEC-F1-003` **v2.0**
> 
> **La v0.6 se escribió contra la v1.6 de la funcional. Ese mismo día, aproximadamente una hora
antes, el BA publicó la v2.0**, que incorpora por escrito casi todo lo que la §0 de esta Spec
reclamaba como «verificado aquí y no reflejado allá». Esta revisión reancla el documento y corrige
lo que había quedado en conflicto.
> 
> **Qué se corrige:**
> 
> - **§0 pasa de cinco filas a una.** La v2.0 incorpora la reescritura de `RN-08` (las líneas de
cotizaciones distintas no se combinan), el JOB de sincronización con su frecuencia, el umbral de
3 días y el retiro del funnel. Solo sobrevive el desfase del patrón back-end.
> - `UX-DAT-02`** y **`PD-044`**: la regla de cálculo del vencimiento estaba en conflicto.** La v0.6
daba por cerrado el corte a las «00:00 del día 31, huso del servidor»; la v2.0 dice otra cosa en
`RN-07`, `RF-16` y `AC-19`. Se reabre como contradicción, que es lo que es.
> - **El recorte se describe con su alcance real.** No salió del MVP «la columna Estatus»: salió
**todo el funnel de gestión comercial** más la reactivación, y la decisión consta en la
transcripción del spike del 23-09, no en un mensaje de Teams.
> - `PD-052`** estaba marcado «sin objeto» y en realidad quedó resuelto**, con una regla positiva
que sí aplica a la columna Vigencia del MVP.
> - `PD-054`** se cierra**: la v2.0 lo contesta.
> - `PD-041`** deja de darse por «sin objeto»**: su hallazgo de fondo —`permitirEditar` es un
guardia de acceso que manda a la pantalla 403— sobrevive al retiro del pipeline.
> - **Se incorpora **`RF-15`**/**`AC-22`, que la v0.6 no cubría: el filtro debe distinguir el origen
**y** si la Propuesta Comercial de origen sigue vigente.
> - **El veredicto de Ready for Dev se corrige a negativo**, por dos razones distintas de la que
daba la v0.6.
> 
> **Qué NO cambia:** el retiro del pipeline y toda su trazabilidad (la v2.0 lo confirma), la §2-bis,
la §14-bis y el catálogo `UX-MSG`.

---

> ### Nota de la versión 0.6 (23-09-2026) — se retira el pipeline de Estatus del MVP
> 
> **Cambio de alcance, no de diseño.** Negocio dejó fuera de esta entrega **todo el funnel de
gestión comercial** —presentación al cliente, seguimiento/negociación, descarte o rechazo,
escalamiento al gerente, cierre ganado y cierre perdido— y también la reactivación de cotizaciones
vencidas. La columna **Estatus** (el pipeline de nueve estados del catálogo oficial) sale con él.
La decisión se tomó en la sesión **«Spike sobre dudas Proy Coach comercial-Epico»** del 23-09-2026
y consta en su transcripción: Marco preguntó «estaríamos descartando los estatus de proceso y nos
quedaremos solo con los temporales, ¿verdad?» y Luis Galván respondió **«Sí, así es»** (48:12);
antes, sobre «Cerrada - Perdida» en el MVP, **«No»** (40:45). `SPEC-F1-003` v2.0 lo recoge por
escrito en su sección de *Fuera de alcance*. El plazo que negocio manejó para el funnel es el
siguiente entregable, dentro de este año. La dimensión de **Vigencia** (los 30 días de precio
protegido) **no se toca**: sigue siendo el segundo reloj que ya distinguía esta Spec de `SPEC-F1-003`
desde la v0.5, y es la única que el MVP muestra junto con Origen.
> 
> **Qué queda retirado, con su trazabilidad:**
> 
> - La columna **Estatus** del listado (§4) y su componente `UX-COMP-03` (§5).
> - `UX-DAT-04` (§8) y `UX-TXT-03` (§9): el catálogo de nueve estados deja de ser contenido de
interfaz de esta capacidad.
> - Los pendientes que dependían del pipeline — `PD-048`, `PD-049`, `PD-051`, `PD-052`, `PD-053` — se
marcan **fuera de alcance del MVP** en §14, no cerrados por definición sino por decisión de
alcance. Si el pipeline vuelve en una fase posterior, vuelven a abrirse tal cual.
> - El paso 6 de `UX-FLU-01`, que hacía pasar la cotización a «Cerrada - Ganada», se reescribe: esa
transición puede seguir ocurriendo en el backend, pero deja de ser un dato que el MVP muestra.
> 
> **Qué NO cambia:** el catálogo oficial («Estatus de cotizaciones proceso y vigencia.xlsx») sigue
siendo la fuente válida del umbral de 3 días de `UX-RES-03` — ese dato es de **Vigencia**, no de
Estatus, y las dos dimensiones eran independientes desde que `UX-DAT-04` de la v0.5.2 aclaró que
«esta Spec no usa el estado de proceso como fuente» de la vigencia. Retirar el pipeline no vuelve a
abrir esa pregunta.
> 
> **Consecuencia sobre el veredicto de Ready for Dev:** al retirar el pipeline desaparece el bloqueo
de `PD-048` («Cerrada - Perdida» inalcanzable) descrito en la v0.5.2, porque ya no hay estado que
mostrar. Queda abierto `PD-051` (congelar Vigencia al convertir), que ahora es independiente del
pipeline. **La v0.6.1 añade un segundo punto abierto** —la regla de cálculo del vencimiento— y
corrige el veredicto; ver la Validación al final de este documento.

---

> ### Nota de la versión 0.5 (22-09-2026)
> 
> **Esta versión cambia el modelo, no solo el detalle.** La v0.4 estaba construida sobre la idea de *incorporar líneas de una propuesta a una caja de pedido ya abierta*. Ese escenario **dejó de existir**: se verificó en código que `POST /api/v3/Pedidos/Cotizacion/{quotationId}/ConvertirPedido` **siempre crea un pedido nuevo** (`PD-032`). En consecuencia se reemplazan las vistas, interacciones y estados que describían la caja mixta, y se archivan las decisiones que dependían de ella (ver §14-bis).
> 
> **Lo que se conserva íntegro:** la §2-bis (Discovery ligero sobre el Epico real) y la §14-bis (decisiones cerradas en la v0.4, anotadas). Son hallazgos verificados contra el código y siguen siendo válidos.
> 
> **Lo que se incorpora:**
> 
> - El **ancla de la vigencia** corregida: son **dos relojes con roles distintos** — el de la propuesta gobierna la *inserción*, el de la cotización gobierna la *conversión* (cerrado por el BA en `SPEC-F1-003` v1.6, a partir de lo que negocio precisó en Teams el 21-09).
> - Los acuerdos de la sesión **«Spike sobre dudas Proy Coach comercial-Epico»** del 22-09: eliminar partidas sin restricción conservando el vínculo, relación 1:1 propuesta ↔ cotización, y reactivación fuera del MVP.
> - Las **dos columnas nuevas** que Luis Galván pidió por escrito (Teams, 22-09 14:01): antigüedad y estatus de cotización.
> - El **catálogo **`UX-MSG`** completo** como sección propia y normativa (§9).
> - **Dos correcciones a la funcional** señaladas al inicio del §2.
> 
> **Lo que se retira:** la §2-ter (contrato requerido al back end) queda **sustituida** — ver la nota en su lugar.
> 
> ---
> 
> ### Addendum 0.5.1 — llegó el catálogo oficial de estatus
> 
> Horas después de publicar la v0.5, Luis Galván produjo y Dioni Miramontes compartió el archivo **«Estatus de cotizaciones proceso y vigencia.xlsx»** (Teams, 22-09-2026 20:25). Es el catálogo que faltaba, y cambia tres cosas de esta Spec:
> 
> - **El umbral de «próxima a vencer» queda en 3 días**, no en los 7 que proponía el equipo (§12, `UX-RES-03`).
> - **El catálogo de estatus pasa de 6 a 9 estados** y con nombres distintos — retirado del MVP en la v0.6, ver nota arriba.
> - `PD-048`** queda contestado**, y su respuesta agrava el alcance en lugar de aliviarlo (§14.B) — sin objeto en el MVP tras la v0.6.
> 
> **Confirma además la decisión de fondo de esta Spec:** el archivo trae dos columnas —«Estatus en el Proceso (Gestión Comercial)» y «Estatus temporal (vigencia)»—, que son exactamente las dos dimensiones que aquí se separan. El MVP se queda con la segunda.
> 
> ---
> 
> ### Addendum 0.5.2 — se retira la promesa de combinar líneas de varias cotizaciones (23-09-2026)
> 
> `UX-MSG-02` ofrecía al asesor «tomar productos de varias en un mismo pedido». **No se puede.** Con `PD-032` —convertir crea siempre un pedido nuevo— la única forma de juntar productos de dos cotizaciones es recapturar los de la segunda desde el catálogo, y esas líneas entran sin precio protegido y sin atribución. Se retira la oferta de `UX-MSG-02` y de `UX-FLU-03`.
> 
> **Deja de ser un pendiente de diseño de UX.** El origen es `RN-08` y `AC-08` de `SPEC-F1-003`, que lo prometen apoyados en el «flujo habitual de pedido mixto» — viable el 21-09, cuando se creía que convertir sumaba a un pedido abierto. La contradicción se entregó al BA como comentario en la página de la funcional el 23-09-2026. Ver la nueva §0.

---

## 🧭 0. Dónde esta Spec va por delante de `SPEC-F1-003`

> **Por qué existe esta sección.** La funcional es la fuente de las reglas de negocio, pero en esta iniciativa no siempre va al día: varias cosas se verificaron primero desde UX —en código, en el catálogo oficial o en la skill del patrón back-end— y tardan en reflejarse allá. Esta Spec **no espera** a que se reconcilien; registra el hecho verificado, con su evidencia, y avisa.
> 
> **La v2.0 de la funcional (23-09-2026) vació casi toda esta tabla.** De los cinco desfases que registraba la v0.6 —escrita contra la v1.6— cuatro quedaron incorporados en la funcional el mismo día. Se conservan abajo como historial cerrado, porque documentan de dónde salió cada regla.

| # | Hecho verificado aquí | Estado contra `SPEC-F1-003` **v2.0** |
| --- | --- | --- |
| 1 | Convertir **siempre crea un pedido nuevo** (`PD-032`), así que no se pueden combinar líneas de cotizaciones distintas en un mismo pedido | ✅ **Incorporado.** `RN-08` reescrito: «Las líneas de cotizaciones distintas **no se combinan entre sí** para generar un único pedido», con `SUP-04` y `RN-11` fijando la cardinalidad 1:1:1. La funcional añade la salida real —agregar códigos o partidas **dentro de la propia cotización**—, que es la que esta Spec había identificado. Cierra `PD-054` |
| 2 | La inserción la hace un **JOB periódico**, no una consulta del asesor | ✅ **Incorporado, y con un dato nuevo:** `RF-14` y `AC-04` fijan la frecuencia en **cada 5 minutos** y dicen textual que «la inserción no depende de que el asesor ubique o consulte al cliente en Epico» |
| 3 | El umbral de «próxima a vencer» es **3 días** (dato de Vigencia) | ✅ **Incorporado** en `RN-07`, `RF-16` y `AC-18`: «Próxima a vencer cuando resten 3 días o menos». Deja de depender del archivo de negocio |
| 4 | **El funnel de gestión comercial queda fuera del alcance del MVP** | ✅ **Incorporado** en *Fuera de alcance*, enumerando presentación, negociación, descarte, escalamiento, cierre ganado y cierre perdido, más la reactivación |
| 5 | El patrón back-end real solo expone `GET`/`POST`, devuelve **siempre 200** y sus códigos son `<CLAVE-JIRA>.<RN-XX>` | ⚠️ **Sigue abierto.** Ni la funcional ni `CONTRATO_BACKEND_F1-003.md` lo reflejan. Bloque D de §14 |

### 0-bis. El conflicto del instante del vencimiento — CERRADO (v2.1)

Estuvo abierto unas horas y se resolvió el mismo día. Se conserva el registro porque explica de dónde salió la regla que hoy implementa el prototipo.

| Tema | Lo que sostenía el cuadro QA/BA del 22-09 | Lo que decía la v2.0 | Lo que quedó en la **v2.1** |
| --- | --- | --- | --- |
| **Instante del vencimiento** | Corte a las **00:00 del día 31**, huso del servidor | «Al cumplirse exactamente **30 días naturales desde ese timestamp**» de creación | ✅ **La primera.** «Fecha de vencimiento = fecha de creación + 30 días calendario; permanece válida hasta las **23:59:59** de esa fecha y pasa a **Vencida** a las **00:00:00** del día siguiente», en la zona horaria configurada para Epico (`RN-07`, `RF-16`, `AC-19`) |

Una cotización creada a las 15:00 vive, por tanto, hasta el final de su día 30 — no muere a media tarde con el cliente enfrente. El prototipo ya comparaba inicios de día, así que quedó alineado sin cambios.

**Residuo menor, no bloqueante:** el cálculo del cliente usa la zona horaria del navegador y la Spec dice la del servidor. Coinciden salvo para quien opere en otro huso, y se cierra cuando el contrato entregue la fecha de fin de vigencia como dato autoritativo (`PD-039`, bloque D de §14).

**Regla de trabajo:** manda la funcional **v2.1**. Esta sección ya no registra desfases vivos salvo el del patrón back-end (fila 5).

---

### 0-ter. El contrato del back end — revisión del 24-09-2026

Fuente: `openapi.json` **v3.1.0** de `ferrari/microservicios/pedidoservice`, rama `EF-50620/contrato`, compartido por José Nuño (ARQ) el 24-09. **Estado BORRADOR** — «no se congela hasta Ready for Dev», así que estos puntos llegan a tiempo.

**Lo que resuelve**

| Qué | Cómo |
| --- | --- |
| **Procedencia por línea** (`PD-038`, `RF-04`) | `esPropuestaComercial` en `PedidoResumenDetalleDto` y `PedidoDetalleExtendidoDTO`, con la semántica exacta de `EX-07`: «Solo se define al crear la partida… Si la partida se retira y se vuelve a agregar, nace como no propuesta» |
| **Los campos en listado *****y***** detalle** (media `PD-039`) | `propuestaComercialId`, `propuestaComercialVencimiento`, `statusPropuestaComercial` y `tipoCotizacion` están en `CotizacionResumenDto` **y** en `PedidoResumenDto`. Desaparece el bypass de la segunda llamada a `getQuotes` desde el detalle |
| **Contención de columnas con **`REQ-24222` (`PD-040`) | Decisión ARQ del 22-09 en las notas del contrato: «las columnas de SPEC-F1-003 son **independientes** de las de REQ-24222; **no se comparten**» |

**Lo que falta, por orden de gravedad** *(la v0.9 retiró los dos primeros: ya no son huecos del contrato)*

1. **~~No existe ~~**`cantidadPropuesta`**~~ en ningún DTO.~~** **Ya no se le pide al contrato (decisión del PO, 24-09).** La comparación propuesta ↔ facturado la resuelve el back por join contra la tabla del Coach; la cotización solo conserva `esPropuestaComercial` por partida. Queda condicionado a dos cosas — ver `PD-035` y `PD-056`.
2. **~~Tampoco el recomendador por producto~~** **(**`DAT-05`**).** Mismo argumento y misma decisión: vive en la tabla del Coach y se une por `propuestaComercialId`. Ver `PD-055`.
3. ✅ `Concluida`**: RESUELTO (24-09).** ARQ confirmó que **la calcula el back** y que agregar estados no cuesta. Pendiente solo de verlo escrito en el contrato.
4. ✅ **El reloj y la zona horaria: RESUELTO (24-09).** ARQ precisó que el cálculo es **por días completos, sin considerar horarios**, lo que elimina el riesgo de las 18:00 en CDMX; y sostuvo que la cotización y su Propuesta Comercial **nacen el mismo día**, lo que hace que usar el reloj de la propuesta dé siempre el mismo resultado que usar el de la cotización. El supuesto quedó vigilado en `PD-057` — **retirado en la v0.16**: la funcional v2.3 eliminó el segundo reloj y especifica que una cotización generada días después «únicamente conserva el tiempo restante hasta VigenteHasta», así que el escenario que `PD-057` temía dejó de ser un riesgo y pasó a ser comportamiento definido.

**Lo que sigue abierto del contrato:** que ARQ **suba la versión ajustada** —al 24-09 18:30 seguía idéntica— y en qué repositorio queda, porque anunció que moverá el microservicio; la **precisión del huso** («días completos» ¿contra la fecha local de EPICO o contra UTC?); y que `ConvertirPedido`** no entra en el alcance del **`openapi.json`, así que la validación de caducidad del lado servidor (`AC-11`) sigue sin contrato.

**La búsqueda por Propuesta Comercial no entra aquí (v0.12):** no necesita filtro nuevo en el contrato, porque el listado no está paginado y ya trae `propuestaComercialId`. Se resuelve en el front — ver `UX-INT-05`.

**Consecuencia para esta Spec:** `UX-DAT-02` y `UX-DAT-06` describen el comportamiento correcto y no cambian. Lo que cambia es de quién depende: los cuatro puntos son de ARQ y viven en el bloque D de §14.

---

### 0-quater. Equivalencias contrato ↔ front

El contrato y el prototipo nombran las mismas cosas distinto, y el prototipo además **calcula** lo que el contrato **entrega**. Esta tabla existe para que la migración sea mecánica el día que el contrato se congele. **Nada se renombra todavía:** el `openapi.json` está en BORRADOR, le falta `Concluida` y ARQ anunció que moverá el microservicio de repositorio. Hacer el cambio ahora significaría rehacerlo.

| Concepto | Contrato (`openapi.json` v3.1.0) | Prototipo hoy | Al migrar |
| --- | --- | --- | --- |
| Estatus de cotización | `statusPropuestaComercial` — string calculado por el servicio, no persistido | Se **calcula en cliente** con `calcularVigenciaPropuesta(fechaCaducidadPrecio, convertidaAPedido)` | Se lee el campo y se deja de calcular. `calcularVigenciaPropuesta` sale de `fixtures/` o desaparece |
| Fin de la vigencia | `propuestaComercialVencimiento` — ISO-8601 | `fechaCaducidadPrecio` | Renombrar. **Ya no hay ambigüedad (v2.3):** el vencimiento de la propuesta (`VigenteHasta`) *es* el de la cotización, trasladado sin recálculo. `PD-057` retirado |
| Origen de la cotización | `propuestaComercialId` (número) y `tipoCotizacion` (`"Propuesta Comercial {id}"`) | `origenCotizacion` (enum) + `propuestaComercialId` | El origen se infiere de `propuestaComercialId > 0`. **No bindear **`tipoCotizacion`** directo:** `AC-24` pide «Propuesta comercial» en la celda y el folio en el tooltip |
| Procedencia por línea | `esPropuestaComercial` (booleano, solo al crear la partida) | Fixture por `idCotizacion` | Lectura directa |
| Conversión a pedido | — *(el estatus ya llegará en *`Concluida`*)* | `convertidaAPedido` (`UX-DAT-06`) | **Se elimina**: deja de hacer falta |

**Tolerancia obligatoria:** el contrato declara el estatus como *string y no enum cerrado*, «para poder agregar estados de forma aditiva: **el front debe tolerar valores desconocidos**». La celda debe degradar a texto plano —o a guion— ante un valor que no conozca, nunca romper ni inventar un color.

---

## 🎯 1. Intención de Experiencia

1. **Objetivo de experiencia:** que el asesor reconozca de un vistazo qué cotizaciones vienen del Coach Comercial y cuánto les queda de precio protegido, y que pueda convertirlas en pedido sin perder la trazabilidad de qué se ofreció y qué acabó vendiéndose.
2. **Problema de experiencia que se busca resolver:** hoy el asesor no distingue una cotización nacida de una propuesta comercial de una que capturó él, y no tiene forma de saber si el precio sigue respetado sin calcular días a mano. Eso produce dos fallos caros: intentar convertir algo que ya venció, y perder la atribución de lo que el recomendador propuso.
3. **Resultado esperado para el usuario:** el asesor abre su listado, identifica sin esfuerzo lo que viene de propuesta, ve cuánto le queda, y convierte con la confianza de que el precio que ve es el que se va a respetar.
4. **Principios de experiencia particulares:**
    - **UX-PRI-01. Una sola señal de urgencia por pantalla.** El color se reserva para lo que corre contra el reloj. Todo lo demás —origen, clasificación— es texto. Si todo destaca, nada destaca.
    - **UX-PRI-02. El sistema calcula, el asesor decide.** Ningún dato se presenta en una forma que obligue al usuario a hacer aritmética mental. Una fecha de vencimiento sola es trabajo trasladado al usuario; «3 días» es información.
    - **UX-PRI-03. Adaptar nunca quita una acción.** Lo que el asesor puede hacer en escritorio lo puede hacer en móvil. La adaptación cambia la forma, no las capacidades (`docs/Patrones-Movil.md`).
    - **UX-PRI-04. Nada se explica solo con hover.** En táctil no existe. Un tooltip puede añadir matiz; nunca puede ser el único lugar donde vive un dato necesario para decidir.

---

## 🧭 2. Flujo de Experiencia TO-BE

> ✅ **Corregido en la funcional v2.0.** Hasta la v1.6, el `Flujo Principal` punto 2 y el `AC-04` describían la inserción como si ocurriera al consultar al cliente. La v2.0 lo reescribió: la hace un **JOB cada 5 minutos** y «la inserción no depende de que el asesor ubique o consulte al cliente en Epico» (`RF-14`, `AC-04`). El asesor nunca espera a que el sistema traiga propuestas; se las encuentra ya convertidas, que es la conducta que esta Spec venía asumiendo.

### Flujo principal

1. **UX-FLU-01 — Convertir en pedido una cotización venida de propuesta**
    1. **Punto de entrada:** listado de cotizaciones del cliente. La cotización ya existe: la creó el JOB a partir de una propuesta del Coach, sin intervención del asesor.
    2. **Objetivo del usuario:** levantar el pedido respetando el precio que se le ofreció al cliente.
    3. **Paso 1:** el asesor localiza la cotización. La reconoce por la columna **Origen** («Propuesta comercial») y evalúa si sigue viva por la columna **Vigencia**.
    4. **Paso 2:** abre el detalle. Ve qué partidas vienen de la propuesta y cuáles agregó él, y puede quitar, agregar o ajustar cantidades sin restricción.
    5. **Paso 3:** convierte. Si ya tenía una caja abierta del mismo cliente, se le advierte que va a quedarse con **dos pedidos** (`UX-MSG-10`), pero no se le bloquea.
    6. **Resultado:** pedido creado, con la procedencia conservada línea por línea. *(v0.6: la cotización puede seguir marcándose como cerrada en el backend, pero esa transición no es un dato visible en el MVP — el pipeline queda fuera de alcance, ver nota de versión.)*

### Flujos alternos

- **UX-FLU-02 — La cotización caducó.** La conversión se rechaza en servidor con el texto de `UX-MSG-01`. El asesor puede consultarla, pero la salida es levantar un pedido nuevo con precios de hoy. El botón deshabilitado **no** es el control: el guardia es el servidor.
- **~~UX-FLU-03 — El cliente tiene varias propuestas vigentes.~~** **Retirado en el Addendum 0.5.2** junto con `UX-MSG-02`: no hay forma de reunir líneas de varias cotizaciones conservando precio protegido y atribución (ver §0). Cada propuesta sigue produciendo su propia cotización (relación 1:1) y cada conversión su propio pedido; lo que se retira es la promesa de combinarlas.
- **UX-FLU-04 — El asesor quita todos los productos recomendados.** Se permite sin restricción, y **el vínculo con la propuesta se conserva**. La razón es de medición: negocio evalúa qué porcentaje de lo propuesto acabó colocándose, y una propuesta que terminó en cero es un dato, no un error.
- **UX-FLU-05 — Falla la ingesta.** El JOB agota reintentos y no trae propuestas nuevas. Las que ya estaban se siguen viendo (`UX-MSG-08`). **No hay notificación activa**: el estado queda consultable para intervención manual (`AC-16`, nuevo en la funcional).
- **UX-FLU-06 — Reintento o concurrencia al convertir.** La conversión es idempotente por cotización: devuelve el mismo pedido, nunca dos (`UX-MSG-06`).

---

## 🔍 2-bis. Flujo vigente de pedido en Epico (Discovery ligero, 14-09-2026)

Levantamiento pedido por la §13.3 de esta Spec y por `RES-02` y `RES-06` de `SPEC-F1-003`. Fuente: código de `epico/epico-movil` en `release/migracion-salesforce`, commit `9635e4e5`. Sustituye a la suposición de que no existían pantallas vigentes de referencia.

### 2-bis.1 Pantallas reales del flujo

Las rutas navegables están centralizadas en `routes/paths.ts` (`PATH_AUTH`, `PATH_PAGE`) y no se escriben a mano en los componentes. Las páginas de `app/` son envoltorios delgados: la lógica vive en `features/<feature>/infrastructure/ui/`.

| Ruta | Qué es | Papel en esta capacidad |
| --- | --- | --- |
| `/Clientes/Informacion` | Ficha del cliente | **Punto de entrada adoptado en la v0.4** |
| `/Clientes/Informacion/Cotizacion` | Cotizaciones del cliente | Patrón de referencia del listado (`TableQuotation`, `SearchAndFilterQuotes`) |
| `/Clientes/Informacion/Cotizacion/Editar` | Edición de cotización | Patrón de referencia del detalle (`EditQuotation`) |
| `/Catalogo`, `/Catalogo/DetalleProducto` | Catálogo y buscador | `UX-INT-03`, agregar productos habituales |
| `/Checkout` | **Carrito / detalle del pedido** | `UX-VIEW-02`, detalle mixto de productos |
| `/Checkout/Shipment` | Envío | Continuación del flujo normal |
| `/Clientes/Informacion/ListaPedidos/DetallePedido` | Detalle de un pedido generado | Donde la procedencia debe seguir siendo legible (`AC-07`) |

Los módulos implicados son `features/checkout` (el carrito), `features/orders` (el pedido y sus servicios) y `features/quotation` (cotizaciones).

### 2-bis.2 Epico ya convierte un documento con líneas en pedido

Existe y está en producción `POST /api/v3/Pedidos/Cotizacion/{quotationId}/ConvertirPedido` (`features/orders/infraestructure/api/requestUrl.ts`). `UX-PRI-03` y `RES-01` siguen vigentes: **no** debe forzarse la cotización como paso, porque el Coach no las tiene. Pero el patrón de volcar las líneas de un documento a un pedido ya está construido y probado, y es el que esta capacidad debe imitar en lugar de inventar.

### 2-bis.3 La incorporación masiva de líneas ya existe

`features/orders/application/actions/addOrderDetailList.ts` recibe un arreglo de productos y los inserta en una sola llamada a `POST /api/v3/Pedidos/{orderId}/Detalle`, con cuerpo `IOrderDetailRequest { PcListaPrecioId, PedidoDetalle: IOrderDetail[] }`. Es la primitiva que necesita `UX-INT-01`: **no hay que construir nada para el volcado**, sólo extender su carga útil.

### 2-bis.4 Los tres endpoints que pintan el carrito

| Método | Endpoint | Constante | Qué hace |
| --- | --- | --- | --- |
| `POST` | `/api/v3/Pedidos/{PedidoId}/Detalle` | `UrlPostOrderDetail` | Agrega una o varias líneas |
| `PATCH` | `/api/v3/Pedidos/{pedidoId}/Detalles` | `UrlPatchOrderDetailList` | Actualiza varias líneas de golpe |
| `PUT` / `DELETE` | `/api/v3/Pedidos/{pedidoId}/Detalle/{pedidoDetalleId}` | `UrlOrderProductById` | Opera una línea concreta |

Los tres devuelven la misma forma de resumen de pedido, envuelta en `IResponseDto<T>` y procesada con `handleRequestDto`, que reparte en éxito, inválido y error y muestra el aviso correspondiente.

### 2-bis.5 El hueco exacto del contrato

La línea de pedido está tipada en `IPatchOrderDetailListDetail` (`features/orders/domain/interfaces/IPatchOrderDetailListResponse.ts`) con alrededor de cuarenta campos: precio, precio con IVA, importe, promociones, ahorro, porcentaje de descuento, precio especial, gratis, `pickUp`, familia, kms aplicados, entre otros.

**Ninguno expresa procedencia.** No existe `propuestaComercialId` ni bandera de origen. Ése es exactamente el hueco que exigen `UX-PRI-01`, `UX-RES-05` y `UX-DAT-02`, y que la funcional pide en `RF-04` y `DAT-01`. El contrato completo requerido está en la §2-ter.

### 2-bis.6 Existe un mecanismo de idempotencia reutilizable

`RF-08` y `AC-06` exigen que un reintento no duplique líneas ni relaciones, y `UX-STATE-03` lo pide en la experiencia. El front ya usa un parámetro de deduplicación en el alta de detalle (`?duplicado=reemplazar` en `UrlPostOrderDetailModal`, y `duplicado` como parámetro configurable en `UrlPostOrderDetail`). No hace falta inventar un mecanismo nuevo: hay que confirmar con DEV y ARQ que cubre también la relación con la propuesta y no sólo la línea.

### 2-bis.7 Dos presentaciones, no una

`muiTheme` declara `md = 900px` como contrato explícito, alineado con `BreakpointEnum.mobileExperience`. Por debajo manda la experiencia móvil: **fila compacta + hoja de edición**, el arquetipo 5 de `docs/Patrones-Movil.md`, nacido de cajas reales de 25 productos. Por encima, `DataGrid`. La señal de procedencia y las cantidades de `UX-DAT-03` deben resolverse **en las dos presentaciones, y no necesariamente igual**.

`mobileArticleRow.ts` es la costura del renglón móvil: un modelo con contrato fijado en `__tests__/app/features/checkout/mobileArticleRow.test.ts`. Su comentario de cabecera declara que *«el renglón solo tiene sitio para lo que hay que distinguir de un vistazo con 25 productos en la caja»*, y `docs/Patrones-Movil.md` fija el criterio de selección: **la pregunta no es qué cabe, sino qué se necesita para no tener que abrir**.

---

## 🔌 2-ter. Contrato requerido al back end — **SUSTITUIDA**

> **Esta sección ya no es válida y se conserva solo como referencia histórica.**
> 
> La v0.4 pedía aquí cuatro piezas construidas sobre el modelo de la caja mixta: un listado de propuestas, un detalle de propuesta, la extensión de la carga útil del alta múltiple y la devolución de tres campos por los tres endpoints del carrito. **Ese contrato quedó anulado** al confirmarse que la conversión siempre crea un pedido nuevo (`PD-032`) y que la inserción la hace un JOB periódico, no una consulta del asesor. El aviso al equipo de back end se entregó el 21-09-2026 (`PD-033`).
> 
> **Dónde vive ahora el insumo de contrato:** `MIGRACION_SF/CONTRATO_BACKEND_F1-003.md`. ⚠️ Ese documento **también está desalineado** con el patrón back-end real de la empresa y requiere revisión endpoint por endpoint.
> 
> **Tres restricciones del patrón que cualquier contrato de esta capacidad debe respetar**, verificadas el 22-09 en `backend-net-pattern` §3.4:
> 
> - El servicio solo expone `GET`** y **`POST`, sin plantilla de ruta y sin parámetros de ruta (`[FromRoute]` está prohibido).
> - **Devuelve siempre 200** con el wrapper `Response<T>`. Los fallos se lanzan como excepción y un middleware del paquete base los traduce a HTTP; ese paquete **no es inspeccionable** y sus códigos de error no están documentados.
> - El formato del contrato es `contracts/openapi.json`, OpenAPI fijado a **3.0.x** (no 3.1), y el código de cada error es `<CLAVE-JIRA>.<RN-XX>`.
> 
> Por eso esta Spec **no fija códigos HTTP** en ninguna parte. Ver la nota de §9.

---

## 🖥️ 3. Inventario de Pantallas / Vistas

### UX-VIEW-01 — Listado de cotizaciones del cliente

- **Propósito:** reconocer, priorizar y elegir qué cotización trabajar.
- **Entrada desde:** ficha del cliente.
- **Salida hacia:** detalle de la cotización (`UX-VIEW-02`), descarga de PDF/XLSX.
- **Referencia Figma:** no habrá — ver la checklist de validación.
- **Referencia visual:** la pantalla construida, `/Clientes/Informacion/Cotizacion` (`features/quotation/infraestructure/ui/Quotation.tsx` y `table/`).

### UX-VIEW-02 — Detalle / edición de la cotización

- **Propósito:** revisar y ajustar las partidas antes de convertir.
- **Entrada desde:** `UX-VIEW-01`.
- **Salida hacia:** pedido (`UX-VIEW-03`), o regreso al listado.
- **Referencia visual:** la pantalla construida, `/Clientes/Informacion/Cotizacion/Editar` (`features/quotation/infraestructure/ui/editQuotation/`).

### UX-VIEW-03 — Pedido resultante

- **Propósito:** confirmar qué se convirtió y conservar la trazabilidad por línea.
- **Entrada desde:** `UX-VIEW-02`.
- **Referencia visual:** la pantalla construida, `/Checkout` y `/Clientes/Informacion/ListaPedidos/DetallePedido`.

---

## 🧱 4. Estructura y Jerarquía de la Interfaz

### UX-VIEW-01 — Listado de cotizaciones

1. **Estructura principal:** buscador y filtros · tabla (escritorio) o lista de tarjetas (táctil) · acciones por fila.
2. **Orden de columnas y por qué** *(v0.6: once columnas, no doce — se retira Estatus del MVP, ver nota de versión)*:

| # | Columna | Nota |
| --- | --- | --- |
| 1 | ID Cotización | Identidad |
| 2 | **Origen** | Texto plano. Literales fijados por negocio: «Propuesta comercial» / «Cotización». El folio viaja en el tooltip |
| 3 | Razón social |  |
| 4 | Sucursal |  |
| 5 | Fecha de Creación |  |
| 6 | **Antigüedad** | Días transcurridos. Texto plano |
| 7 | Fecha de Modificación |  |
| 8 | **Estatus** | **Única columna con color.** Label corto; la fecha exacta en tooltip. `RF-18` nombra el concepto «Estatus de cotización»; el encabezado se abrevia por ancho — ver `UX-RES-07` |
| 9 | Clasificación |  |
| 10 | Subtotal |  |
| 11 | Descargar | PDF / XLSX |

**~~Vigencia y Estatus van contiguas a propósito.~~** *(v0.6)* La columna Estatus (el pipeline de nueve estados) queda fuera del MVP por decisión de alcance de negocio — ver nota de versión al inicio. Vigencia sigue siendo la única columna con color de esta capacidad; la separación de las dos dimensiones («en tiempo» vs. «en el proceso») que motivaba este párrafo se conserva como criterio de diseño para cuando el pipeline vuelva, pero no tiene nada que contrastar en pantalla mientras tanto.
3. **Jerarquía de información:**

- **Primaria:** Origen y Vigencia. Son los dos datos con los que el asesor decide si esa fila le sirve hoy.
- **Secundaria:** cliente, sucursal, subtotal.
- **Complementaria:** antigüedad, clasificación, fechas.

1. **Acción principal:** abrir el detalle (Editar / Ver).
2. **Acciones secundarias:** historial, descarga de PDF y XLSX.
3. **Consideraciones particulares:**

- **La columna Origen debe tolerar un tercer valor sin rediseño.** Luis Galván anticipó que más adelante vivirán ahí las cotizaciones de «proyectos» para empresas.
- `REQ-24222`~~ pretende ocupar esta misma tabla con «Estatus de propuesta» y «Tipo de proyecto». La contención de columnas está abierta (~~`PD-040`~~).~~ *(v0.6)* Con Estatus fuera del MVP, esta colisión específica queda en pausa — no hay columna de estatus con la que contender por ahora. Vuelve a ser relevante si el pipeline regresa en una fase posterior; `PD-040` se mantiene abierto por la colisión de terminología («propuesta») que es independiente de esto.

---

## 🧩 5. Componentes y Design System

### Fuentes heredadas

- **Catálogo de componentes Front:** `03_SISTEMAS/EPICO/SISTEMA_DISENO.md`
- **Patrones móviles (NFR de facto):** `epico-movil/docs/Patrones-Movil.md`
- **Librería Front:** `epico-movil/features/common/infrastructure/ui/`

### Componentes utilizados

#### UX-COMP-01 — Tabla adaptable del listado

- **Componente existente:** `AdaptiveDataGrid` → `DataCardList` → `DataCard`
- **Vista:** `UX-VIEW-01`
- **Comportamiento particular:** por debajo de 900px conmuta a tarjetas. Se usa `cardOptions.visibleFields` para reordenar y ocultar; **no se usa **`renderCard`, porque reemplaza la tarjeta completa —checkbox y acciones incluidos— y adaptar no puede quitar una acción.
- **Decisión:** Reutilizar

#### UX-COMP-02 — Señal de vigencia

- **Componente existente:** átomo `Label`, variantes `success` / `warning` / `error`
- **Vista:** `UX-VIEW-01`, columna Vigencia
- **Uso:** «Vigente» · cuenta regresiva («Hoy», «Mañana», «N días») · «Caducada»
- **Comportamiento particular:** la cuenta regresiva aparece **solo** en la banda de «por vencer». En las otras dos sería ruido: «27 días» no pide ninguna acción, y cuánto hace que venció una caducada es retrospectivo.
- **Decisión:** Reutilizar. Se corrigió un defecto del átomo: declaraba `sxContainer` y no lo aplicaba.

#### ~~UX-COMP-03 — Estatus de pipeline~~ *(fuera de alcance del MVP, v0.6)*

- Retirado junto con la columna Estatus. Queda documentado aquí por si el pipeline regresa en una
fase posterior: era texto plano con `Tooltip`, sin color ni pastilla por `UX-PRI-01`.

#### UX-COMP-04 — Marca de procedencia por línea

- **Componente existente:** `Chip` de MUI, tamaño `small`
- **Vista:** `UX-VIEW-02` y `UX-VIEW-03`
- **Uso:** etiqueta `PC` en cada partida venida de la propuesta. **Solo **`PC`, sin folio: repetirlo en cada renglón gasta ancho sin aportar, y el folio ya está en la cabecera.
- **Decisión:** Reutilizar

### Componentes nuevos requeridos

Ninguno. **Es una decisión, no una casualidad:** toda la capacidad se resolvió con el catálogo existente para no ensuciar el sistema por una funcionalidad.

---

## 🖱️ 6. Interacciones y Comportamientos

### UX-INT-01 — Consultar el folio de la propuesta

- **Elemento:** celda de Origen · **Disparador:** hover
- **Comportamiento:** tooltip con «Propuesta comercial \<folio\>»
- **Condición:** solo cuando el origen es propuesta
- **Referencia funcional:** `RF-12`
- **Limitación:** en táctil no hay hover. Por eso, bajo 900px, el folio se pinta a la vista debajo del literal.

### UX-INT-02 — Consultar la fecha exacta de caducidad

- **Elemento:** label de Vigencia · **Disparador:** hover
- **Comportamiento:** «Los precios se respetan hasta el DD/MM/AAAA», o el texto de caducidad si ya venció
- **Referencia funcional:** `RN-07`
- **Limitación:** en táctil se pierde. Es aceptable porque la fecha completa vive también en el aviso del detalle, que es donde el asesor decide.

### UX-INT-03 — Convertir en pedido

- **Elemento:** acción de conversión · **Disparador:** clic
- **Comportamiento:** si el cliente ya tiene una caja abierta, se muestra `UX-MSG-10` **antes** de convertir. Informa, no bloquea ni pide confirmación extra.
- **Referencia funcional:** `RF-08`, `AC-13`, `PD-036`

### UX-INT-04 — Quitar una partida venida de la propuesta

- **Elemento:** acción de quitar línea · **Disparador:** clic
- **Comportamiento:** se confirma con `UX-MSG-03`, porque volver a agregar el producto **no** restituye ni la atribución ni el precio protegido
- **Referencia funcional:** `EX-07`, `RN-09`

### UX-INT-05 — Buscar por número de cotización o de Propuesta Comercial *(restituida en la v0.11)*

- **Elemento:** buscador del listado — **un solo campo**, sin selector de modo
- **Comportamiento:** el término se busca con **OR** contra el id de la cotización **y** el id de la Propuesta Comercial. Una cotización nacida de propuesta aparece tecleando cualquiera de los dos números. El caso real es el cliente llamando por su propuesta; sin esto el folio se muestra pero no lleva a ninguna parte.
- **Por qué un campo y no un selector.** Un selector obliga al asesor a saber de antemano qué tipo de número tiene en la mano, que es justo lo que no sabe cuando se lo dictan por teléfono. Decisión de UX tomada el 24-09 sobre la propuesta de DEV de poner dos modos.
- **No distingue por cuál de los dos coincidió, y así se quiere (v0.12).** Si el término existe como número de cotización y como número de propuesta, salen los dos renglones y ya. Decisión explícita de UX: «no hay que identificar nada». `PD-058` queda descartado.
- **El resultado siempre son cotizaciones.** `propuestaComercialId` es una columna del mismo renglón (`CotizacionResumenDto`), no otra entidad: buscar por propuesta devuelve **las cotizaciones nacidas de ella**, nunca la propuesta.
- **No requiere nada del contrato.** El endpoint del listado **no tiene paginado** —«de inicio te retorna todo», DEV 24-09— y ya entrega `propuestaComercialId` en el resumen, así que el filtro se resuelve en el front sobre el conjunto completo. ⚠️ Si algún día el listado se pagina, este filtro deja de ser correcto y hay que pedírselo al back.
- **Caso no cubierto, por definición:** una Propuesta Comercial que el JOB aún no inserta no tiene cotización; buscar su número no devuelve nada.
- **Texto del campo, fijado por la funcional v2.2 (**`RF-19`**):** «**Buscar por ID de cotización o ID de Propuesta Comercial**». Se adopta literal; no es copy de UX sino requisito funcional.
- **Sin resultados:** `RF-19` y `AC-28` piden conservar «el comportamiento estándar vigente de Epico para búsquedas sin resultados» — incluido el caso de una propuesta que el JOB todavía no procesó. No se inventa un estado vacío propio; ver `UX-MSG-11`.
- **La relación es 1:1** (`RN-11`, `SUP-04`): buscar por el id de una propuesta ya procesada lleva a **su** cotización, no a varias.
- **Referencia funcional:** `RF-19`, `AC-27`, `AC-28` · `PD-037` (cerrado)

**No confundir con **`UX-INT-06`**,** que sigue vigente: filtrar por **origen** es otra cosa que buscar por un dato de la propuesta.

### UX-INT-06 — Filtrar por origen *(resuelta en la v0.14)*

- **Elemento:** select «Origen» del listado
- **Opciones:** `Cotización` · `Propuesta comercial`. El origen no viaja en el contrato: se **deriva** de `propuestaComercialId > 0`, que es lo que el propio `openapi.json` indica —«el front filtra las cotizaciones de Propuesta Comercial con `propuestaComercialId > 0` (`RF-15`)»—. La derivación vive en `adaptarCotizacionDelBack`.
- **Independiente del filtro de Estatus** desde el 28-09-2026 (`PD-059`). Elegir un estatus ya no mueve este select.
- **Combinación vacía legítima:** `Origen = Cotización` + cualquier estatus devuelve lista vacía, porque el estatus solo existe en las cotizaciones de propuesta. Es correcto y además enseña la relación entre los dos conceptos.

**Por qué no hay un segundo filtro de «vigencia de la propuesta de origen».**

`AC-22` pedía dos criterios porque la funcional v2.0 manejaba **dos relojes**: la *disponibilidad* de la propuesta y la *vigencia* de la cotización, contadas desde momentos distintos. El contrato v3.2.0 los unificó en un solo campo, `propuestaComercialVencimiento`, «de la Propuesta Comercial **y de su cotización derivada**… para que disponibilidad y vigencia coincidan».

Con un único vencimiento, las dos preguntas devuelven siempre el mismo conjunto. Ofrecer dos filtros equivalentes viola lo mismo que `UX-PRI-01` protege en la tabla: **una señal por concepto**. Dos controles que no pueden discrepar no informan, confunden — el asesor supone que significan cosas distintas porque están separados.

**El contrato congelado lo confirma.** La v3.4.0 dice de `propuestaComercialVencimiento` que «**también sirve para la consulta informativa de **`RF-15`** y **`AC-22`»: un solo campo atiende las dos preguntas. `RF-15` conserva el concepto —la disponibilidad de la propuesta— pero no hay un segundo dato que filtrar. `PD-063` se cierra con esa frase.

### UX-INT-07 — Filtrar por estatus de cotización *(nueva en la v0.13)*

- **Elemento:** select «Estatus» del listado
- **Opciones:** `Vigentes` · `Próximas a vencer` · `Vencidas` · `Concluidas` — **los mismos cuatro valores que pinta la columna**. Esa correspondencia es la regla: si el filtro ofrece menos estados de los que la tabla muestra, el asesor no tiene cómo llegar a lo que está viendo. `Concluidas` faltaba y se detectó en uso el 25-09-2026.
- **Copy:** alineado al vocabulario de negocio en la misma versión —«Vencidas», no «Caducadas»; «Próximas a vencer», no «Por vencer»— y el select se llama **«Estatus»**, no «Vigencia», igual que la columna (`RF-18`): con `Concluida` adentro el filtro ya no habla solo de vigencia.
- **Resuelve el estado con el mismo módulo que la celda** (`resolverVigencia`). Antes calculaba por su cuenta, así que el filtro podía discrepar de la pastilla que el asesor tenía enfrente, y una cotización con estado del back pero sin fecha desaparecía del listado filtrado.
- **Elegir un estatus fija Origen en «Propuesta comercial»**, porque el estatus solo existe en las cotizaciones venidas de propuesta. ⚠️ Hoy ese cambio ocurre **en silencio** y se lee como una falla — ver `PD-059`.
- **Referencia funcional:** `RF-15`, `AC-22`, `RF-18`

## 🔄 7. Estados de la Experiencia

### UX-STATE-01 — Inicial

- **Condición:** listado cargado con al menos una cotización
- **Elementos visibles:** tabla o tarjetas con las once columnas de §4
- **Acciones:** abrir, descargar, historial

### UX-STATE-02 — Vacío

- **Condición:** ninguna cotización cumple el filtro
- **Mensaje:** `UX-MSG-11`
- **Acción disponible:** ajustar filtros o buscar por folio

### UX-STATE-03 — Carga

- **Indicador:** el del `AdaptiveDataGrid`; en la descarga, spinner en la propia celda
- **Elementos bloqueados:** la acción de descarga en curso, para evitar doble disparo

### UX-STATE-04 — Error

- **Condición:** `RN-07` / `EX-06` (caducada), `AC-14` (falla al convertir), `RF-14` / `EX-09` (falla de ingesta)
- **Mensaje:** `UX-MSG-01`, `UX-MSG-07`, `UX-MSG-08` respectivamente
- **Presentación:** alerta en el detalle para la caducidad; inline para la conversión; aviso no intrusivo en el listado para la ingesta
- **Acción de recuperación:** consultar o levantar pedido nuevo · reintentar · esperar al JOB

### UX-STATE-05 — Exitoso

- **Condición:** conversión completada (`AC-13`)
- **Feedback:** navegación al pedido creado
- **Siguiente acción:** continuar en el pedido

### UX-STATE-06 — Deshabilitado

- **Condición:** cotización caducada o sin permiso de edición (`permitirEditar`)
- **Motivo visible:** **sí, siempre.** Un control deshabilitado sin motivo legible es un callejón sin salida, y en táctil el tooltip que lo explicaría no existe. El motivo va en texto, no en hover.

---

## ✍️ 8. Formularios, Datos y Validaciones Visuales

### UX-DAT-01 — Origen de la cotización

- **Referencia funcional:** `DAT-01`, `RF-12`
- **Presentación:** texto plano, literales fijados por negocio
- **Formato:** «Propuesta comercial» / «Cotización»

### UX-DAT-02 — Vigencia del precio

- **Referencia funcional:** `RN-07`, `RF-16`, `RF-18`, `EX-06`, `AC-17` a `AC-19`, `AC-26`
- **Presentación:** label de estado; fecha exacta en tooltip y en el aviso del detalle
- **Formato:** estado + cuenta regresiva en la banda de preaviso
- **Valores (v2.3):** `Vigente` → `Próxima a vencer` (3 días calendario o menos) → `Vencida`, más `Concluida`
- **Colores:** verde para `Vigente`, ámbar para la cuenta regresiva, rojo para `Vencida` y **azul** (`VariantLabel.info`) para `Concluida`. El azul no es decorativo: el verde ya significa «vigente, te queda tiempo», y reusarlo para un desenlace haría que dos cosas distintas se vieran igual. El azul es el color que el sistema reserva para informar sin pedir nada, que es exactamente lo que esa celda hace — el reloj se detuvo, no hay que actuar. `UX-PRI-01` se respeta: cada fila lleva una sola pastilla, y una fila o corre contra el reloj o está concluida, nunca ambas.
- `Concluida`** tiene precedencia sobre la fecha** (`AC-26`): se evalúa **antes** de mirar la vigencia. Si se evaluara después, una cotización convertida hace 40 días volvería a leerse como vencida, que es el defecto que este estado existe para corregir.
- **Regla de cálculo (reescrita por la funcional v2.3):** `fecha de vencimiento = VigenteHasta de la Propuesta Comercial de origen`. El JOB la traslada a la cabecera de la cotización **sin recalcularla**, así que Epico no abre un periodo propio: si la cotización se genera días después de la propuesta, nace con la vigencia parcialmente consumida (`RN-07`, `RF-16`, `DAT-01`). La cotización permanece válida **hasta las 23:59:59** de esa fecha y pasa a `Vencida` **a las 00:00:00 del día siguiente**, en la zona horaria configurada para Epico. Por eso el cálculo compara **inicios de día** y no timestamps: el día del vencimiento la celda todavía dice «Hoy».
- **Copy alineado a negocio:** la pastilla decía «Caducada» y dice **«Vencida»**. Los miembros del enum conservan sus nombres antiguos a propósito; renombrarlos es refactor puro y debe hacerse solo.
- ⚠️ **Residuo abierto, no bloqueante:** el cálculo del cliente usa la zona horaria del navegador y la Spec dice la del servidor (ver §0-bis).

### UX-DAT-03 — Antigüedad

- **Referencia funcional:** pedida por negocio (Teams, 22-09)
- **Presentación:** texto plano · **Formato:** «Hoy», «Ayer», «N días»

### ~~UX-DAT-04 — Estatus de pipeline~~ *(fuera de alcance del MVP, v0.6)*

- Retirado junto con la columna Estatus (ver nota de versión). El catálogo oficial sigue siendo la
fuente del umbral de 3 días de `UX-DAT-02`/`UX-RES-03` — eso es Vigencia, no Estatus, y no se
retira.

### UX-DAT-06 — Conversión a pedido

- **Referencia funcional:** `AC-26`, `RN-07`, `RF-16`
- **Qué es:** marca de que la cotización se convirtió exitosamente en pedido. No se presenta como dato propio: es lo que hace que `UX-DAT-02` valga `Concluida`.
- ⚠️ **No existirá en el contrato, y no hace falta.** ARQ confirmó el 24-09 que `Concluida` la calcula el back, así que el estatus llegará ya resuelto. **Este dato desaparece del front al migrar** (§0-quater); hoy sigue vivo solo porque el prototipo calcula el estatus en cliente.

### ~~UX-DAT-05 — Cantidad propuesta y recomendador por línea~~ *(retirada del MVP, v0.9)*

Mostraba la cifra original del Coach en solo lectura junto a la cantidad editable, para que el asesor leyera «te propusieron 10, llevas 4». **Se retira:** el PO confirmó el 24-09 que el asesor no necesita verla mientras edita, y que la comparación propuesta ↔ facturado la resuelve el back por join contra la tabla del Coach. La cotización solo conserva el identificador de origen por partida (`UX-DAT-06` y `esPropuestaComercial` del contrato).

Si alguna vez se decide que el asesor sí debe verla, el dato tendrá que llegar al front aunque no se persista en la línea, y eso es petición a ARQ.

---

## 💬 9. Textos de Interfaz y Feedback

> **Por qué esta sección es normativa y no decorativa.** `ESTANDARES_API.md` exige que el `mensaje` de cada error del contrato sea el texto literal de los AC/EX de la funcional, y la skill `contrato-api` añade que **si la Spec UX define el **`UX-MSG`** correspondiente, debe coincidir**; una discrepancia se reporta como `[NEEDS CLARIFICATION]`, **no se resuelve eligiendo**. Estos textos son, por tanto, insumo directo del contrato.
> 
> **Sobre los códigos.** El código de error es `<CLAVE-JIRA>.<RN-XX>` — p. ej. `EF-50620.RN-07` —; el prefijo lo pone el contrato y la Spec sigue diciendo `RN-07`. **Esta Spec no fija códigos HTTP**: el patrón back-end de la empresa devuelve siempre 200 con wrapper y los códigos de error viven en un paquete base no inspeccionable (`backend-net-pattern` §3.4). Pedir un 422 o un 409 desde aquí sería pedir algo que el servicio no puede otorgar.

### Mensajes

| Id | Regla | Texto |
| --- | --- | --- |
| **UX-MSG-01** | `RN-07` / `EX-06` | «Esta cotización ya no puede convertirse en pedido: sus precios se respetaron hasta el DD/MM/AAAA, la vigencia que traía su propuesta comercial. Puedes levantar un pedido nuevo con los precios de hoy.» *(v0.16: reescrito. El texto anterior afirmaba «30 días desde que se creó», que la funcional v2.3 vuelve falso.)* |
| **~~UX-MSG-02~~** | `RN-08` | **Retirado en el Addendum 0.5.2** — ver §0 y `UX-FLU-03`. |
| **UX-MSG-03** | `EX-07` / `RN-09` | «Si quitas este producto y después lo vuelves a agregar, deja de contar como parte de la propuesta y pierde el precio protegido.» |
| **UX-MSG-04** | `EX-08` / `AC-12` | «Al retirar el precio especial, este producto vuelve a \<precio\>, el precio de la propuesta — no al de lista.» |
| **UX-MSG-05** | `RF-13` / `IMP-05` | «El documento que se envía al cliente es el PDF de esta cotización.» |
| **UX-MSG-06** | `RF-08` / `AC-13` | «Esta cotización ya se convirtió en el pedido N. No se genera uno nuevo.» |
| **UX-MSG-07** | `AC-14` | «No se pudo generar el pedido. La cotización queda intacta; vuelve a intentarlo.» |
| **UX-MSG-08** | `RF-14` / `EX-09` | «No pudimos traer las propuestas nuevas de este cliente. Las que ya estaban se siguen viendo. Estamos reintentando.» |
| **UX-MSG-09** | `DAT-05` | «N/A» |
| **UX-MSG-10** | `PD-036` | «Convertir no suma a esa caja: crea un pedido aparte. Vas a quedarte con dos pedidos abiertos del mismo cliente.» |
| **UX-MSG-12** | `RN-11` / `EF-50620.RN-11` | «Esta cotización ya se convirtió en el pedido N y no admite cambios. Si necesitas algo distinto, levanta un pedido nuevo.» *(v0.15: resuelve el pendiente 1 declarado al congelar el contrato.)* |
| **UX-MSG-11** | `RF-19` / `AC-28` | «Sin cotizaciones que cumplan el filtro. Puedes buscar por ID de cotización o por ID de Propuesta Comercial.» *(v0.15: «número» pasa a «ID», para hablar igual que el campo que *`RF-19`* fija.)* *(v0.11: recupera la segunda frase al restituirse *`UX-INT-05`*; «folio» pasa a «número», que es como lo nombró negocio.)* |

> `UX-MSG-01`** aplica a los dos intentos, no solo a convertir (v0.15).** El contrato declaró como pendiente «validar que `UX-MSG-01` aplica también a la edición de una cotización Vencida». **Sí aplica:** el motivo que el mensaje explica —los precios vencieron— es el mismo que impide editarla, y `permitirEditar` llega en `false` por la misma razón. Mostrar dos textos distintos para una sola causa obligaría al asesor a deducir que son el mismo problema. Con una `Concluida` es distinto y por eso existe `UX-MSG-12`: ahí no venció nada, se ganó.
> 
> `UX-MSG-01`** es un entregable pedido por negocio, no una iniciativa de UX.** Luis Galván lo pidió literal: «necesitamos que la cotización traiga un "copy" que haga sentido a la vigencia y uso». Y precisó el fondo el 22-09: «en el copy se va a especificar que la vigencia es de 30 días naturales. Después de esos 30 días está sujeto a cambios y revisión». **Esa precisión quedó superada por la funcional v2.3 (v0.16):** la vigencia ya no es un plazo de Epico sino la `VigenteHasta` que hereda de la propuesta, y puede ser cualquier cosa menos 30 días. El fondo que Galván pedía —que el asesor entienda hasta cuándo se respeta el precio y qué pasa después— se conserva intacto; lo que se retira es la cifra. Pendiente de su visto bueno final sobre el texto nuevo.

### Etiquetas relevantes

- **UX-TXT-01.** Columna de vigencia → «Vigencia» (antes «Vence»)
- **UX-TXT-02.** Valores de Origen → «Propuesta comercial» / «Cotización»
- **~~UX-TXT-03.~~**~~ Estatus, en el orden del catálogo oficial~~ *(fuera de alcance del MVP, v0.6 — ver nota de versión)*
- **UX-TXT-04.** Marca de línea → «PC»

### Reglas de contenido particulares

- **El encabezado pone el concepto; la celda pone el valor.** La columna «Vigencia» no repite el verbo en cada fila, igual que Subtotal no escribe «Subtotal: $1,234».
- **Se cuenta como cuenta la gente:** «Hoy», «Mañana», «Ayer» antes que «0 días» o «1 día».
- **Terminología:** aquí «propuesta» es siempre la Propuesta Comercial del Coach. `REQ-24222` llama «propuesta» a la cotización como oportunidad del pipeline — colisión abierta en `PD-040`, independiente de que el pipeline de Estatus esté o no en el MVP.

---

## 📱 10. Adaptabilidad, Dispositivos y Accesibilidad

- **UX-RESP-01.** La experiencia móvil es todo lo que esté por debajo de **900px**; el ancho de referencia de diseño es **320px**.
- **UX-RESP-02.** En tarjeta, el orden de campos antepone Origen y Vigencia, porque son los datos con los que se decide. *(v0.6: se retira Estatus de este orden junto con la columna.)*
- **UX-RESP-03.** **Antigüedad no aparece en tarjeta.** En escritorio gana columna porque el ojo compara filas; en 320px no hay con qué comparar y quedaría a un renglón de «Fecha de Creación» diciendo lo mismo.
- **UX-RESP-04.** El folio de la propuesta se pinta a la vista bajo 900px, porque su tooltip no existe en táctil.
- **UX-ACC-01.** Todo objetivo táctil mantiene **44px** mínimos.
- **UX-ACC-02.** Los labels de estado llevan `aria-label` con texto y explicación, para que el lector de pantalla no reciba solo «3 días».
- **UX-ACC-03.** El estado nunca se comunica **solo** por color: cada label lleva su palabra.

---

## 🎬 11. Transiciones, Animaciones y Feedback Visual

No aplica. Esta capacidad no introduce movimiento propio; hereda las transiciones del Design System.

---

## 🚧 12. Restricciones y Consideraciones UX/UI

- **UX-RES-01.** No se introducen componentes ni colores nuevos al sistema.
- **UX-RES-02.** Los cambios se contienen a la tabla de cotizaciones y su detalle. No se tocan componentes compartidos salvo la corrección de `sxContainer` en el átomo `Label`.
- **UX-RES-03.** **El umbral de «próxima a vencer» es de 3 días, definido por negocio.** Lo fija el catálogo oficial en la fila «En seguimiento / Negociación»: «si faltan \<3 días de vigencia cambia a "proxima a vencer"». El texto original decía `<3`, que dejaba la banda en dos días; **Marco Santero lo corrigió a **`<=3`** sobre el propio catálogo**, porque dos días no le alcanzan al asesor para actuar. La banda vigente es **3, 2, 1 y hoy**. Sustituye la propuesta del equipo, que era 7 días para cubrir un ciclo de ruta semanal. *(v0.6: este dato es de Vigencia y no se retira aunque el catálogo que lo originó documentaba también el pipeline de Estatus, que sí queda fuera del MVP.)*
- **UX-RES-04.** El botón deshabilitado **no es un control de seguridad**: la caducidad debe validarse en servidor.
- **UX-RES-05.** Fuera del MVP: **reactivación** de cotizaciones vencidas y **descarte anticipado**. Ambos diseñados y registrados; el segundo en `DESCARTE_ANTICIPADO.md`.
- **UX-RES-07.** *(nuevo, v0.7)* **El encabezado de la columna se abrevia a «Estatus».** `RF-18` de la funcional v2.1 nombra el concepto **«Estatus de cotización»**, y con razón: desde que entró `Concluida`, la columna ya no habla solo de vigencia. Pero el nombre completo son 21 caracteres, los mismos que «Fecha de Modificación», al que hubo que subirle el `minWidth` a 180 porque se truncaba; gastar ese ancho en una columna de labels cortos se lo quita a las que sí lo necesitan. El nombre completo vive en la Spec y en el tooltip, y con los cuatro valores a la vista no hay ambigüedad. ⚠️ **Deuda de terminología:** cuando el funnel regrese va a querer llamarse también «estatus». Esa columna deberá nombrarse **«Etapa»**, para no reabrir la colisión de `PD-040` con `REQ-24222`.
- **UX-RES-06.** *(nuevo, v0.6)* Fuera del MVP: el **pipeline de Estatus** (columna, componente y catálogo de nueve estados). Decisión de alcance de negocio, Luis Galván, Teams, 23-09-2026 — por tiempo, no por falta de definición: el catálogo oficial que lo alimentaría ya existía (Addendum 0.5.1). Candidato natural a fase posterior.

---

## 🔗 13. Referencias

1. **Spec Funcional:** `SPEC-F1-003` **v2.1** (23-09-2026) — Confluence, espacio `PE`. Incorpora cuatro de los cinco hechos que la §0 reclamaba, cierra el instante del vencimiento (§0-bis) y agrega `Concluida` (`AC-26`) y `RF-18`.
2. **Spec de Proyecto:** `PROJ-SPEC-SFEP-001`
3. **Referencia visual:** las vistas reales de `epico-movil` (§3). Los prototipos de Discovery se retiraron el 29-09-2026 y quedan en `406bf4f03` de `feature/propuesta-en-cotizaciones`.
4. **Catálogo Front:** `03_SISTEMAS/EPICO/SISTEMA_DISENO.md`
5. **Patrones móviles:** `epico-movil/docs/Patrones-Movil.md`
6. **Acumulador de la capacidad:** `MIGRACION_SF/LIGA_PEDIDO_PROPUESTA.md`
7. **Pendientes:** `MIGRACION_SF/PENDIENTES_DE_DEFINICION.md`
8. **Insumo de contrato:** `MIGRACION_SF/CONTRATO_BACKEND_F1-003.md` — ⚠️ desalineado con el patrón back-end real
9. **Descarte anticipado:** `MIGRACION_SF/DESCARTE_ANTICIPADO.md`
10. **Bitácoras:** `docs/contexto/teams/bitacoras/2026-09-21_*`, `2026-09-22_*`, `2026-09-23_*`
11. **Estándares de contrato:** `ESTANDARES_API.md`, skill `contrato-api`
12. **Enlace issue ↔ página:** `base-docs/docs/ENLACE_SPEC_CONFLUENCE.md` (`ADR-005`)

---

## ✅ 14-bis. Decisiones cerradas en la v0.4

| ID | Decisión | Dónde queda |
| --- | --- | --- |
| `D-01` | Señal de procedencia = chip con nomenclatura `PC-<id>` junto al código | `UX-DAT-02` |
| `D-02` | Cantidades de `UX-DAT-03` siempre visibles, con redacción anclada al documento | `UX-DAT-03` ⚠️ |
| `D-03` | `UX-VIEW-03` (resumen de relación) se conserva | `UX-VIEW-03` |
| `D-04` | Botón «Historial» en el listado: descartado por ahora | `UX-VIEW-01` |
| `D-05` | Colisión de producto: reemplazo sin sumar, con elección por producto | `UX-INT-06` |
| `D-06` | Punto de entrada: la ficha del cliente, con listado y detalle propios | §2, `UX-VIEW-01` |
| `D-07` | Estado vacío: mensaje en el listado, ninguno en el carrito | `UX-STATE-02` |

---

> **Anotación de la v0.5 (22-09-2026).** Tres de estas decisiones murieron con el modelo de la caja mixta y **no deben implementarse**:
> 
> - `D-01` — la marca de procedencia por línea ya no es `PC-<id>` sino **solo **`PC`. El folio se repetía en cada renglón sin aportar, porque ya está en la cabecera de la cotización. Decisión de UX del 21-09.
> - `D-05` — la colisión de producto (reemplazo sin sumar, con elección por producto) **desaparece**: sin caja abierta que colisione, no hay escenario. Con ella se archiva `UX-INT-06` y el pendiente `PD-030`.
> - `D-03` — `UX-VIEW-03` (resumen de relación antes de continuar) pierde su razón de ser por lo mismo.
> 
> Las cuatro restantes —`D-02`, `D-04`, `D-06`, `D-07`— siguen vigentes y están reflejadas en el cuerpo de esta versión.
> 
> **⚠️ Nota de la v0.6 sobre **`D-02`**.** Su puntero original incluía también `UX-TXT-03` (Estatus), que la v0.6 retira — se quitó de la tabla de arriba. El puntero que queda, `UX-DAT-03`, también está desactualizado: hoy `UX-DAT-03` es *Antigüedad*, no cantidades; el contenido real de `D-02` (la cifra del Coach en solo lectura junto a la cantidad editable) vive en `UX-DAT-05`. No se corrige el ID directamente en la tabla porque §14-bis se conserva íntegra desde la v0.4 por decisión editorial; queda anotado aquí para quien la use.

---

## ❓ 14. Pendientes de Definición

> Se conserva la organización por dueño de la v0.4, porque separa lo que UX puede cerrar solo de lo que depende de terceros. Los pendientes nuevos del 21, 22 y 23-09-2026 se integran en el bloque que les corresponde.

### A · Se resuelven prototipando — dueño: Marco Santero (UX)

**Cerrada desde la v0.4.** Las seis preguntas originales se resolvieron con el prototipo `/prototipos/f1-003` y quedaron como `D-01` a `D-07` en la §14-bis. El prototipo era material de Discovery, no la entrega de la capacidad — y por eso **se retiró del repositorio el 29-09** (v0.17): las decisiones que produjo viven aquí, no en él.

**Reabierta en la v0.5 y vuelta a cerrar en la v0.5.2:**

- **~~Combinar líneas de varias cotizaciones en un mismo pedido.~~** **No es un pendiente de UX.** No hay flujo que diseñar porque el sistema no puede hacerlo: con `PD-032` cada conversión genera su propio pedido. La promesa venía de `RN-08` y `AC-08` de la funcional, que se apoyan en el «flujo habitual de pedido mixto» del modelo anterior. Se retiró de `UX-MSG-02` y `UX-FLU-03`, y la contradicción se entregó al BA el 23-09-2026. **El BA la resolvió el mismo día en la v2.0** (§0, fila 1): `RN-08` quedó reescrito y ya no promete combinar líneas de cotizaciones distintas. **Si negocio de verdad lo quiere**, la única ruta es armar una sola cotización antes de convertir, agregándole partidas — lo que conecta con el mensaje incompleto de Luis Galván sobre «modificar la cotización derivada con códigos o partidas extras» (nota de la v1.6 de la funcional). Eso sí sería trabajo de UX, y hoy no está pedido.

### B · Decisiones de negocio — dueños: PO (Dioni Miramontes) y Comercial, con Luis Galván

No se resuelven prototipando ni son de UX.

- `PD-049`**~~ · Catálogo oficial de estatus.~~** **RECIBIDO (22-09-2026).** Son nueve estados y confirman la separación de dimensiones. El catálogo en sí sigue teniendo tres defectos documentados (nombres repetidos, filas duplicadas, columna de vigencia no independiente), pero **deja de ser bloqueante para esta Spec**: el pipeline que documentaba quedó fuera del MVP (v0.6). Se conserva la observación para quien retome el pipeline en una fase posterior.
- `PD-048`**~~ · Quién mueve una cotización a «Cerrada - Perdida».~~** **Sin objeto en el MVP (v0.6).** Era crítico porque «Cerrada - Perdida» resultaba un estado inalcanzable sin meter el descarte anticipado al alcance. Al retirarse la columna Estatus del MVP, no hay estado que mostrar y la pregunta no aplica. Vuelve a abrirse tal cual si el pipeline regresa.
- `PD-052`**~~ · ¿El reloj de 30 días se pausa durante la aprobación de precio especial?~~** **RESUELTO: no se pausa (23-09-2026).** No es «sin objeto» —la v0.6 lo clasificó mal—: es una regla positiva que aplica a la columna Vigencia del MVP, exista o no el pipeline. Marco lo preguntó en el spike (20:02) y Luis Galván respondió: «**No, que corra normal porque todos tenemos que sumar al proceso a los 30 días de la vigencia**» (20:14). La funcional v2.0 lo recoge tres veces —alcance, `RN-07` y `RF-16`—: «una aprobación interna no pausa, reinicia ni extiende la vigencia». El «Vigente (en pausa)» del catálogo de negocio queda descartado. El cruce con `PD-046` sigue vivo y se conserva ahí.
- `PD-053`**~~ · Quién autoriza la reactivación.~~** **Sin objeto en el MVP (v0.6)**, porque la reactivación ya estaba fuera de alcance (`UX-RES-05`) y además dependía del pipeline para saber desde qué estado se reactiva.
- `PD-054`**~~ · ¿Se espera de verdad un solo pedido con productos de varias propuestas?~~** **RESUELTO por la funcional v2.0 (23-09-2026), en el sentido que esta Spec sostenía.** `RN-08` quedó reescrito —«Las líneas de cotizaciones distintas no se combinan entre sí para generar un único pedido»— y `SUP-04`/`RN-11` fijan la cardinalidad 1:1:1. La funcional incorpora además la única ruta viable, que es la que aquí se había identificado: **agregar códigos o partidas dentro de la propia cotización**. No queda trabajo de UX pendiente por este punto; si más adelante negocio pide ese armado previo, sí lo habría.
- `PD-034`** · Detalle de la vigencia:** ¿se cuenta por cotización completa o por línea? ¿Editar cantidades reinicia o conserva el reloj?
- `PD-042`** · Guardar la cotización con un nombre específico.** Jose Luis Ramírez lo pidió en el chat del proyecto; Erick Sánchez repreguntó el mismo día si además debe verse como columna del listado y no obtuvo respuesta. ⚠️ **La v0.6 añadía que «en la sesión Luis lo reinterpretó como *****marcar cuál es la buena*****, remitiéndolo a estatus»: esa atribución no aparece en la transcripción del spike del 23-09 y queda sin verificar** — no debe usarse como evidencia hasta localizar su origen. El pendiente sigue como estaba: falta definir dónde se captura y si es columna.
- `PER-03`** · Corrección después de convertir.** El cuadro QA/BA del 22-09 lo cierra: no hay corrección tras convertir a pedido.
- `PD-031`** · Reversibilidad de la atribución.** **Propuesta de UX en esta versión: no se puede desligar.** El vínculo es un hecho histórico y la medición es de cobertura; permitir desligar daría una palanca para desaparecer de la métrica justo las propuestas que no se colocaron. Pendiente de ratificación por negocio.
- `PD-030`~~ · Atribución de piezas precapturadas.~~ **Sin objeto:** nació del escenario de la caja abierta, que murió con `PD-032`.
- ~~Comportamiento al cambiar el cliente del pedido con líneas ya cargadas~~ y ~~colisión de producto~~. **Sin objeto** por la misma razón.

### C · Trabajo de UX pendiente — dueño: Marco Santero

- `PD-058`**~~ · Distinguir la coincidencia por cotización de la coincidencia por propuesta.~~** **DESCARTADO (v0.12).** No se identifica nada: si el término coincide por los dos lados, salen los dos renglones.
- `PD-059`** · Hacer visible que el filtro de Estatus mueve el de Origen.** La conducta es correcta; lo que falta es decirlo. A evaluar: chip de filtros activos, nota bajo el select, o deshabilitar Origen mientras haya estatus elegido.
- `UX-INT-06`**~~ · Diseñar el filtro doble de ~~**`RF-15`**~~/~~**`AC-22` **RESUELTO (v0.14)** — se reduce al filtro de Origen ya construido; la segunda dimensión desapareció al unificar el contrato los dos relojes. Ver `PD-063`.
- **~~Filtro doble, texto anterior:~~**~~ (origen, y vigencia de la Propuesta Comercial de origen). Es superficie nueva de la funcional v2.0 que esta Spec no cubría; el reto es presentar dos vigencias sin que se lean como una sola ni le quiten protagonismo a la columna ~~`Vigencia`~~.~~
- **~~Figma~~**~~ de las vistas.~~ **No aplica (v0.14, confirmado en v0.17):** el criterio de la checklist es «Prototipo / Figma» y se cumple con las vistas construidas. Decisión de Marco Santero, 28-09-2026.
- Mapeo `UX-COMP` formal contra el catálogo de `features/common/infrastructure/ui/`.
- Confirmar con un barrido completo del repositorio si existe un componente de aviso en línea distinto de `BlueCard`.
- `PD-051`**~~ · Congelar el tiempo en vigencia al convertir.~~** **RESUELTO (23-09-2026, v0.7).** La pregunta —¿debe la columna dejar de contar cuando la cotización ya se convirtió en pedido?— la contestó negocio con un estado propio: `Concluida` (Luis Galván, Teams 23:20), y la funcional v2.1 lo formalizó con **precedencia sobre la vigencia** (`AC-26`). Implementado: nuevo valor en el enum, pastilla azul y precedencia evaluada antes de la fecha. **Lo único que queda es el dato que lo dispara** — ver `UX-DAT-06` y el bloque D.

### D · Contrato y arquitectura — dueños: ARQ (José Nuño) y DEV (Alfredo Silva)

- **Revisar **`CONTRATO_BACKEND_F1-003.md`** contra el patrón back-end real**, endpoint por endpoint. Sus secciones de endpoints y de reglas del servidor se escribieron sin saber que solo hay `GET`/`POST` sin parámetros de ruta.
- `UX-MSG-06`** no encaja en ninguno de los tres tipos de excepción del patrón** (validación, no encontrado, petición incorrecta). Una conversión ya realizada es un conflicto de concurrencia, no un dato inválido. Caso para el Arquitecto.

> **Revisado contra el **`openapi.json`** v3.1.0 el 24-09** — ver §0-ter. Lo que el contrato ya resuelve queda tachado abajo; lo que falta se reformula con la evidencia.

- `PD-035`**~~ · ~~**`cantidadPropuesta`**~~ no existe en el contrato.~~** y `PD-055`**~~ · el recomendador tampoco.~~** **Dejan de ser petición a ARQ (24-09).** El PO decidió que la comparación propuesta ↔ facturado la resuelve el back por join contra la tabla del Coach. Cambian de dueño —**equipo de Juan Carlos + reportería**— y se condicionan a los dos puntos de abajo.
- `PD-035`** reformulado · ¿Las cantidades de la propuesta son inmutables?** Juan Carlos advirtió que los recomendadores se actualizan a diario y que «si se genera una propuesta comercial y no se guarda puede haber variación de un día a otro». Si la tabla del Coach se sobrescribe al refrescarse los modelos, la cantidad propuesta de una propuesta vieja cambiaría retroactivamente y la métrica se movería sola. **Hay que confirmar que lo persistido por **`propuestaComercialId`** queda congelado.**
- `PD-056`** · ¿Qué gobierna la métrica cuando el flag y la comparación se contradicen?** Por `EX-07`/`RN-09`, una partida que se retira y se vuelve a agregar **pierde** `esPropuestaComercial`. Al facturar, ese producto aparece en la lista de la propuesta y en la factura —la comparación por código lo contaría como convertido— pero su bandera dice que no. Dos fuentes que se contradicen sobre el mismo renglón: hay que decidir si la conversión se mide **por producto** o **por atribución**. Es `RISG-01` al revés, y sin criterio la cifra es discutible.
- `Concluida`** falta en **`statusPropuestaComercial` y **el reloj que usa el contrato es el de la Propuesta Comercial, en UTC** — ver los puntos 3 y 4 de §0-ter.
- `PD-038`**~~ · Campo de procedencia en la línea de pedido.~~** **RESUELTO por el contrato:** `esPropuestaComercial`.
- `PD-039`** · Los tres campos de trazabilidad deben venir en el listado Y en el detalle**, y la caducidad debe validarse **en el servidor**: el botón deshabilitado no es un control. *(24-09: la primera mitad la resolvió el contrato —los campos están en listado y detalle—. La segunda sigue abierta: *`ConvertirPedido`* no entra en el alcance del *`openapi.json`* y los códigos de error están pendientes de que el BA los numere, serían *`EF-50620.RN-XX`*.)*
- `PD-038`** · Campo de procedencia en la línea de pedido.** `IPatchOrderDetailListDetail` tiene \~40 campos y ninguno la expresa (§2-bis.5).
- `PD-035`** · Dónde vive **`cantidadPropuesta`**:** debe guardarse en la línea de la **cotización**, no solo en la del pedido, y heredarse al convertir.
- `PD-044`**~~ · El instante exacto en que arranca y termina la vigencia.~~** **CERRADO por la v2.1 (23-09-2026)** a favor de la fecha calendario — ver §0-bis. **Queda el dato:** el servidor debe entregar la fecha de fin de vigencia como valor autoritativo, porque hoy la UI la deriva en cliente y con la zona horaria del navegador. Va junto con `PD-039`.
- **Campo de conversión a pedido** *(nuevo, v0.7)*. La UI necesita saber que la cotización ya se convirtió para poder mostrar `Concluida` (`UX-DAT-06`, `AC-26`). Ese campo no existe en el contrato; hoy lo provee el fixture. Es el residuo de `PD-051` y se pide en el mismo movimiento que `PD-039`.
- `PD-037`**~~ · El listado debe aceptar el id de Propuesta Comercial como término de búsqueda.~~** **No es petición al contrato (v0.12).** El listado no está paginado y ya entrega `propuestaComercialId`; el filtro se resuelve en el front. Solo vuelve a serlo si el listado se pagina.
- `PD-060`** · Datos sembrados en el ambiente de pruebas.** Con el fixture apagado, `Vigente` y `Próxima a vencer` no se pueden ver ni verificar: el ambiente solo tiene propuestas viejas. Hace falta al menos una de cada uno de los cuatro estatus. Lo necesitan por igual UX y los casos de QA de Garnica.
- `PD-046`** · La solicitud de precio especial caduca a los 7 días** dentro de una cotización que vive 30, y ampliar ese parámetro no estaba en el alcance de desarrollo.
- `PD-045`** · Las cotizaciones nacidas de propuesta pueden no traer usuario creador.** Si se quema un usuario genérico, se rompe la visibilidad jerárquica de EPICO. Luis Galván quedó de confirmar si existe una tabla puente dominio ↔ usuario Exodus.
- `PD-041`** · Hoy EPICO no tiene ningún estado de caducidad de cotización — REDUCIDO, NO CERRADO.** La parte que dependía de exponer el catálogo de estatus por endpoint sí queda fuera del MVP. **Pero su hallazgo de fondo sobrevive:** `permitirEditar` no es una pista visual sino un **guardia de acceso** —`EditQuotation.tsx` compara el modo de navegación contra el valor que devuelve el servicio y, si no coinciden, **redirige a la pantalla 403**—. Se reprodujo en el prototipo: simulando `permitirEditar = false` solo en el listado, entrar a la cotización caducada lanzaba «No tienes acceso a estas funciones». Mientras la vigencia sea el único eje, ese valor tiene que calcularse **en un solo lugar del servidor** y devolverse idéntico en todos los endpoints que lo exponen, o el usuario leerá un mensaje de permisos cuando lo único que pasó es que un precio venció. Se cruza con `PD-039`.

### E · Dependencia externa — dueño: equipo de Juan Carlos, con ARQ

**Sigue siendo el camino crítico de la Fase 1 y no depende de Diseño ni de Desarrollo.**

- Contrato de intercambio y registro estructurado que acompaña al PDF de la propuesta (`RF-01A`, `DEP-01`).
- Mapeo de identificadores de cliente, dirección, propuesta y producto entre el Coach y las entidades canónicas de Epico (`RF-10`, `DEP-02`, `DEP-07`).
- Forma canónica del identificador de propuesta.
- `AC-16`** (nuevo en la funcional)** · comportamiento del JOB cuando agota reintentos. Confirmado que **no habrá notificación activa**: se sustituye por un estado de error consultable para intervención manual.

### F · Colisión con otra iniciativa — dueño: PO

- `PD-040`**~~ · Contención de columnas con ~~**`REQ-24222`**~~.~~** **RESUELTO** por decisión ARQ del 22-09, confirmada en las notas del contrato: las columnas de las dos iniciativas son independientes y no se comparten. Sobrevive solo la colisión de terminología y el umbral de preaviso, que allá notifica al gerente. Texto anterior: El conflicto principal desapareció al confirmarse que la vigencia vive en la cotización. La **contención de columnas** con la Estatus de `REQ-24222` queda en pausa mientras esta capacidad no muestre pipeline propio (v0.6). Sobreviven la **colisión de terminología** —allá «propuesta» es la cotización como oportunidad del pipeline— y el **umbral de preaviso**, que allá es parámetro de Admin Comercial y notifica al gerente, no al asesor.

---

## ✅ Validación UX/UI para Ready for Dev

* [x] Spec Funcional asociada y vigente (`v2.2`, Ready for Dev, 24-09-2026; antes v2.1). Las dos descripciones erróneas del §2 quedaron corregidas allá, los cuatro hechos de §0 están incorporados y el conflicto de §0-bis quedó cerrado. Sigue abierto un solo desfase: el patrón back-end (§14.D).
* [x] Intención de experiencia definida.
* [x] Flujo de experiencia TO-BE definido.
* [x] Pantallas / vistas identificadas.
* [x] Prototipo / Figma disponible *(v0.14; reanclado en v0.17)* — el criterio es **uno u otro**, y lo cumple **la pantalla construida**: listado, detalle y pedido operables en `epico-movil`, consumiendo el servicio real, con la compuerta de verificación en verde. El prototipo de Discovery que sostenía este punto hasta la v0.16 se retiró porque dejó de aportar algo que el front no muestre (queda en `406bf4f03`). **No habrá Figma para esta capacidad**: levantar un lienzo estático ahora duplicaría la referencia, con el riesgo de que las dos se separen.
* [x] Jerarquía y acciones principales claras.
* [x] Componentes existentes del catálogo identificados.
* [x] Extensiones o `PROPUESTA-DS` justificadas — no se requieren.
* [x] Interacciones relevantes definidas.
* [x] Estados vacío, carga, error y éxito definidos.
* [x] Estado deshabilitado e inicial definidos.
* [x] Presentación de validaciones y errores definida.
* [x] Textos definidos (§9).
* [x] Comportamiento Responsive definido.
* [x] Condiciones de accesibilidad definidas.
* [x] Restricciones UX/UI identificadas.
* [x] Referencias vinculadas.
* [x] **No existen **`[NEEDS CLARIFICATION]`** críticos** *(v0.7)*. `PD-049` se cerró, `PD-048` quedó sin objeto al retirarse el funnel, `PD-044` lo cerró la v2.1 y `PD-051` lo cerró negocio con `Concluida`. Lo que queda abierto son datos del contrato, que es trabajo de ARQ y no definición faltante.
* [x] DEV cuenta con información suficiente para el listado. La conversión depende del contrato (bloque D).
* [x] **La IA cuenta con contexto suficiente sin inventar decisiones críticas** *(v0.6, cambia de estado)*: ya no existe «Cerrada - Perdida» como estado inalcanzable porque no hay pipeline que mostrar, y el desenlace de una cotización convertida tiene nombre propio desde la v2.1.

**Conclusión (v0.14): apta para **`Ready for Dev`**. Del lado de UX no queda nada pendiente.**

La checklist quedó completa el 28-09-2026: `UX-INT-06` se resolvió por reducción y el criterio de prototipo se cumple con las vistas construidas, sin Figma. **Lo único que separa a **`F1-003`** del gate es que ARQ congele el contrato** — el `openapi.json` v3.2.0 sigue en BORRADOR, y el modelo operativo es explícito: nadie construye sin ese estado.

Queda una pregunta escalada al BA, que **no bloquea el gate** porque no es definición faltante sino alcance a confirmar: si `AC-22` mantiene su segundo criterio ahora que el contrato unificó los dos relojes (`PD-063`).

*Conclusión anterior (v0.7): apta para *`Ready for Dev`* en lo que depende de UX, con dos salvedades que no son de definición.*

Los dos puntos que la v0.6.1 dejaba abiertos quedaron cerrados el mismo día:

1. **El instante del vencimiento** lo resolvió el BA en la v2.1, a favor de la fecha calendario — y a favor de lo que el prototipo ya implementaba (§0-bis).
2. `PD-051` lo resolvió negocio con un estado propio, `Concluida`, y la v2.1 le dio precedencia sobre la vigencia (`AC-26`).

Lo que queda **no es definición faltante sino contrato**, y con la revisión del 24-09 (§0-ter) ya está acotado a cuatro puntos, todos de ARQ:

- Que ARQ **suba el contrato ajustado** y diga en qué repositorio queda.
- La **precisión del huso**: «días completos» ¿contra la fecha local de EPICO o contra UTC?
- La **validación de caducidad en servidor**, que sigue fuera del alcance del `openapi.json` (`PD-039`, `AC-11`).

Los campos en listado y detalle, la procedencia por línea y la contención de columnas con `REQ-24222` **ya los resolvió el contrato**; y `Concluida`, el cálculo por días completos y el reloj **los resolvió ARQ el 24-09** (§0-ter). Y `cantidadPropuesta` y el recomendador **dejaron de pedirse**: la medición se resuelve por join contra la tabla del Coach (v0.9), condicionada a `PD-035` y `PD-056`, que son de negocio y del equipo de Juan Carlos, no de esta Spec.

Y dos piezas de trabajo de UX que no bloquean el veredicto pero sí el handoff completo: `UX-INT-06`, el filtro doble de `RF-15`/`AC-22`, y el **Figma**, que sigue sin existir — la referencia vigente son las vistas construidas.

La advertencia de lectura se mantiene, ya en positivo: la funcional **v2.1** incorporó todo lo que la §0 reclamaba salvo el patrón back-end. Las dos Specs están alineadas.
