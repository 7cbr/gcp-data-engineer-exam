import type { Question } from './types';

export const domain5Questions: Question[] = [
  {
    id: 34,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "facile",
    question: "Un analyste data de votre entreprise de retail souhaite prédire les ventes mensuelles par magasin en utilisant les données historiques stockées dans BigQuery. Il maîtrise SQL mais n'a aucune expérience en Python ou en frameworks ML. Quelle solution lui recommandez-vous ?",
    options: [
      { label: "A", text: "Entraîner un modèle avec TensorFlow sur Vertex AI Workbench" },
      { label: "B", text: "Utiliser BigQuery ML pour créer et entraîner un modèle directement en SQL" },
      { label: "C", text: "Déployer un modèle pré-entraîné depuis Vertex AI Model Garden" },
      { label: "D", text: "Utiliser AutoML Tables via l'interface Vertex AI" }
    ],
    correctAnswers: ["B"],
    explanation: "BigQuery ML permet de créer, entraîner et déployer des modèles de machine learning directement en SQL, sans quitter BigQuery. C'est la solution idéale pour un analyste SQL qui souhaite faire de la prédiction sur des données déjà dans BigQuery, sans avoir besoin de compétences en Python.",
    whyOthersWrong: {
      "A": "TensorFlow nécessite des compétences en Python et en frameworks ML, ce que l'analyste ne possède pas. C'est une solution plus complexe que nécessaire pour ce cas d'usage.",
      "C": "Un modèle pré-entraîné du Model Garden ne sera pas adapté aux données spécifiques de ventes par magasin. Il faut un modèle entraîné sur les données historiques de l'entreprise.",
      "D": "AutoML Tables pourrait fonctionner mais nécessite d'exporter les données et d'utiliser l'interface Vertex AI. BigQuery ML est plus direct et naturel pour un utilisateur SQL."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/bqml-introduction"
  },
  {
    id: 35,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "facile",
    question: "Votre entreprise développe une application mobile qui doit extraire automatiquement le texte des reçus photographiés par les utilisateurs pour automatiser les notes de frais. Vous n'avez pas d'équipe ML dédiée. Quelle solution GCP est la plus rapide à mettre en oeuvre ?",
    options: [
      { label: "A", text: "Entraîner un modèle de reconnaissance de texte personnalisé avec Vertex AI" },
      { label: "B", text: "Utiliser l'API Cloud Vision (OCR) pré-entraînée de Google" },
      { label: "C", text: "Déployer un modèle Tesseract OCR sur Compute Engine" },
      { label: "D", text: "Utiliser Document AI pour l'extraction structurée des reçus" }
    ],
    correctAnswers: ["D"],
    explanation: "Document AI propose des processeurs pré-entraînés spécialisés, dont un pour les reçus (Expense Parser), qui extrait automatiquement les champs structurés (montant, date, fournisseur, TVA). C'est plus adapté qu'un OCR générique car il comprend la structure sémantique des reçus.",
    whyOthersWrong: {
      "A": "Entraîner un modèle personnalisé est excessif quand des solutions pré-entraînées existent. Cela nécessite des données d'entraînement, du temps et une expertise ML.",
      "B": "Cloud Vision OCR extrait du texte brut mais ne comprend pas la structure d'un reçu. Il faudrait ensuite coder toute la logique d'extraction des champs (montant, date, etc.).",
      "C": "Déployer Tesseract nécessite de gérer l'infrastructure, et ses performances sur les reçus sont inférieures aux solutions cloud managées de Google."
    },
    gcpLink: "https://cloud.google.com/document-ai/docs/overview"
  },
  {
    id: 36,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "intermédiaire",
    question: "Votre équipe de data science a développé un modèle de détection de fraude en Python avec scikit-learn. Le modèle doit être déployé en production pour servir des prédictions en temps réel avec une latence inférieure à 100 ms et doit gérer automatiquement les pics de trafic. Quelle solution choisissez-vous ?",
    options: [
      { label: "A", text: "Déployer le modèle dans une Cloud Function déclenchée par des requêtes HTTP" },
      { label: "B", text: "Créer un conteneur Docker avec le modèle et le déployer sur un cluster GKE" },
      { label: "C", text: "Déployer le modèle sur un endpoint Vertex AI avec auto-scaling" },
      { label: "D", text: "Utiliser BigQuery ML pour servir les prédictions via la fonction ML.PREDICT" }
    ],
    correctAnswers: ["C"],
    explanation: "Vertex AI Endpoints permet de déployer des modèles custom (scikit-learn, TensorFlow, PyTorch, XGBoost) avec auto-scaling automatique, monitoring des prédictions, et une latence optimisée. C'est la solution managée qui répond à toutes les exigences : temps réel, faible latence et scaling automatique.",
    whyOthersWrong: {
      "A": "Cloud Functions a des limites de cold start (latence initiale élevée) et de mémoire qui peuvent poser problème pour un modèle ML. Ce n'est pas conçu pour du serving ML à faible latence.",
      "B": "GKE fonctionne mais nécessite de gérer l'infrastructure Kubernetes, la conteneurisation, l'auto-scaling et le monitoring manuellement. Vertex AI Endpoints est une solution managée qui élimine cette complexité.",
      "D": "BigQuery ML est conçu pour des analyses batch ou des prédictions à l'intérieur de requêtes SQL. La latence de BigQuery (secondes) ne convient pas pour du temps réel à moins de 100 ms."
    },
    gcpLink: "https://cloud.google.com/vertex-ai/docs/predictions/overview"
  },
  {
    id: 37,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "intermédiaire",
    question: "Votre équipe ML développe un modèle de recommandation produit. Plusieurs features (caractéristiques) comme les préférences utilisateur, l'historique d'achat et les attributs produits sont calculées par différentes équipes et utilisées dans plusieurs modèles. Vous constatez des incohérences entre les features utilisées en entraînement et celles utilisées en serving. Comment résolvez-vous ce problème ?",
    options: [
      { label: "A", text: "Stocker toutes les features dans une table BigQuery partagée entre les équipes" },
      { label: "B", text: "Utiliser Vertex AI Feature Store pour centraliser, versionner et servir les features de manière cohérente" },
      { label: "C", text: "Créer un pipeline Dataflow qui calcule les features en temps réel pour chaque prédiction" },
      { label: "D", text: "Documenter les features dans un fichier de configuration partagé sur Cloud Storage" }
    ],
    correctAnswers: ["B"],
    explanation: "Vertex AI Feature Store est un référentiel centralisé qui stocke, versionne et sert les features de manière cohérente entre l'entraînement et le serving. Il élimine le training-serving skew en garantissant que les mêmes transformations et valeurs sont utilisées dans les deux contextes.",
    whyOthersWrong: {
      "A": "Une table BigQuery partagée ne résout pas le problème de cohérence entraînement/serving car la latence de BigQuery est trop élevée pour le serving en ligne, et il n'y a pas de gestion de versions ni de point-in-time lookup.",
      "C": "Recalculer les features en temps réel à chaque prédiction est coûteux, lent, et ne garantit pas la cohérence avec les features utilisées lors de l'entraînement.",
      "D": "Un fichier de configuration ne stocke pas les valeurs des features elles-mêmes et ne résout pas le problème d'incohérence entre entraînement et serving."
    },
    gcpLink: "https://cloud.google.com/vertex-ai/docs/featurestore/overview"
  },
  {
    id: 38,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "intermédiaire",
    question: "Votre entreprise souhaite classifier automatiquement des images de défauts sur une chaîne de production industrielle. Vous disposez de 5 000 images étiquetées réparties en 10 catégories de défauts. Votre équipe n'a pas d'expertise approfondie en deep learning ni en configuration de réseaux de neurones. Quelle approche est la plus adaptée ?",
    options: [
      { label: "A", text: "Entraîner un réseau de neurones convolutif personnalisé avec TensorFlow sur Vertex AI Training" },
      { label: "B", text: "Utiliser AutoML Vision de Vertex AI pour entraîner un modèle de classification d'images" },
      { label: "C", text: "Utiliser l'API Cloud Vision pour la détection de défauts" },
      { label: "D", text: "Déployer un modèle ResNet pré-entraîné depuis TensorFlow Hub sans fine-tuning" }
    ],
    correctAnswers: ["B"],
    explanation: "AutoML Vision permet d'entraîner un modèle de classification d'images performant sans expertise en deep learning. Il gère automatiquement l'architecture du réseau, le transfer learning, les hyperparamètres et l'augmentation de données. 5 000 images étiquetées sont suffisantes pour AutoML.",
    whyOthersWrong: {
      "A": "Entraîner un CNN personnalisé avec TensorFlow nécessite une expertise en deep learning que l'équipe n'a pas. C'est plus complexe et plus long pour un résultat potentiellement similaire à AutoML.",
      "C": "L'API Cloud Vision reconnaît des objets génériques mais n'est pas entraînée sur des défauts industriels spécifiques. Elle ne peut pas classifier des types de défauts propres à votre chaîne de production.",
      "D": "Un modèle ResNet pré-entraîné sur ImageNet sans fine-tuning ne reconnaîtra pas des défauts industriels spécifiques. Le fine-tuning est nécessaire, et AutoML le fait automatiquement."
    },
    gcpLink: "https://cloud.google.com/vertex-ai/docs/image-data/classification/overview"
  },
  {
    id: 39,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "intermédiaire",
    question: "Votre équipe a développé un pipeline ML qui comprend le prétraitement des données, l'entraînement du modèle, l'évaluation et le déploiement conditionnel (uniquement si les métriques dépassent un seuil). Ce pipeline doit s'exécuter automatiquement chaque semaine et être reproductible. Quel outil utilisez-vous pour orchestrer ce pipeline ML ?",
    options: [
      { label: "A", text: "Cloud Composer (Apache Airflow) avec des opérateurs Vertex AI" },
      { label: "B", text: "Vertex AI Pipelines basé sur Kubeflow Pipelines" },
      { label: "C", text: "Cloud Scheduler déclenchant un script Python sur Compute Engine" },
      { label: "D", text: "Cloud Build avec des étapes de build séquentielles" }
    ],
    correctAnswers: ["B"],
    explanation: "Vertex AI Pipelines, basé sur Kubeflow Pipelines ou TFX, est spécialement conçu pour orchestrer des workflows ML. Il offre le suivi des artefacts (datasets, modèles, métriques), la reproductibilité, le déploiement conditionnel, et s'intègre nativement avec tous les composants de Vertex AI.",
    whyOthersWrong: {
      "A": "Cloud Composer peut orchestrer des pipelines ML mais est plus généraliste et plus coûteux. Il nécessite un environnement Airflow permanent. Vertex AI Pipelines est optimisé spécifiquement pour les workflows ML avec un suivi natif des artefacts ML.",
      "C": "Un script Python sur Compute Engine n'offre pas de reproductibilité, de suivi des artefacts, ni de gestion des dépendances entre étapes. Ce n'est pas une solution robuste pour un pipeline ML en production.",
      "D": "Cloud Build est conçu pour le CI/CD logiciel, pas pour l'orchestration de pipelines ML. Il ne gère pas les artefacts ML ni le déploiement conditionnel basé sur des métriques de modèle."
    },
    gcpLink: "https://cloud.google.com/vertex-ai/docs/pipelines/introduction"
  },
  {
    id: 40,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "difficile",
    question: "Vous entraînez un modèle de deep learning avec TensorFlow qui nécessite de traiter un dataset de 500 Go d'images. L'entraînement sur un seul GPU prend 5 jours. Vous devez réduire le temps d'entraînement à moins de 12 heures tout en minimisant les coûts. Quelle stratégie adoptez-vous sur GCP ?",
    options: [
      { label: "A", text: "Utiliser une VM Compute Engine avec 8 GPU NVIDIA A100 et l'entraînement distribué avec tf.distribute.MirroredStrategy" },
      { label: "B", text: "Utiliser Vertex AI Training avec un cluster de TPU v4 Pod et la stratégie de distribution TPU" },
      { label: "C", text: "Utiliser Vertex AI Training avec un job distribué multi-worker GPU et des instances préemptives pour réduire les coûts" },
      { label: "D", text: "Réduire la taille du dataset à 100 Go en échantillonnant les données pour accélérer l'entraînement" }
    ],
    correctAnswers: ["C"],
    explanation: "Vertex AI Training avec un job distribué multi-worker GPU permet de paralléliser l'entraînement sur plusieurs machines. L'utilisation d'instances préemptives (Spot VMs) réduit les coûts de 60-91%. Vertex AI gère automatiquement le provisionnement du cluster, la distribution et les checkpoints pour la reprise en cas de préemption.",
    whyOthersWrong: {
      "A": "Une seule VM avec 8 GPU est limitée en scalabilité et ne permet pas de bénéficier des instances préemptives efficacement (si la VM est préemptée, tout l'entraînement est perdu). Vertex AI gère mieux la distribution et la tolérance aux pannes.",
      "B": "Les TPU v4 Pod sont très performants mais significativement plus coûteux que les GPU avec instances préemptives. Pour un objectif de minimisation des coûts, les GPU préemptifs sont préférables.",
      "D": "Réduire le dataset de 80% dégraderait significativement les performances du modèle. Le sous-échantillonnage n'est pas une stratégie de scaling valide quand les données sont importantes pour la qualité du modèle."
    },
    gcpLink: "https://cloud.google.com/vertex-ai/docs/training/distributed-training"
  },
  {
    id: 41,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "difficile",
    question: "Votre modèle de scoring crédit est en production depuis 6 mois sur un endpoint Vertex AI. L'équipe risque signale que les performances du modèle semblent se dégrader, probablement à cause d'un changement dans la distribution des données d'entrée (data drift). Comment détectez-vous et gérez-vous ce problème de manière proactive ?",
    options: [
      { label: "A", text: "Comparer manuellement les métriques de performance chaque mois en exécutant le modèle sur un jeu de test récent" },
      { label: "B", text: "Configurer Vertex AI Model Monitoring pour détecter automatiquement le feature drift et le prediction drift, avec des alertes qui déclenchent un re-entraînement via un pipeline" },
      { label: "C", text: "Re-entraîner le modèle automatiquement chaque semaine avec les données les plus récentes, indépendamment de la détection de drift" },
      { label: "D", text: "Ajouter des règles métier dans l'application pour détecter les prédictions aberrantes et les filtrer" }
    ],
    correctAnswers: ["B"],
    explanation: "Vertex AI Model Monitoring surveille en continu les prédictions servies et les compare aux données d'entraînement. Il détecte automatiquement le feature drift (changement de distribution des entrées) et le prediction drift (changement de distribution des sorties), et peut déclencher des alertes qui initient un pipeline de re-entraînement. C'est l'approche MLOps recommandée.",
    whyOthersWrong: {
      "A": "La vérification manuelle mensuelle est réactive et ne permet pas de détecter rapidement un drift. Entre deux vérifications, le modèle peut servir des prédictions de mauvaise qualité pendant des semaines.",
      "C": "Le re-entraînement systématique chaque semaine gaspille des ressources si le modèle n'a pas dégradé, et peut être insuffisant si le drift survient en milieu de semaine. L'approche basée sur la détection de drift est plus efficiente.",
      "D": "Des règles métier ne remplacent pas le monitoring statistique du drift. Elles ne détectent que les cas extrêmes et passent à côté des dégradations graduelles de performance."
    },
    gcpLink: "https://cloud.google.com/vertex-ai/docs/model-monitoring/overview"
  },
  {
    id: 42,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "difficile",
    question: "Votre entreprise déploie un nouveau modèle de recommandation qui a montré de meilleures métriques offline (précision, recall) que le modèle actuel en production. Cependant, vous voulez valider que le nouveau modèle améliore réellement le taux de conversion avant de basculer tout le trafic. Quelle stratégie de déploiement implémentez-vous avec Vertex AI ?",
    options: [
      { label: "A", text: "Remplacer immédiatement l'ancien modèle par le nouveau sur l'endpoint de production" },
      { label: "B", text: "Déployer le nouveau modèle sur un endpoint séparé et comparer les logs de prédiction" },
      { label: "C", text: "Utiliser le traffic splitting de Vertex AI Endpoints pour router 10% du trafic vers le nouveau modèle et 90% vers l'ancien, puis augmenter progressivement" },
      { label: "D", text: "Exécuter le nouveau modèle en mode shadow (prédictions enregistrées mais non servies) pendant 2 semaines" }
    ],
    correctAnswers: ["C"],
    explanation: "Le traffic splitting de Vertex AI Endpoints permet de déployer plusieurs versions de modèle sur le même endpoint avec une répartition configurable du trafic. En routant 10% vers le nouveau modèle (canary deployment), vous pouvez mesurer l'impact réel sur le taux de conversion en A/B test, puis augmenter progressivement si les résultats sont positifs.",
    whyOthersWrong: {
      "A": "Remplacer directement est risqué : de bonnes métriques offline ne garantissent pas de bonnes performances en production. Un déploiement progressif réduit le risque d'impact négatif sur les utilisateurs.",
      "B": "Un endpoint séparé ne permet pas de comparer directement l'impact sur les mêmes utilisateurs dans les mêmes conditions. Les logs de prédiction ne mesurent pas l'impact business réel (taux de conversion).",
      "D": "Le mode shadow permet de vérifier la stabilité technique mais ne mesure pas l'impact business réel puisque les prédictions ne sont pas servies aux utilisateurs. Il ne permet pas de mesurer le taux de conversion."
    },
    gcpLink: "https://cloud.google.com/vertex-ai/docs/general/deployment#traffic-split"
  },
  {
    id: 84,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "facile",
    question: "Votre entreprise souhaite intégrer des capacités de traduction automatique dans son application de support client pour traduire les tickets des clients internationaux en français. Vous n'avez pas d'expertise ML. Quelle solution GCP est la plus rapide à implémenter ?",
    options: [
      { label: "A", text: "Entraîner un modèle de traduction personnalisé avec Vertex AI" },
      { label: "B", text: "Utiliser l'API Cloud Translation pré-entraînée de Google" },
      { label: "C", text: "Déployer un modèle open-source de traduction (MarianMT) sur Compute Engine" },
      { label: "D", text: "Utiliser BigQuery ML avec un modèle de traduction" }
    ],
    correctAnswers: ["B"],
    explanation: "L'API Cloud Translation est un service pré-entraîné qui offre une traduction de haute qualité entre plus de 100 langues via un simple appel API. Aucune expertise ML n'est nécessaire. L'API supporte la détection automatique de la langue source et offre des modèles Neural Machine Translation de qualité production.",
    whyOthersWrong: {
      "A": "Entraîner un modèle de traduction personnalisé nécessite des corpus parallèles importants et une expertise ML significative. L'API pré-entraînée couvre la plupart des cas d'usage.",
      "C": "Déployer un modèle open-source nécessite de gérer l'infrastructure, les mises à jour et le scaling. C'est plus complexe et moins performant que l'API managée de Google.",
      "D": "BigQuery ML ne supporte pas nativement les modèles de traduction. Ce n'est pas l'outil adapté pour ce cas d'usage."
    },
    gcpLink: "https://cloud.google.com/translate/docs/overview"
  },
  {
    id: 85,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "intermédiaire",
    question: "Votre équipe ML utilise des notebooks Jupyter pour le développement de modèles. Les data scientists ont besoin d'un environnement collaboratif avec accès aux GPU, intégration Git, et la possibilité de planifier l'exécution automatique de notebooks. Quelle solution GCP est la plus adaptée ?",
    options: [
      { label: "A", text: "Compute Engine avec JupyterLab installé manuellement" },
      { label: "B", text: "Vertex AI Workbench (managed notebooks) avec des instances GPU et l'intégration native avec les services Vertex AI" },
      { label: "C", text: "Google Colab Enterprise" },
      { label: "D", text: "Cloud Shell avec JupyterLab" }
    ],
    correctAnswers: ["B"],
    explanation: "Vertex AI Workbench fournit des notebooks managés avec support GPU/TPU, intégration Git native, planification d'exécution de notebooks, et connexion directe aux services Vertex AI (training, datasets, feature store). C'est l'environnement de développement ML recommandé sur GCP pour les équipes professionnelles.",
    whyOthersWrong: {
      "A": "Installer JupyterLab manuellement sur Compute Engine nécessite de gérer l'infrastructure, les dépendances, les mises à jour de sécurité, et n'offre pas d'intégration native avec les services ML.",
      "C": "Google Colab Enterprise est adapté pour l'exploration rapide mais offre moins de contrôle sur l'infrastructure (GPU spécifiques, stockage persistant) et moins d'intégration avec les pipelines ML en production.",
      "D": "Cloud Shell est un environnement éphémère avec des ressources limitées (pas de GPU) et un timeout d'inactivité. Il n'est pas adapté pour le développement ML."
    },
    gcpLink: "https://cloud.google.com/vertex-ai/docs/workbench/introduction"
  },
  {
    id: 86,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "intermédiaire",
    question: "Votre entreprise de télécommunications souhaite prédire le churn (départ) des clients. Vous avez un dataset de 2 millions de lignes dans BigQuery avec 50 features et un label binaire (churn/pas churn). Le dataset est très déséquilibré : seulement 3% des clients ont churné. Quel type de modèle BigQuery ML et quelle technique utilisez-vous ?",
    options: [
      { label: "A", text: "Un modèle LINEAR_REG avec normalisation des features" },
      { label: "B", text: "Un modèle BOOSTED_TREE_CLASSIFIER avec le paramètre auto_class_weights=TRUE pour gérer le déséquilibre des classes" },
      { label: "C", text: "Un modèle KMEANS pour segmenter les clients susceptibles de churner" },
      { label: "D", text: "Un modèle LOGISTIC_REG sans ajustement car 2 millions de lignes suffisent" }
    ],
    correctAnswers: ["B"],
    explanation: "BOOSTED_TREE_CLASSIFIER (basé sur XGBoost) est performant pour les problèmes de classification tabulaires avec de nombreuses features. Le paramètre auto_class_weights=TRUE ajuste automatiquement les poids des classes en fonction de leur fréquence, compensant le déséquilibre (3% de positifs). XGBoost capture aussi les interactions non-linéaires entre features.",
    whyOthersWrong: {
      "A": "LINEAR_REG est un modèle de régression pour prédire des valeurs continues, pas pour la classification binaire. Il faudrait au minimum LOGISTIC_REG pour la classification.",
      "C": "KMEANS est un algorithme de clustering non supervisé. Il ne peut pas utiliser le label churn/pas churn pour apprendre à prédire. C'est inapproprié pour un problème de classification supervisée.",
      "D": "LOGISTIC_REG peut fonctionner mais est moins performant que les gradient boosted trees pour les datasets tabulaires complexes. De plus, sans ajustement du déséquilibre de classes, le modèle prédira quasi-systématiquement 'pas churn' (la classe majoritaire à 97%)."
    },
    gcpLink: "https://cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-boosted-tree"
  },
  {
    id: 87,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "difficile",
    question: "Votre entreprise veut utiliser un grand modèle de langage (LLM) pour analyser des contrats juridiques internes et répondre aux questions des juristes. Les contrats contiennent des informations confidentielles qui ne doivent pas quitter l'infrastructure de l'entreprise. Quelle approche est la plus adaptée sur GCP ?",
    options: [
      { label: "A", text: "Utiliser l'API Gemini directement avec les contrats envoyés comme contexte dans le prompt" },
      { label: "B", text: "Déployer un modèle open-source (LLaMA) sur Vertex AI avec des données de fine-tuning, dans un VPC dédié avec VPC Service Controls" },
      { label: "C", text: "Utiliser Vertex AI Search (anciennement Enterprise Search) avec un datastore privé contenant les contrats et RAG (Retrieval Augmented Generation)" },
      { label: "D", text: "Envoyer les contrats à ChatGPT via l'API OpenAI depuis une Cloud Function" }
    ],
    correctAnswers: ["C"],
    explanation: "Vertex AI Search avec RAG permet d'indexer les contrats dans un datastore privé sur GCP et d'utiliser un LLM pour répondre aux questions en se basant sur le contenu récupéré. Les données restent dans l'infrastructure GCP, le modèle n'est pas entraîné sur les données, et les réponses citent les sources. C'est l'approche la plus adaptée pour les documents confidentiels.",
    whyOthersWrong: {
      "A": "Envoyer des contrats confidentiels directement dans les prompts de l'API Gemini expose les données dans les requêtes API. Même avec les garanties de Google, ce n'est pas conforme aux exigences de confidentialité les plus strictes.",
      "B": "Le fine-tuning d'un LLM open-source est très coûteux et complexe. De plus, le fine-tuning n'est pas la meilleure approche pour la recherche dans des documents : le RAG est plus adapté et plus précis pour ce cas d'usage.",
      "D": "Envoyer des contrats confidentiels à un service externe (OpenAI) viole directement l'exigence que les données ne quittent pas l'infrastructure de l'entreprise."
    },
    gcpLink: "https://cloud.google.com/generative-ai-app-builder/docs/enterprise-search-introduction"
  },
  {
    id: 88,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "intermédiaire",
    question: "Votre équipe a entraîné un modèle TensorFlow pour la prédiction de la demande. Le modèle prend en entrée 20 features numériques et produit une prédiction. Vous devez comprendre quelles features influencent le plus les prédictions pour expliquer les résultats aux stakeholders business. Quel outil Vertex AI utilisez-vous ?",
    options: [
      { label: "A", text: "Vertex AI TensorBoard pour visualiser les métriques d'entraînement" },
      { label: "B", text: "Vertex Explainable AI (feature attributions) qui calcule l'importance de chaque feature pour chaque prédiction" },
      { label: "C", text: "Vertex AI Model Evaluation pour comparer les performances du modèle" },
      { label: "D", text: "Vertex AI Experiments pour tracker les hyperparamètres" }
    ],
    correctAnswers: ["B"],
    explanation: "Vertex Explainable AI fournit des feature attributions qui quantifient la contribution de chaque feature à chaque prédiction individuelle. Il supporte plusieurs méthodes (Sampled Shapley, Integrated Gradients, XRAI) et s'intègre directement avec les endpoints Vertex AI pour des explications en temps réel avec chaque prédiction.",
    whyOthersWrong: {
      "A": "TensorBoard visualise les métriques d'entraînement (loss, accuracy par epoch) mais n'explique pas l'importance des features dans les prédictions individuelles.",
      "C": "Model Evaluation fournit des métriques agrégées de performance (precision, recall, AUC) mais n'explique pas quelles features influencent chaque prédiction individuelle.",
      "D": "Experiments trackent les hyperparamètres et les résultats des différentes expériences d'entraînement, mais ne fournissent pas d'explications sur les prédictions."
    },
    gcpLink: "https://cloud.google.com/vertex-ai/docs/explainable-ai/overview"
  },
  {
    id: 89,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "difficile",
    question: "Votre modèle de classification d'images est entraîné sur un dataset de 1 million d'images stockées dans Cloud Storage. L'entraînement avec Vertex AI Training prend 48 heures et coûte 2 000 $. Vous devez réduire le temps d'entraînement tout en minimisant les coûts. Quelles optimisations appliquez-vous ? (Sélectionnez 2 réponses)",
    options: [
      { label: "A", text: "Convertir les images en format TFRecord pour optimiser le chargement des données et réduire les I/O" },
      { label: "B", text: "Utiliser des Spot VMs (instances préemptives) avec checkpointing régulier pour réduire les coûts de 60-91%" },
      { label: "C", text: "Réduire la résolution de toutes les images à 32x32 pixels" },
      { label: "D", text: "Entraîner le modèle sur un seul GPU plus puissant au lieu de plusieurs GPU" }
    ],
    correctAnswers: ["A", "B"],
    explanation: "Les TFRecords regroupent les images en fichiers binaires séquentiels, éliminant le surcoût des lectures de millions de petits fichiers dans Cloud Storage et accélérant significativement le chargement des données. Les Spot VMs offrent la même puissance de calcul avec une réduction de 60-91% du coût, avec le checkpointing qui protège contre les préemptions.",
    whyOthersWrong: {
      "C": "Réduire la résolution à 32x32 pixels dégraderait considérablement la qualité du modèle de classification. C'est une perte de données d'entraînement inacceptable qui impactera les performances.",
      "D": "Un seul GPU plus puissant ne réduit pas nécessairement le temps de 48 heures de manière significative et peut être plus coûteux. La distribution sur plusieurs GPU avec une stratégie appropriée est généralement plus efficace."
    },
    gcpLink: "https://cloud.google.com/vertex-ai/docs/training/using-spot-vms"
  },
  {
    id: 90,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "facile",
    question: "Quelle est la différence principale entre les API pré-entraînées de Google (Vision, Natural Language, Speech-to-Text) et AutoML de Vertex AI ?",
    options: [
      { label: "A", text: "Les API pré-entraînées sont gratuites, AutoML est payant" },
      { label: "B", text: "Les API pré-entraînées sont des modèles génériques prêts à l'emploi, AutoML permet d'entraîner des modèles personnalisés sur vos propres données" },
      { label: "C", text: "AutoML est uniquement pour le texte, les API pré-entraînées pour les images" },
      { label: "D", text: "Les API pré-entraînées offrent de meilleures performances qu'AutoML" }
    ],
    correctAnswers: ["B"],
    explanation: "Les API pré-entraînées (Vision, Natural Language, Speech-to-Text) sont des modèles génériques entraînés par Google sur de vastes datasets, prêts à utiliser via un simple appel API. AutoML permet d'entraîner des modèles personnalisés sur vos propres données étiquetées quand les API génériques ne répondent pas à votre cas d'usage spécifique.",
    whyOthersWrong: {
      "A": "Les deux sont payants. Les API pré-entraînées sont facturées à l'utilisation (par requête), AutoML est facturé pour l'entraînement et le déploiement.",
      "C": "AutoML supporte les images (AutoML Vision), le texte (AutoML Natural Language), les données tabulaires, et la vidéo. Les API pré-entraînées couvrent aussi le texte (Natural Language API) et la parole (Speech-to-Text).",
      "D": "AutoML peut surpasser les API pré-entraînées pour des cas d'usage spécifiques car le modèle est entraîné sur vos données domain-specific. Les performances dépendent du cas d'usage."
    },
    gcpLink: "https://cloud.google.com/vertex-ai/docs/beginner/beginners-guide"
  },
  {
    id: 91,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "difficile",
    question: "Votre équipe ML déploie 15 modèles différents en production sur des endpoints Vertex AI. Chaque modèle est utilisé par différentes équipes et a des patterns de trafic variés. Les coûts d'infrastructure des endpoints sont élevés car chaque modèle a son propre endpoint dédié avec des ressources provisionnées 24/7. Comment optimisez-vous les coûts ?",
    options: [
      { label: "A", text: "Regrouper tous les modèles sur un seul endpoint avec un traffic split" },
      { label: "B", text: "Utiliser des endpoints Vertex AI avec le co-hosting de modèles et l'autoscaling (y compris le scale-to-zero pour les modèles peu utilisés)" },
      { label: "C", text: "Migrer tous les modèles vers Cloud Functions avec des conteneurs personnalisés" },
      { label: "D", text: "Augmenter la taille des instances pour réduire le nombre de réplicas nécessaires" }
    ],
    correctAnswers: ["B"],
    explanation: "Le co-hosting de modèles sur Vertex AI permet de déployer plusieurs modèles sur les mêmes ressources d'infrastructure, réduisant le gaspillage. L'autoscaling ajuste les ressources au trafic réel, et le scale-to-zero permet de ne payer aucune ressource pour les modèles rarement appelés, avec un cold start acceptable.",
    whyOthersWrong: {
      "A": "Le traffic split sur un seul endpoint est conçu pour router le trafic entre différentes versions du même modèle (A/B testing), pas pour héberger 15 modèles différents avec des entrées/sorties différentes.",
      "C": "Cloud Functions a des limites de mémoire, de temps d'exécution et de cold start qui rendent le serving ML à grande échelle problématique. De plus, le monitoring ML natif est absent.",
      "D": "Augmenter la taille des instances est du scaling vertical qui ne réduit pas fondamentalement les coûts. Des instances plus grandes coûtent plus cher par unité et ne s'adaptent pas aux variations de trafic."
    },
    gcpLink: "https://cloud.google.com/vertex-ai/docs/predictions/deploy-model-api"
  },
  {
    id: 92,
    domain: "Machine Learning et AI sur GCP",
    difficulty: "intermédiaire",
    question: "Votre entreprise a besoin d'analyser les sentiments des avis clients en français déposés sur son site web. Les avis utilisent un vocabulaire spécifique au secteur de la restauration avec du jargon culinaire. L'API Natural Language de Google ne détecte pas correctement les nuances dans ce domaine. Quelle approche recommandez-vous ?",
    options: [
      { label: "A", text: "Augmenter le volume d'appels à l'API Natural Language pour améliorer les résultats" },
      { label: "B", text: "Utiliser AutoML Natural Language de Vertex AI pour entraîner un modèle de classification de sentiment personnalisé sur un corpus d'avis étiquetés du secteur de la restauration" },
      { label: "C", text: "Écrire des règles regex pour détecter les mots positifs et négatifs spécifiques à la restauration" },
      { label: "D", text: "Utiliser BigQuery ML avec un modèle LOGISTIC_REG sur les avis tokenisés" }
    ],
    correctAnswers: ["B"],
    explanation: "AutoML Natural Language permet d'entraîner un modèle de classification de sentiment personnalisé sur vos propres données étiquetées. En fournissant un corpus d'avis du secteur de la restauration avec des labels de sentiment, le modèle apprend le vocabulaire spécifique et les nuances du domaine, offrant de bien meilleures performances qu'un modèle générique.",
    whyOthersWrong: {
      "A": "Augmenter le volume d'appels ne change pas la capacité du modèle à comprendre le jargon culinaire. Le modèle pré-entraîné reste le même quelle que soit la fréquence d'utilisation.",
      "C": "Des règles regex sont fragiles, ne capturent pas les nuances contextuelles, et nécessitent une maintenance constante. Elles ne gèrent pas l'ironie, les négations complexes ou les expressions idiomatiques.",
      "D": "Un modèle LOGISTIC_REG sur des tokens est trop simple pour capturer les nuances sémantiques de l'analyse de sentiment dans un domaine spécialisé."
    },
    gcpLink: "https://cloud.google.com/vertex-ai/docs/text-data/sentiment-analysis/overview"
  }
];
