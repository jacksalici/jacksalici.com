---
title: Multimodal Ovarian Cancer Overall Survival
pubDate: 2024-01-21
slug: ovca-overall-survival
description: Multimodal data integration for OVCA survival prediction.
categories: ["Deep Learning"]
tags: ["Ovarian Cancer", "Survival prediction", "Multimodal"]
stack: ["PyTorch"]
cta:
  - { url: "https://github.com/cosimop2000/Multimodal-data-integration-for-OVCA-survival-prediction", label: "Check the code" }
  - { url: "https://github.com/cosimop2000/Multimodal-data-integration-for-OVCA-survival-prediction/blob/main/Report.pdf", label: "Read the paper" }
---

_The following is the abstract of the project developed by Cosimo, Davide and I as the final project for the course of AI for Bioinformatics, within the master degree in Computer/AI engineering._

## Abstract

In the field of oncology, Overall Survival (OS, time between the diagnosis and the death of a patient) is a crucial piece of information used to schedule follow-up medical examinations and to define the correct type of treatment according to the characteristics and the specific conditions of each patient. (personalized treatment). The prediction of overall survival depends simultaneously on information coming both from the genetic characteristics of the tumor and from the appearance of the cancer-affected tissue. To date, most overall survival prediction models mainly use molecular data (multi-omics). Still, simultaneously, integrating molecular data and histological images could be advantageous. Our work analyzes the SOTA models in both tasks and then creates a novel integration method to maximize the interaction between the different information contained in the modalities. In particular, two architectures have been explored: a Siamese network that tries to separate specific and shared information, and an autoencoder that is aimed to minimize the hazard risk error. We were able to reach an accuracy of 0.69 in overall survival binary classification.
