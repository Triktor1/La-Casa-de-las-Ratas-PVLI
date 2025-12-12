A continuación se encuentra un diagrama de la arquitectura de Filthy Feathers:

![[PVLI-CasaDeLasRatas-Arquitectura.png]]

Level1 es la escena principal de gameplay del juego. Cuando entras, se lee un JSON correspondiente al nivel actual y se crean los huecos de torre, enemigos y UI con las torres y tropas disponibles según lo disponible al jugador en el momento. Entre niveles, hay una tienda que guarda las compras y se las da al nivel a través de su propio JSON para desbloquearlas al jugador.

Las torres y tropas que utilizan balas, las instancian en su método shoot en caso de las torres y onCollision en caso de las tropas.

Hay clases base Bala, Torre y Tropa de las que heredan todas las subclases con su propia funcionalidad. Las escenas de galería se pasan información para mantener su correcto funcionamiento, y el tutorial manda a tutorial.html.
Cuando ganas o pierdes hay un botón que te lleva al menú principal.