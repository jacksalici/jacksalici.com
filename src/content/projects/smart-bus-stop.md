---
title: Smart Bus Stop
pubDate: 2023-01-21
slug: smart-bus-stop
description: An IoT project aimed to enhance bus stops.
news: Smart Bus Stop is an IoT system to improve public transport via real-time data and sensors.
categories: ["iot-and-v2x"]
kind: engineering
activities: ["applied-embodied-ai"]
stack: ["Flask", "Arduino", "ESP32"]
cover: /uploads/smart-bus-stop/architecture.jpg
cta:
  - { url: "https://github.com/jacksalici/smart-bus-stop", label: "Take a look at the repository" }
---

This project was developed by a friend of mine and I as the final project of the IoT course of my master's degree. Its focus is public transport, and city buses in particular: a network of smart bus stops that makes the service easier to access and improves it.

![Architecture of the system: the bus server, with resource manager, digital twin and forecasting, talks over MQTT with the bus client and with the help button and people counter of each stop, and over HTTP with the web client and NFC authentication of the kiosk](../../assets/uploads/smart-bus-stop/architecture.jpg)

In our design, each stop has a digital kiosk and a button board, and a solar panel can make the station self-sufficient during sunny hours.

The kiosk shows the real-time position of the buses and the estimated transit times at the stops, and it lets people buy tickets on the spot. An NFC/RFID reader authenticates users with a smartphone or with a physical card, for example for elderly people who do not own a recent phone.

The button lets people with disabilities alert the driver that they need help or attention.

Once a network of smart stops is in place, its data support statistics and forecasting on each line, so that resources can be allocated better (adding or removing a bus, "dynamic" lines and so on); the project aims to reduce the costs of public administrations. Ideally, a camera with on-board AI counts the people waiting at each stop, and the server checks whether the next bus would exceed its capacity and calls for an additional one.

The prototype runs on Arduino and ESP32 development boards, with some components simplified to fit the scope of a course project. The full documentation is in the [GitHub repository](https://github.com/jacksalici/smart-bus-stop).
