---
title: Smart Bus Stop
date: 2023-01-21T22:00:00+00:00
slug: smart-bus-stop
description: An IoT project aimed to enhancing bus stops.
categories: ["development"]
tags: ["IoT", "Smart Bus Stop", "Esp32", "mqtt"]
langs: ["Flask", "Arduino"]
featured: true
---
![Cover](https://raw.githubusercontent.com/jacksalici/smart-bus-stop/main/img/cover.svg)

This project has been developed by a friend of mine and me as the final project for my Master's Degree in CS IoT course. It focuses on improving public transportation, particularly through city buses. The aim is to create a smart bus stop, which allows easier access to the service and enables (through a network of such stations) an enhancement of the service.  

In our vision, each smart bus stop will be equipped with a digital kiosk/totem device and a button board. A solar panel could also be provided to the station to make it self-sufficient during sunny hours.

The totem would allow people to see the real-time locations of public services, along with the estimated transit times through the various stations. It also makes it possible to purchase tickets on the spot. An NFC/RFID reader makes the auth possible both with the smartphone and with other physical devices (provided, for example, to the elderly who don't own a modern mobile).

For people with disabilities, a button is provided to alert the bus driver to give help or attention.

Once the network of smart stops is established, it would be possible to perform statistical analysis and forecasting on the use of a certain line, allowing better allocation of resources (add/delete a bus, "dynamic" lines, etc). The project aims to reduce maintenance costs for public administrations. An ideal solution uses an AI-powered camera to count people waiting at the stops and a server that checks if the maximum capacity of the upcoming bus would be exceeded, so calling an additional bus.

The project has been developed on Arduino and Esp32 dev-board. Although all the parts work smoothly, some components have been simplified (eg omitting some security best practices) since more realistic solutions would have been too time-expensive. 

You can see a deeper documentation on my [Github pages](https://github.com/jacksalici/smart-bus-stop), here is the overview of the architecture.  

![Architecture](https://raw.githubusercontent.com/jacksalici/smart-bus-stop/main/img/architecture.jpg)