# CLAUDE.md — E-portfolio de Loup Broussard

> Ce fichier est lu par Claude Code au début de chaque session.
> Les éléments entre [CROCHETS] sont à compléter par moi.

---

## 1. Contexte

- Je suis **Loup Broussard**, étudiant en **1re année (L3 / S5) en Sciences du Numérique (SN)** à l'**ENSEEIHT** (Toulouse INP), après **La Prépa des INP (Toulouse)**.
- Ce site est mon **e-portfolio**, évalué dans le cours **CAM – Careers & Management** (Soft Skills Center).
- C'est un outil **sur 3 ans** (S5 → S10) : il sera enrichi chaque semestre (stages S6 et S8, mobilité S9, engagement RSE, jury PPP). Le code doit donc rester **simple à mettre à jour**.
- Tu m'aides sur le **code, la structure et le design**. Le **contenu** (textes sur moi) vient de moi.

## 2. Objectif n°1 du site

**Faire gagner du temps au lecteur** : en 30 secondes sur la page d'accueil, il doit savoir qui je suis, ce que je sais faire, ce que je cherche — plus vite qu'en lisant mon CV ou mon LinkedIn.
**Objectif n°2** : lui **donner envie d'en savoir plus** (cliquer sur un projet, regarder le pitch, me contacter).

Public : recruteurs (stages), enseignants et jury CAM, alumni N7 et professionnels rencontrés via My Job Glasses, responsables de mobilité internationale.

## 3. Ce qui est évalué (grille CAM, rendu Moodle ~1er novembre)

La section **Career Project** doit contenir :
- [ ] CV en **anglais** et en **français** (PDF téléchargeables)
- [ ] Lien LinkedIn (profil FR + EN)
- [ ] **Vidéo pitch UVP** en anglais, 2–3 min (structure Now → Past → Future)
- [ ] **3 rôles modèles** analysés (My Job Glasses, LinkedIn, alumni)
- [ ] **3 projets de mobilité internationale** alignés avec ces rôles modèles

Critères de notation : complétude · clarté du projet professionnel · **cohérence de la marque personnelle** (UVP / CV / LinkedIn / pitch alignés) · qualité de l'anglais · présentation visuelle et navigation.

➡️ Priorité absolue : tous ces éléments **présents, visibles et accessibles en 1 ou 2 clics depuis l'accueil**.

## 4. Structure du site (6 onglets obligatoires)

Une page HTML par onglet. Navigation identique sur toutes les pages, onglet actif mis en évidence.

| Fichier | Onglet | Contenu attendu |
|---|---|---|
| `index.html` | **Welcome** | Voir §5 (page la plus importante) |
| `engineering.html` | **Engineering Course** | Formation SN (cours clés, compétences), puis une carte par projet (format §6) |
| `mobility.html` | **International Mobility** | 3 projets de mobilité (format §6), langues, sous-sections futures (PCE, LV2…) |
| `sustainability.html` | **Sustainability & Civic Engagement** | Engagement RSE : Fresque du Climat, Sulitest, projet d'équipe RSE + infographie (janvier), ODD concernés |
| `activities.html` | **Sport & Other Activities** | Rugby, musique (live coding), sports automobiles, nouvelles technologies — chacun avec ce que j'en retire (soft skills) |
| `career.html` | **Career Development** | Section **Career Project** complète (§3) : CV FR/EN, LinkedIn, vidéo, 3 rôles modèles, 3 mobilités, objectifs court/moyen/long terme (plans A/B/C). Sous-sections futures : stages, PEP |

## 5. Page d'accueil (`index.html`) — conçue pour être lue en 30 s

Dans cet ordre :
1. **Hero** : photo, « Loup Broussard », sous-titre « Computer Science Engineering Student @ ENSEEIHT », UVP en 1 phrase, 3 boutons : `Watch my pitch` · `Download CV` · `LinkedIn`.
2. **At a glance** : une liste courte « label → valeur » (4 à 6 lignes, sans icônes ni grille de fiches identiques) : formation, domaines (dev · embedded systems), langues (FR natif · EN B2), ce que je cherche, localisation (Toulouse).
3. **Featured** : une liste de 2–3 liens vers mes meilleurs contenus (ex. projet Strudel, pitch vidéo, projet SN) ; chaque ligne = métadonnée + titre + 1 ligne + « See … → ».
4. **Now** : ce sur quoi je travaille en ce moment (2–3 lignes, mis à jour chaque semestre).
5. **Contact** : email + LinkedIn + GitHub.

Règles : pas de long paragraphe sur l'accueil (max ~3 lignes par bloc) ; tout le détail est dans les onglets.

## 6. Format des contenus

**Carte projet** — toujours dans cet ordre, lisible en diagonale :
1. Titre + date + tags (technos / compétences)
2. **Contexte** — le problème ou l'objectif (1–2 lignes)
3. **Mon rôle** — seul / en équipe de N, ce que j'ai fait moi
4. **Méthodes & outils**
5. **Résultat** — concret, chiffré si possible, lien GitHub / rapport / démo
6. **Ce que j'ai appris**
La carte affiche titre + tags + 1 ligne de résumé ; le détail se déplie au clic (`<details>` ou équivalent).

**Projet Strudel (musique)** : projet d'équipe (5) à La Prépa des INP, 2026, « Science et musique » : piano enregistré, analyse de Fourier en Python, reprise de *Gypsy Woman* (Crystal Waters) en live coding sur Strudel. Mon rôle : développement Strudel (avec Victor) + recherche sur l'Algorave. Rapport : `assets/docs/groupe_10_rapport_science_et_musique.pdf` ; notebook : https://observablehq.com/d/10a7e22d37d67443. Les samples piano sont hébergés par le dépôt séparé `loupbsd/music-project` (ne pas créer de dossier `music-project/` dans ce dépôt).

**Carte rôle modèle** : nom (ou initiales si pas d'accord de la personne), poste, entreprise, parcours en 3 étapes, comment je l'ai rencontré (My Job Glasses / LinkedIn / alumni), ce que j'en retiens pour mon projet.

**Carte mobilité** : destination, type (semestre, stage, double diplôme…), pourquoi, lien explicite avec un rôle modèle, prérequis (langue, niveau).

## 7. Choix techniques

- **HTML / CSS / JavaScript vanilla** uniquement. Pas de framework, pas de build, pas de dépendance npm.
- Arborescence :
  ```
  /
  ├── index.html, engineering.html, mobility.html, sustainability.html, activities.html, career.html
  ├── css/style.css          (un seul fichier, variables CSS en haut)
  ├── js/main.js             (menu mobile, petites interactions uniquement)
  ├── assets/img/            (photos compressées, < 300 Ko chacune, WebP ou JPG)
  ├── assets/docs/           (CV_Loup_Broussard_EN.pdf, CV_Loup_Broussard_FR.pdf, rapports)
  └── CLAUDE.md
  ```
- Couleurs, polices et espacements définis en **variables CSS** dans `:root`.
- **Responsive** obligatoire (mobile d'abord) : tester à 375 px, 768 px et 1280 px.
- La **vidéo** est hébergée sur YouTube (non répertoriée) et intégrée en `<iframe>` — jamais de fichier vidéo dans le dépôt.
- Accessibilité : `alt` sur toutes les images, contraste suffisant (AA), navigation au clavier, `lang="en"` sur `<html>`.
- `<title>` et `<meta name="description">` propres sur chaque page, + balises Open Graph (aperçu propre quand le lien est partagé sur LinkedIn).
- Déploiement : **GitHub Pages**, dépôt `loupbsd.github.io`, branche `main`. Tous les chemins doivent être **relatifs**.

## 8. Design — « Violet & Cream » : pro, chaleureux, sobre

- **Ambiance** : professionnelle, chaleureuse et sobre. Un site fait à la main par un étudiant ingénieur, pas un template ni un pastiche de terminal.
- **Thème clair crème par défaut** ; thème sombre si l'OS est en mode sombre, ou via le bouton (choix mémorisé).
- **Typographie** : **Figtree** pour tout le texte et les titres, **IBM Plex Mono** réservée aux *données* (tags, dates, métadonnées, `[TO COMPLETE]`, code). 2 polices max, via Google Fonts.
- **Une seule couleur d'accent** : **violet** `#4D2DA0` sur fond crème `#F4E9D2` ; en thème sombre, accent `#A993F0` sur `#1A1714` avec texte crème `#EFE8DA` — direction choisie le 25/10/2026 (remplace « Terminal Clean » cyan).
- **Lisibilité avant tout** : hiérarchie visuelle forte, titres explicites, beaucoup d'espace, listes courtes, tags pour les compétences, pas de pavés de texte.
- **Donner envie d'en savoir plus** : liens et cartes cliquables, effets de survol discrets, appels à l'action clairs (« See project → », « Watch the pitch »).
- Animations : survol uniquement, pas d'animation d'apparition répétée sur chaque section ; respecter `prefers-reduced-motion`.
- Performance : aucune page > ~1 Mo.

### Éviter le « look IA » (règles inspirées du skill Impeccable)
Le site ne doit pas donner l'impression d'avoir été généré par une IA. À ne **pas** faire :
- de petits labels au-dessus des titres (`// about`, `> now`, `$ contact`…) : le titre se suffit ;
- la monospace comme déguisement « tech » sur des titres, boutons ou liens ;
- des grilles de cartes identiques « icône + titre + texte » comme structure de page, ou des cartes dans des cartes ;
- un curseur clignotant, des `>` décoratifs et autres clichés de terminal ;
- des dégradés (surtout violets), du texte en dégradé, du verre/flou décoratif, des halos lumineux ;
- une bordure gauche colorée épaisse sur les cartes ou encadrés ;
- des emoji à la place d'icônes ;
- les polices surutilisées : Inter, Roboto, Montserrat, Poppins, Geist, Space Grotesk, Fraunces, Instrument…
À faire : soigner les détails du navigateur (sélection de texte, focus, barre de défilement aux couleurs du site), utiliser des cartes seulement pour des éléments vraiment répétés (projets, rôles modèles, mobilités).

## 9. Langue

- Site **en anglais** (langue évaluée).
- Anglais professionnel, phrases courtes, verbes d'action. Signale-moi les fautes ou tournures maladroites dans les textes que je fournis, **sans les réécrire sans me le dire**.
- Une version française pourra être ajoutée plus tard (ne pas l'anticiper dans le code pour l'instant).

## 10. Règles de travail pour Claude

- **N'invente jamais de contenu sur moi** (projets, notes, expériences, compétences). Si une info manque, mets un placeholder visible `[TO COMPLETE: …]`.
- Avant une modification importante (structure, design global, nouvelle page), **explique ton plan et attends mon accord**.
- Fais des modifications **petites et ciblées** ; garde la navigation identique sur toutes les pages (si tu la modifies, modifie-la partout).
- Explique brièvement ce que tu as changé et pourquoi : je suis en SN, je veux comprendre le code.
- Pas de données personnelles sensibles sur le site : ni téléphone, ni adresse, ni date de naissance.
- Messages de commit courts, en anglais, au présent (ex. `Add career project section`).

## 11. Mes infos

- Nom : **Loup Broussard**
- Formation : ENSEEIHT — Sciences du Numérique, 1re année (2026–2027) · avant : La Prépa des INP, Toulouse
- Email pro : loup.broussard@outlook.com
- LinkedIn : https://www.linkedin.com/in/loup-broussard-a6940b38b/ (EN : ?locale=en_US · FR : ?locale=fr_FR)
- GitHub : https://github.com/loupbsd
- Langues : Français (langue maternelle) · Anglais (B2)
- Domaines d'intérêt : développement logiciel, systèmes embarqués, nouvelles technologies (encore en exploration)
- Projets : « Science et musique » (prépa, 2026, live coding Strudel) · [TO COMPLETE: projets SN]
- Activités : rugby · musique · sports automobiles · nouvelles technologies
- UVP (1 phrase) : « First-year Computer Science engineering student at ENSEEIHT who turns curiosity into code, looking for a software, systems or data internship in summer 2027. »
- 3 mots-clés de ma marque : [TO COMPLETE]
- Ce que je cherche : stage technique de 6 semaines minimum, entre le 7 juin et le 23 août 2027, en développement logiciel, systèmes ou data
