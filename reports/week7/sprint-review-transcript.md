# Sprint Review Transcript – 18.07.2026

## Speaker Reference Table

| Role | Name | Speaker Code |
| :--- | :--- | :--- |
| **Team Lead** | Alina | **Speaker 1** |
| **Customer** | Anna | **Speaker 2** |
| **Front-end Developer** | Sveta | **Speaker 3** |
| **Front-end Developer** | Bulat | **Speaker 4** |
| **Database Developer** | Emil | **Speaker 5** |

---

## Transcript

### 00:00
**Speaker 1:** Can we publish the recording and transcript?  
**Speaker 2:** Yes, you can.  
**Speaker 1:** Thank you. So, this week my main goal was to work with the admin panel, to refactor it.  
**Speaker 2:** Uh-huh.  
**Speaker 1:** So, we now have separate tabs.  
**Speaker 2:** Uh-huh.  
**Speaker 1:** What has changed specifically? Now you can edit events and polls.  
**Speaker 2:** What about your code? Did you implement something like a code freeze, or are you still working on it?  
**Speaker 1:** You mean, is there a question about stopping, or...  
**Speaker 2:** No, literally, are you still refining the product or is this the final version? Are you not working on it anymore?  
**Speaker 1:** Well, we made all the corrections that were needed. I guess it's final, only if you have any edits.  
**Speaker 2:** Could you make this entire part clickable here, the start date and end date? They are very long, and if you click on them...  
**Speaker 1:** Like [inaudible]?  
**Speaker 2:** Yes, because the selection only works if you click on the icon. It's not very convenient because...  
**Speaker 1:** So that you can enter the data yourself?  
**Speaker 2:** No, not entering it yourself, but so that you can select it. You click and choose, but here you have to reach across the whole screen to select.  
**Speaker 1:** Okay.  
**Speaker 2:** Not very convenient.

---

### 01:40
**Speaker 2:** Could you make the location optional?  
**Speaker 1:** Yes, okay. So, the edit button, and if you change something, all changes are pulled in immediately. And one of the changes is that you don't need to refresh the page. When switching between tabs, everything updates automatically.  
**Speaker 2:** Uh-huh.  
**Speaker 3:** There's also the export of questionnaires.  
**Speaker 1:** Oh, yes, the export of questionnaires is now, firstly, not on the frontend, and secondly, you can do it individually now, [inaudible], right?  
**Speaker 2:** Wonderful.  
**Speaker 1:** We also had a question about events. We currently have it set up so that we can add photos from Google Drive links to past events.  
**Speaker 2:** Uh-huh.  
**Speaker 1:** Can we keep it this way, or would you prefer if we figure out how to insert photos directly? We thought that if we insert a link to the drive, it should be convenient enough, and we could just insert photos as links, for example. [inaudible]  
**Speaker 2:** A link is definitely needed here, but we were also thinking...  
**Speaker 1:** No, links directly to the photos, there's a link to the drive itself and links to the photos so they are displayed in the event, for past events.  
**Speaker 2:** So you will pull them directly through...  
**Speaker 1:** Yes.  
**Speaker 2:** And the link... is it a link from Yandex Disk?  
**Speaker 1:** Yes, yes.  
**Speaker 2:** Where are they stored? They are not stored anywhere on the backend. They are just pulled in.  
**Speaker 4:** Uh-huh.  
**Speaker 2:** Okay. But here the date has completely disappeared. Where is the date and... it's completely gone here, it's not the one I selected.  
**Speaker 1:** I think it was the 23rd.  
**Speaker 2:** [inaudible] and the time was different.  
**Speaker 1:** The time might be different, right?  
**Speaker 2:** Here, accordingly, it just disappeared.  
**Speaker 1:** It updates by day, the time doesn't affect it. By the way, is the time required?  
**Speaker 2:** Time...  
**Speaker 1:** Or can we set, for example, that it ends the next day after the event date?  
**Speaker 2:** You can remove the end date, you can leave only the start date, but you need to keep the time.  
**Speaker 1:** Okay.

---

### 04:02
**Speaker 2:** I haven't figured out what to write.  
**Speaker 3:** Oh, another thing we need to discuss in week seven is whether it's ready...  
**Speaker 1:** She's probably looking at it fully first.  
**Speaker 3:** We also wanted to ask about the history. So, will we have mock data for that, or could you provide us with something?  
**Speaker 2:** No, the history will be mock data because we don't have it. We didn't collect it separately.  
**Speaker 3:** Okay.

---

### 05:23
**Speaker 2:** So, export... lines.  
**Speaker 1:** Also, because there are probably no answers to the question. If you answer the questionnaires, they appear. Yes, let's download the first one. Because we answered them. Like ours.  
**Speaker 2:** Uh-huh. And we don't see any answers. We can't view them except through...  
**Speaker 1:** Only the file.  
**Speaker 2:** Only the file. Uh-huh.  
**Speaker 4:** Uh-huh.  
[inaudible]  
**Speaker 2:** Maybe there's no refresh somewhere. I did this, this, and back, and it kicked me out to events, not to polls.  
**Speaker 4:** Uh-huh, because polls, if...  
[inaudible]  
**Speaker 4:** Because polls, and it's the same page.  
**Speaker 1:** Ah.  
**Speaker 2:** It shouldn't be like that.  
**Speaker 4:** Uh-huh.  
**Speaker 2:** These should be different questionnaires. Usually, it indicates the poll and here the ID. And it opens a different page.  
[inaudible]  
[redacted]

---

### 07:19
**Speaker 2:** It happens. Anyway.  
**Speaker 1:** Oh, yes, we also added cards. And now with the toggle, it only loads the first time, and then if you refresh the page, it sets. Oh, when we create, it immediately shows the photo.  
**Speaker 2:** Uh-huh.  
**Speaker 1:** We also changed Maria's photos, and I think there was a problematic photo with Yegor.  
**Speaker 2:** Yes.  
[inaudible]  
**Speaker 2:** Why didn't you write the description for these guys? They also had it in the telegram.  
[inaudible]  
**Speaker 5:** So, as a description for them, right?  
**Speaker 2:** And here the picture is flipped.  
**Speaker 4:** Also as a card, so when they open, it's all in a modal window.  
**Speaker 1:** It opens when you rotate it 90 degrees. Anyway.  
**Speaker 2:** Okay.  
[inaudible]  
**Speaker 2:** What will the uploaded photos look like? So, if I add photos here?  
**Speaker 4:** They will be here at the bottom as photos, and here is the link. I tested it locally.  
[inaudible]  
**Speaker 1:** Uh-huh. Can you show a screenshot there, or not?  
**Speaker 4:** No, I don't have a screenshot.  
**Speaker 1:** Well, if anything, we can send you how it looks. Today, for example.  
**Speaker 2:** Okay.

---

### 09:02
**Speaker 2:** Okay, and how are the polls sorted here?  
**Speaker 1:** I think just by the date added.  
**Speaker 2:** Not true. I created this one, so they are probably sorted in reverse order, from oldest to newest. But that's not very convenient, I changed the order.  
**Speaker 4:** Okay.  
**Speaker 2:** Do you have any functionality for, say, open and closed polls? So, when a poll expires, how does it disappear?  
**Speaker 5:** Just delete it.  
**Speaker 2:** So it has to be deleted directly.  
**Speaker 4:** Yes.  
**Speaker 2:** Wouldn't you like to add functionality to set an end date so it just hides from here?  
**Speaker 4:** Not necessarily.  
**Speaker 1:** If it's hidden, it will probably disappear from the admin panel, right? No?  
[inaudible]  
**Speaker 4:** It shouldn't, we'll just remove the display.  
**Speaker 2:** Yes, so it stops being displayed in that... For that, you can write something in the DB like active/inactive, just split by roles. So, active ones load there, and all of them load in the admin panel. And I can't change them if I need to fix a typo, for example.  
**Speaker 4:** Delete and start over.  
**Speaker 2:** And if someone has already answered?  
**Speaker 4:** How did they manage to?  
**Speaker 2:** Add the ability to edit polls.  
**Speaker 4:** Yes, okay, it's the same functionality as you have, it won't be difficult.  
**Speaker 1:** Why isn't it there then?  
**Speaker 4:** We weren't asked.  
**Speaker 2:** Okay.  
[inaudible]

---

### 10:54
**Speaker 2:** Well, that seems like everything. And this routing, someone here...  
**Speaker 4:** Yes, yes, yes, okay.  
**Speaker 2:** The routing works.  
**Speaker 4:** If so. And if you go to the event, somehow...  
[inaudible]  
**Speaker 2:** What is this ID? I don't think you've managed to create that many.  
[inaudible]  
**Speaker 2:** And this... This is from you. Unique ID from you. Okay.  
**Speaker 3:** Everything is fine.  
**Speaker 4:** And you can send me the QR, I'll attach it right away.  
**Speaker 2:** Yes, okay.  
[inaudible]

---

### 11:52
— Seems like everything. It works. It works.  
[inaudible]  
**Speaker 4:** The title is in Russian first, then a dash, then in English.  
**Speaker 2:** You know there are libraries that translate automatically?  
**Speaker 4:** Is it on the backend or frontend?  
**Speaker 2:** It's on the frontend.  
**Speaker 4:** Oh.  
**Speaker 2:** But here we don't need it, we don't need to enter anything here.  
**Speaker 4:** Uh-huh.  
**Speaker 2:** The only thing is, it's probably not very convenient, it would be better because...  
**Speaker 4:** Possibly a bad translation.  
**Speaker 2:** Possibly. And is there translation on the rest of the site?  
**Speaker 4:** Yes, the rest of the site has translation. Because it's done through arrays.  
**Speaker 2:** Okay. Then it's better not to touch it, but it will look a bit off to translate the title. It seems fine otherwise.

---

### 12:54
**Speaker 1:** Yes, also regarding the documentation, are there any questions, maybe you've looked at the deploy, hand-over, for example, is it enough?  
**Speaker 2:** Okay. Can I just open your GitHub? I don't have your GitHub.  
**Speaker 1:** Oh, yes, we'll send it.  
[redacted]

---

### 22:27
**Speaker 2:** As customers, we really only need the deployment, the Swagger deployment, basically nothing else. Because this all seems more for the course and for the TA, and so on. The deployment is clear. The documentation is also clear. As for the rest, we'll figure it out if anything is needed. I don't think there's anything else to figure out. Everything seems fine, except for the edits I mentioned earlier.  
**Speaker 4:** Maybe we can briefly go over the edits for the site again?  
**Speaker 2:** Polls by specific ID. And the ability to edit questionnaires in the admin panel.  
[inaudible]  
**Speaker 2:** So they are removed from the site, and here, and here. Well, probably not here, but inactive questionnaires should be removed.  
**Speaker 5:** They are just inactive, and they get deleted, right? So you don't have to delete them manually?  
**Speaker 2:** No, not deleted, but just so they don't show up.  
**Speaker 4:** And in the end, do we need that translation library or...  
**Speaker 2:** Well, probably for translating those it's better not to, but it's better to write them manually.  
**Speaker 3:** Descriptions are also being added for the chapters.  
**Speaker 2:** Yes, for the chapters, descriptions. But that sounds like a lot, actually. Because...  
[inaudible]  
**Speaker 5:** We'll just distribute it.  
**Speaker 2:** The only thing, of course, for events, adding photos via links is not very convenient.  
**Speaker 1:** Well, since we are importing the link from the drive anyway, it seems like it would be more convenient to work with it than to upload photos again to the site.  
**Speaker 2:** Questionable, actually, because finding a link in Google Drive is probably not the most convenient feature, especially since you can't reuse them because you don't have a database, for example, where you upload a photo and then use it multiple times. You would need to upload it every time. Probably not the most convenient approach, but it seems like there's no time to redo anything.  
[inaudible]  
**Speaker 2:** Otherwise, no questions.  
**Speaker 3:** There's also a timer for the questionnaire.  
**Speaker 4:** Yes, yes, yes.  
[inaudible]  
**Speaker 3:** So the time doesn't show, so that the newest one is first.  
**Speaker 2:** Yes, the newest first. Here the time, so you can click and select here, and not reach across the screen to click here.  
[inaudible]  
**Speaker 2:** The time disappeared here, it stopped showing altogether. I think that's all.  
**Speaker 1:** For the event, you're not removing the finish time?  
**Speaker 2:** Yes, but for the event, you can drop the finish time... because...  
**Speaker 1:** Why?  
**Speaker 2:** What happened? It's fine. How are your settings for refreshes and such? Everything works here. But... "Remember me" doesn't work.  
**Speaker 4:** We never had such problems locally.  
**Speaker 5:** It's bad internet.  
[inaudible]  
**Speaker 2:** I didn't really look at their refresh. But I didn't have anything disappear. Maybe it's really lagging internet. Exactly because, well, everything is fine.  
[inaudible]  
**Speaker 2:** That's it.

---

### 27:30
**Speaker 3:** We need to record what you said. We are required to record it. Write for the client that the product is ready for independent use after the seventh week of work. So, essentially, we need to hand over the product to you so that you can use the trial version independently, deploy it, or use it on your side.  
**Speaker 1:** Well, there's a reason for that, because we're not the only team working on the product.  
**Speaker 2:** But if you need to write it formally, we still plan to fork it and figure it out after the project. We don't exactly plan to set anything up right now.  
**Speaker 1:** So, overall, the documentation and everything works fine for us, there are just edits like the date and so on.  
**Speaker 3:** And another question, so... are there any obvious problems with the product right now? I mean, there are edits, but are there any other issues or not?  
**Speaker 2:** Well, there are no obvious problems. I mean, I could classify obvious problems, if you didn't have Questionnaires, I would say "That's an obvious problem, we don't have the functionality." But as it is, it seems not.
