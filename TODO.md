# DaMovieQuiz

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Présentation](#pr%C3%A9sentation)
- [Pré-requis](#pr%C3%A9-requis)
- [Le jeu → `/play`](#le-jeu-%E2%86%92-play)
  - [État initial](#%C3%A9tat-initial)
  - [Jeu en cours](#jeu-en-cours)
  - [Fin de partie](#fin-de-partie)
  - [Highscores → `/highscores`](#highscores-%E2%86%92-highscores)
- [Livrable](#livrable)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

The best movie game ever made up. At least it will be.

## Présentation

Nous t'invitons à coder un jeu génial nommé _Da Movie Quizz_, qui teste la culture cinématographique du joueur. Le principe de base est ultra simple:

Dans un temps imparti, le jeu présente au joueur sous forme de rounds un acteur et une affiche de film. Le joueur doit dire si l'acteur a joué dans le film présenté ou non.

Une fois le temps écoulé, le jeu s'arrête et donne le score à l'utilisateur. Il a la possibilité de rejouer pour tenter de battre son meilleur score.

Et voilà, plutôt basique, mais efficace et fun.

## Pré-requis

- Dans cette app, on a besoin d'une source de données sur le cinéma.
  On te conseille fortement d'utiliser l'API de The Movie Database.
  - [API documentation](https://www.themoviedb.org/documentation/api)
  - [themoviedb-javascript-library](https://github.com/cavestri/themoviedb-javascript-library/)
- Côté DB, pas de pré-requis: soit tout en mémoire, soit du local storage, soit .... ce que tu veux, mais ne perds pas trop de temps sur cette partie, au détriment de la partie Front.

## Le jeu → `/play`

### État initial

- Le jeu est arrêté, on affiche seulement un bouton Play. Dès que le joueur clique dessus, le jeu commence (obviously)

### Jeu en cours

- Un timer, implacable, affiche le temps qui s'écoule pendant toute la durée du jeu.
- Juste en dessous, on présente aléatoirement un acteur et une affiche de film.
- Le joueur doit dire si l'acteur a joué dans ce film (des boutons OUI / NON suffiront ici).

_Hint 1_: Pour une meilleure expérience de jeu, il est préférable de se baser sur des données "populaires" de la base de données de films.
_Hint 2_: Toujours dans le même but d'améliorer l'expérience de jeu, il faudrait éviter le fait que la bonne réponse soit majoritairement "non", mais essayer d'équilibrer les "oui" et les "non".

### Fin de partie

- La partie s'arrête lorsque le timer arrive à sa fin.
- On affiche le nombre de bonnes réponses du joueur.
- Si les conditions sont réunies (cf partie "Highscores", on propose au joueur de l'inclure dans les highscores (on lui demandera seulement son nom).
- Un bouton "Play again" permet de rejouer.

### Highscores → `/highscores`

- Les 10 meilleures parties sont listées ici, classées par nombre de bonnes réponses.
- Pour chaque ligne de highscore, on affiche le nombre de bonne réponses et le nom du joueur.

## Livrable

Réalise le tout dans un repo git pour qu'on puisse ensuite voir comment tu organises tes commits, faire les codes reviews nécessaires, etc..

Une fois ton jeu finalisé et prêt à être commercialisé, on souhaite voir ton code (comme tu as tout pushé consciencieusement sur git, pas de problème) et aussi le résultat final, pour qu'on puisse aussi s'amuser \o/
