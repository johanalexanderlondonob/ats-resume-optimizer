import { prisma } from "@/infrastructure/database/prisma/client";

const SECTOR_NAME = "Tecnología / Desarrollo de Software";
const SECTOR_DESCRIPTION = "Diseño, construcción, prueba y operación de software y de la infraestructura que lo soporta.";

interface SkillSeed {
    name: string;
    description: string;
}

interface CategorySeed {
    category: string;
    skills: SkillSeed[];
}

const CATEGORIES: CategorySeed[] = [
    {
        category: "Lenguajes de Programación",
        skills: [
            { name: "JavaScript", description: "Lenguaje de scripting dinámico, base del desarrollo web tanto en frontend como en backend con Node.js." },
            { name: "TypeScript", description: "Superset de JavaScript con tipado estático que mejora la mantenibilidad de aplicaciones grandes." },
            { name: "Python", description: "Lenguaje de propósito general muy usado en backend, automatización, ciencia de datos e IA." },
            { name: "Java", description: "Lenguaje orientado a objetos ampliamente usado en sistemas empresariales y aplicaciones Android." },
            { name: "C", description: "Lenguaje de bajo nivel usado en sistemas operativos, embebidos y software de alto rendimiento." },
            { name: "C++", description: "Extensión orientada a objetos de C usada en videojuegos, sistemas y software de alto rendimiento." },
            { name: "C#", description: "Lenguaje orientado a objetos del ecosistema .NET usado en backend, escritorio y videojuegos (Unity)." },
            { name: "Go", description: "Lenguaje compilado de Google enfocado en concurrencia y rendimiento, popular en microservicios." },
            { name: "Rust", description: "Lenguaje de sistemas con seguridad de memoria garantizada en tiempo de compilación, sin garbage collector." },
            { name: "Kotlin", description: "Lenguaje moderno interoperable con Java, estándar actual para desarrollo Android." },
            { name: "Swift", description: "Lenguaje de Apple para desarrollo nativo de aplicaciones iOS y macOS." },
            { name: "PHP", description: "Lenguaje de scripting del lado del servidor muy usado en desarrollo web (WordPress, Laravel)." },
            { name: "Ruby", description: "Lenguaje dinámico orientado a la productividad, base del framework Ruby on Rails." },
            { name: "Scala", description: "Lenguaje funcional y orientado a objetos sobre la JVM, usado en sistemas de datos a gran escala (Spark)." },
            { name: "Dart", description: "Lenguaje de Google usado principalmente con el framework Flutter para apps multiplataforma." },
            { name: "R", description: "Lenguaje especializado en análisis estadístico y visualización de datos." },
            { name: "MATLAB", description: "Lenguaje y entorno usado en cómputo numérico, simulación e ingeniería." },
            { name: "Perl", description: "Lenguaje de scripting orientado al procesamiento de texto y tareas de administración de sistemas." },
            { name: "Lua", description: "Lenguaje ligero de scripting embebible, muy usado en videojuegos y sistemas embebidos." },
            { name: "Objective-C", description: "Lenguaje predecesor de Swift para desarrollo de aplicaciones iOS y macOS." },
            { name: "Elixir", description: "Lenguaje funcional sobre la BEAM (Erlang VM) orientado a sistemas concurrentes y tolerantes a fallos." },
            { name: "Haskell", description: "Lenguaje funcional puro usado en investigación y sistemas donde la corrección formal es crítica." },
            { name: "SQL", description: "Lenguaje estándar para consultar y manipular datos en bases de datos relacionales." },
            { name: "Bash / Shell Scripting", description: "Scripting de línea de comandos para automatización de tareas en sistemas Unix/Linux." },
            { name: "Assembly", description: "Lenguaje de bajo nivel que representa directamente las instrucciones del procesador." },
        ],
    },
    {
        category: "Frontend",
        skills: [
            { name: "HTML5", description: "Lenguaje de marcado estándar para estructurar el contenido de páginas web." },
            { name: "CSS3", description: "Lenguaje de hojas de estilo para el diseño visual y layout de interfaces web." },
            { name: "React", description: "Librería de UI basada en componentes, el estándar de facto para interfaces web modernas." },
            { name: "Next.js", description: "Framework sobre React con renderizado híbrido (SSR/SSG), routing y optimización integrada." },
            { name: "Vue.js", description: "Framework progresivo de JavaScript para construir interfaces de usuario reactivas." },
            { name: "Angular", description: "Framework completo de Google para aplicaciones web empresariales de gran escala." },
            { name: "Svelte", description: "Framework que compila componentes a JavaScript vanilla altamente optimizado en tiempo de build." },
            { name: "Tailwind CSS", description: "Framework de utilidades CSS para construir interfaces rápidamente sin salir del HTML." },
            { name: "Sass / SCSS", description: "Preprocesador de CSS que añade variables, anidamiento y funciones al lenguaje de estilos." },
            { name: "Redux", description: "Librería de gestión de estado predecible para aplicaciones JavaScript, muy usada con React." },
            { name: "Zustand", description: "Librería ligera de gestión de estado para aplicaciones React con una API minimalista." },
            { name: "Webpack", description: "Empaquetador de módulos que transforma y optimiza los assets de una aplicación web." },
            { name: "Vite", description: "Herramienta de build moderna con arranque casi instantáneo gracias a módulos ES nativos." },
            { name: "Diseño Responsivo", description: "Técnicas para que una interfaz se adapte correctamente a distintos tamaños de pantalla." },
            { name: "Accesibilidad Web (a11y)", description: "Prácticas y estándares (WCAG) para que las interfaces sean usables por personas con discapacidad." },
            { name: "Web Components", description: "Estándar web para crear elementos HTML personalizados y reutilizables encapsulados." },
            { name: "PWA (Progressive Web Apps)", description: "Técnicas para que una aplicación web se comporte como una app nativa (offline, instalable)." },
            { name: "GraphQL (cliente)", description: "Consumo de APIs GraphQL desde el frontend con librerías como Apollo Client o Relay." },
            { name: "Testing de Frontend", description: "Pruebas de componentes e interfaces con herramientas como Jest y React Testing Library." },
            { name: "Figma / Handoff de Diseño", description: "Interpretación de diseños en Figma y colaboración con diseño para implementar interfaces fieles." },
        ],
    },
    {
        category: "Backend",
        skills: [
            { name: "Node.js", description: "Entorno de ejecución de JavaScript del lado del servidor basado en el motor V8." },
            { name: "Express.js", description: "Framework minimalista de Node.js para construir APIs y servidores web." },
            { name: "NestJS", description: "Framework de Node.js con arquitectura modular inspirada en Angular, orientado a aplicaciones escalables." },
            { name: "Django", description: "Framework web de Python de alto nivel que incluye ORM, admin y muchas baterías incluidas." },
            { name: "Flask", description: "Microframework de Python minimalista y flexible para construir APIs y aplicaciones web." },
            { name: "FastAPI", description: "Framework moderno de Python para APIs de alto rendimiento con validación automática vía tipado." },
            { name: "Spring Boot", description: "Framework de Java para construir aplicaciones empresariales y microservicios de forma productiva." },
            { name: ".NET / ASP.NET Core", description: "Plataforma de Microsoft para construir APIs y aplicaciones web multiplataforma en C#." },
            { name: "Laravel", description: "Framework de PHP con sintaxis expresiva, ORM propio (Eloquent) y herramientas de productividad." },
            { name: "Ruby on Rails", description: "Framework web de Ruby orientado a la convención sobre configuración y desarrollo rápido." },
            { name: "REST API Design", description: "Diseño de interfaces HTTP siguiendo principios REST: recursos, verbos, códigos de estado y versionado." },
            { name: "GraphQL (servidor)", description: "Diseño e implementación de APIs GraphQL como alternativa flexible a REST." },
            { name: "gRPC", description: "Framework RPC de alto rendimiento basado en HTTP/2 y Protocol Buffers para comunicación entre servicios." },
            { name: "Microservicios", description: "Diseño de sistemas como conjuntos de servicios pequeños, autónomos y desplegables de forma independiente." },
            { name: "Arquitectura Orientada a Eventos", description: "Diseño de sistemas donde los componentes se comunican mediante eventos asíncronos." },
            { name: "Mensajería (Kafka / RabbitMQ)", description: "Uso de colas y brokers de mensajes para comunicación asíncrona y desacoplada entre servicios." },
            { name: "WebSockets", description: "Protocolo de comunicación bidireccional en tiempo real entre cliente y servidor." },
            { name: "Autenticación y Autorización (OAuth2 / JWT)", description: "Implementación de mecanismos seguros de identidad, sesión y control de acceso en APIs." },
            { name: "Serverless / Functions as a Service", description: "Desarrollo de funciones que se ejecutan bajo demanda sin gestionar servidores directamente." },
            { name: "Caching (Redis / Memcached)", description: "Estrategias de caché para mejorar el rendimiento y reducir la carga sobre bases de datos y APIs." },
        ],
    },
    {
        category: "Bases de Datos",
        skills: [
            { name: "PostgreSQL", description: "Sistema de base de datos relacional de código abierto robusto y muy extensible." },
            { name: "MySQL", description: "Sistema de base de datos relacional de código abierto ampliamente usado en aplicaciones web." },
            { name: "SQLite", description: "Motor de base de datos relacional embebido, sin servidor, ideal para aplicaciones locales o pequeñas." },
            { name: "SQL Server", description: "Sistema de gestión de bases de datos relacional de Microsoft usado en entornos empresariales." },
            { name: "Oracle Database", description: "Sistema de gestión de bases de datos relacional empresarial de alto rendimiento." },
            { name: "MongoDB", description: "Base de datos NoSQL orientada a documentos, flexible para esquemas cambiantes." },
            { name: "Redis", description: "Almacén de datos en memoria clave-valor usado como caché, cola de mensajes o base de datos rápida." },
            { name: "Cassandra", description: "Base de datos NoSQL distribuida orientada a columnas, diseñada para alta disponibilidad y escalabilidad." },
            { name: "DynamoDB", description: "Base de datos NoSQL totalmente gestionada de AWS, orientada a baja latencia a gran escala." },
            { name: "Elasticsearch", description: "Motor de búsqueda y análisis distribuido usado para búsqueda de texto completo y logs." },
            { name: "Neo4j (Bases de Datos Orientadas a Grafos)", description: "Base de datos orientada a grafos para modelar relaciones complejas entre entidades." },
            { name: "ORMs (Prisma / TypeORM / Sequelize)", description: "Uso de mapeadores objeto-relacional para interactuar con la base de datos desde el código de la aplicación." },
            { name: "Modelado de Datos", description: "Diseño de esquemas de datos normalizados o desnormalizados según los patrones de acceso de la aplicación." },
            { name: "Optimización de Consultas", description: "Análisis y mejora del rendimiento de consultas mediante índices, planes de ejecución y refactorización." },
            { name: "Migraciones de Bases de Datos", description: "Gestión de cambios versionados y controlados sobre el esquema de una base de datos en producción." },
        ],
    },
    {
        category: "Cloud",
        skills: [
            { name: "Amazon Web Services (AWS)", description: "Plataforma de servicios en la nube líder del mercado (cómputo, almacenamiento, bases de datos, etc.)." },
            { name: "Microsoft Azure", description: "Plataforma de servicios en la nube de Microsoft para cómputo, datos e integración empresarial." },
            { name: "Google Cloud Platform (GCP)", description: "Plataforma de servicios en la nube de Google, fuerte en datos, IA y Kubernetes." },
            { name: "AWS Lambda / Funciones Serverless", description: "Ejecución de código en la nube sin aprovisionar servidores, facturado por uso real." },
            { name: "Amazon S3 / Almacenamiento en la Nube", description: "Servicios de almacenamiento de objetos escalables y duraderos en la nube." },
            { name: "CDN (CloudFront / Cloudflare)", description: "Redes de distribución de contenido para acelerar la entrega de assets a nivel global." },
            { name: "IAM y Seguridad en la Nube", description: "Gestión de identidades, roles y permisos para controlar el acceso a recursos en la nube." },
            { name: "Arquitectura Multi-cloud", description: "Diseño de soluciones que operan sobre más de un proveedor de nube simultáneamente." },
            { name: "FinOps (Optimización de Costos Cloud)", description: "Prácticas para monitorear, controlar y optimizar el gasto en infraestructura cloud." },
            { name: "Contenedores (Docker)", description: "Empaquetado de aplicaciones con sus dependencias en unidades portables y aisladas." },
            { name: "Virtualización", description: "Creación de máquinas virtuales que abstraen el hardware físico subyacente." },
            { name: "Redes en la Nube (VPC)", description: "Diseño y configuración de redes privadas virtuales, subredes y conectividad en la nube." },
            { name: "Balanceo de Carga", description: "Distribución del tráfico entre múltiples instancias para mejorar disponibilidad y rendimiento." },
            { name: "CloudFormation / Plantillas de Infraestructura", description: "Definición de infraestructura cloud mediante plantillas declarativas versionables." },
            { name: "Arquitecturas de Alta Disponibilidad", description: "Diseño de sistemas resilientes que minimizan el tiempo de inactividad ante fallos." },
        ],
    },
    {
        category: "DevOps",
        skills: [
            { name: "CI/CD", description: "Prácticas de integración y despliegue continuo para entregar software de forma frecuente y confiable." },
            { name: "Jenkins", description: "Servidor de automatización de código abierto para construir pipelines de CI/CD." },
            { name: "GitHub Actions", description: "Plataforma de automatización de flujos de trabajo integrada en GitHub para CI/CD." },
            { name: "GitLab CI", description: "Sistema de integración y despliegue continuo integrado en GitLab." },
            { name: "Ansible", description: "Herramienta de automatización de configuración e infraestructura basada en playbooks declarativos." },
            { name: "Terraform", description: "Herramienta de Infraestructura como Código para aprovisionar recursos en múltiples proveedores cloud." },
            { name: "Kubernetes", description: "Orquestador de contenedores para desplegar, escalar y operar aplicaciones distribuidas." },
            { name: "Infraestructura como Código (IaC)", description: "Gestión de infraestructura mediante archivos de configuración versionados en lugar de procesos manuales." },
            { name: "Monitoreo y Observabilidad", description: "Prácticas y herramientas para entender el estado interno de un sistema a partir de sus señales externas." },
            { name: "Prometheus", description: "Sistema de monitoreo y alertas basado en series de tiempo, estándar en entornos cloud-native." },
            { name: "Grafana", description: "Plataforma de visualización de métricas y dashboards para observabilidad de sistemas." },
            { name: "ELK Stack (Logging)", description: "Elasticsearch, Logstash y Kibana usados en conjunto para centralizar y analizar logs." },
            { name: "Site Reliability Engineering (SRE)", description: "Disciplina que aplica principios de ingeniería de software a la operación de sistemas confiables." },
            { name: "Automatización de Despliegues", description: "Scripts y herramientas para desplegar aplicaciones de forma repetible y sin intervención manual." },
            { name: "GitOps (ArgoCD / Flux)", description: "Gestión de despliegues de infraestructura y aplicaciones a partir del estado declarado en Git." },
        ],
    },
    {
        category: "Mobile",
        skills: [
            { name: "Desarrollo Android (Kotlin / Java)", description: "Desarrollo de aplicaciones nativas para el sistema operativo Android." },
            { name: "Desarrollo iOS (Swift / Objective-C)", description: "Desarrollo de aplicaciones nativas para el ecosistema de Apple (iOS)." },
            { name: "React Native", description: "Framework para construir aplicaciones móviles multiplataforma usando React." },
            { name: "Flutter", description: "Framework de Google para construir aplicaciones móviles, web y de escritorio desde un mismo código." },
            { name: "Xamarin", description: "Framework de Microsoft para desarrollar aplicaciones móviles multiplataforma en C#." },
            { name: "Ionic", description: "Framework para construir aplicaciones móviles híbridas usando tecnologías web." },
            { name: "Desarrollo Multiplataforma", description: "Estrategias y herramientas para compartir código entre distintas plataformas móviles." },
            { name: "Publicación en App Store / Google Play", description: "Proceso de empaquetado, firma y publicación de aplicaciones en tiendas móviles." },
            { name: "Notificaciones Push", description: "Implementación de notificaciones push para mantener el engagement de usuarios móviles." },
            { name: "Diseño de UI/UX Móvil", description: "Diseño de interfaces adaptadas a los patrones de interacción y guías de plataformas móviles." },
        ],
    },
    {
        category: "QA y Testing",
        skills: [
            { name: "Testing Unitario", description: "Pruebas automatizadas que validan el comportamiento de unidades de código de forma aislada." },
            { name: "Testing de Integración", description: "Pruebas que validan la interacción correcta entre varios componentes o servicios." },
            { name: "Testing End-to-End", description: "Pruebas que validan un flujo completo de la aplicación desde la perspectiva del usuario final." },
            { name: "Selenium", description: "Framework para automatizar pruebas funcionales sobre navegadores web." },
            { name: "Cypress", description: "Framework moderno de testing end-to-end para aplicaciones web con feedback rápido." },
            { name: "Playwright", description: "Framework de automatización de navegadores para pruebas end-to-end multiplataforma y multinavegador." },
            { name: "JUnit", description: "Framework de testing unitario estándar para el ecosistema Java." },
            { name: "Pytest", description: "Framework de testing para Python conocido por su sintaxis simple y sistema de fixtures." },
            { name: "TDD (Desarrollo Guiado por Pruebas)", description: "Metodología donde las pruebas se escriben antes que el código de producción." },
            { name: "BDD (Cucumber)", description: "Metodología de desarrollo guiado por comportamiento con especificaciones legibles por negocio." },
            { name: "Testing de Performance (JMeter)", description: "Pruebas de carga y estrés para medir el comportamiento de un sistema bajo demanda." },
            { name: "Testing de Seguridad (Pentesting Básico)", description: "Identificación de vulnerabilidades de seguridad mediante pruebas de penetración controladas." },
            { name: "Automatización de Pruebas", description: "Diseño de suites de pruebas automatizadas que se ejecutan como parte del pipeline de CI/CD." },
            { name: "Control de Calidad (QA)", description: "Procesos y criterios para asegurar que el software cumple los estándares de calidad definidos." },
            { name: "Testing de APIs (Postman)", description: "Pruebas funcionales y de contrato sobre endpoints de una API." },
        ],
    },
    {
        category: "Datos e Inteligencia Artificial",
        skills: [
            { name: "Machine Learning", description: "Diseño y entrenamiento de modelos que aprenden patrones a partir de datos." },
            { name: "Deep Learning", description: "Subcampo de machine learning basado en redes neuronales profundas." },
            { name: "TensorFlow", description: "Framework de código abierto de Google para construir y entrenar modelos de machine learning." },
            { name: "PyTorch", description: "Framework de deep learning de Meta, popular en investigación y producción por su flexibilidad." },
            { name: "Scikit-learn", description: "Librería de Python con algoritmos clásicos de machine learning listos para usar." },
            { name: "Procesamiento de Lenguaje Natural (NLP)", description: "Técnicas para que los sistemas comprendan y generen lenguaje humano." },
            { name: "Visión por Computadora", description: "Técnicas para que los sistemas interpreten y analicen imágenes o video." },
            { name: "Análisis de Datos", description: "Exploración y análisis de datos para extraer conclusiones que apoyen decisiones de negocio." },
            { name: "Pandas / NumPy", description: "Librerías de Python fundamentales para manipulación y cómputo numérico de datos." },
            { name: "Big Data", description: "Procesamiento y análisis de volúmenes de datos que superan las capacidades de herramientas tradicionales." },
            { name: "Apache Spark", description: "Motor de procesamiento distribuido para grandes volúmenes de datos, en batch y streaming." },
            { name: "ETL (Extracción, Transformación y Carga)", description: "Procesos para mover y transformar datos entre sistemas de origen y destino." },
            { name: "Data Warehousing", description: "Diseño de almacenes de datos centralizados orientados al análisis y reporting." },
            { name: "IA Generativa / Modelos de Lenguaje (LLMs)", description: "Uso e integración de modelos de lenguaje grandes para generación de texto, código u otros contenidos." },
            { name: "Visualización de Datos (Power BI / Tableau)", description: "Creación de dashboards y visualizaciones para comunicar insights de datos de forma clara." },
        ],
    },
    {
        category: "Arquitectura y Patrones de Diseño",
        skills: [
            { name: "Arquitectura de Software", description: "Diseño de la estructura de alto nivel de un sistema y las decisiones que la sustentan." },
            { name: "Patrones de Diseño (Design Patterns)", description: "Soluciones reutilizables a problemas comunes de diseño de software orientado a objetos." },
            { name: "Domain-Driven Design (DDD)", description: "Enfoque de diseño que modela el software alrededor del dominio y lenguaje del negocio." },
            { name: "Clean Architecture", description: "Estilo arquitectónico que separa reglas de negocio de detalles de infraestructura mediante capas." },
            { name: "Principios SOLID", description: "Conjunto de principios de diseño orientado a objetos que favorecen código mantenible y extensible." },
            { name: "Arquitectura de Microservicios", description: "Diseño de sistemas como conjuntos de servicios independientes y desplegables por separado." },
            { name: "Arquitectura Hexagonal", description: "Estilo arquitectónico que aísla el núcleo de negocio de dependencias externas mediante puertos y adaptadores." },
            { name: "Event Sourcing / CQRS", description: "Patrones que separan lectura y escritura y modelan el estado como una secuencia de eventos." },
            { name: "Escalabilidad de Sistemas", description: "Diseño de sistemas capaces de soportar el crecimiento de carga o de datos sin degradar el servicio." },
            { name: "Diseño de APIs", description: "Diseño de contratos de API claros, consistentes y fáciles de evolucionar." },
        ],
    },
    {
        category: "Seguridad Informática",
        skills: [
            { name: "Seguridad de Aplicaciones (AppSec)", description: "Prácticas para prevenir, detectar y corregir vulnerabilidades en el software durante su ciclo de vida." },
            { name: "OWASP Top 10", description: "Conocimiento de las vulnerabilidades de seguridad más críticas en aplicaciones web y cómo mitigarlas." },
            { name: "Criptografía Aplicada", description: "Uso de técnicas criptográficas para proteger la confidencialidad e integridad de la información." },
            { name: "Gestión de Vulnerabilidades", description: "Identificación, priorización y remediación de vulnerabilidades en sistemas y aplicaciones." },
            { name: "Ciberseguridad", description: "Protección de sistemas, redes y datos frente a ataques, accesos no autorizados y daños." },
            { name: "Ethical Hacking", description: "Simulación autorizada de ataques para identificar debilidades de seguridad en un sistema." },
            { name: "Auditorías de Seguridad", description: "Revisión sistemática de sistemas y procesos para verificar el cumplimiento de estándares de seguridad." },
            { name: "Seguridad en la Nube", description: "Prácticas específicas para proteger cargas de trabajo, datos y accesos en entornos cloud." },
            { name: "Gestión de Identidades y Accesos (IAM)", description: "Administración de identidades, roles y permisos de acceso a sistemas y recursos." },
            { name: "Cumplimiento y Normativas (GDPR / ISO 27001)", description: "Conocimiento de marcos regulatorios y de gestión de seguridad de la información." },
        ],
    },
    {
        category: "Metodologías y Herramientas de Gestión",
        skills: [
            { name: "Git", description: "Sistema de control de versiones distribuido, herramienta base para la colaboración en código." },
            { name: "GitHub / GitLab / Bitbucket", description: "Plataformas de alojamiento de repositorios con herramientas de colaboración y revisión de código." },
            { name: "Metodologías Ágiles (Scrum)", description: "Marco de trabajo iterativo e incremental para la gestión de proyectos de software." },
            { name: "Kanban", description: "Método visual de gestión del flujo de trabajo basado en tableros y límites de trabajo en curso." },
            { name: "Jira", description: "Herramienta de gestión de proyectos e incidencias ampliamente usada en equipos ágiles." },
            { name: "Confluence", description: "Herramienta de documentación colaborativa usada junto a Jira en equipos de desarrollo." },
            { name: "Trello", description: "Herramienta de gestión visual de tareas basada en tableros Kanban simplificados." },
            { name: "Gestión de Proyectos de Software", description: "Planificación, seguimiento y coordinación de equipos y entregables en proyectos de software." },
            { name: "Code Review", description: "Revisión sistemática de cambios de código para mejorar calidad, detectar errores y compartir conocimiento." },
            { name: "Pair Programming", description: "Práctica colaborativa donde dos desarrolladores trabajan juntos en la misma tarea de código." },
            { name: "Documentación Técnica", description: "Redacción de documentación clara sobre arquitectura, APIs y decisiones técnicas de un proyecto." },
            { name: "Integración Continua (Buenas Prácticas)", description: "Prácticas de desarrollo que integran cambios de código frecuentemente en una rama compartida." },
        ],
    },
    {
        category: "Habilidades Blandas",
        skills: [
            { name: "Comunicación Efectiva", description: "Capacidad de transmitir ideas técnicas de forma clara a audiencias técnicas y no técnicas." },
            { name: "Trabajo en Equipo", description: "Capacidad de colaborar de forma efectiva con otras personas hacia un objetivo común." },
            { name: "Resolución de Problemas", description: "Capacidad de analizar situaciones complejas y encontrar soluciones efectivas." },
            { name: "Pensamiento Crítico", description: "Capacidad de evaluar información y argumentos de forma objetiva antes de tomar decisiones." },
            { name: "Adaptabilidad", description: "Capacidad de ajustarse rápidamente a cambios de contexto, tecnología o prioridades." },
            { name: "Liderazgo Técnico", description: "Capacidad de guiar decisiones técnicas y a otros miembros de un equipo de desarrollo." },
            { name: "Mentoring y Acompañamiento", description: "Capacidad de guiar el crecimiento técnico y profesional de otras personas del equipo." },
            { name: "Gestión del Tiempo", description: "Capacidad de priorizar y organizar tareas para cumplir plazos de forma efectiva." },
            { name: "Creatividad e Innovación", description: "Capacidad de proponer soluciones novedosas ante problemas técnicos o de producto." },
            { name: "Negociación", description: "Capacidad de llegar a acuerdos favorables con stakeholders, equipos o proveedores." },
            { name: "Empatía", description: "Capacidad de comprender las necesidades y perspectivas de usuarios y compañeros de equipo." },
            { name: "Orientación a Resultados", description: "Capacidad de enfocar el esfuerzo hacia el cumplimiento de objetivos y métricas concretas." },
            { name: "Aprendizaje Continuo", description: "Disposición y capacidad de actualizar conocimientos ante la rápida evolución tecnológica." },
            { name: "Comunicación con Stakeholders", description: "Capacidad de alinear expectativas y reportar avances a personas no técnicas del negocio." },
            { name: "Toma de Decisiones", description: "Capacidad de decidir con criterio bajo incertidumbre o información incompleta." },
        ],
    },
];

async function main() {
    const sector = await prisma.sector.upsert({
        where: { name: SECTOR_NAME },
        update: { description: SECTOR_DESCRIPTION },
        create: { name: SECTOR_NAME, description: SECTOR_DESCRIPTION },
    });

    let count = 0;

    for (const { category, skills } of CATEGORIES) {
        for (const skill of skills) {
            await prisma.skill.upsert({
                where: { name: skill.name },
                update: { description: skill.description, category, sectorId: sector.id },
                create: { name: skill.name, description: skill.description, category, sectorId: sector.id },
            });
            count++;
        }
    }

    console.log(`Sector "${ sector.name }" listo con ${ count } habilidades en ${ CATEGORIES.length } categorías.`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
