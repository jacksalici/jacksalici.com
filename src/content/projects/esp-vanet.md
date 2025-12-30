---
title: "ESP-VANET: ESP32-based inter-vehicular communication"
pubDate: 2024-03-25
slug: espvanet
description: A low-cost inter-vehicular communication network.
categories: ["Internet of Things"]
tags: ["ESP32", "ETSI", "CAM", "Automotive"]
stack: ["Arduino", "ESP32"]
cta:
  - { url: "https://github.com/jacksalici/esp-vanet", label: "Code and Documentation" }
  - { url: "https://drive.google.com/file/d/1W78rSVu3EVsvEumKGcSFqNU1EVi18FQa", label: "Slides" }
cover: "https://raw.githubusercontent.com/jacksalici/esp-vanet/refs/heads/main/misc/architecture.svg"

---


 **_The ESP32-based, VANET-like, inter-vehicular communication network project is aimed to provide mock ETSI ITS-G5  message, like Cooperative Awareness Messages and Decentralized Environmental Notification Messages, to nearby cars._** _It was proposed as the final project for the Automotive Connectivity course within my Computer Engineering master's degree._


## Abstract

It's known how far an efficient and well-established _V2V_ and _V2X_ network would lead toward better travel safety, rarer traffic congestions and lower fuel emissions.  

To achieve those goals, both the US and the EU have made proposals that could lead to standardizing the V2X/V2V communication. In particular, the European Telecommunications Standards Institute
(ETSI) has proposed a middleware solution for sharing information between nearby vehicles. These are the _Cooperative Awareness Message (**CAM**)_ and _Decentralized Environmental Notification Message (**DENM**)_.

The ESP32 is a low-cost low-power microcontroller family by Espressif very popular in the industry due to its high efficiency and versatility. Besides the WiFi and Bluetooth standard connectivity, it also offers **ESP-NOW** a wireless communication protocol between microcontrollers.  

**This project simulates the standard CAM and DENM messages, using an ESP32 mesh built over ESP-NOW; and it is aimed to leverage the constraints needed to deploy a system like this**, since a generally available MCU and the OBD2 port - which is already present in all the cars - are the only things needed for the code to work.