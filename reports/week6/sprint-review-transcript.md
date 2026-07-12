---
## Date: 10.07.2026
---

## Speakers
| Speaker | Role |
|---------|------|
| Speaker 1 | Team Lead | Alina |
| Speaker 2 | Client | Valerii |
| Speaker 3 | Developer | Emil |
| Speaker 4 | Client | Anna |
| Speaker 5 | Developer | Bulat |
| Speaker 6 | Developer | Svetlana |
| Speaker 7 | Developer | Daria |

---

## Transcript

---

**00:00:01**

**Speaker 1:** Let me ask right away – can we publish this? I mean, are we recording?

**Speaker 2:** Yes, thank you.

**Speaker 3:** Yes.

---

**00:00:05**

**Speaker 1:** Okay, so… So. In terms of changes – again, we used the branding book. Also, we've added names to departments and participants, so now the list is complete with names and avatars.

**Speaker 2:** Right.

---

**00:00:20**

**Speaker 1:** If we're talking about features specifically – in the panel, you can now actually create surveys and events. For an event, you can set a speaker. And for a survey, you can import survey data.

**Speaker 2:** Oh, maybe that wasn't there before.

---

**00:00:35**

**Speaker 1:** Third event. Is this field required? Location?

**Speaker 3:** For now, yes.

**Speaker 1:** Actually, I understand we could make fields optional or required – so we have flexibility. And there's also a page on the site where you can view and download all events.

---

**00:00:55**

**Speaker 2:** Yeah, I wanted to say – we could just put plain text there. Just to view it. Sorry, I keep getting sidetracked with the events.

**Speaker 1:** You can also put it into empty text fields, if your data isn't empty there.

**Speaker 2:** Where?

**Speaker 1:** Maybe we could allow it. Yeah, here. Cool, cool.

---

**00:01:15**

**Speaker 1:** What do you think?

**Speaker 3:** What do I think? It's fine, fine.

---

**00:01:25**

**Speaker 1:** I have a question. First of all – this is just a superficial question. Scroll up, scroll down. No, down. Why is this centered here, but not centered here? Just a small question.

**Speaker 3:** That's a frontend question.

---

**00:01:40**

**Speaker 1:** Actually, this probably isn't very convenient. How is this organized here? If I add 10 more events right now, how will it look?

**Speaker 3:** I think it's simpler – the frontend probably has something already created for that.

**Speaker 1:** No, it's loaded from the database. Everything created goes straight to the database and is loaded from there. So it's definitely not mock data or frontend-only.

---

**00:02:00**

**Speaker 1:** Yeah, this isn't very convenient – displaying everything right here on the creation page. Maybe we should have a separate page so you can navigate and manage them?

**Speaker 3:** I'd really like to manage them – edit them.

**Speaker 1:** Exactly – it would be nice to edit them. Like, dates change, right? So even if there's a typo in the description, you can't fix it here.

**Speaker 3:** Yeah, you can only delete it.

**Speaker 1:** Recreate it somehow – it's just not convenient. And the functionality itself isn't great either, because look – only about a third of the screen is used for creation. This whole part is non-functional. And there's a huge scroll. It's not clear why.

---

**00:02:45**

**Speaker 1:** We could separate the pages. Split it via a menu, make better use of space. Maybe move the list of existing events to the side.

---

**00:03:00**

**Speaker 1:** And also – we still want survey statistics, response data. Are we doing that?

**Speaker 3:** Will you have time?

**Speaker 1:** No, no. But we'd like to, right?

**Speaker 3:** Of course.

**Speaker 1:** I think – from the tasks that can still be completed – the backlog includes survey statistics and adding images to events.

---

**00:03:25**

**Speaker 1:** How many weeks do you have left?

**Speaker 3:** Oh, and by the way – the frontend asked: are images stored in the database or in a cloud bucket?

**Speaker 1:** Retrieving them from the database would take forever. Yeah, that's exactly what's needed. So it's in a bucket – that's fine.

**Speaker 3:** Okay, we'll handle the bucket.

---

**00:03:50**

**Speaker 1:** As for the backlog – if you have one week left, you won't make it. That would be insane without overtime. Just finish what you have. The admin panel needs to be more readable and user-friendly.

**Speaker 3:** Yes.

**Speaker 1:** So… I'm going to click around a bit so you can see. One more thing – and statistics.

---

**00:04:15**

**Speaker 1:** The admin panel – it's generally readable, it's okay. Oh – where's the text? Or is it open source? Oh, okay. Oops.

---

**00:04:30**

**Speaker 1:** Adding questions isn't very intuitive. You type a question, then click "Add this same question" – it looks like you want to add another one, and that it should appear. You need to rework that – it's not intuitive at all.

---

**00:04:50**

**Speaker 3:** An event. And this – yes, but so it can be downloaded.

**Speaker 1:** Oh, here – for the frontend…

**Speaker 2:** Yeah, but won't it be created?

**Speaker 1:** You'll have a recording. Screen recording? Yes, we'll have that. No, no – but so he can actually look at it. It's easier if you just click around with the mouse.

**Speaker 3:** What? It's just design…

**Speaker 1:** Let's do it later – I'll tell him what needs to be done.

**Speaker 3:** I think it's better to order it.

**Speaker 1:** I think if it's audible – you can hear it on the recording, right? Okay. There's a screen recording, so let's use that.

---

**00:05:20**

**Speaker 1:** And – export, respectively.

**Speaker 3:** He downloads two.

**Speaker 1:** Actually, I've downloaded them before. But he downloads them by name. Which one is he downloading?

**Speaker 3:** He downloads both, and both are visible in the table. Here.

**Speaker 1:** That's not very convenient – you download one, but both appear.

**Speaker 3:** Look. I didn't delete the previous ones.

**Speaker 1:** Only two. Oh, okay.

---

**00:05:50**

**Speaker 3:** Guys, we have a quest about history.

**Speaker 1:** Yeah, both download. I agree – it's cool, but not very convenient. Export should be separate. For each one, separately.

---

**00:06:05**

**Speaker 1:** So basically, you need to refactor – separate page for creating events, separate pages for questionnaires. Functionality and appearance need reworking.

**Speaker 3:** Maybe you just finished events…

**Speaker 1:** Yes, I created an event.

**Speaker 3:** Coming.

---

**00:06:25**

**Speaker 1:** Guys, why do you have to refresh everything for it to appear? That's not seamless at all. You need page reloads, pulling data again.

**Speaker 3:** Okay.

---

**00:06:40**

**Speaker 1:** Will you add a description for each person?

**Speaker 3:** We could – we planned a modal window with a short description when you click on a person.

**Speaker 1:** Yes, good. That's in the branding book.

**Speaker 3:** Yes, it's there. I attached it. There are links – if you open the participant list, there's a link to Telegram.

**Speaker 1:** Good – we'll have that. Probably not for everyone, but skip those.

---

**00:07:05**

**Speaker 1:** I'd also expand that. Maybe arrange them in a chessboard layout, because it's hard to read. And – let me clarify this for you, because I think there are several Marias.

**Speaker 3:** Oh, and the head – not her. Martyanova? Oh, the photo – yes, she's now the head. New photo.

**Speaker 1:** No, it's true. Well, it's all – she's our friend, just so you know.

**Speaker 3:** Yes. But you have a photo of a different person. There's [redacted name] and [redacted name] – you have the photo of…

**Speaker 1:** Oh, that's true – okay. Well, okay, that's [redacted], right. Oh, right.

---

**00:07:45**

**Speaker 1:** Could we add a description here, although…

**Speaker 3:** What, did Active grow that much?

**Speaker 1:** Yeah, haven't you seen – they dropped those interns, like 10 people.

**Speaker 3:** Terrible.

**Speaker 1:** That's another 10 they dropped.

**Speaker 3:** No, dropped as in – added to Phoenix. I was testing it out.

**Speaker 1:** Hi.

**Speaker 3:** I was testing somewhere in the middle of something weird, and I thought – wow. [redacted] is now in Active.

**Speaker 1:** Yes, that's true. Well, [redacted] – that's totally fine.

---

**00:08:15**

**Speaker 1:** How many in Media?

**Speaker 3:** In Media… not that many.

**Speaker 1:** But they still didn't take [redacted], by the way.

**Speaker 3:** Yeah, well, apparently there are some personal reasons.

**Speaker 1:** That's true. Relationships.

**Speaker 3:** Right.

---

**00:08:35**

**Speaker 1:** Um – event. In short, [redacted] – there will be a short one at the beginning – you'll need to listen, there's frontend stuff.

**Speaker 3:** I think we'll see later.

**Speaker 1:** Okay.

---

**00:08:50**

**Speaker 1:** I also wanted to ask – do you expect people to contribute to this project? For the contribution documentation, can we just write the standard workflow we used? Or if it's planned – do you have any wishes for what people should do to contribute?

**Speaker 3:** Well, we discussed at the beginning that contributions – we're not likely to get them. If we wanted to, we'd just fork it.

---

**00:09:10**

**Speaker 1:** Yes – for this meeting, we have user scenarios: first, you can create a survey and it will be displayed. Same for events. Also, you can enter a response in a survey, and when you export, that response will be visible. On the main page, everything opens up, and you can view more details. Also, when you log in from a local device, the session is saved.

**Speaker 3:** Good.

**Speaker 1:** I think we've covered everything.

---

**00:09:40**

**Speaker 1:** Also, ask about handover – since you'll be choosing one out of three. Would it be better for us to just hand over the repository and some instructions, or if in the future – for example, if this project is relevant – we could deploy it on your machine ourselves?

**Speaker 3:** Listen, how about the handover – in what format would you like to receive the project, and will we continue working on it after the presentation?

**Speaker 1:** That depends on you.

**Speaker 3:** No, I mean – there are three projects, and if you say you liked another one more, we'll probably work on that one, but…

**Speaker 1:** Well, actually, all three are roughly the same quality in the end.

---

**00:10:15**

**Speaker 1:** Look – this was all planned to be opened under [redacted organization], which I was supposed to head. Now I'm not sure how that's going to work. So – if you want to work on developing similar resources and maintaining this site directly, you could become part of [redacted], come and work directly on it – they'd handle all the support, deployment, and development of new features.

**Speaker 3:** Okay, then we'll give them access to the repository and instructions…

**Speaker 1:** Well, not access – we'll fork it so your authorship is preserved.

**Speaker 3:** Yes. Since we don't know who will be handling it…

**Speaker 1:** We'll talk to the person, but they're definitely not just going to copy your files locally and re-upload them.

**Speaker 3:** Of course.

**Speaker 1:** No, no – it'll definitely be a fork, so your authorship stays, because this is your project – that's not even up for debate.

---

**00:11:00**

**Speaker 1:** I have a question – what does [redacted] code in? Python?

**Speaker 3:** Well, he lost. That's true. Mostly Java. We have two projects in Java, and one with Python.

---

**00:11:15**

**Speaker 1:** Guys, the biggest drawback: reloading for every little thing – that's terrible.

**Speaker 3:** Second drawback… Well, okay – [redacted], now you say something too.

**Speaker 4:** No, I already said – the admin panel needs to be rebuilt, because it's really not convenient.

**Speaker 1:** That's true. And the navigation is still – well, okay, it's fine. It's hidden and whatever. My main feedback is about the admin panel creation flow. And the export, guys – that's not great.

---

**00:11:50**

**Speaker 1:** For the rest – add descriptions for participants and that's it. And if you have any bugs you've found yourselves – fix those too. Especially if you have one week left. One – is that this week or next?

**Speaker 3:** Next, I think.

**Speaker 1:** So – sort of like a bugfix round. Yes, yes. Especially since you have a presentation.

**Speaker 3:** Yes, good.

**Speaker 1:** I think that's it?

**Speaker 3:** That's it. Thank you.

---

**END OF TRANSCRIPT**
