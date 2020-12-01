# Simulador de Control de Calidad en Mamógrafos #

El simulador de control de calidad en mamógrafos es una herramienta virtual que permite recrear pruebas reales de control de calidad en equipos de mamografía.



## License ##

2020 cc5402-Mamografías

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program.  If not, see <http://www.gnu.org/licenses/>.

## Clonar Moodle

Primero se debe obtener el código fuente de la última versión estable de Moodle. Esto se puede hacer de dos formas:

- Descargar y descomprimir el código desde: https://download.moodle.org/releases/latest/ o

- Clonar o descargar el repositorio desde: https://github.com/moodle/moodle

Luego se debe clonar el repositorio del plugin __Mamografsim__ en la ruta `moodle/mod/` El repositorio se encuentra disponible en: https://github.com/cc5402-Mamografias/mamografsim

## Clonar repositorio moodle-docker

Se recomienda utilizar `docker` y `docker-compose` para evitar instalar todas las dependencias necesarias.

Se debe clonar el repositorio que permite desplegar Moodle a través de docker. De preferencia, este respositorio debe ser clonado en la misma ruta del repositorio anterior: https://github.com/cc5402-Mamografias/moodle-docker


## Instalación de docker

 Si no se tiene docker instalado, deben seguirse las instrucciones para instalarlo:

__Docker__:

- Ubuntu: https://docs.docker.com/engine/install/ubuntu/
- XOS: https://docs.docker.com/docker-for-mac/install/

__Docker Compose__:

- Ubuntu: https://docs.docker.com/compose/install/

Es importante agregar al usuario que corresponde al grupo de Docker para poder ejecutar comandos sin `sudo`:
```
sudo usermod -aG docker $USER
```

## Desplegar Moodle por medio de docker


Una vez instalado se deben ejecutar los comandos indicados en el respositorio de docker, se listan a continuación:
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

El siguiene comando es necesario para la base de datos (Oracle/MySQL)
```
bin/moodle-docker-wait-for-db
```

## Usuario de testing

Para probar la plataforma se deben crear las credenciales necesarias (usuario y contraseña). El comando a continuación crea las credencialesel que se señalan más abajo:

```
bin/moodle-docker-compose exec webserver php admin/cli/install_database.php --agree-license --fullname="Docker moodle" --shortname="docker_moodle" --adminpass="test" --adminemail="admin@example.com"
```
- usuario: __admin__
- contraseña: __test__

Si la base de datos se elimina por alguna razón, se debe volver a correr el comando anterior para contar con el usuario de prueba.


## Iniciar y detener contenedores durante el desarrollo

Los contenedores de docker se deben levantar cada vez que se desarrolle en el plugin, para ello se debe ejecutar el siguiente comando en la carpeta `/moodle-docker`:
```
bin/moodle-docker-compose up -d
```

Para deneter los contenedores, ejecutar:
```
bin/moodle-docker-compose stop
```

## Instalar compilador

Dado que el plugin está desarrollado mayormente en Javascript, es necesario instalar el comando que permite compilar los archivos Javascript.

