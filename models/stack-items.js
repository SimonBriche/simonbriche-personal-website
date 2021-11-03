module.exports = [{
  name: "DNSimple",
  image: "dnsimple.png",
  key: "dnsimple",
  type: "Gestionnaire de DNS",
  description: '<a href="https://dnsimple.com/" target="_blank" rel="noopener noreferrer"><strong>DNSimple</strong></a>, qui peut aussi faire office de registrar a, comme son nom l’indique, une interface de configuration simple et dispose même de « One-click services » pour s’interfacer « automatiquement » avec différentes solutions d’hébergement. Entre autres choses bien sûr, comme le renouvellement automatique de domaines, les rappels d’expirations, etc… On peut aussi déléguer la configuration DNS de domaines achetés ailleurs (comme chez OVH), et donc gérer tous ses noms de domaines au même endroit.'
},{
  name: "Let's Encrypt",
  image: "lets-encrypt.png",
  key: "letsencrypt",
  type: "Génération du certificat SSL",
  description: '<strong><a href="https://letsencrypt.org/">Let’s Encrypt</a></strong> est le "SSL pour tous". La configuration et le maintien du certificat est géré directement par la solution d’hébergement.'
},{
  name: "Heroku",
  image: "heroku.png",
  key: "heroku",
  type: "Hébergement",
  description: '<strong><a href="https://heroku.com">Heroku</a></strong>, propriété de <strong><a href="https://www.salesforce.com/">Salesforce</a></strong> et utilisant la technologie <strong><a href="https://aws.amazon.com/fr/ec2/">AWS&nbsp;EC2</a></strong>, est la pierre angulaire de la stack. Le (gros) avantage de la solution est la possibilité de <strong><a href="https://en.wikipedia.org/wiki/Scalability#Horizontal_and_vertical_scaling">scaling</a></strong> (horizontal ou vertical) à la demande. Cela permet de dimensionner facilement les performances selon le trafic de l’application, et de supporter des charges de plusieurs centaines voire milliers de requêtes par seconde.'
},{
  name: "NodeJS",
  image: "nodejs.png",
  key: "nodejs",
  type: "Langage server",
  description: '<strong><a href="https://nodejs.org/">NodeJS</a></strong>, avec le framework <strong><a href="https://expressjs.com/">Express</a></strong>. Outre le fait qu’avoir le même langage pour la partie serveur et client fait « économiser » la maîtrise d’un langage supplémentaire, pouvoir utiliser le même code à des endroits différents est toujours le bienvenu. L’énorme communauté aidant, il y a toujours une solution (ou des parties de solution) à chaque problème.'
},{
  name: "MySQL",
  image: "mysql.png",
  key: "mysql",
  type: "Moteur de base de données",
  description: '<strong><a href="https://www.mysql.com/">MySQL</a></strong> hébergée avec la solution <strong><a href="https://aws.amazon.com/fr/rds/">AWS RDS</a></strong>. Encore une fois, performance et souplesse sont importants. Le fait de déporter la base de donnée sur les serveurs d’Amazon permet de se concentrer sur l’architecture de l’application, sans se soucier de savoir où se trouve la data. <i>Bonus : Heroku utilisant des instances AWS EC2, la connexion avec AWS RDS est excellente.</i>'
},{
  name: "Knex",
  image: "knex.png",
  key: "knex",
  type: "Constructeur de requêtes",
  description: 'Le constructeur de requêtes <strong><a href="http://knexjs.org/">KnexJS</a></strong> permet de faire la connexion entre le serveur et la base de données en évitant, entre autres, les problèmes d’injection SQL.'
},{
  name: "Pug",
  image: "pug.png",
  key: "pug",
  type: "Moteur de templating côté serveur",
  description: 'Déroutant de premier abord, le moteur de template <strong><a href="https://pugjs.org/api/getting-started.html">Pug</a></strong> est extrêmement pratique car il substitue l’utilisation des balises HTML par l’indentation du code et l’utilisation de la syntaxe CSS. En résulte un code plus concis (car il n’y a plus de balises fermantes, ni de déclaration des attributs « class » et « id » notamment) et donc plus rapide à écrire.'
},{
  name: "LESS",
  image: "less.png",
  key: "less",
  type: "Préprocesseur CSS",
  description: '<strong><a href="http://lesscss.org/">LESS</a></strong> permet de dynamiser du CSS, ou en tout cas d’écrire du CSS comme il aurait toujours dû s’écrire 😅'
},{
  name: "Ember",
  image: "ember.png",
  key: "ember",
  type: "Framework côté client",
  description: 'Selon les cas de figure, d’uniquement <strong><a href="https://jquery.com/">jQuery</a></strong>&nbsp;(pour les applications les plus simples) ou de <strong><a href="https://emberjs.com/">Ember</a></strong> (pour les applications plus complexes) en framework Javascript. <em>N’oublions jamais : il faut toujours utiliser le bon outil pour le bon job !</em><br><br>Ember est le choix de l‘agence depuis 2013 et répond toujours à nos attentes ! Ce framework (certes moins trendy que React ou Angular) allie une souplesse d’utilisation avec tout de même un certain cadre, ce qui le rend agréable à utiliser, notamment avec son CLI <strong><a href="https://ember-cli.com/">ember-cli</a></strong>. La séparation entre le code logique et les templates, mais également le support du langage <strong><a href="https://emblemjs.com/">Emblem</a></strong> pour les écrire en font toujours notre framework de prédilection !'
},{
  name: "AWS S3",
  image: "s3.png",
  key: "s3",
  type: "Stockage de médias",
  description: 'Le service de stockage de médias <strong><a href="https://aws.amazon.com/fr/s3/">AWS S3</a></strong> allie l’aspect performance pour le téléchargement des médias et allège la charge des serveurs web. Également, il faut garder à l’esprit que les applications hébergées chez Heroku sont dites « stateless » donc à chaque déploiement de code ou scaling de serveur, tout ce qui n’est pas le code même de l’application est supprimé.'
},{
  name: "Git",
  image: "git.png",
  key: "git",
  type: "Contrôleur de sources",
  description: '<a href="https://git-scm.com/"><strong>Git</strong></a>, et plus précisément son worflow Gitflow. <em>Bonus : Heroku fonctionne justement avec des dépôts Git pour le déploiement de code !</em> Il suffit donc de pousser la branche « master » sur l’application pour non seulement la mettre à jour, mais aussi déclencher tout le processus de redémarrage de serveurs, l’installation des éventuels nouveaux packages, etc… Un gain de temps clairement non négligeable.'
},{
  name: "Gitlab",
  image: "gitlab.png",
  key: "gitlab",
  type: "Gestionnaire de dépôts",
  description: 'Le gestionnaire de dépôts <strong><a href="https://gitlab.com/">Gitlab</a></strong>, une alternative à Github, a gagné une certaine popularité depuis le rachat de Github par Microsoft.'
}]