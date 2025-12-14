# Filthy Feathers

**Equipo de desarrollo**
- Víctor Castro Álvarez
- Óscar Daniel Fernández Cabana
- Óscar Silva Urbina
- Víctor Álvarez Peral

## **1. Resumen**
### 1.1 Descripción
La Casa de las Ratas tiene que parar la invasión a su reino de los loros pirata, y por ello el Rey de las Ratas deberá diseñar una estrategia defensiva en la última línea de defensa antes de que los loros lleguen a los portones del reino y lo saqueen.
### 1.2 Género
Tower Defense
### 1.3 Setting
Desarrollado en las cloacas de La Casa de las Ratas, los loros intentan invadir a través de las tuberías. La tienda se ubica en el baño.
### 1.4 Características principales
- Gestiona tropas, torres y mejorarlas
- Adquiere tropas nuevas al completar niveles
- Defiende la casa de invasores en distintos mapas

## **2. Gameplay**
### 2.1 Objetivo del juego
**Corto plazo:**
- Derrotar a los enemigos que van de camino a la base
- Poner torres y tropas para mejorar el poder ofensivo
- Aguantar hasta acabar con todas las oleadas próximas

**Medio plazo:**
- Mejorar las torres.
- Adquirir tropas nuevas en la tienda.

**Largo plazo:**
- Frenar la invasión de los loros piratas en el territorio de las ratas.

### 2.2 Core loops
En los niveles vendrán oleadas predefinidas de loros. Al matar loros consigues dinero, con el que colocas y mejoras tropas. Al acabar con todas las oleadas visitas la tienda en la que puedes elegir que tropas nuevas adquirir. Posteriormente, en el siguiente nivel comienzas sin tropas y vuelves a colocar nuevas para repetir
Al matar enemigos (loros) consigues “doblones de oro”, con el cual puedes mejorar tus tropas, o quitar antiguas para poner mejores. Después, con las tropas listas puedes seguir matando enemigos. 

![CoreLoopImg](https://github.com/user-attachments/assets/39b5db2d-1c99-4b55-9960-6cdca4fb0e57)

## 3. Mecánicas
### 3.1 Tipos de tropas

Las tropas estáticas y las movibles tienen uno de tres tipos: **Ataque, Defensa y Proyectil**. La relación entre tipos es un piedra, papel y tijeras: **Ataque** gana a **Proyectil**, **Proyectil** gana a **Defensa** y **Defensa** gana a **Ataque**. 

![DiagramaTipos](https://github.com/user-attachments/assets/17e2a3c9-4daa-417e-8f24-5d4b30796605)

Cuando una tropa ataca a otra y su tipo tiene ventaja, hace el doble de daño que haría normalmente. Si el tipo es el mismo, el daño no se ve afectado.
No tienes que elegir que tropas llevar al nivel. Todas las tropas desbloqueadas están disponibles a la vez en el nivel.

Parámetros

- Gestión de recursos y espacio al elegir tropas del tipo correcto para contrarrestar a las tropas que atacan.

### 3.2 Monedas
Hay dos tipos de moneda, los doblones y las plumas
Los doblones se utilizan en plena invasión, para colocar tropas o mejorarlas. Se consiguen al derrotar loros enemigos.
Las plumas se obtienen en cantidad predefinida fija al acabar niveles. Se utiliza para comprar tropas nuevas en la tienda que aparecerán al acabar niveles.

Parámetros

- Gestión de recursos al elegir que tropas escoger para colocar o para desbloquear. Cada una tiene su coste individual.

## 4. Interfaz
### 4.1 Controles
El juego se controlará completamente con el ratón, que se usará para colocar, quitar y mejorar torres, y tropas. También se podrá usar para comprar ratas nuevas en la tienda e interactuar con todos los botones.

### 4.2 Menús
Menú principal:

<img width="1190" height="667" alt="image" src="https://github.com/user-attachments/assets/ca1494f6-3c03-458a-a0ee-5ea11b52d41a" />

Nivel:

<img width="1192" height="669" alt="image" src="https://github.com/user-attachments/assets/7420db75-8f03-49ec-8df4-97ed8eb7b4c8" />

Tienda:

<img width="1196" height="673" alt="image" src="https://github.com/user-attachments/assets/ab70a49c-9d36-4be4-a68a-caefb56d3f2c" />

### 4.3 Personajes
Ratas:

- **Rata de tienda y Navi**: Este dúo ofrece tropas al reino de las ratas para fortalecer sus líneas de defensa y ataque.
- Ratas torres:
  - Rata gorda [ATAQUE]: Esta rata al ser tan gorda no se puede mover, por lo que se quedará esperando a los enemigos en un lugar determinado.
    - Daño ataque
  - Rata sniper[ATAQUE]: Rata que inflige daño devastador desde la distancia
    - Daño ataque
  - Rata silicona [DEFENSA]: Esta rata disparará silicona a los enemigos que se acerquen a ella, causando que ataquen y avancen más lento.
    - OBJETO SILICONA
      - Duración de la ralentización en el enemigo
      - Porcentaje de ralentización de enemigos
  - Rata camarera [DEFENSA]: Esta rata estacionaria aumenta la vida de las ratas que pasan por delante de ella (con cooldown)
    - Cantidad de curación por rata
  - Rata manguera [PROYECTIL]: Rata que ataca muy rapidamente con chorros de agua perforantes
    - Daño
  - Rata jeringa [PROYECTIL]:  Esta rata lanza sus agujas y envenena temporalmente a sus víctimas
    - Daño
    - Duracion del veneno
    - Cantidad de ticks del veneno

- Ratas tropas
  - Atributos generales de ratas tropas
    - Nombre
    - Posición
    - Velocidad de movimiento 
    - Daño
  - Rata coche  [ATAQUE]: Esta rata arrolla a los enemigos por el camino sin frenar, si el daño es crítico, elimina al loro.
  - Rata rodadora [DEFENSA]: Rata que avanza por el camino hasta toparse con un enemigo, es muy lenta y tiene mucha vida.
  - Rata comecables [PROYECTIL]: Esta rata avanza por el camino hasta encontrarse con un enemigo, entonces golpeará en área.

**Loros piratas**:
- Loro grumete 
- Loro princeso
- Loro barril 
- Loro cañonero 

### 4.4 Niveles
Se va avanzando por los niveles de forma lineal, interrumpidos por una etapa de tienda entre cada nivel. Si se pierde, se vuelve a empezar desde el principio.

## 5. Experiencia de juego
El nivel empieza con el inicio de la primera oleada. El jugador tendrá que colocar torres y tropas a tiempo real, teniendo en cuenta sus fondos restantes.
A medida que va progresando el nivel, las tropas enemigas que derrotes, te darán doblones de oro, que podrás gastar en las acciones de cambiar o poner más tropas/torres que te ayuden en la defensa. 
Finalmente al superar el nivel serás recompensado con plumas, “moneda” que podrás canjear en la tienda.

## 6. Estética y contenido
Descripción de las necesidades de arte, música y efectos necesarios durante el juego.
Arte y ambientación 2D. El estilo del arte estará regido bajo la mismas reglas pero cada miembro del equipo dará un toque personal a los personajes, manifestando distintas demostraciones del arte (pixel art, polyart, realistico). Los escenarios serán del mismo estilo para mantener la coherencia. 
Todos los personajes tendrán voces o sonidos que dirán en medio del combate. Grabados por nosotros.

**Lore**:

*Nos ambientamos en la hermosa Casa de las Ratas, o solo el lugar donde estos adorables roedores han vivido en completa armonía durante cientos de años, sino también hogar de la más grande acumulación de riquezas jamás vista.
Una Paz y armonía que es desolada por el ataque inesperado de una de las especies más codiciosa de todas, los loros piratas, que han conseguido acceder a las tuberías de su casa y que si avanzan más de lo debido, sembrarán el caos y conseguirán hacerse con el tesoro. Por ello, el rey de las ratas, porque toda casa tiene un rey, tendrá que desenvolverse como estratega del reino para poner un final, al tormento de los loros.*

## 7. Referencias
- [Kingdom Rush](https://www.minijuegos.com/juego/kingdom-rush)
- [Bloons Tower Defense](https://www.crazygames.com/game/bloons-tower-defense)
- [Sleepy Battery Bots](https://itch.io/jam/shovel-jam-2025/rate/3729382)
