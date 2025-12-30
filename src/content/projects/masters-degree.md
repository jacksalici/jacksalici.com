---
title: "Leveraging Gaze Estimation in Human-Robot Interaction"
pubDate: 2024-10-17
slug: sfm-gaze-framework
description: "Gaze-Driven Human-Robot Interaction is the core of my thesis."
summary: "The following text is a glimpse of my master degree thesis in Computer Engineering. During its development, I applied the gaze direction on human-robot interaction, using a humanoid robot and two pair of eye-tracking glasses to build a pipeline for estimate it in common - not laboratory-based - environments."
categories: ["Computer Vision", "Robotics"]
stack: ["Python"]
featured: true
cta:
  - { url: "https://github.com/jacksalici/sfm-gaze-framework", label: "Project Repository" }
  - { url: "https://morethesis.unimore.it/theses/available/etd-09262024-135659/", label: "Full text thesis" }
cover: "https://raw.githubusercontent.com/jacksalici/sfm-gaze-framework/refs/heads/main/imgs/fw-example.png"
---

## Abstract

Humanity has always developed tools and skills to simplify tasks and improve the quality of life. Since the invention of robotic arms, these machines have reduced the physical demands of labor-intensive jobs and increased safety. With the advent of artificial intelligence, robots are becoming more empathetic and interactive, making a robust human-robot interaction (HRI) essential. A key aspect of interactive robots is their ability to detect users' intention to engage and interpret their focus of attention — tasks where estimating human gaze plays a crucial role.

The goal of this thesis is to develop a framework for gaze estimation and eye tracking. Firstly, it addresses the practical challenge of estimating eye movements "in the wild". Secondly, it provides a baseline for the future research in this field. The framework makes use of Meta's Project Aria glasses, a device designed to accelerate research in augmented and extended reality (AR/XR), and integrates multiple technologies, from neural networks to Structure From Motion (SFM) processing. The gaze direction can effectually be localized within a 3D environment, allowing tracking across multiple third-person perspectives.

A new dataset has also been recorded to demonstrate the framework's capabilities and offer a potential benchmark and validation tool for new gaze estimation models, especially in HRI context. It consists of recordings of participants performing common actions while wearing Project Aria glasses, captured from another pair of glasses and a Pepper robot the participant interacts with. This dataset could address existing challenges in the field and advance further research in HRI.

## Preface

The gaze is one of the most important non-verbal communication mediums and it is present in every live human interaction. When people communicate, their gaze carries emotions, intentions, and answers. To be able to understand the gaze clues represents a mandatory part of complete communication but also a better understanding of the interlocutor. This is true not only for humans but also for Human Robot Interaction (HRI). In this context, the gaze is a fundamental tool for robots to completely understand human intentions.

This thesis aims to investigate the role of gaze in HRI, and how it can enhance collaborative machine interactions. The work starts from a deep dive into the challenges of both gaze estimation and HRI and then moves on to an analysis of gaze estimation applied to HRI. During the work behind this thesis, two pieces of hardware were indeed used and here described since they perfectly reflect the two main aspects of this research. The first is a humanoid robot designed for social interaction, the second is the very recent and portable Meta's Project Aria glasses—hardware designed to advance research in augmented and extended reality (AR/XR), with two cameras for eye-tracking and gaze estimation.

This thesis later presents the development of a framework for gaze estimation _in the wild_. As will be deeply discussed, estimating eye movements in dynamic, real-world environments is a practical challenge that is still not completely solved. Even if it is not without limitation, the framework try to be as modular as possible in this task. Moreover, it was designed to provide a baseline and validation for future models on gaze estimation. Thanks to several tools and two different Project Aria, it can create labels of the 3D position of the gazed point. The framework consists of a detailed pipeline, beginning with a VGG network that processes pupil images to detect gaze direction.

Subsequently, a Structure From Motion (SFM) technique is used to reconstruct a 3D virtual representation of the space. Through several reprojections, the gaze direction is localized within this 3D environment, making it possible to track the gaze across multiple third-person perspectives.

To validate the framework, a new dataset was recorded [(more about it here)](/gaze-dataset). The dataset is a collection of participants while they perform common actions with and without a humanoid robot to interact with. This dataset offers a potential benchmark and validation tool for new gaze estimation models and human-robot interaction research, further advancing the field.

Finally, the thesis includes a case study of gaze-driven HRI, which was developed in parallel to the framework. A robot manipulator was programmed to be controlled with the gaze of the user, who is wearing Project Aria Glasses. The robot can successfully follow the user's will and perform pick and place tasks, demonstrating the potential of gaze-driven HRI in real-world applications. The objective of this entire work is indeed not only to refine the technical methodologies for a new type interaction but also to assess the implications of these advancements for practical applications in HRI.

## Thesis Structure

This thesis is structured into several parts. In this introductory Part I, the state of the art and the challenges of human-robot interaction (HRI) are profiled, with particular attention to the importance of gaze and its role in HRI. Additionally, relevant literature will be reviewed, besides to the methods and algorithms explored in the preliminary work which lead up to this thesis (Chapter 2).

The Part II provides an in-depth analysis of two pieces of hardware that represent different aspects of HRI and Gaze Estimation. The first is the Pepper Robot (Chapter 3), a humanoid robot with various social capabilities, and the second is a pair of glasses designed by Meta to accelerate research in the field through the recording of egocentric views (Chapter 4). The same part includes a chapter where a brief analysis is made about the other devices used in this work and more generally used in HRI (Chapter 5).

The Part III represents the core novelty of this thesis. There, the methodology and pipeline of creating a framework for gaze analysis are deeply described (Chapters 6 and 7).
A dataset for benchmarking gaze estimation model has been recorded and elaborated using the framework. The implications of this dataset are also described there (Chapter 8).

Part IV begins with a presentation of a case study about HRI (Chapter 9), which was developed during the same period and it is a perfect example of a gaze-driven application that could increase the quality of how a pick and place robot manipulator is used.
In the same part are present the conclusion and possible future developments of this work (Chapter 10). This thesis covers a broad range of topics, and it would be impossible to deeply dive into each of them. However, it is hoped that this work will provide a solid foundation for any additional future work and give a glimpse of every touched aspect.


