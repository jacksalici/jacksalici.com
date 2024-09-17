---
title: MMR Driverless' Global Planner
pubDate: 2024-09-01
slug: global-planner
description: Trajectory global planner for a Formula Student autonomous car.
categories: ["Computer Engineering"]
tags: ["ROS2", "Formula Student", "Trajectory Optimization"]
langs: ["Python", "ROS2"]
featured: true
cta_link: ["https://github.com/jacksalici/mmrGlobalPlanner"]
cta_text: ["Take a look at the repository"]
cover: "/uploads/global.png"
---

      
During the ay 23-24 I was member of the university Formula Student team, in particular I was part of the driverless team. In an autonomous car software stack, the global planner starts at the beginning of the second lap and optimizes the centerline recorded in the previous first lap. This optimization aims to minimize curvature, thereby enhancing performance through a refined speed profile. Mathematically, this involves solving a quadratic programming problem that is obtained from the smoothed cubic spline track-line that represent the curvature. The actual speed profile is then generated considering the GGV diagram - that is the maximum achievable accelerations at different speeds -, as well as the car's actual dynamic and mechanic characteristics.

#### Main objectives

- Curvature minimization:

  1. minimizing curvature generally leads to smoother, faster trajectories
  2. allows for higher entry speeds into corners and more stable vehicle dynamics

- Speed profile optimization:

  1. the optimal speed profile ensures the car is traveling as fast as possible at each point of the track
  2. it is crucial for achieving competitive lap times
  
> ⚠️ **Page under construction**  
