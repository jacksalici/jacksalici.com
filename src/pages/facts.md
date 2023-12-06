---
title: Facts generator.
slug: facts
hidemeta: true
description: "relax, read this and then go surfing on the net for the sake of factchecking."
---

<p class="text-lg" id="fact">Loading...<p>

<script> 

//DON'T USE EXPOSED API KEY! This is for testing purpose only, do not do that nor use the following key for your project.
window.onload = (event) => {
 fetch(
      "https://api.api-ninjas.com/v1/facts",
      {
        method: "GET",
        headers: {
          "X-Api-Key": '8Idmhms+nG6e6Agy9f1jQA==gfaW91jpy9ty2nGz',
        },
        contentType: 'application/json',

      })
        .then((response) => response.json()
        )
        .then((text)=>{
            document.getElementById("fact").innerHTML =  text[0]["fact"] + '.'
        })
        .catch((errors) => {
         document.getElementById("fact").innerHTML = "Sorry, an error occurred."
        });
};
</script>
