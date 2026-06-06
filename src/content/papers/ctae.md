---
title: "Segment-wise Anomaly Detection via Compression Tokens in Industrial Production Lines"
pubDate: 2026-06-01
slug: ct-ad-italia
authors: "Giacomo Salici, Stefan Köhler, Andrea Fiorina, Franco Zannella, Angelo Porrello, Simone Calderara"
venue: "CINI National Conference on Artificial Intelligence (Ital-IA) 2026"
acronym: "Ital-IA 2026"
location: "Rome, Italy"
categories: ["ai-ml"]
news: My latest paper on industrial anomaly detection, made in collaboration with SEW-Eurodrive, has been accepted at Ital-IA 2026! See you in Rome!
cta:
  - { url: "https://iris.unimore.it/handle/11380/1409528", label: "Link to the paper" }
---

**Abstract:** We present a predictive maintenance approach for industrial production lines based on multivariate segment-wise time-series analysis. To address the high cost of collecting anomalous samples, we propose a novelty detection framework in which a transformer autoencoder is trained in a semi-supervised fashion exclusively on nominal sequences, and anomaly scores are derived from reconstruction error at test time. We introduce a set of learnable “compression tokens” into the transformer encoder; these tokens serve as the bottleneck from which the decoder reconstructs the input. We compare this model against an MLP-based autoencoder baseline; the results show that the novelty-detection model remains strong, with near-perfect performance under time-aware and device-aware validation, which are the conditions that most faithfully simulate deployment.