# Filthy Feathers

**Equipo de desarrollo**
- Víctor Castro Álvarez
- Óscar Daniel Fernández Cabana
- Óscar Silva Urbina
- Víctor Álvarez Peral

## **1. Resumen**
### 1.1 Descripción
El jugador, como el rey de las ratas, debe detener la invasión de los loros piratas para no perder todos los doblones de oro de sus aposentos.
### 1.2 Género
Tower defense
### 1.3 Setting
Desarrollado en las cloacas de la casa de las ratas, los loros intentan invadir a través de las tuberías. La tienda se ubica en el baño
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
- Mejorar las tropas terrestres.
- Adquirir tropas nuevas en la tienda

**Largo plazo:**

- Frenar la invasión de los loros piratas en el territorio de las ratas.

### 2.2 Core loops
En los niveles vendrán oleadas predefinidas de loros. Al matar loros consigues dinero, con el que colocas y mejoras tropas. Al acabar con todas las oleadas visitas la tienda en la que puedes elegir que tropas nuevas adquirir. Posteriormente, en el siguiente nivel comienzas sin tropas y vuelves a colocar nuevas para repetir
Al matar enemigos (loros) consigues “doblones de oro”, con el cual puedes mejorar tus tropas, o quitar antiguas para poner mejores. Después, con las tropas listas puedes seguir matando enemigos. 

![CoreLoopImg](https://github.com/user-attachments/assets/39b5db2d-1c99-4b55-9960-6cdca4fb0e57)

## 3. Mecánicas
### 3.1 Tipos de tropas

Las tropas estáticas y las movibles tienen uno de tres tipos: **Ataque, Defensa y Proyectil**. La relación entre tipos es un piedra, papel y tijeras: **Ataque** gana a **Proyectil**, **Proyectil** gana a **Defensa** y **Defensa** gana a **Ataque**. 

<img width="704" height="392" alt="image" src="https://github.com/user-attachments/assets/a3cb9a64-264e-4b2f-a9f2-816a50e2523d" />

Cuando una tropa ataca a otra y su tipo tiene ventaja, hace el doble de daño que haría normalmente. Si el tipo es el mismo, el daño no se ve afectado.
No tienes que elegir que tropas llevar al nivel. Todas las tropas desbloqueadas están disponibles a la vez en el nivel.

Parámetros

- Gestión de recursos y espacio al elegir tropas del tipo correcto para contrarrestar a las tropas que atacan.


### 3.2 Monedas
Hay dos tipos de moneda, los doblones y las plumas
Las monedas se utilizan en plena invasión, para colocar tropas o mejorarlas. Se consiguen al derrotar loros enemigos.
Las plumas se obtienen en cantidad predefinida fija al acabar niveles. Se utiliza para comprar tropas nuevas en la tienda que aparecerán al acabar niveles.

Parámetros

- Gestión de recursos al elegir que tropas escoger para colocar o para desbloquear. Cada una tiene su coste individual.

## 4. Interfaz
### 4.1 Controles
El juego se controlará completamente con el ratón, que se usará para colocar, mejorar y tropas. También se podrá usar para comprar tropas nuevas en la tienda e interactuar con todos los botones.

### 4.2 Menús
Menú principal:

<img width="612" height="382" alt="image" src="https://github.com/user-attachments/assets/7a57d5ef-ed53-4286-9ce5-1dc3977abb41" />

Opciones:

<img width="860" height="305" alt="image" src="https://github.com/user-attachments/assets/9595095d-e9a7-48aa-aef0-b305e91a88e4" />

Nivel:

<img width="857" height="440" alt="image" src="https://github.com/user-attachments/assets/9ab5749e-393b-4eb0-914f-be72b54350aa" />

Tienda:

<img width="705" height="484" alt="image" src="https://github.com/user-attachments/assets/3741ec10-ab55-4fda-af0e-4e6a7b221372" />

### 4.3 Personajes
Ratas:

- **Rata de tienda y Navi**: Este dúo ofrece tropas al reino de las ratas para fortalecer sus líneas de defensa y ataque.
- Ratas de combate:
  - **Ratas torres**
    - Rata gorda [ATAQUE]: Esta rata al ser tan gorda no se puede mover, por lo que se quedará esperando a los enemigos en un lugar determinado.
    - Ratas comecables [ATAQUE]: Las ratas comecables se conectan entre sí, formando barreras eléctricas que dañan a los loros al pasar.
    - Rata silicona [DEFENSA]: Esta rata disparará silicona a los enemigos que se acerquen a ella, causando que ataquen y avancen más lento.
    - Rata camarera [DEFENSA]: Esta rata estacionaria aumenta la vida de las ratas que pasan por delante de ella (con cooldown)
    - Rata bomba queso [PROYECTIL] (daño de área): Esta rata lanza bombas fétidas de queso, las cuales al impactar crean un área explosiva.
    - Rata jeringa [PROYECTIL]:  Esta rata lanza sus agujas y envenena temporalmente a sus víctimas
  - Ratas tropas
    - Rata berserker [ATAQUE]
    - Rata en lata [DEFENSA]:
    - Rata científica [PROYECTIL]

**Loros piratas**:
- Loro grumete 
- Loro princeso
- Loro barril 
- Loro cañonero 

### 4.4 Niveles
Una progresión de niveles de un camino bloqueado que se irá desbloqueando a medida que vas superándolos, interrumpidos entre ellos por una fase de tienda donde podrás adquirir más tropas en tu arsenal de guerra antes de irte a la próxima batalla.

## 5. Experiencia de juego
El nivel se te presenta con una fase preparatoria donde podrás plantear una defensa inicial antes de la llegada de los enemigos. Donde tienes que pensar bien que desplegar ya que este movimiento inicial,  se ve limitado debido al coste existente en monedas para poder defender haciendo que que comiences con un número limitado de opciones donde cada una de ellas implica un early game distinto. 
A medida que va progresando el nivel, las tropas enemigas que derrotes, te darán doblones de oro, que podrás gastar en las acciones de cambiar o poner más tropas/torres que te ayuden en la defensa. 
Finalmente al superar el nivel serás recompensado con plumas, “moneda” que podrás canjear en la tienda.

## 6. Estética y contenido
Descripción de las necesidades de arte, música y efectos necesarios durante el juego.
Arte y ambientación 2D. El estilo del arte estará regido bajo la mismas reglas pero cada miembro del equipo dará un toque personal a los personajes, manifestando distintas demostraciones del arte (pixel art, polyart, realistico). Los escenarios serán del mismo estilo para mantener la coherencia. 
Todos los personajes tendrán voces o sonidos que dirán en medio del combate. Grabados por nosotros.

**Lore**:

*Nos ambientamos en la hermosa casa de las ratas, o solo el lugar donde estos adorables roedores han vivido en completa armonía durante cientos de años, sino también hogar de la más grande acumulación de riquezas jamás vista
Una Paz y armonía que es desolada por el ataque inesperado de una de las especies más codiciosa de todas, los loros piratas, que han conseguido acceder a las tuberías de su casa y que si avanzan más de lo debido, sembrarán el caos y conseguirán hacerse con el tesoro. Por ello, el rey de las ratas, porque toda casa tiene un rey, tendrá que desenvolverse como estratega del reino para poner un final, al tormento de los loros.*

## 7. Referencias
- [Kingdom Rush](https://www.minijuegos.com/juego/kingdom-rush)
- [Bloons Tower Defense](https://www.crazygames.com/game/bloons-tower-defense)
- [Sleepy Battery Bots](https://itch.io/jam/shovel-jam-2025/rate/3729382)
