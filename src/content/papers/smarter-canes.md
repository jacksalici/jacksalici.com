---
title: "Smarter Canes: Low-Cost Sensing for Step Counting and Self-Supervised Gait Assessment"
pubDate: 2026-10-22
slug: smarter-canes
authors: "Giacomo Salici, Roberto Vezzani"
venue: "I-RIM Conference on Robotics and Intelligent Machines (I-RIM 3D 2026)"
acronym: "I-RIM 2026"
location: "Rome, Italy"
coordinates: [12.4964, 41.9028]
categories: ["robotics", "ai-ml"]
activities: ["applied-embodied-ai", "anomaly-detection-tsa"]
news: Our paper “Smarter Canes” has been accepted at the I-RIM Conference 2026. See you at Maker Faire Rome!
cta:
  - { url: "https://iris.unimore.it/handle/11380/1422348", label: "Link to the paper" }
  - { url: "https://cane.jacksalici.com", label: "Code and Dataset" }
---

**Abstract:** Wrist-worn wearables are the dominant paradigm for step counting, but their performance degrades noticeably when used by people with motor impairments. We instrument a standard cane with a low-cost sensing framework to address this and, at the same time, to lay the foundation for a self-supervised gait-quality assessment in which a convolutional autoencoder trained only on normal walking uses reconstruction error as an anomaly score. A downward-facing time-of-flight sensor measures the distance of the cane tip from the ground and provides the reference against which step counting is validated, reaching 92.9% accuracy, while on the same recordings the anomaly detector reaches 98.7% AUPRC under session-level cross-validation, also ordering the types of gait problems by how strongly they deform the signal.

## Why a cane

This work started from a personal observation: my smartwatch has never counted my steps reliably. The device is not faulty. I walk with a cane, and wrist-worn trackers are calibrated on people who do not. The literature reports the same pattern, and the degradation is not limited to people with motor impairments: even healthy participants lose accurate step counts as soon as they are given a walking aid.

Rather than trying to correct a wrist signal that does not reflect the gait, we moved the sensors to the cane itself.

## The device

Together with Roberto Vezzani at AImageLab, I built an instrumented cane that costs about €50 in parts and adds less than 80 g to the aid. It carries:

- an **IMU**, which captures the motion of the cane during each stride;
- a downward-facing **time-of-flight sensor**, which measures the distance of the cane tip from the ground and serves as the reference for validating step counts;
- a **button on the handle**, used to label sessions while walking, so that annotation happens at recording time and no video has to be synchronised afterwards.

On my own recordings, the cane counts steps with 92.9% accuracy.

## From quantity to quality

The second question we addressed is whether the cane can say something about *how* a person walks, not only *how much*. We trained a small convolutional autoencoder exclusively on normal walking and used its reconstruction error as an anomaly score. On the same recordings, it flags abnormal gait with 98.7% AUPRC under session-level cross-validation. Without access to any class labels, the score also orders the types of gait problems (unsteadiness, tremors, falls) by how strongly they distort the signal.

## Open resources

Hardware design, firmware, code and data are openly available at [cane.jacksalici.com](https://cane.jacksalici.com).
