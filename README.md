# __Simulador de Control de Calidad en Mamógrafos__ #

El *Simulador de Control de Calidad en Mamógrafos* es una herramienta que permite recrear de manera virtual, pruebas reales de control de calidad en equipos de mamografía.

Esta herramienta es un plugin diseñado para ser integrado en la plataforma de aprendizaje e-learning Moodle, en el módulo correspondiente al Diplomado de Mamografía del Departamento de Tecnología Médica de la Universidad de Chile.

Está escrito mayormente en código Javascript, y para su desarrollo se utilizaron tecnologías como Docker y Node para facilitar el trabajo.

A continuación se describen los pasos para instalar todo lo necesario para su puesta en marcha, y las condiciones que deben seguirse en la continuación del desarrollo de este plugin.


## __Licencia__

2020 cc5402-Mamografías

Este programa es software libre: puedes redistribuirlo y/o modificarlo bajo los términos de la Licencia Pública General de GNU publicada por la Fundación de Software Libre, ya sea la versión 3 de la Licencia, o (a su elección) cualquier versión posterior.

Este programa se distribuye con la esperanza de que sea útil, pero SIN NINGUNA GARANTÍA; sin siquiera la garantía implícita de COMERCIABILIDAD o APTITUD PARA UN PROPÓSITO PARTICULAR. Vea la Licencia Pública General de GNU para más detalles.

Debería haber recibido una copia de la Licencia Pública General de GNU junto con este programa. Si no, ver <http://www.gnu.org/licenses/>.


## __Puesta en marcha__

Se detallan en esta sección los pasos para instalar cada una de las tecnologías necesarias para visualizar e interactuar con el plugin en la plataforma de Moodle en un ambiente local.

### __Clonar Moodle__

Primero se debe obtener el código fuente de la última versión estable de Moodle. Esto se puede hacer de dos formas:

- Descargar y descomprimir el código desde: https://download.moodle.org/releases/latest/ ó

- Clonar o descargar el repositorio desde: https://github.com/moodle/moodle

Luego se debe clonar el repositorio del plugin __Mamografsim__ en la ruta `moodle/mod/` (mod es un módulo que se encuentra en el código base de moodle). El repositorio se encuentra disponible en: https://github.com/cc5402-Mamografias/mamografsim. Una vez clonado, en el código fuente de moodle debería existir la ruta `moodle/mod/mamografsim/`.


### __Instalación de docker__

Se recomienda utilizar `docker` y `docker-compose` para evitar instalar todas las dependencias necesarias.

Si no se tiene docker instalado, deben seguirse las instrucciones para instalarlo:

Docker:

- Ubuntu: https://docs.docker.com/engine/install/ubuntu/
- XOS: https://docs.docker.com/docker-for-mac/install/

Docker Compose:

- Ubuntu: https://docs.docker.com/compose/install/

Es importante agregar al usuario que corresponde al grupo de Docker para poder ejecutar comandos sin `sudo`:
```
sudo usermod -aG docker $USER
```

### __Clonar repositorio moodle-docker__

Una vez que ya se ha instalado Docker, se debe clonar el repositorio que permite desplegar Moodle a través de docker: https://github.com/cc5402-Mamografias/moodle-docker. De preferencia, este respositorio debe ser clonado en la misma ruta del repositorio de moodle.

### __Desplegar Moodle por medio de Docker__


Ahora se deben ejecutar los comandos indicados en el README de docker (`moodle-docker`), son los que se listan a continuación:
```
export MOODLE_DOCKER_WWWROOT=<path_to_moodle_code>

export MOODLE_DOCKER_DB=pgsql

cp config.docker-template.php $MOODLE_DOCKER_WWWROOT/config.php
```
Reemplazar <path_to_moodle_code> por la ruta del código fuente de moodle.


El siguiente comando iniciará los contenedores, puede tardar un poco debido a la descarga de imágenes:
```
bin/moodle-docker-compose up -d
```
Luego del comando anterior, deberían quedarn cinco contenedores inicializados.


### __Instalar Node Version Manager (NVM), Node y grunt__

Dado que el plugin está desarrollado mayormente en Javascript, es necesario instalar la herramienta `grunt` que permite compilar el código contenido en el módulo `moodle/mod/mamografsim/amd`. Como esta herramienta corre en el ambiente de Node, también es necesario instalar este último.

Los pasos para instalar `nvm`, `Node` y `grunt` se describen en el link: https://docs.moodle.org/dev/Javascript_Modules#Install_NVM_and_Node. También se listan a continuación:


### __Instalar NVM__

Se sugiere instalar nvm, dado que es la forma recomendada de instalar NodeJS. Para instalar nvm se deben seguir las instrucciones del siguiente link: https://github.com/nvm-sh/nvm

### __Instalar NodeJS__

Node se debe instalar en el directorio donde se encuentra el código fuente de moodle. Para ello, en la ruta `moodle/` se deben ejecutar los siguientes comandos:

```
nvm install

nvm use
```

Si el uso de Node es principalmente para este proyecto, se recomienda definir la versión de Node `14.15.0` como la versión por defecto:

```
nvm alias default v14.15.0
```

### __Instalar grunt__

Grunt también debe ser instalado en la ruta `moodle/`:

```
npm install

npm install -g grunt-cli
```

Si se muentran algunos problemas asociados a vulnerabilidades, se deben omitir dado que ya no aplican.

### __Compilar plugin__

En la ruta `moodle/mod/mamografsim/` ejecutar:
```
grunt amd --force
```

Esto compilará el código Javascript y permitirá interactuar con el simulador una vez que termine la configuración inicial.

### __Usuario de testing__

Una vez que todo lo necesario ha sido instalado, se debe crear un usuario de testing para poder interactuar con la página.

El siguiene comando es necesario para la base de datos (Oracle/MySQL)
```
bin/moodle-docker-wait-for-db
```

Para probar la plataforma se deben crear las credenciales necesarias (usuario y contraseña). El comando a continuación crea las credenciales que se señalan más abajo:

```
bin/moodle-docker-compose exec webserver php admin/cli/install_database.php --agree-license --fullname="Docker moodle" --shortname="docker_moodle" --adminpass="test" --adminemail="admin@example.com"
```
- usuario: __admin__
- contraseña: __test__

Si la base de datos se elimina por alguna razón, se debe volver a correr el comando anterior para contar con el usuario de prueba.

### __Instalar plugin en moodle__

Ya se han clonado los repositorios y se han instalado las tecnologías necesarias. Ahora se debe instalar el plugin Mamografsim en Moodle de modo que quede disponible para ser agregado a un curso en esta plataforma.

En el navegador, dirigirse a `localhost:8000`. Allí, apretar `log in` en la esquina superior derecha e ingresar con el usuario recién creado. En el menú lateral izquierdo se debe clickear la sección *Site Administration* ... COMPLETAR ESTA PARTE

### __Añadir plugin a un curso__

En la sección *Site Home*, clickear *Add a new course*. Luego, completar los campos necesarios y guardar (*Save and Display*). Posterior a esto, aparecerá un menú lateral con la información del curso.

Para agregar el plugin al curso se debe seleccionar la primera sección, aquella que contiene el nombre del curso y luego clickear *Turn editing on* (un botón que se encuentra en la esquina superior derecha). Esto permitirá editar los tópicos y otras secciones del curso. Ahora, se debe elegir un tópico (por ejemplo *Topic 1*) y clickear *Add an activity or resource*, en él se agregará el simulador. A continuación, aparecerá un modal con los diferentes plugins disponibles, seleccionar *Mamografsim*. Finalmente, se debe ingresar el nombre de la actividad y guardar (*Save and Display*).

Una vez hecho todo lo anterior, aparecerá la interfaz de inicio del simulador. Desde aquí se puede interactuar con él.

Puede ser que la frase *Cargando...* aparezca por un tiempo prolongado. Una de las posibles causas es COMPLETAR ESTA PARTE Para corregir ello se deben eliminar los archivos `botones-pasos.min.js.map` y `botones-pasos.min.jsbotones-pasos.min.js` de la carpeta `moodle/mod/mamografsim/amd/build/`.


## __Desarrollo__

Durante el desarrollo es necesario seguir ciertos pasos con el fin de observar las nuevas funcionalidades integradas.

### __Declarar variables de entorno__

Se deben declarar las variables de entorno cada vez que se quiera desplegar localmente Moodle. Para ello deben ejecutarse nuevamente los comandos:

```
export MOODLE_DOCKER_WWWROOT=<path_to_moodle_code>

export MOODLE_DOCKER_DB=pgsql

cp config.docker-template.php $MOODLE_DOCKER_WWWROOT/config.php
```
Recordar reemplazar <path_to_moodle_code> por la ruta del código fuente de moodle.

O bien, se pueden definir en el archivo `$HOME/.bashrc` (o `$HOME/.zshrc` de ser el caso) para evitar declararlas cada vez.


### __Iniciar y detener contenedores__

Los contenedores de docker se deben levantar cada vez que se desarrolle en el plugin, para ello se debe ejecutar el siguiente comando en la carpeta `moodle-docker/`:
```
bin/moodle-docker-compose up -d
```

Para detener los contenedores, ejecutar:
```
bin/moodle-docker-compose stop
```

### __Compilar código Javascript__

Cada vez que al plugin se le introduzca nuevo código Javascript, éste se debe compilar con `grunt` en la ruta `moodle/mod/mamografsim/`:

```
grunt amd
```

Es posible que el comando anterior arroje errores o warning debido a problemas de linting. Si no se quieren considerar estos errores, se puede forzar la compliación con el comando:

```
grunt amd --force
```

### __Borrar caché__

Se aconseja también limpiar el caché cada vez que se modifique el contenido del archivo `styles.css`. Para ello, se debe clickear *Purge all caches* en la última parte del footer de Moodle, y recargar la página con `Ctrl+Shift+R`.
