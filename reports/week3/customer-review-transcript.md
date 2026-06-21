### Meeting Transcript
**00:00 – 01:20**

* **Developer 1:** First of all, as always, I'd like to ask if we can record this, and if possible, can we publish the transcript in the public repository later?
* **Customer:** Yes, no problem.
* **Developer 1:** Great, thanks. Today's goal is to discuss our weekly sprint, what we've managed to do this week, get your feedback, and additional feedback if other stakeholders join. We have a more refined prototype ready now, both from the frontend perspective and internally within the team — we've worked on databases, the backend, and so on. We also have the MVP V1, the backlog, and we'd like to get approval on the tasks and the steps for next week. We also have a few questions that aren't related to the course creators' plans for this week, and I'd like to start with those because one of our developers has limited time today. So, if you don't mind, let's start with those questions.
* **Customer:** Yes, no problem, let's do it.
* **Developer 1:** Perfect. Developer 2, you have the floor.

**01:20 – 03:15**

* **Developer 2:** Hello, hello. Can you hear me?
* **Customer:** Yes, I can hear you fine. Hi!
* **Developer 2:** Hi. Regarding the database, we wanted to move everything into Excel eventually so it's easier for you to track. What format would that be in? Just all data in a table, or some kind of scheme, histograms, or a pie chart?
* **Customer:** Hmm... do you mean on the frontend?
* **Developer 2:** No, in Excel. Or rather, for us...
* **Customer:** Oh, in Excel... No, we didn't intend to have an import into Excel. We wanted to be able to download files in .xls format. If you could render that analytics on the frontend, on the website itself, that would be great — like it works in Google Forms. But a direct integration with Excel wasn't planned. As for the format we mentioned, it was specified just to make it easy for us to download.
* **Developer 2:** Right, I see. So that's more of a frontend task, then?
* **Customer:** More or less, yes. Since we need to import it somehow. Actually, I think a CSV format would work for us too. It doesn't really matter. If you can render it on the frontend, that would be cool.
* **Developer 2:** Okay, thank you. The database questions are basically frontend-related. Now we need to link them with the backend and frontend; I'm currently waiting for those.
* **Customer:** Uh-huh, good.

**03:15 – 06:45**

* **Developer 1:** Perfect. I think it's better to save the other questions for the end so we can cover the most important things first. I'll share my screen now to show the backlog. Just a second... Can you see it if I do it like this?
* **Customer:** Yes, yes, I can see it.
* **Developer 1:** Wonderful. We've compiled the product backlog, where the main tasks concern our key User Stories and what we discussed with you during the last call. Currently, the most important ones are already on the frontend: the first and third User Stories. One is about events, the other is general information about the SU (Student Union). Basically, the minimal version where our site is a "business card." I'll show you how the first version looks visually a bit later, and you can tell us if anything needs adjusting and if it matches your expectations. That is the most important part, and it was our task for this sprint to fully implement these two features. Additionally, we added language switching (Russian/English), a donation button, and briefly, some other functions that you can check and comment on. In the future, we plan to merge the backend with the databases, containerize everything in Docker, and set it up on a virtual machine so the site auto-updates. Currently, everything deployed is either through third-party sources or uses outdated versions. That's where we are in terms of progress. We can share the link to our GitHub if you want to track our progress, but generally — are we moving at a good pace? Is it okay that we chose these as the main tasks for this sprint? Maybe we should add something else? We have until Sunday, so we still have time to implement more.
* **Customer:** Regarding the workload — if the events and the main page are working well, that's super. If you want to integrate it with the backend as you mentioned, that's also super. If you manage to get these two minimum features end-to-end, then that's how it should be, because by the end of the sprint, I'd like to see more than just frontend stuff or a non-working backend. The sprint ends on Sunday, right?
* **Developer 1:** Yes, effectively, yes.

**06:45 – 08:15**

* **Developer 2:** Sorry, I want to add that regarding the main page, we still need information about the SU.
* **Developer 1:** Yes, I wanted to bring that up at the end. One of our main questions is that we need a brand book and content if possible. We'll need logos for the site, as well as concrete information: photos of members, descriptions of each member, descriptions of the SU departments, and all that info. Our main page exists, but obviously, the information there isn't quite specific; it's just placeholder content.
* **Customer:** Hmm... I will try to request that. I might prepare some things myself or ask others, but it's actually a lot of work since there are three departments and a lot of members. I don't know how fast we can coordinate this. I can't promise it will be ready by next week when you start working on it, but maybe we can add it gradually.
* **Developer 1:** Yes, I'll ask everyone. Thank you very much, because right now it looks purely visual.
* **Customer:** Yes, that's fine.

**08:15 – 11:50**

* **Developer 1:** Accordingly, the pace is more or less okay. Now, I'll show you how it looks. It's mostly frontend for now, with just templates on the backend, but we should be able to connect it this week. Let's see. I'll share the screen now. While you're looking, think about whether it meets your expectations and the overall project goals. Also, look at the visual aspect — since it's mostly frontend — and what you would like us to implement in the next sprint. What's the next priority for our product? I'm starting the demonstration now. I'll send you the link later. Regarding the design, we decided to split the main page into two parts: one very general section, and a separate tab for the team. Since the emphasis is on the departments being represented by the team first and foremost, we thought a separate tab for the team would be better. We also had an idea — if you like it, we'll keep it, if not, we'll remove it — to add a history of how the SU was created. I think it shows development well.
* **Customer:** Yes, we actually wanted a history section from the start; it was in the technical requirements passed on by the project lead. So, the history must be included.
* **Developer 1:** We didn't write it as a User Story, but great, thank you.
* **Customer:** Can you scroll up a bit? Oh, "team history," I see. Is there a switch between departments? We are seeing the team history page. What about the SU? And separate tabs for departments? They currently have a general description. We were thinking about making them clickable, as we discussed that departments are primarily about the people in them. But for now, it's mostly just descriptions. We need the photos and everything to get that working properly. By the way, what's the difference between "team" and "history"? Who are these four people? Is it overall people? Or what?
* **Developer 1:** The people presented in "team" are the heads of departments, to have their contacts and such. The "history" section isn't necessarily tied to them, though obviously, it will mention who founded what and did what, but it's organized by years and dates.
* **Customer:** Understood.

**11:50 – 14:45**

* **Developer 1:** Next, let's look at events. We decided not to divide events into subsections, just "upcoming" and "past" events. You can see details for upcoming events. I have a question here: what exactly would you like to see on the event page? What information should be displayed? We thought of the date, location, and the approximate number of people registered. Maybe a photo of the venue or a description and pre-registration. Since we don't have user logins, we can't bind a specific person to a spot, but it would give an idea of how many people will attend. Should we add that? How does an event page look in your mind?
* **Customer:** For an event... we probably don't need a "Join" or "Register" button. We see events as informative cards — just stating "this is happening." It might not be from the executive team; maybe it's from the Core or Media teams. I would just leave the date, time (if it's defined, which might not always be the case), and a description. Name, description, date, and time — that's probably it. You can label them by department. Accordingly, you could later add filtering by department on the main events page to make it more convenient.
* **Developer 1:** Perfect, thank you. That's for upcoming events. Here's how we imagine past events: where, when, description, and the ability to download photos. Usually, after SU events, there's a link to third-party sites — I forget the names, but places where you can view photos. I think those links could simply be placed here.
* **Customer:** Yes, that looks great. Nice idea. I initially thought it would be like cards — like a separate post saying "look at the photos" — but I like this approach better. It looks more holistic. The event happened, and here are the photos immediately; you don't have to look for them.

**14:45 – 15:34**

* **Developer 1:** Good. Next, the questionnaires and SU section are just drafts. I think these will be the main features for the next sprint, as they require a full backend and database. We imagine surveys where you can have single-choice, multiple-choice, and open-ended questions.
* **Customer:** Understood.
* **Developer 1:** We'll also add time limitations — what date it's held and for how long.
* **Customer:** Good.

**15:34 – 16:36**

* **Developer 1:** We can discuss this in more detail later. Regarding the project backlog for the team — we had an idea to create a task list. Should this backlog be visible to everyone so they know what the SU is currently doing, or is it strictly for the team?
* **Customer:** It was intended to be a backlog strictly for the team because it's sensitive information that isn't usually disclosed to the general public.

**16:36 – 17:40**

* **Developer 1:** Understood. Then, regarding the admin login — you mentioned there's one account/login/password for different members. Won't it be difficult to implement this feature if all tasks show as coming from one person? It would just be a collection of tasks.
* **Customer:** If we are talking about specific people, we can add more people — only admins, i.e., SU members. We won't have role separation, but pre-defined registered users. We won't have registration on the site; the admin will register people separately.

**17:55 – 19:30**

* **Developer 1:** Perfect. And regarding the donation tab — for example, what we are collecting money for, or the amount, and a QR code for payment. Just something simple.
* **Customer:** I think that page is a bit overloaded. "Current campaign" — we can't track how much we collected because we aren't a tax authority; we don't have accounting. It comes in, gets spent, and that's it. We can't implement that. Also, the donation amounts (200, 500, 1000 rubles) — we don't have a payment system linked. It's just a QR code. So, just leave a QR code and say, "We'd be happy if you support us."
* **Developer 1:** Yes, keep it simple. No need to write exactly what it's for. Just a stable, non-updating link.
* **Customer:** Yes, if you want to donate, here you go. You can also insert the link itself, not just the QR code. That's enough.

**19:30 – 20:13**

* **Developer 1:** Also, we added switching between English and Russian versions. And maybe light/dark mode if needed?
* **Customer:** I think that's cool. Just make sure nothing breaks; I see the logo moved a bit.
* **Developer 1:** We'll correct that. We just need the logos themselves to align them.
* **Customer:** Yes, I'll send you the logos; that's the easiest thing.

**20:13 – 22:38**

* **Developer 1:** And lastly, this is a draft version of the admin mode. We currently set it to one password, but we'll add the ability to have multiple team members. Here you can choose surveys and see statistics — like who answered what. Is this format okay, or would you like pie charts?
* **Customer:** Regarding pie charts — I'm not sure it's critical how it looks, as long as it's readable and beautiful. It should be immediately clear how people voted. If we talk about charts, a pie chart reflects the ratio better. As for open-ended answers — a list or a file would be better, as it's hard to compile statistics for those.
* **Developer 1:** Open-ended answers in a list, like a dropdown, should work. Also, there's a function to "Add Event" which immediately appears on the Events tab, and to create/publish a survey without needing to touch the code. We'll see if this can be implemented on the frontend only, but I think it's possible.
* **Customer:** Yes, sounds good.

**22:38 – 24:24**

* **Developer 1:** Any final feedback? Is there anything you don't like? Does it meet the goals? What should we prioritize in the next sprint?
* **Customer:** About the development pace: everything is fine if you manage to do what you show me on the frontend and on the backend. By the end of the sprint, I'd like the features you show me to actually work, not just exist on the frontend.
* **Developer 1:** I'm sorry, I have to step away for a few minutes for a quiz. I'll ask another team member to handle it. I apologize for the awkward timing.

**24:24 – end**

* **Developer 1:** Okay, it seems there are no more questions. Thank you again for the call. I'll send the version now. I hope the other stakeholder eventually gives us feedback. It would be very awkward if we show them the final version and they say, "Actually, I don't like anything."
* **Customer:** I don't know, I'll try to reach them when I go to the university. I don't know when they'll connect with us.
* **Developer 1:** Well, if they look at this version, that would be wonderful. Just to get general feedback on whether what we are doing is okay.
* **Customer:** Yes, good. Thanks again. Bye!
* **Developer 1:** Thanks, bye!
