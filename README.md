![Esta es una imagen](https://diegotorresp.github.io/resources/bt.png)
# Integradora II - BookTrackingGDS0353_Repository
[![Contribuidores][contribuidores-shield]][contributors-url]

Repositorio para código del proyecto de Integradora II - BookTracking

## Tomar en cuenta para aportaciones:
Nomenclatura para nombramiento de documentos: snake_case.

## Contenido
<details>
  <summary>Tabla contenidos</summary>
  <ol>
    <li>
      <a href="#acerca-del-proyecto">Acerca del Proyecto</a>
      <ul>
        <li><a href="#descripción">Descripción</a></li>
        <li><a href="#objetivos">Objetivos</a></li>
        <li><a href="#organigrama">Organigrama</a></li>
        <li><a href="#diagrama-gantt">Diagrama Gantt</a></li>
      </ul>
    </li>
    <li>
      <a href="#análisis-de-la-solución">Análisis de la Solución</a>
      <ul>
        <li><a href="#requerimientos">Requerimientos</a></li>
      </ul>
    </li>
    <li>
      <a href="#diseño-de-la-solución">Diseño de la Solución</a>
      <ul>
        <li><a href="#modelo-relacional">Modelo Relacional</a></li>
        <li><a href="#diagrama-de-clases">Diagrama de Clases</a></li>
        <li><a href="#diagrama-de-componentes">Diagrama de Componentes</a></li>
      </ul>
    </li>    
    <li>
      <a href="#implementación">Implementación</a>
      <ul>
        <li><a href="#estándares-codificación">Estándares Codificación</a></li>
        <li><a href="#arquitectura">Arquitectura</a></li>
        <li><a href="#código-fuente">Código Fuente</a></li>
      </ul>
    </li>      
    <li>
      <a href="#pruebas">Pruebas</a>
      <ul>
        <li><a href="#casos-de-prueba">Casos de prueba</a></li>
        <li><a href="#ejecución">Ejecución</a></li>
      </ul>
    </li>       
    <li><a href="#guias">Guias</a></li>
    <li><a href="#contribucion">Contribución</a></li>
    <li><a href="#licencia">licencia</a></li>
    <li><a href="#contacto">Contacto</a></li>
    <li><a href="#participantes">Participantes</a></li>
  </ol>
</details>

<!-- Acerca del proyecto -->
## Acerca del proyecto
Requisitos.

<!-- Descripción -->
#### Descripción.
El proyecto consiste en una aplicación web que permite gestionar el proceso de préstamos de una biblioteca; la primera pantalla permitirá buscar los libros al usuario mediante los datos de estos (nombre, autor, editorial). En el lado del administrador se podrá efectuar la carga de diferentes ejemplares literarios haciendo uso de la implementación de un CRUD. Para efectuar el proceso de solicitud de un libro en particular, es necesario tener en consideración que el usuario deberá contar con un código QR y de igual forma que el establecimiento ofrecerá un lector para dichos recursos, además que la vista que sea visible a los interesados será controlada por el o los encargados del centro bibliotecario bajo una sección de administración; la tarea de la persona que desea solicitar algún material será la siguiente, accede al sistema, buscará el libro, lo seleccionará, en la parte inferior ubicará la opción ‘Solicitar’, despues de solicitar , al administrador se le mostrará en la sección ‘Ver solicitudes’ dicha petición y procederá a entregar las obras; para la devolución, se deberán llevar los libros y el código QR, al llegar indicar la entrega, pasar el código y en la aplicación del encargado en la sección ‘Leer QR -> Entregar libro’, aparecerán los datos de la persona a quien se le dieron los libros solicitados, consultará por medio de un filtro de búsqueda en ‘Ver solicitudes’, la que corresponda a los datos de la tarjeta y procederá a seleccionar la opción ‘Finalizar’, una vez que se corrobora que la devolución está en orden.

El tiempo de realización estimado es de 3 meses y requiere de una inversión mensual de $400 para el funcionamiento optimo de todos los servicios, sin emebargo el sistema es capaz de funcionar con limitaciones minimas sin tener que hacer gasto. Además se requiere una camara conectada a la computadora donde se requiera el sistema.

<!-- Objetivos -->
#### Objetivos.
Crear una aplicación web que permita gestionar el proceso de préstamo de un centro bibliotecario; generando el alta de los datos correspondientes de los ejemplares literarios e implementando recursos como el uso de tarjetas RFID por parte de los usuarios que, les permitan generar la solicitud, una vez que consultaron los libros deseados, así como ofrecer a los encargados de la biblioteca, tener un control adecuado sobre los préstamos realizados. 

<!-- Organigrama -->
#### Organigrama.
Organigrama.
![Esta es una imagen](https://diegotorresp.github.io/resources/Organigrama.png)

<!-- Diagrama Gantt -->
#### Diagrama Gantt.
Diagrama Gantt.
https://docs.google.com/spreadsheets/d/1p08ivdnM11ooRaQ1RDi-xhOxhlXBJKfWGlEouN-6eRE/edit?usp=sharing

<!-- Análisis del proyecto -->
## Análisis de la Solución.
Toda la documentación enfocada al análisis de la solución puede ser consultada en el siguiente enlace:
https://docs.google.com/document/d/1lq8dkyd7QVO1uPCzR-vWJB6AxqTNxdB7J9zRFA5NZmw/edit?usp=sharing

<!-- Requerimientos -->
#### Requerimientos.
Listado de los requerimientos (código requerimiento, descripción), es puede ver en el siguiente enlace:
https://docs.google.com/document/d/1pPkPsYIBVbGaG5VySaGkPD1Jfl0mlEkD/edit?usp=sharing&ouid=101201441725823236999&rtpof=true&sd=true

<!-- Diseño del proyecto -->
## Diseño de la Solución.
En ésta sección se indicará los artefactos generados en base a la solución.

<!-- Modelo Relacional -->
#### Modelo No Relacional.
![Esta es una imagen](https://diegotorresp.github.io/resources/nosql1.jpg)
![Esta es una imagen](https://diegotorresp.github.io/resources/nosql2.jpg)
![Esta es una imagen](https://diegotorresp.github.io/resources/nosql3.jpg)
![Esta es una imagen](https://diegotorresp.github.io/resources/nosql4.jpg)
![Esta es una imagen](https://diegotorresp.github.io/resources/nosql5.jpg)
<!-- Diagrama de Clases -->
#### Diagrama de Clases.
Esquema de las clases empleadas (atributos y sus métodos).
![Esta es una imagen](https://diegotorresp.github.io/resources/DiagramaBookTracking%20(1).png)

<!-- Diagrama de Componentes -->
#### Diagrama de Componentes.
Esquema de los componentes que interactúan (Modelo, Vista, Controlador, Servidor Web, Servidor de base de datos)
![Esta es una imagen](https://diegotorresp.github.io/resources/Diagrama%20de%20Componentes%20BookTracking.png)

<!-- Implementación del proyecto -->
## Implementación.
En ésta sección se describe  los artefactos generados en base a la solución.

<!-- Estándares de Codificación -->
#### Estándares Codificación.
Estándares empleados en la codificación

<!-- Arquitectura MVC y Middleware -->
#### Arquitectura.
Definir los patrones empleados y de seguridad.

<!-- Código Fuente -->
#### Código Fuente.
Código Fuente de la solución: 
https://github.com/DiegoTorresP/BookTrackingGDS0353_Repository

<!-- Pruebas proyecto -->
## Pruebas.
En ésta sección se describe  los artefactos generados en base a la solución.

<!-- Casos de prueba -->
#### Casos de prueba.
Consultar en: https://drive.google.com/drive/folders/1_OoqmZsG8DXxvOosDRnaDiX3FKApgj-_?usp=sharing

<!-- Ejecución Casos de prueba -->
#### Ejecución.
Evidencia de Ejecución de Casos de prueba.
Consultar en: https://drive.google.com/drive/folders/1_OoqmZsG8DXxvOosDRnaDiX3FKApgj-_?usp=sharing


<!-- Iniciando -->
## Iniciando
<!-- Requisitos -->
### Requisitos
Para instalar la aplicación de forma local, se requiere la instalación de NodeJS, npm, git y se sugiere el uso de VSC para la lectura del código.
Las especificaciones del equipo de computo se ligan a las solicitadas por las dependencias antes mencionadas.

<!-- Instalación -->
### Instalacion
Instalación del Software
<li>Clonar este repositorio</li>
<li>Idealmente mediante navegación por comandos en consola ir a la carpeta del proyecto ../BookTrackingGDS0353_Repository/BookTracking-CBTIS75/BookTracking</li>
<li>Posicionado en esta carpeta, usar npm install para recuperar dependencias del proyecto</li>
<li>Posicionado en esta carpeta, usar npm star para iniciar el proyecto</li>
<li>Ir al navegador y entrar en la ruta localhost:4000 para ver el proyecto e interactura</li>
<li>Se puede; posicionado en esta carpeta, usar el comando "code ." para ingresar por VSC</li>

## Guias
Guias de Uso.

## Contribución
[![Contribuidores][contribuidores-shield]][contributors-url]

## Licencia
[![license-shield]][license-url]


## Contacto
Correo Electronico: topd001130@gmail.com

## Participantes

* [Luis Gustavo García Carrillo](https://github.com/LuisGusDev)
* [Alejandro Rafael Guerrero Lozano](https://github.com/alejandro026)
* [José Manuel Matehuala Avilés](https://github.com/ManuelAvil)
* [Diego Torres Pérez](https://github.com/DiegoTorresP)



[contribuidores-shield]: https://img.shields.io/github/contributors/DiegoTorresP/BookTrackingGDS0353_Repository.svg?style=for-the-badge
[contributors-url]: https://github.com/DiegoTorresP/BookTrackingGDS0353_Repository/graphs/contributors
[license-shield]:https://img.shields.io/github/license/DiegoTorresP/BookTrackingGDS0353_Repository?logo=github&logoColor=green
[license-url]:https://github.com/DiegoTorresP/BookTrackingGDS0353_Repository/blob/main/LICENSE
