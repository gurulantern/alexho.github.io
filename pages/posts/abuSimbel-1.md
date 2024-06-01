---
title: Abu Simbel - Part One
date: 2024/6/1
description: Background on my journey to develop a multiplayer game for CoLab.
tag: game development
author: You
---

## Background

After completing my CS degree, I jumped head first into creating a game for [Collaboration Laboratory](https://www.collaborationlaboratory.com/), an educational program focused on offering and facilitating collaborative games to help kids foster soft skills like problem solving, teamwork, and communication. When I was approached to make the game, one of the first ideas pitched was to model a game based on the [effort](https://en.wikipedia.org/wiki/International_Campaign_to_Save_the_Monuments_of_Nubia) to relocate a collection of monuments to prepare for the flooding caused by the completion of the Aswan dam from the 1960s-1980s. UNESCO led a coalition of 50 countries to complete the endeavor which ultimately led to the system of the UNESCO World Heritage Sites.  

I loved the idea and the team at CoLab had started to prepare a package of educational material that could accompany the game so the challenges set before me were as follows: design a game, relearn the [Colyseus multiplayer framework](https://colyseus.io/), learn how to wield [Construct 3 game engine](https://www.construct.net/en), and create a working game that successfully portrays this historical collaborative effort. 

Easy. No pressure. 

## Game Design

I dedicated set amounts of hours reading through documentation and following tutorials to learn Construct 3 and brush up on my Colyseus but in most of my off time, the game would rattle around in my head. I just wanted to make something that replicated the feeling I got when playing games like Pandemic Legacy, Pax Pamir, Arcs, or really any of the great games from the old Synthesis repertoire. 

What I ultimately landed on was something that I think was a bit too complex for where I was in my journey and for what the occasion called for. The gist of the game was that players had to race against time to dismantle, transport, and build the monuments before they were consumed by the Nile river. 

One of the first mechanics I thought of was a randomized initiative that determined when certain types of actions would be resolved. For instance, each round the initiative would be shuffled and for that round Build actions would resolve before the Transport actions so students would need to make sure they were in the correct locations before executing certain actions unless they accidentally built in the wrong temple or transported temple parts to the wrong location.

My aim with this mechanic was to simulate the messyness of logistics and that all parties needed to communicate and share situational awareness when choosing their actions. Hopefully this randomized initiative could abstract all of the nitty gritty planning complexities of moving temples around. 

At its core, the game consisted of players moving numbers on the state in order get a high score. They could build, dismantle, transport, and move on the board. They could also discard all of their cards if there wasn't anything useful in their hand. Each monument had a score associated with it that would determine how many points it would be worth when it was saved or built. I wanted to be sure that players could still feel accomplished even though they couldn't completely build all of the temples because ultimately if they were able to save the temples then it was really just icing on top if they could get it built within the time. 

To make things even more complex, we added a budget mechanic into the game where each card had a cost and by the end of the round if there was a surplus the players could vote on the upgrades they wanted to purchase with said surplus to increase the effectiveness of their cards. 

To add some time pressure, I added a feature where the Nile would rise a certain amount of levels depending on how long the players took to plan in the planning phase of the game. 

Are we starting to see how this game became a bit too much?

Regardless, I was excited to get to work and once the rest of my CS program finished up I was ready to embark on developing the game in earnest. My biggest hurdle would be using Colyseus with a client that I had not used before. I had originally written a little Stone Age themed game with Unity and Colyseus which was its own struggle. Now, I needed to learn Construct 3, which lined up well with gathering kids to play in the browser which is where CoLab mainly functioned. 

My experience with Construct 3 was a mixed bag of mostly good sprinkled with some moments of desperate frustration.

More Anon. 