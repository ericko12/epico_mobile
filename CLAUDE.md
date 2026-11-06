# CLAUDE.md

Guía para Claude Code (claude.ai/code) y cualquier otra IA que trabaje en este repositorio.

## Empieza por aquí

| Archivo | Para qué |
|---|---|
| **[docs/Analisis-Tecnico.md](./docs/Analisis-Tecnico.md)** | La tecnología, los patrones que sigue este código y **las diez cosas que lo rompen**. Léelo antes de tu primer cambio |
| **[docs/Patrones-Movil.md](./docs/Patrones-Movil.md)** | Reglas de layout por debajo de 900px. **Obligatorio antes de tocar UI** |
| [docs/Auth-BFF.md](./docs/Auth-BFF.md) | Autenticación, sesión en Redis y el proxy al gateway |
| [docs/Bugs-QA-Movil.md](./docs/Bugs-QA-Movil.md) | Hallazgos que son del proyecto original, para reportar al equipo |
| [docs/Seguridad-CVEs.md](./docs/Seguridad-CVEs.md) | CVEs de dependencias que se decidió no corregir, y por qué |

## ⚠️ Dos remotos: nunca se pushea al original

Este trabajo vive en un **fork**. `git remote -v` muestra dos:

| Remoto | Repositorio | Uso |
|---|---|---|
| `origin` | `epico/epico.git` | El proyecto original, que sigue en desarrollo. **Traer sí, pushear jamás.** Y traer con `git fetch origin main`: `git fetch origin` a secas falla en Windows, ver [8](./docs/Analisis-Tecnico.md#sincronizar-con-el-proyecto-original) |
| `movil` | `epico/epico-movil.git` | Único destino de `git push` |

El equipo publica en `origin/main` cada pocos días y hay que **sincronizar con `git merge
origin/main`**. La sincronización no se acaba cuando compila: el procedimiento, las cinco preguntas
que hay que hacerse sobre los archivos que tocaron los dos lados y los casos ya vividos están en
[docs/Analisis-Tecnico.md](./docs/Analisis-Tecnico.md#8-cómo-trabajar-aquí).

**Rama de trabajo: `release/busqueda-ia-1.0`.** Desde sep-2026 la adaptación móvil y el buscador nuevo
viven en esa sola rama; `feature/AdaptacionMovil` y `feature/BusquedaIA` quedaron retiradas. Cada
cambio va en un MR de esa rama a `main`, y Jorge pone una tag (`1.0.NN`) sobre el commit de merge.
Otros del equipo también ponen tags (la 1.0.78 fue de Jonatan): el número sale de
`git fetch movil main --tags` y `git tag --sort=-creatordate`, nunca de memoria.

Los MRs se crean desde el propio push: `git push -o merge_request.create -o
merge_request.target=main -o merge_request.title="..." movil release/busqueda-ia-1.0` (no hay `glab`
ni token en el entorno). Las opciones `-o` no admiten saltos de línea, y si el MR ya existe el push
solo lo actualiza.

⚠️ **Otros desarrolladores también fusionan a `movil/main`** (p. ej. `release/cve`, `release/
migracion-salesforce`). Antes de empezar y justo antes de cada push: `git fetch movil main` y, si
avanzó, `git merge movil/main` en la rama de trabajo. Si trae dependencias nuevas, `npm install`
local antes de verificar (y devolver el `package-lock.json` con `git checkout`: el install lo retoca).

## Experiencia móvil (obligatorio para cualquier cambio de UI)

**[docs/Patrones-Movil.md](./docs/Patrones-Movil.md)** tiene las reglas de layout por debajo de 900px:
los seis arquetipos de pantalla con su tratamiento móvil (listado con DataGrid, tabla en modal, modal
de captura, paso de flujo, listado largo con hoja de edición y el aviso de error), los doce
anti-patrones (once de desborde horizontal y uno que cambia escritorio sin que nada lo note), el ancho de referencia de 320px y los
objetivos táctiles.

Leerlo **antes** de tocar UI y aplicarlo por iniciativa propia: si una pantalla encaja en un
arquetipo, se adapta con ese patrón sin esperar a que alguien reporte el defecto con una captura.

## Comandos

```bash
npm run dev          # dev server con enviroments/.env.dev (también: test, stg, uat, prod)
npm run build:dev    # build por ambiente (build:test, build:stg, build:uat, build:prod)
npm run lint         # eslint . (ESLint 9, eslint.config.mjs: next/core-web-vitals + next/typescript)

npm run testJest     # correr todos los tests con Jest
npm run test:watch   # modo watch
npm run test:coverage
npx jest __tests__/app/features/products/MassiveLoadTabs.test.tsx   # un solo test
npx jest -t "nombre del test"                                       # por nombre
```

Ojo: `npm run test` NO corre Jest — levanta el dev server con `.env.test`. Los tests se corren con
`testJest`.

Los ambientes viven en `enviroments/.env.{dev,test,stg,uat,prod}` y se inyectan con `env-cmd`.

El buscador nuevo y el asistente (ver [5.4 del análisis técnico](./docs/Analisis-Tecnico.md)) se
encienden por ambiente. Desde el **28-ago-2026 están activos también en `prod`**, por decisión de
Jorge: dev, test y prod en `true`; `stg` y `uat` siguen en `false`. Incluido el dictado, que **manda
el audio a servidores de Google** — esa decisión se tomó ese día y está anotada en el propio
`.env.prod`:

| Variable | Qué enciende |
|---|---|
| `NEXT_PUBLIC_BUSQUEDA_NUEVA_ACTIVA` | La búsqueda contra `IApymsa.Search` |
| `NEXT_PUBLIC_ASISTENTE_IA_ACTIVO` | El chat del asistente en el catálogo |
| `NEXT_PUBLIC_ASISTENTE_DICTADO_ACTIVO` | El micrófono. Aparte porque el audio sale a Google |
| `NEXT_PUBLIC_ASISTENTE_RESCATE_DICTADO_ACTIVO` | Sondear el índice para ofrecer corregir una marca mal dictada |
| `NEXT_PUBLIC_BUSQUEDA_NUEVA_VIA` | `bff` o `gateway`. Hoy `bff` en los cinco: el gateway no publica la ruta |
| `IAPYMSA_SEARCH_BASE` | Base del microservicio, solo de servidor |

En producción los secretos se cargan desde AWS Secrets Manager con `scripts/load-aws-secrets.js` (ver
Dockerfiles). Despliegue: un `Dockerfile.<ambiente>` + `<ambiente>.yml` por ambiente, orquestado por
GitLab CI (`.gitlab-ci.yml` + `config/gitlab-ci/`). El build usa `output: "standalone"`.

**Fusionar a `main` no despliega nada**: todos los jobs de `config/gitlab-ci/containerize.yml` y
`deployment.yml` exigen `CI_COMMIT_BRANCH =~ /^release/` y son `when: manual`; los de producción
(`release.yml`) exigen `CI_COMMIT_TAG`. En `main` no corre nada. Para que un cambio llegue a un
ambiente hay que llevarlo a una rama `release/*` y lanzar el job a mano. Si el cambio toca `worker/`,
además hay que desregistrar el service worker en el dispositivo: el navegador conserva el anterior.

**Desde nov-2026 esta app es «Epico» y atiende las dos URLs** (decisión del equipo, MR `hotfix/movil`
de Jonatan Cárdenas): `STACK_NAME: epico` en `.gitlab-ci.yml` y, en cada `<ambiente>.yml`, un solo
router de Traefik con el nombre del original y la regla `Host(<url -movil>) || Host(<url del
original>)`. Desplegar el fork **reemplaza el stack `epico` del original** en ese ambiente (el job hace
`docker stack rm $STACK_NAME`). Detalle y lo que falta operar a mano en
[docs/Analisis-Tecnico.md](./docs/Analisis-Tecnico.md#este-repositorio-no-es-el-original).

## Arquitectura

### Clean Architecture por feature

Todo el código de negocio vive en `features/<feature>/` con tres capas fijas:

- `domain/` — interfaces (prefijo `I*`), enums, `data/` (estados iniciales y datos estáticos). Sin
  dependencias de React ni de APIs.
- `application/` — `redux/` (slice + thunks del feature), `service/` (llamadas HTTP vía `EPICO_API`,
  patrón `<feature>.services.ts` que exporta una función factory), `actions/` (lógica de casos de uso).
- `infrastructure/` — `api/` (constantes de URLs, patrón `*Url.ts`), `hooks/`, `ui/` (componentes).

Las respuestas del gateway vienen en `IResponseDto<T>` (`statusCode`, `data`, `huboError`, `error` —
**no hay campo `success`**) y se procesan con **`handleRequestDto`**, que usan 189 archivos: reparte en
éxito / inválido / error, muestra el snackbar y maneja el 401. No escribas la comparación a mano.

Las páginas de `app/` son envoltorios delgados: solo renderizan el componente principal del feature
(ej. `app/(epico)/Catalogo/page.tsx` → `features/catalogue/infrastructure/ui/Catalogue`). La lógica
nunca va en `app/`.

Rutas de `app/` en español con dos route groups: `(auth)` (Login) y `(epico)` (todo lo autenticado).
`app/(epico)/layout.tsx` es el shell principal: menú lateral, validación de permisos por ruta
(`validatePermissions`) y redirecciones. Las rutas navegables están centralizadas en `routes/paths.ts`
(`PATH_AUTH`, `PATH_PAGE`) — nunca hardcodear paths en componentes.

### Auth BFF + Proxy (ver [docs/Auth-BFF.md](./docs/Auth-BFF.md))

El token de acceso nunca llega al navegador:

1. Login: `POST /api/auth/ids4` → obtiene token de IDS4 vía gateway, lo guarda en Redis y setea cookie
   httpOnly `epico_session` (id opaco).
2. Toda llamada al gateway pasa por `/api/proxy/[...path]`
   (`app/api/proxy/[...path]/route.ts`), que lee la sesión de Redis e inyecta `Authorization`.
3. El cliente usa la instancia `EPICO_API` de `axios/axios_helper.ts` (baseURL `/api/proxy`, headers
   `X-OrigenId`). Su interceptor convierte 204 en respuesta estándar y ante 401 cierra sesión y
   redirige a Login.

Variables de servidor clave: `BASE_APIGATEWAY`, `IDS4_*`, `REDIS_*` / `HOST_DISTRIBUTED_CACHE`. Si
Redis no está disponible, auth y proxy fallan.

### Estado global (Redux Toolkit + redux-persist cifrado)

Dos árboles persistidos definidos en `features/common/application/redux/reducers.ts`:

- `localState` → localStorage (auth, sellers, configuration, menu, telemarketing).
- `sessionState` → sessionStorage (product, shipment, branches, customer, checkout, window,
  loyaltyPlan).

Ambos cifrados con `redux-persist-transform-encrypt` (clave `NEXT_PUBLIC_REDUX_STORAGE`) y con
expiración: 8 h en producción, 10 min en el resto (`persistedReducer.ts`). Para agregar un slice
nuevo: crearlo en `features/<feature>/application/redux/` y registrarlo en `reducers.ts` eligiendo
árbol local o session. Usar siempre los hooks tipados `useAppDispatch`/`useAppSelector` de
`features/common/application/redux/hooks.ts`.

### PWA / offline (Serwist + JsStore)

`worker/index.ts` es el service worker. Desde Next 16 (nov-2026) lo empaqueta `@serwist/turbopack`
en la ruta `app/serwist/[path]/route.ts`, que lo sirve en **`/serwist/sw.js`** (ya no hay
`public/sw.js`), y lo registra `SerwistProvider` en `app/layout.tsx` con `cacheOnNavigation={false}`
a propósito (ver el comentario allí). Maneja precache, background sync y push. En `npm run dev` el
worker solo se recompila cuando cambia `worker/index.ts`: si tocas `worker/db.ts`, `dbEpico/` o
`schemas/`, reinicia el servidor de dev además de desregistrar el SW. La capa offline usa IndexedDB vía JsStore:
`worker/db.ts` crea las bases `Epico` y `EpicoImages`, los esquemas de tablas viven en
`worker/schemas/`, y `worker/dbEpico/crud/` implementa el CRUD genérico. La UI se comunica con el
worker por mensajes usando los enums `WorkerActions` y `WorkerDBTables` de
`features/common/domain/enums/`.

### Tests

Jest + jsdom + Testing Library. Los tests viven en `__tests__/` espejando la ruta del feature (ej.
`__tests__/app/features/products/...`). El alias `@/*` apunta a la raíz del repo (igual que en
`tsconfig.json`).

## Agentes especializados

En `.claude/agents/` hay dos agentes con las reglas del proyecto ya incorporadas; delegarles el
trabajo según la capa afectada:

- **desarrollador-front-end** — componentes UI (`features/*/infrastructure/ui/`), páginas de
  `app/(auth)|(epico)`, hooks de UI, tema, `routes/paths.ts` y sus tests.
- **desarrollador-back-end** — servicios HTTP y URLs de endpoints, Redux (slices/thunks/reducers.ts),
  interfaces de dominio, BFF (`app/api/`), worker/offline, `enviroments/`, Docker/CI.

Para un feature completo, primero desarrollador-back-end (dominio + servicio + slice) y después
desarrollador-front-end (UI que lo consume). Cada agente verifica con `npx tsc --noEmit`,
`npm run lint` y `npm run testJest` antes de terminar.

## Convenciones

- Interfaces con prefijo `I` (`IProduct`, `IProductState`); enums en `domain/enums/`.
- Servicios HTTP siempre a través de `EPICO_API` — nunca crear instancias de axios nuevas ni llamar al
  gateway directo.
- URLs de endpoints como constantes en `infrastructure/api/*Url.ts` del feature correspondiente.
- Componentes con JSDoc; UI y nombres de dominio en español (nomenclatura del negocio).
- Variables sin usar se permiten solo con prefijo `_` (regla ESLint).
- Antes de crear un componente genérico, buscar en `features/common/infrastructure/ui/`: casi siempre
  ya existe.
- El monitoreo de usuario real (Datadog RUM) **se retiró por completo** el 28-jul-2026 por decisión del
  negocio. Producción quedó sin telemetría y sin reemplazo.

## Verificar antes de terminar

```bash
npx tsc --noEmit; if [ $? -ne 0 ]; then echo "TSC FALLO"; fi   # OJO: ya no mira __tests__
npm run lint          # eslint . — desde Next 16 sí recorre features/. ~1746 problemas preexistentes
                      # (el original tiene ~1730): la regla es no subir el conteo de lo que tocaste
npm run testJest
npm run build:dev
# Si tocaste un estilo: escritorio tiene que resolver igual que el original (ver Patrones-Movil)
node scripts/sx-escritorio.cjs '<sysOriginal>' '<sxOriginal>' '<sysNuevo>' '<sxNuevo>'
```

Desde Next 16 el `tsconfig.json` del original **excluye `__tests__`**: un test mal tipado pasa en
Jest y también en `tsc`. Si escribes o tocas un test, revisa sus tipos a mano o con un tsconfig
temporal que lo incluya.

Nunca uses `npx tsc --noEmit | tail -10 && echo "OK"`: el estado de una tubería es el del último
comando, así que imprime OK aunque `tsc` falle. Y esos cuatro comandos **no ven** layout, registros
duplicados ni acciones que dejaron de renderizarse; lo que sirve para cada caso está en
[docs/Analisis-Tecnico.md](./docs/Analisis-Tecnico.md#la-puerta-de-salida-antes-de-decir-que-terminaste).
