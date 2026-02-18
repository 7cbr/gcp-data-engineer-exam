import { Question } from './types';

export const domain3Questions: Question[] = [
  {
    id: 18,
    domain: "Stockage des données",
    difficulty: "facile",
    question: "Vous devez stocker des fichiers d'images et de vidéos brutes (non structurées) de manière durable et économique sur GCP. Les fichiers sont rarement accédés après 30 jours. Quelle solution est la plus adaptée ?",
    options: [
      { label: "A", text: "Cloud Storage classe Standard" },
      { label: "B", text: "Cloud Storage classe Nearline puis Coldline avec une politique de cycle de vie" },
      { label: "C", text: "Persistent Disk attaché à une VM" },
      { label: "D", text: "Cloud Filestore" }
    ],
    correctAnswers: ["B"],
    explanation: "Cloud Storage avec des politiques de cycle de vie permet de stocker les données en Standard initialement puis de les déplacer automatiquement vers Nearline (après 30 jours) et Coldline (après 90 jours par exemple) pour réduire les coûts de stockage des données rarement accédées.",
    whyOthersWrong: {
      "A": "La classe Standard est plus coûteuse pour les données rarement accédées. Les politiques de cycle de vie vers Nearline/Coldline réduisent significativement les coûts.",
      "C": "Persistent Disk est conçu pour être attaché à des VMs, pas pour le stockage d'objets. Il est plus coûteux et moins durable que Cloud Storage.",
      "D": "Cloud Filestore est un système de fichiers NFS managé, trop coûteux et surqualifié pour du stockage d'objets non structurés."
    },
    gcpLink: "https://cloud.google.com/storage/docs/lifecycle"
  },
  {
    id: 19,
    domain: "Stockage des données",
    difficulty: "intermédiaire",
    question: "Vous gérez une table BigQuery de 5 To qui est fréquemment interrogée avec des filtres sur la colonne 'date_transaction' et 'region'. Les coûts de requêtes sont élevés. Quelle optimisation apporte la meilleure réduction de coûts ?",
    options: [
      { label: "A", text: "Créer un index sur les colonnes date_transaction et region" },
      { label: "B", text: "Partitionner la table par date_transaction et ajouter un clustering par region" },
      { label: "C", text: "Convertir la table en vue matérialisée" },
      { label: "D", text: "Dupliquer la table dans plusieurs datasets" }
    ],
    correctAnswers: ["B"],
    explanation: "Le partitionnement par date réduit la quantité de données scannées en ne lisant que les partitions correspondant aux dates filtrées. Le clustering par region trie physiquement les données dans chaque partition, réduisant encore le volume scanné. Ensemble, ils minimisent les coûts de requêtes.",
    whyOthersWrong: {
      "A": "BigQuery n'utilise pas d'index traditionnels comme les bases de données relationnelles. Le partitionnement et le clustering sont les mécanismes d'optimisation de BigQuery.",
      "C": "Une vue matérialisée peut accélérer certaines requêtes agrégées mais ne remplace pas le partitionnement/clustering pour optimiser les requêtes filtrées sur des colonnes spécifiques.",
      "D": "Dupliquer la table ne réduit pas les coûts, elle les multiplie."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/partitioned-tables"
  },
  {
    id: 20,
    domain: "Stockage des données",
    difficulty: "intermédiaire",
    question: "Votre application de jeu mobile stocke les scores et profils de joueurs dans Firestore. Vous observez une erreur « RESOURCE_EXHAUSTED » et des latences élevées. En analysant les données, vous constatez que les documents des joueurs les plus populaires sont lus des milliers de fois par seconde. Quelle est la solution recommandée ?",
    options: [
      { label: "A", text: "Migrer vers Cloud Spanner pour une meilleure scalabilité" },
      { label: "B", text: "Activer Firestore in Datastore mode pour de meilleures performances" },
      { label: "C", text: "Utiliser des compteurs distribués et mettre en cache les données fréquemment lues avec Memorystore" },
      { label: "D", text: "Augmenter les quotas Firestore via la console GCP" }
    ],
    correctAnswers: ["C"],
    explanation: "Firestore a une limite de 1 écriture/seconde par document et les lectures peuvent aussi être saturées sur des documents très populaires (hot spots). Les compteurs distribués répartissent les écritures, et Memorystore (Redis) met en cache les lectures fréquentes pour réduire la charge sur Firestore.",
    whyOthersWrong: {
      "A": "Migrer vers Spanner est disproportionné. Le problème est un hot spot sur quelques documents, pas un problème de scalabilité générale.",
      "B": "Datastore mode n'offre pas de meilleures performances par document. Il change le modèle de données mais ne résout pas les hot spots.",
      "D": "L'erreur RESOURCE_EXHAUSTED est due à un hot spot, pas à un quota global. Augmenter les quotas ne résout pas les limites par document."
    },
    gcpLink: "https://cloud.google.com/firestore/docs/best-practices"
  },
  {
    id: 21,
    domain: "Stockage des données",
    difficulty: "difficile",
    question: "Vous concevez le schéma d'une table Bigtable pour stocker les données de capteurs IoT. Chaque capteur envoie des mesures toutes les secondes. Vous avez 10 000 capteurs. Quel design de row key est le plus performant ?",
    options: [
      { label: "A", text: "timestamp#sensor_id (ex: 2024-01-15T10:30:00#sensor_42)" },
      { label: "B", text: "sensor_id#reverse_timestamp (ex: sensor_42#9999999999-timestamp)" },
      { label: "C", text: "Un hash MD5 du timestamp comme row key" },
      { label: "D", text: "Un ID auto-incrémenté séquentiel" }
    ],
    correctAnswers: ["B"],
    explanation: "sensor_id#reverse_timestamp distribue les écritures uniformément entre les capteurs (évite les hot spots) et le reverse timestamp permet de lire les données les plus récentes en premier pour chaque capteur, ce qui est le pattern de lecture le plus courant pour les données IoT.",
    whyOthersWrong: {
      "A": "Commencer par le timestamp crée un hot spot car toutes les écritures récentes se concentrent sur les mêmes nœuds Bigtable (les données sont triées lexicographiquement).",
      "C": "Un hash MD5 distribue les écritures mais rend impossible les scans de plages temporelles, essentiels pour les séries temporelles IoT.",
      "D": "Un ID auto-incrémenté crée un hot spot majeur car toutes les écritures vont vers le même nœud."
    },
    gcpLink: "https://cloud.google.com/bigtable/docs/schema-design-time-series"
  },
  {
    id: 22,
    domain: "Stockage des données",
    difficulty: "intermédiaire",
    question: "Votre équipe utilise BigQuery et a besoin de gérer différentes versions d'une table de dimensions (produits) qui change quotidiennement. Les analystes doivent pouvoir requêter l'état de la table à n'importe quelle date passée. Quelle approche est la plus adaptée ?",
    options: [
      { label: "A", text: "Utiliser le time travel BigQuery (fonctionnalité de voyage dans le temps)" },
      { label: "B", text: "Implémenter une Slowly Changing Dimension (SCD) Type 2 avec des colonnes valid_from et valid_to" },
      { label: "C", text: "Créer un snapshot quotidien de la table dans un dataset séparé" },
      { label: "D", text: "Utiliser le versioning de Cloud Storage pour les fichiers source" }
    ],
    correctAnswers: ["B"],
    explanation: "Le pattern SCD Type 2 ajoute des colonnes valid_from et valid_to à chaque ligne pour tracker l'historique complet des changements. Cela permet de requêter l'état exact des données à n'importe quelle date, sans limite de rétention.",
    whyOthersWrong: {
      "A": "Le time travel BigQuery est limité à 7 jours par défaut (max 7 jours). Il ne permet pas de remonter à n'importe quelle date passée.",
      "C": "Les snapshots quotidiens consomment beaucoup de stockage (duplication complète chaque jour) et sont moins efficaces pour requêter l'état à un moment précis.",
      "D": "Le versioning Cloud Storage concerne les fichiers source, pas les données dans BigQuery. Il ne permet pas de requêter facilement l'état historique."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/time-travel"
  },
  {
    id: 23,
    domain: "Stockage des données",
    difficulty: "facile",
    question: "Quelle classe de stockage Cloud Storage offre le coût de stockage le plus bas pour des données d'archivage qui ne seront accédées qu'une fois par an au maximum ?",
    options: [
      { label: "A", text: "Standard" },
      { label: "B", text: "Nearline" },
      { label: "C", text: "Coldline" },
      { label: "D", text: "Archive" }
    ],
    correctAnswers: ["D"],
    explanation: "La classe Archive offre le coût de stockage le plus bas de toutes les classes Cloud Storage. Elle est conçue pour les données accédées moins d'une fois par an, avec un coût de récupération plus élevé mais un coût de stockage minimal.",
    whyOthersWrong: {
      "A": "Standard est la classe la plus coûteuse en stockage, adaptée aux données fréquemment accédées.",
      "B": "Nearline est conçue pour les données accédées moins d'une fois par mois. Son coût de stockage est supérieur à Archive.",
      "C": "Coldline est conçue pour les données accédées moins d'une fois par trimestre. Son coût est inférieur à Nearline mais supérieur à Archive."
    },
    gcpLink: "https://cloud.google.com/storage/docs/storage-classes"
  },
  {
    id: 24,
    domain: "Stockage des données",
    difficulty: "difficile",
    question: "Votre entreprise utilise BigQuery avec la tarification à la demande (on-demand) et les coûts mensuels dépassent 50 000 $. Les requêtes sont principalement lancées par 3 équipes : Marketing, Finance et Data Science. Comment optimiser et contrôler les coûts efficacement ? (Sélectionnez 2 réponses)",
    options: [
      { label: "A", text: "Passer à la tarification par slots (capacity-based) avec des réservations et des attributions par équipe" },
      { label: "B", text: "Créer des quotas par utilisateur pour limiter le nombre de requêtes par jour" },
      { label: "C", text: "Utiliser des custom cost controls (taille maximale de facturation par requête) et des alertes de budget par projet" },
      { label: "D", text: "Migrer les données vers Dataproc pour réduire les coûts" }
    ],
    correctAnswers: ["A", "C"],
    explanation: "La tarification par slots offre un coût prévisible avec des réservations dédiées par équipe, permettant un contrôle précis de la capacité. Les custom cost controls limitent les bytes scannés par requête et les alertes de budget préviennent les dépassements.",
    whyOthersWrong: {
      "B": "Limiter le nombre de requêtes par jour n'est pas un mécanisme natif de BigQuery et ne contrôle pas le coût car une seule requête peut être très coûteuse.",
      "D": "Migrer vers Dataproc ne réduit pas nécessairement les coûts et perd les avantages du serverless BigQuery."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/reservations-intro"
  },
  {
    id: 25,
    domain: "Stockage des données",
    difficulty: "intermédiaire",
    question: "Vous devez concevoir un schéma BigQuery pour une table de transactions e-commerce. Chaque transaction contient des informations sur le client, une liste d'articles achetés (avec nom, prix, quantité), et des détails de livraison. Quelle approche de modélisation est la plus performante dans BigQuery ?",
    options: [
      { label: "A", text: "Normaliser les données en 3 tables séparées (transactions, articles, livraisons) liées par des clés étrangères" },
      { label: "B", text: "Utiliser une table dénormalisée avec des colonnes STRUCT imbriquées et des ARRAY pour les articles" },
      { label: "C", text: "Stocker les articles comme une chaîne JSON dans une colonne STRING" },
      { label: "D", text: "Créer une ligne par article avec duplication des informations de transaction" }
    ],
    correctAnswers: ["B"],
    explanation: "BigQuery est optimisé pour les schémas dénormalisés. Les types STRUCT et ARRAY permettent d'imbriquer les données associées sans duplication ni jointures coûteuses. C'est le pattern recommandé par Google pour les données imbriquées/répétées.",
    whyOthersWrong: {
      "A": "La normalisation en plusieurs tables nécessite des JOIN coûteux dans BigQuery, qui facture les données scannées. La dénormalisation est préférable.",
      "C": "Stocker du JSON dans une STRING empêche BigQuery d'optimiser les requêtes sur les champs imbriqués et rend le filtrage inefficace.",
      "D": "Dupliquer les informations de transaction pour chaque article gaspille du stockage et complique les agrégations au niveau transaction."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/nested-repeated"
  }
];
