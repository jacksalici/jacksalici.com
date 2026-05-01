---
title: "Transporting Task Vectors across Different Architectures without Training"
pubDate: 2026-04-30
slug: theseus
authors: "Filippo Rinaldi, Aniello Panariello, Giacomo Salici, Angelo Porrello, Simone Calderara"
venue: "43rd International Conference on Machine Learning"
news: Our new paper “Transporting Task Vectors across Different Architectures without Training” has been accepted at ICML 2026!
acronym: "ICML 2026"
location: "Seoul, South Korea"
categories: ["ai-ml"]
cta:
  - { url: "https://arxiv.org/pdf/2602.12952", label: "Link to the paper" }
featured: true
---

**Abstract:** Adapting large pre-trained models to downstream tasks often produces task-specific parameter updates that are expensive to relearn for every model variant. While recent work has shown that such updates can be transferred between models with identical architectures, transferring them across models of different widths remains largely unexplored. In this work, we introduce **Theseus**, a training-free method for transporting task-specific updates across heterogeneous models. Rather than matching parameters directly, we characterize a task update by the functional effect it induces on intermediate representations. We formalize task-vector transport as a functional matching problem on observed activations and show that, after aligning representation spaces via orthogonal Procrustes analysis, it admits a stable closed-form solution that preserves the geometry of the update. We evaluate Theseus on vision and language models across different widths, showing consistent improvements over strong baselines without additional training or backpropagation. Our results show that task updates can be meaningfully transferred across architectures when task identity is defined functionally rather than parametrically.