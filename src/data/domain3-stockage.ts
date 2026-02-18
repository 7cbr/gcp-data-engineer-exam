import type { Question } from './types';

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
  },
  {
    id: 67,
    domain: "Stockage des données",
    difficulty: "facile",
    question: "Votre application web doit stocker des sessions utilisateur avec une expiration automatique après 30 minutes d'inactivité. Les données de session sont de petite taille (quelques Ko) et doivent être accessibles en moins de 5 ms. Quel service GCP est le plus adapté ?",
    options: [
      { label: "A", text: "Cloud Firestore" },
      { label: "B", text: "Cloud Memorystore (Redis)" },
      { label: "C", text: "Cloud Bigtable" },
      { label: "D", text: "Cloud SQL" }
    ],
    correctAnswers: ["B"],
    explanation: "Cloud Memorystore (Redis) est un cache en mémoire managé offrant des latences sub-milliseconde. Redis supporte nativement l'expiration automatique des clés (TTL), ce qui est parfait pour les sessions avec expiration après 30 minutes d'inactivité. Pour de petites données de session, c'est la solution la plus performante.",
    whyOthersWrong: {
      "A": "Firestore offre des latences de l'ordre de 10-50 ms, supérieures à l'exigence de 5 ms. De plus, l'expiration automatique des documents n'est pas une fonctionnalité native simple de Firestore.",
      "C": "Bigtable est conçu pour les charges de travail analytiques à grande échelle, pas pour le stockage de petites données de session. C'est surqualifié et plus coûteux pour ce cas d'usage.",
      "D": "Cloud SQL a une latence plus élevée que Redis pour les lectures simples et ne supporte pas nativement l'expiration automatique des lignes."
    },
    gcpLink: "https://cloud.google.com/memorystore/docs/redis/redis-overview"
  },
  {
    id: 68,
    domain: "Stockage des données",
    difficulty: "intermédiaire",
    question: "Votre entreprise stocke 500 To de données dans BigQuery. Les données de plus de 90 jours ne sont quasiment jamais requêtées mais doivent rester accessibles en SQL pour des audits ponctuels. Comment optimiser les coûts de stockage sans perdre l'accès SQL ?",
    options: [
      { label: "A", text: "Exporter les données anciennes vers Cloud Storage en Parquet et les supprimer de BigQuery" },
      { label: "B", text: "Ne rien faire : BigQuery applique automatiquement un tarif de stockage long-terme réduit pour les données non modifiées depuis 90 jours" },
      { label: "C", text: "Compresser les tables BigQuery anciennes pour réduire le volume" },
      { label: "D", text: "Migrer les données anciennes vers Bigtable pour un stockage moins cher" }
    ],
    correctAnswers: ["B"],
    explanation: "BigQuery applique automatiquement un tarif de stockage long-terme (environ 50% moins cher) aux tables et partitions qui n'ont pas été modifiées depuis 90 jours. Les données restent pleinement accessibles en SQL sans aucune action de votre part. Si une table est modifiée, elle repasse temporairement au tarif standard.",
    whyOthersWrong: {
      "A": "Exporter vers Cloud Storage fait perdre l'accès SQL natif BigQuery. Les requêtes sur des fichiers Parquet externes sont moins performantes et nécessitent des tables externes ou BigLake.",
      "C": "BigQuery utilise déjà un format de stockage compressé en interne (Capacitor). Il n'est pas possible de compresser davantage les tables manuellement.",
      "D": "Bigtable n'est pas moins cher que le stockage long-terme de BigQuery et ne supporte pas les requêtes SQL. Cette migration perdrait la fonctionnalité d'audit SQL."
    },
    gcpLink: "https://cloud.google.com/bigquery/pricing#storage"
  },
  {
    id: 69,
    domain: "Stockage des données",
    difficulty: "intermédiaire",
    question: "Votre équipe de data science a besoin d'un espace de stockage partagé NFS accessible depuis plusieurs VMs Compute Engine et des notebooks Vertex AI Workbench simultanément. Les données incluent des datasets de 2 To au format HDF5 qui nécessitent un accès aléatoire rapide. Quel service de stockage est le plus adapté ?",
    options: [
      { label: "A", text: "Cloud Storage avec FUSE (gcsfuse)" },
      { label: "B", text: "Cloud Filestore (tier Enterprise)" },
      { label: "C", text: "Persistent Disk SSD partagé entre les VMs" },
      { label: "D", text: "Cloud Storage classe Standard avec des copies locales sur chaque VM" }
    ],
    correctAnswers: ["B"],
    explanation: "Cloud Filestore fournit un système de fichiers NFS managé haute performance, accessible simultanément depuis plusieurs VMs et notebooks. Le tier Enterprise offre les IOPS et le débit nécessaires pour un accès aléatoire rapide aux fichiers HDF5 volumineux, avec la cohérence d'un vrai système de fichiers POSIX.",
    whyOthersWrong: {
      "A": "gcsfuse monte Cloud Storage comme un système de fichiers mais avec des limitations de performance significatives pour l'accès aléatoire (latence élevée, pas de POSIX complet). Les fichiers HDF5 avec accès aléatoire seraient très lents.",
      "C": "Un Persistent Disk ne peut être attaché en lecture-écriture qu'à une seule VM. Le mode multi-writer est limité et ne supporte pas les accès NFS standards depuis des notebooks Vertex AI.",
      "D": "Copier 2 To sur chaque VM gaspille du stockage, crée des problèmes de synchronisation entre les copies, et ne permet pas le travail collaboratif sur les mêmes fichiers."
    },
    gcpLink: "https://cloud.google.com/filestore/docs/overview"
  },
  {
    id: 70,
    domain: "Stockage des données",
    difficulty: "difficile",
    question: "Vous devez concevoir la stratégie de partitionnement d'une table BigQuery de logs applicatifs qui reçoit 10 milliards de lignes par jour. Les requêtes filtrent principalement par timestamp et par application_name (50 applications différentes). La rétention est de 1 an. Quelle stratégie de partitionnement et clustering est optimale ?",
    options: [
      { label: "A", text: "Partitionnement par timestamp (granularité horaire) et clustering par application_name" },
      { label: "B", text: "Partitionnement par application_name et clustering par timestamp" },
      { label: "C", text: "Partitionnement par timestamp (granularité journalière) et clustering par application_name, avec une date d'expiration de partition de 365 jours" },
      { label: "D", text: "Pas de partitionnement, uniquement du clustering par timestamp et application_name" }
    ],
    correctAnswers: ["C"],
    explanation: "Le partitionnement journalier par timestamp est idéal car il correspond au pattern de requête principal et crée 365 partitions (bien sous la limite de 4 000). Le clustering par application_name optimise les requêtes filtrées par application dans chaque partition. L'expiration de partition à 365 jours gère automatiquement la rétention sans maintenance.",
    whyOthersWrong: {
      "A": "Le partitionnement horaire créerait 8 760 partitions par an (24h x 365j), dépassant la limite de 4 000 partitions de BigQuery. La granularité horaire est trop fine pour cette rétention.",
      "B": "Partitionner par application_name (50 valeurs) est possible mais les requêtes filtrant par timestamp devront scanner toutes les 50 partitions. Le timestamp est un meilleur candidat au partitionnement car il a une cardinalité plus élevée et est le filtre principal.",
      "D": "Sans partitionnement, chaque requête scanne l'intégralité de la table (10 milliards x 365 = 3 650 milliards de lignes). Le clustering seul ne peut pas éviter le scan de toutes les données sans partitionnement."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/partitioned-tables"
  },
  {
    id: 71,
    domain: "Stockage des données",
    difficulty: "difficile",
    question: "Votre entreprise utilise Cloud Spanner comme base de données transactionnelle principale. Vous observez des hot spots sur certains nœuds causant des latences de 500 ms au lieu des 10 ms habituels. Les tables utilisent un UUID v4 comme clé primaire. Après investigation, vous découvrez que la table de transactions est accédée massivement par des lectures séquentielles sur une plage de timestamps. Comment résolvez-vous ce problème ?",
    options: [
      { label: "A", text: "Augmenter le nombre de nœuds Spanner pour distribuer la charge" },
      { label: "B", text: "Créer un index entrelacé (interleaved index) sur la colonne timestamp dans la table parente" },
      { label: "C", text: "Ajouter un index secondaire sur le timestamp et utiliser des read staleness pour les lectures non critiques" },
      { label: "D", text: "Remplacer Cloud Spanner par Cloud SQL qui gère mieux les lectures séquentielles" }
    ],
    correctAnswers: ["C"],
    explanation: "Un index secondaire sur le timestamp distribue les lectures sur cet index. Les read staleness (lectures avec un délai configurable, par exemple 15 secondes) permettent à Spanner de lire depuis n'importe quel réplica au lieu du leader uniquement, réduisant considérablement la contention et les hot spots sur les lectures non critiques.",
    whyOthersWrong: {
      "A": "Ajouter des nœuds ne résout pas un hot spot car le problème est la concentration de la charge sur une plage de données spécifique, pas un manque de capacité globale.",
      "B": "Un index entrelacé (interleaved table) est une optimisation pour les relations parent-enfant, pas pour résoudre les hot spots sur les lectures séquentielles par timestamp.",
      "D": "Cloud SQL ne peut pas gérer la même échelle que Cloud Spanner et aurait les mêmes problèmes de hot spots sur les lectures séquentielles, voire pires."
    },
    gcpLink: "https://cloud.google.com/spanner/docs/reads#read_types"
  },
  {
    id: 72,
    domain: "Stockage des données",
    difficulty: "facile",
    question: "Quelle est la durée maximale par défaut du time travel (voyage dans le temps) dans BigQuery, permettant de restaurer ou requêter des données supprimées ou modifiées ?",
    options: [
      { label: "A", text: "24 heures" },
      { label: "B", text: "7 jours" },
      { label: "C", text: "30 jours" },
      { label: "D", text: "90 jours" }
    ],
    correctAnswers: ["B"],
    explanation: "BigQuery permet de requêter des données historiques jusqu'à 7 jours en arrière via la clause FOR SYSTEM_TIME AS OF ou via les décorateurs de table. Cette fonctionnalité, appelée time travel, est configurable entre 2 et 7 jours par dataset.",
    whyOthersWrong: {
      "A": "24 heures est insuffisant. La fenêtre de time travel par défaut est de 7 jours, pas 24 heures.",
      "C": "30 jours dépasse la limite maximale du time travel BigQuery. La limite est de 7 jours maximum.",
      "D": "90 jours n'est pas la durée du time travel. C'est le seuil après lequel BigQuery applique le tarif de stockage long-terme."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/time-travel"
  },
  {
    id: 73,
    domain: "Stockage des données",
    difficulty: "intermédiaire",
    question: "Votre entreprise doit choisir entre Cloud SQL et AlloyDB pour héberger une base de données PostgreSQL qui gère à la fois des requêtes transactionnelles (OLTP) et des requêtes analytiques (OLAP). Le volume de données est de 2 To avec 10 000 requêtes par seconde en lecture. Quel service est le plus adapté et pourquoi ?",
    options: [
      { label: "A", text: "Cloud SQL PostgreSQL avec des réplicas de lecture pour distribuer la charge" },
      { label: "B", text: "AlloyDB pour PostgreSQL, qui offre un moteur analytique intégré basé sur des index columnar en plus du moteur transactionnel" },
      { label: "C", text: "Cloud SQL PostgreSQL avec une instance de très grande taille (96 vCPU)" },
      { label: "D", text: "Utiliser deux bases séparées : Cloud SQL pour l'OLTP et BigQuery pour l'OLAP" }
    ],
    correctAnswers: ["B"],
    explanation: "AlloyDB est un service PostgreSQL managé par Google qui intègre un moteur analytique columnar en plus du moteur transactionnel row-based. Les index columnar accélèrent les requêtes analytiques jusqu'à 100x sans impact sur les performances transactionnelles, ce qui en fait la solution idéale pour les charges de travail hybrides HTAP.",
    whyOthersWrong: {
      "A": "Cloud SQL avec réplicas de lecture distribue la charge de lecture mais n'optimise pas les requêtes analytiques. Les réplicas utilisent le même moteur row-based, peu performant pour l'OLAP.",
      "C": "Augmenter la taille de l'instance est du scaling vertical qui a des limites. Cela n'améliore pas fondamentalement les performances des requêtes analytiques sur un moteur row-based.",
      "D": "Séparer en deux bases ajoute de la complexité de synchronisation, de la latence entre les systèmes et des coûts de duplication de données. AlloyDB unifie les deux besoins."
    },
    gcpLink: "https://cloud.google.com/alloydb/docs/overview"
  },
  {
    id: 74,
    domain: "Stockage des données",
    difficulty: "difficile",
    question: "Vous gérez un data warehouse BigQuery avec des tables factuelles et dimensionnelles. L'équipe BI signale que certaines requêtes de jointure entre la table de faits (2 To, partitionnée par date) et la table de dimensions produits (500 Mo) sont lentes. Quelle optimisation de BigQuery est la plus efficace pour accélérer ces jointures ? (Sélectionnez 2 réponses)",
    options: [
      { label: "A", text: "Créer une vue matérialisée qui pré-calcule la jointure entre les tables de faits et de dimensions" },
      { label: "B", text: "Activer le cache de résultats BigQuery et s'assurer que les requêtes sont déterministes" },
      { label: "C", text: "Dénormaliser en intégrant les champs de la dimension directement dans la table de faits avec des STRUCT" },
      { label: "D", text: "Créer un index B-tree sur la clé de jointure de la table de faits" }
    ],
    correctAnswers: ["A", "C"],
    explanation: "Les vues matérialisées pré-calculent et stockent les résultats de jointures fréquentes, offrant des performances proches d'une table dénormalisée avec une maintenance automatique. La dénormalisation avec STRUCT élimine complètement le JOIN à l'exécution. Les deux approches réduisent drastiquement le temps de requête.",
    whyOthersWrong: {
      "B": "Le cache de résultats ne fonctionne que pour des requêtes identiques et est invalidé dès que les données changent. Pour une table de faits mise à jour quotidiennement, le cache est rarement utile pour les jointures.",
      "D": "BigQuery ne supporte pas les index B-tree traditionnels. Son architecture columnar et distribuée optimise les requêtes différemment, via le partitionnement et le clustering."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/materialized-views-intro"
  },
  {
    id: 75,
    domain: "Stockage des données",
    difficulty: "intermédiaire",
    question: "Votre application utilise Cloud Spanner pour les données transactionnelles et BigQuery pour l'analytique. Vous devez synchroniser les données de Spanner vers BigQuery en quasi-temps réel pour alimenter des tableaux de bord. Quelle est la méthode la plus simple et recommandée ?",
    options: [
      { label: "A", text: "Configurer la fédération Spanner-BigQuery pour requêter Spanner directement depuis BigQuery" },
      { label: "B", text: "Utiliser le connecteur Spanner change streams vers Dataflow, qui écrit dans BigQuery" },
      { label: "C", text: "Exporter les données Spanner vers Cloud Storage toutes les heures et les charger dans BigQuery" },
      { label: "D", text: "Utiliser Datastream pour capturer les changements Spanner vers BigQuery" }
    ],
    correctAnswers: ["B"],
    explanation: "Spanner change streams capturent en continu les modifications (INSERT, UPDATE, DELETE) sur les tables Spanner. Couplés avec un pipeline Dataflow utilisant le connecteur natif SpannerIO.readChangeStream, les changements sont répliqués en quasi-temps réel vers BigQuery. C'est la méthode CDC native recommandée pour Spanner.",
    whyOthersWrong: {
      "A": "La fédération Spanner-BigQuery permet de requêter Spanner depuis BigQuery mais envoie les requêtes analytiques directement sur Spanner, impactant ses performances transactionnelles. Ce n'est pas adapté pour alimenter des tableaux de bord.",
      "C": "L'export toutes les heures n'est pas du quasi-temps réel et nécessite un processus batch qui crée un délai d'une heure minimum dans les données du tableau de bord.",
      "D": "Datastream ne supporte pas Cloud Spanner comme source. Il est conçu pour les bases MySQL, PostgreSQL et Oracle."
    },
    gcpLink: "https://cloud.google.com/spanner/docs/change-streams"
  },
  {
    id: 111,
    domain: "Stockage des données",
    difficulty: "facile",
    question: "Votre équipe développe une application web qui utilise Cloud SQL PostgreSQL. Les lectures sont 10 fois plus fréquentes que les écritures. Les utilisateurs dans plusieurs régions européennes se plaignent de latences élevées. Comment améliorez-vous les performances de lecture sans modifier l'application ?",
    options: [
      { label: "A", text: "Augmenter la taille de l'instance Cloud SQL (scaling vertical)" },
      { label: "B", text: "Créer des réplicas de lecture Cloud SQL dans les régions européennes concernées" },
      { label: "C", text: "Migrer vers Cloud Spanner pour une distribution multi-régionale" },
      { label: "D", text: "Activer le cache de requêtes PostgreSQL" }
    ],
    correctAnswers: ["B"],
    explanation: "Les réplicas de lecture Cloud SQL permettent de distribuer les requêtes de lecture sur des instances secondaires dans d'autres régions, réduisant la latence pour les utilisateurs distants. L'application peut être configurée pour diriger les lectures vers le réplica le plus proche sans modification du code applicatif (via le proxy Cloud SQL).",
    whyOthersWrong: {
      "A": "Le scaling vertical améliore les performances globales mais ne résout pas la latence due à la distance géographique. Les utilisateurs loin de la région du serveur auront toujours une latence réseau élevée.",
      "C": "Migrer vers Spanner est une refonte majeure qui n'est pas nécessaire. Cloud SQL avec réplicas de lecture suffit pour ce cas d'usage et est beaucoup moins coûteux.",
      "D": "Le cache de requêtes PostgreSQL aide pour les requêtes répétitives identiques mais ne résout pas la latence géographique. De plus, il est désactivé par défaut dans les versions récentes de PostgreSQL."
    },
    gcpLink: "https://cloud.google.com/sql/docs/postgres/replication"
  },
  {
    id: 112,
    domain: "Stockage des données",
    difficulty: "intermédiaire",
    question: "Votre table BigQuery de 10 To contient des données de logs avec un champ 'timestamp' et un champ 'severity' (INFO, WARNING, ERROR, CRITICAL). 95% des requêtes filtrent par timestamp ET severity. La table est déjà partitionnée par timestamp (jour). Les requêtes filtrées par severity='ERROR' scannent encore trop de données. Quelle optimisation appliquez-vous ?",
    options: [
      { label: "A", text: "Ajouter un clustering sur la colonne severity" },
      { label: "B", text: "Créer une table séparée pour chaque niveau de severity" },
      { label: "C", text: "Partitionner par severity au lieu de timestamp" },
      { label: "D", text: "Créer un index B-tree sur severity" }
    ],
    correctAnswers: ["A"],
    explanation: "Le clustering BigQuery trie physiquement les données à l'intérieur de chaque partition selon les colonnes spécifiées. En ajoutant un clustering sur severity, BigQuery peut éliminer les blocs de données qui ne correspondent pas au filtre severity='ERROR', réduisant drastiquement le volume scanné dans chaque partition journalière.",
    whyOthersWrong: {
      "B": "Créer des tables séparées par severity complexifie les requêtes cross-severity, augmente la maintenance, et perd la flexibilité du clustering qui gère ce cas nativement.",
      "C": "Partitionner par severity créerait seulement 4 partitions (INFO, WARNING, ERROR, CRITICAL), perdant l'avantage du partitionnement par timestamp qui est le filtre principal. On ne peut pas partitionner sur deux colonnes.",
      "D": "BigQuery ne supporte pas les index B-tree. Le partitionnement et le clustering sont les mécanismes d'optimisation natifs de BigQuery."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/clustered-tables"
  },
  {
    id: 113,
    domain: "Stockage des données",
    difficulty: "difficile",
    question: "Votre entreprise gère un catalogue produit de 50 millions de références avec des recherches full-text, des filtres à facettes (catégorie, prix, marque) et un tri par pertinence. La latence de recherche doit être inférieure à 100 ms. Les données sont actuellement dans BigQuery. Quel service de stockage est le plus adapté pour servir ces recherches ?",
    options: [
      { label: "A", text: "BigQuery avec des requêtes LIKE et ORDER BY pour la recherche" },
      { label: "B", text: "Cloud SQL PostgreSQL avec l'extension full-text search (tsvector)" },
      { label: "C", text: "Vertex AI Vector Search pour la recherche sémantique" },
      { label: "D", text: "Elasticsearch déployé sur GKE ou Elastic Cloud sur GCP" }
    ],
    correctAnswers: ["D"],
    explanation: "Elasticsearch est le moteur de recherche le plus adapté pour le full-text search avec facettes et tri par pertinence à faible latence. Déployé sur GKE ou via Elastic Cloud (partenaire GCP), il gère efficacement 50 millions de documents avec des recherches en < 100 ms, le scoring de pertinence et les agrégations pour les facettes.",
    whyOthersWrong: {
      "A": "BigQuery n'est pas conçu pour la recherche full-text à faible latence. Les requêtes LIKE scannent les données sans index de recherche, et la latence dépasse largement 100 ms.",
      "B": "PostgreSQL avec tsvector fonctionne pour des volumes modérés mais 50 millions de références avec des facettes complexes et une latence < 100 ms dépassent ses capacités optimales.",
      "C": "Vertex AI Vector Search est conçu pour la recherche sémantique par similarité vectorielle, pas pour le full-text search avec facettes et filtres structurés."
    }
  },
  {
    id: 114,
    domain: "Stockage des données",
    difficulty: "intermédiaire",
    question: "Votre bucket Cloud Storage contient des données critiques. Un stagiaire supprime accidentellement un dossier contenant 10 000 fichiers importants. Vous devez restaurer les fichiers. Quelle fonctionnalité aurait dû être activée pour prévenir ce scénario ?",
    options: [
      { label: "A", text: "Le versioning des objets Cloud Storage qui conserve les anciennes versions des objets supprimés ou écrasés" },
      { label: "B", text: "Les Access Control Lists (ACL) pour empêcher la suppression" },
      { label: "C", text: "La réplication multi-régionale du bucket" },
      { label: "D", text: "Le chiffrement CMEK des objets" }
    ],
    correctAnswers: ["A"],
    explanation: "Le versioning des objets Cloud Storage conserve automatiquement toutes les versions précédentes des objets, y compris les objets supprimés. Avec le versioning activé, une suppression crée simplement une version marquée comme supprimée, et les versions précédentes restent accessibles pour restauration. Combiné avec des politiques de cycle de vie pour gérer les anciennes versions, c'est la protection standard contre les suppressions accidentelles.",
    whyOthersWrong: {
      "B": "Les ACL contrôlent qui peut accéder aux objets mais ne protègent pas contre la suppression par un utilisateur autorisé (le stagiaire avait les permissions nécessaires).",
      "C": "La réplication multi-régionale assure la durabilité contre les pannes de datacenter mais réplique aussi les suppressions. Si un fichier est supprimé, la suppression est répliquée dans toutes les régions.",
      "D": "Le chiffrement CMEK protège la confidentialité des données mais ne prévient pas les suppressions accidentelles."
    },
    gcpLink: "https://cloud.google.com/storage/docs/object-versioning"
  },
  {
    id: 115,
    domain: "Stockage des données",
    difficulty: "difficile",
    question: "Votre entreprise utilise BigQuery et souhaite optimiser les coûts des requêtes récurrentes. Un rapport exécuté 50 fois par jour par différents utilisateurs agrège les ventes par région et par jour sur les 7 derniers jours. Les données source sont mises à jour toutes les heures. Quelle fonctionnalité BigQuery est la plus adaptée pour optimiser ce cas d'usage ?",
    options: [
      { label: "A", text: "Le cache de résultats BigQuery qui réutilise automatiquement les résultats identiques" },
      { label: "B", text: "Une vue matérialisée qui pré-calcule l'agrégation et est automatiquement rafraîchie par BigQuery lors des modifications des données source" },
      { label: "C", text: "Une table planifiée (scheduled query) qui recalcule les résultats toutes les heures" },
      { label: "D", text: "Exporter les résultats dans Memorystore Redis pour un accès rapide" }
    ],
    correctAnswers: ["B"],
    explanation: "Les vues matérialisées BigQuery pré-calculent et stockent les résultats des agrégations. BigQuery les maintient automatiquement à jour lorsque les données source changent, de manière incrémentale (sans recalcul complet). Les requêtes qui matchent la vue sont automatiquement redirigées vers la vue matérialisée, réduisant les coûts et la latence pour les 50 exécutions quotidiennes.",
    whyOthersWrong: {
      "A": "Le cache de résultats ne fonctionne que pour des requêtes strictement identiques et est invalidé à chaque modification des données source (ici toutes les heures). Avec des filtres de date glissants, le cache est rarement utilisable.",
      "C": "Une requête planifiée recalcule les résultats à intervalle fixe mais ne se met pas à jour automatiquement entre les exécutions. Elle crée aussi une table séparée qui nécessite des modifications des requêtes des utilisateurs.",
      "D": "Exporter vers Redis ajoute un composant d'infrastructure à gérer, nécessite un mécanisme de rafraîchissement, et perd les avantages natifs de BigQuery (SQL, contrôle d'accès, monitoring)."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/materialized-views-intro"
  }
];
