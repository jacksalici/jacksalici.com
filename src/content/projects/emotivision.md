---
title: "EmotiVision: Emotion detection and gaze analysis of retrieved faces."
pubDate: 2023-07-01
slug: emotivision
description: Computer Vision pipeline for gaze analysis and emotion detection.
categories: ["Computer Vision"]
tags: ["computer vision", "emotion detection", "gaze estimation", "face retrieval"]
langs: ["Pytorch", "OpenCV"]
featured: true
cta_link: ["https://github.com/SLG-Vision/EmotiVision", "https://github.com/SLG-Vision/EmotiVision/blob/main/emotivision_final_report.pdf"]
cta_text: ["Take a look at the code", "Read the final report"]
cover: "/uploads/cvcs_cover.jpg"

---

_During the university course of computer vision and cognitive systems, Michele, Vincenzo and I were asked to develop a project featuring a pipeline with both classical image processing and deep learning techniques._

## Abstract  

The widespread adoption of intelligent assistants that has occurred in the last months will become more and more relevant and only possible by capturing environmental information. In our opinion, to be effective in human interactions, they need to be aware of people's feelings. Our work focuses on this topic, and it is structured in a three-step pipeline. Firstly, we have analyzed eyes and gazes by comparing and testing several approaches for both face detection and pupil localization. Having the pose estimation, we then analyzed the faces of the people facing the camera. Using a pre-trained retrieval network based on InceptionResnet placed just after an MTCNN, we have been able to identify the faces of enrolled people which we know to be not interested in. Lastly, we created and trained using distillation a neural network based on a reduced VGG19 architecture that is able to detect up to seven emotions. Our results got an F1 score of 97%. Finally, we built a demo robot using Arduino to see our pipeline in action within a realistic scenario. The robot is able to track a person's face until he shifts his gaze away from it. 
