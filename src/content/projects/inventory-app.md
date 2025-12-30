---
title: "The Inventory App"
pubDate: 2023-08-01
updatedDate: 2024-10-15
description: "A web app to manage your favorite RPG hero inventory."
categories: ["Web Development"]
stack: ["Vue", "Deta"]
cta:
  - { url: "https://inventory.jacksalici.com", label: "Check the website" }
  - { url: "https://raw.githubusercontent.com/jacksalici/inventory-app/", label: "Check the code" }
cover: "https://raw.githubusercontent.com/jacksalici/inventory-app/main/public/screenshot3.png"
---

The Inventory App is a fast, open-source and 100% free way to track the equipment of your role-playing games characters.

![screenshot](https://raw.githubusercontent.com/jacksalici/inventory-app/main/public/screenshot2.png)

The web app is built using Vue as frontend, ~and [Deta Collections](https://deta.space/docs/en/use/your-data/collections) for persistent data storage. The *NoSQL* database has 2 tables (automatically created on the first usage):~

> 🚨 **Update Oct 2024**: Deta has announced the end of its services. Therefore, until I will migrate to another service, the app is not usable anymore.

- **Heroes**  
    It contains the info about the characters and has the following attributes: `nickname` (pk), `name`, `details`, `equipment`, `slots`, `avatar`. 

- **Inventory**  
    It contains the info about the characters' equipment: `id` (pk), `object`, `details`, `quantity`, `value`, `used`.


#### Usage

For the usage of the app itself, please rely on the FAQs that are [directly on the website](https://inventory.jacksalici.com/about/).