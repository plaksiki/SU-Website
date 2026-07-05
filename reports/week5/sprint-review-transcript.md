# Customer Review Transcript – Sprint Review

**Date:** 03.07.2026

**Participants:**
- Speaker 1 – Alina (Developer)
- Speaker 2 – Valery (Client)
- Speaker 3 – Emil (Developer)
- Speaker 4 – Anna (Client)
- Speaker 5 – Bulat (Developer)

---

**00:00 – 1:32**

[inaudible]

Speaker 1: First of all... You agree to a public recording, right?

Speaker 2: Yes, yes.

Speaker 1: Generally, should we start by showing our version right away, or not?

Speaker 3: Yes, what have we accomplished?

Speaker 1: Well... yes, let's immediately show what we did during this sprint.

[inaudible]

Speaker 1: Overall, could you navigate through it? Now the cards open, and the departments are accessible. Here. There will be specific participant information, and a button has appeared at the bottom with some extra details... Yes, additional links.

Speaker 1: The admin panel has also been added. For now, you can access it by clicking the logo three times.

Speaker 3: So that not everyone can enter.

Speaker 4: I honestly tested it, and you can also access it via `/admin`.

Speaker 1: Probably, yes.

Speaker 4: But I didn't have the credentials, so I couldn't get in.

Speaker 1: The credentials are: "admin" for the login, and "admin123" for the password.

Speaker 4: [laughs] Right, I tried "1234".

Speaker 1: Yes, and by the way, if you hover over them, they lift up slightly, which looks...

Speaker 4: Cool.

Speaker 1: Yes, by the way, can I ask about the brand book right away then? When will we at least have the logo there?

Speaker 2: The logo? We will send it to you today.

Speaker 5: Hooray!

Speaker 1: Hooray! Thank you.

Speaker 4: Yes, the logo will be sent today, and everything else...

Speaker 2: Well, we are dependent on others here; we passed the task to management, and as soon as they complete it, we will deliver it.

Speaker 1: Good.

---

**1:32 – 3:23**

Speaker 4: Oh, and listen, I tested it, and I really liked both the design and...

Speaker 2: Yes, the design is very cool.

Speaker 4: And overall, everything that is clickable here opens correctly. It's clear that for now, it's all mock data. Or...

Speaker 1: Well no, it's actually...

Speaker 4: It is pulled from the database.

Speaker 5: A certain part of it.

Speaker 1: Yes, there is a small issue with the backend. We will discuss what we want to do next and what should be prioritized because we won't manage to finish everything. It seems to me that having only one backend developer was a bit too little for this project.

[inaudible]

Speaker 1: Now, regarding the questionnaire, it is pulled from the database, which is why it lacks translations for now—currently, it's only in Russian. It features a timer, so it will essentially display "live". Also, the mobile view has gotten much better now. If you open it there...

Speaker 5: Press F12, you can switch the viewport to a mobile layout from the side menu.

Speaker 1: Ah, so just within the breakpoints, right?

Speaker 5: Yes, from the side. F12... Open developer tools. There, that's what it looks like on a mobile phone.

Speaker 3: It's good, because it was completely broken there before.

Speaker 1: Yes, the components used to shift, but now everything works, including the translation. The translation switches if you open the panel, meaning you can... change it.

Speaker 4: Looks good.

Speaker 2: Really.

[inaudible]

Speaker 5: Well, it works, right?

Speaker 1: The username is "admin" in lowercase, and the password is "admin123".

Speaker 4: Just "123"?

Speaker 1 and Speaker 3: No, it's "admin" and "123" combined.

Speaker 4: Ah, okay.

Speaker 1: Excellent encryption.

Speaker 2: Let's leave it like that.

[inaudible]

---

**3:23 – 6:00**

Speaker 3: The database also defines roles. This is for our internal backlog layout, so that for each role we understand who is writing—whether it's the student council or someone else entirely.

Speaker 4: Uh-huh.

Speaker 1 and Speaker 5: As for the button, it works, but it only displays mock data for now since we ran into some small...

Speaker 1: ...delays with the backend development. Anyway, that's where we stand with development. And from here, you can immediately just navigate back out to reset the view. There.

Speaker 4: Where is the page for creating questionnaires, for example?

Speaker 1 and Speaker 5: Well, that exactly isn't implemented yet. The admin panel exists, yes, but you cannot modify anything inside it yet except for the mock data.

Speaker 1: We have a massive bottleneck with the backend right now...

Speaker 4: So, what did you actually do this week then?

Speaker 1: Well, the design changed significantly. We added event cards, the admin panel appeared, the table export functionality was started, and the backend...

Speaker 3: The mobile responsiveness... Uh-huh.

Speaker 1: Yes, that too. And it updates every 5 minutes—the site builds and deploys via Docker automatically, so...

[inaudible]

Speaker 2: What exactly happened to the backend?

Speaker 4: What happened to the backend?

Speaker 5: The developer fell behind a bit.

Speaker 1: Yes.

Speaker 2: And who is your backend developer?

Speaker 1, Speaker 3, and Speaker 5: Dasha.

Speaker 2: The one who isn't present right now?

Speaker 1: Yes, exactly.

[inaudible]

Speaker 2: No, I would just be interested to ask her directly. What specifically wasn't finished? What architecture problems occurred?

Speaker 1: Well, there were issues connecting to the databases, if I'm not mistaken.

Speaker 2: With migrating data to the shared table?

Speaker 1: Uh-huh.

Speaker 2: You are writing this in Spring, right?

Speaker 1: Yes, Spring Boot.

Speaker 2: So what are the issues there?

Speaker 1: Any other questions?

Speaker 5: Well, she simply didn't manage to implement the endpoint that passes the data array from the backend to the frontend.

Speaker 3: We also spent a long time debating how to structure the data transfer—whether to send arrays or look them up by IDs. It took a while.

Speaker 1: What took a long time? Well, as I said, one backend developer was simply not enough for this scope.

Speaker 3: We spent a long, long time deciding.

Speaker 1: Right now, there are also issues with database containers when they try to pull data...

Speaker 3: Yes, database issues. What exact problems?

Speaker 1: Not with your tables specifically, but with what is happening on the server side.

Speaker 3: There are no issues there.

[inaudible]

---

**6:00 – 7:48**

Speaker 1: Let's look at what else we have. Exporting tables to CSV is a must, and it should probably be our top priority for next week.

Speaker 3: The admin panel functionality needs work...

Speaker 4: Yes, the admin panel is essential for creating both events and questionnaires.

Speaker 2: Focus on the questionnaires first.

Speaker 4: Yes.

Speaker 1: I saw a lot of notes regarding the backlog feature, but I wasn't present during the stakeholder interview. The backlog management inside the admin panel—how should it work?

[inaudible]

Speaker 2: Guys, forget the backlog for now, I beg you. Just deliver a functional questionnaire first.

Speaker 3: Yes, the backlog feature comes at the very end if we have spare time.

Speaker 1: Yes. We also need to add a link there.

[inaudible]

Speaker 1: As I mentioned before, the "live" questionnaire needs to have a time limit fetched from the database. That's why it isn't translated yet—it currently loads exclusively in Russian. Also, are we still planning to implement dark and light themes? Or is it a low priority?

Speaker 4: That is highly non-prioritized right now.

Speaker 2: Well, if your frontend developers have absolutely nothing else to do because the bottleneck is purely on the backend, they can work on the themes. But if they have other front-facing tasks, then absolutely not.

Speaker 4: The frontend developers still have a massive amount of integration work left that depends on the backend. You should reallocate someone to help out with the backend.

Speaker 2: Right, but who is going to learn backend development from scratch right now? Nobody.

[inaudible]

Speaker 2: Honestly, Spring Boot is very straightforward. It's simpler than Django, relatively speaking.

[inaudible]

Speaker 5: I actually started looking into it...

Speaker 5: For the frontend, our remaining tasks are strictly the creation interfaces for questionnaires and events.

Speaker 1, Speaker 4, and Speaker 3: Yes.

Speaker 2: Can we take a look at the codebase?

[inaudible]

Speaker 2: May I?

Speaker 1: Yes, of course.

Speaker 2: Thank you.

[inaudible]

[redacted]

---

**12:07 – 14:49**

Speaker 4: Everything looks good on the front. Just please write the backend logic; right now, there is absolutely nothing connecting it.

Speaker 2: Yes.

[redacted]

Speaker 2: Everything is cool, guys. I approve.

Speaker 4: Well, it would be perfect if the backend was operational. Because as far as I can tell, right now this is just a static visual layout on the page, and it's not interconnected with a data flow yet. Or is it?

Speaker 1: Well, down the line it will be.

Speaker 5: No, there is some connection already.

Speaker 1 and Speaker 5: The questionnaires do submit data to the database, but currently, it's only the questionnaires.

Speaker 4: Uh-huh. I mean that eventually, all these events and questionnaires will be dynamically populated.

Speaker 1 and Speaker 5: Yes, exactly.

Speaker 4: But for now, that dynamic population isn't there.

Speaker 5: Yes, currently only the questionnaire responses are synchronized.

Speaker 4: Writing the admin panel for creating questionnaires and management forms is not a fast task. It only goes quickly if you already have a mature architecture where you just drop in controllers and you're done. But for now, your architecture... well, it's there, but it's basic.

[inaudible]

Speaker 2: No, I like it. What's wrong with it? Everything looks beautiful.

[inaudible]

Speaker 4: If you don't shift a frontend developer over to assist with the backend, you won't deliver the backlog at all because the backend workload is too heavy.

Speaker 1: We will reallocate someone. Fine.

Speaker 4: How, though?

Speaker 1: We'll manage it.

Speaker 5: Two developers are more than enough to handle the remaining frontend tasks anyway.

[redacted]

Speaker 3: The deployed production site looks different. What you saw on Google Studio is the finalized UI.

Speaker 2: Yes, he built it. The layout here is completely different. It's very cool, guys. Really.

Speaker 4: No, it's high quality.

Speaker 5: There are also easter eggs hidden on the site. Check out the room number you are assigned to.

[inaudible]

[redacted]

---

**15:40 – 16:55**

Speaker 4: Overall, most components are solid. If we can just tie this into the backend properly, it will be great. Right now it looks excellent on the frontend, but it lacks deep functionality because the backend is barely there.

Speaker 5: Well, yes.

Speaker 4: There.

Speaker 1: Yes, okay. We will try to structure it. What's our immediate plan? To get the questionnaire creation working properly, we need the backend up first.

Speaker 5 and Speaker 3: Backend first... so it populates correctly.

Speaker 4: The questionnaire creation form.

Speaker 4: Yes, first focus on that minimum viable product...

Speaker 1: ...so that data export is fully functional. We will also try to complete the events page in time.

Speaker 5: Oh, by the way, regarding the CSV export format. What specific data layout should we avoid, or conversely, what layout would you prefer to see?

Speaker 4: Speaker 2, this is for you.

Speaker 5: In what layout do you want the questionnaire CSV data delivered?

Speaker 2: The first row should contain the questions separated by a standard delimiter, and the subsequent rows should list the respective answers.

Speaker 5: Uh-huh. And that's all?

Speaker 4: Yes.

Speaker 1: Is it possible to generate it so it immediately renders charts and distributions?

Speaker 4: Well, no. If you export a CSV, it's just raw tabular data.

Speaker 3: Yes.

Speaker 4: You can build chart rendering on the frontend if you really want to overcomplicate your life and burn out.

Speaker 4: We could probably set it up in the cloud or write it manually on the frontend [inaudible]. Something like that seems feasible, we'll look into it.

Speaker 2: Well, you can try.

Speaker 4: Why did you suddenly switch to English?

[inaudible]

[redacted]

---

**17:10 – 17:39**

Speaker 4: Well, overall, that covers it. Next week, just pull up the backend so the data integration actually functions.

Speaker 2: Honestly, I already really like your frontend. You're basically at a point where the UI is near completion.

Speaker 4: Yes.

Speaker 2 and Speaker 4: But the backend integration is heavily lacking.

Speaker 1: Well, the main thing is we are getting the logo.

[inaudible]

Speaker 2: Yes, it's on the way. Speaker 4 will take care of it.

Speaker 4: Okay, will do.

Speaker 4: Well, that's everything.

Speaker 1: Are we done? Yes.

Speaker 1: Thank you all very much for the feedback.

[inaudible]
