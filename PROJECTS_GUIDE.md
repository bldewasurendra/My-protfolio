# 📘 How to Manage & Add Projects (ව්‍යාපෘති එකතු කිරීමේ සහ වෙනස් කිරීමේ උපදෙස්)

This guide explains how you can easily add new projects, update existing ones, and include images.

---

## 🚀 ක්‍රමය 1: වෙබ් අඩවිය තුළින්ම එකතු කිරීම (Easy & Instant via UI)

1. ඔබගේ Portfolio වෙබ් අඩවියේ **Featured Projects** කොටසට යන්න.
2. එහි දකුණු පස ඇති **`+ Add Project`** බොත්තම Click කරන්න.
3. Form එක පුරවන්න:
   - **Project Title**: (උදා: FitPulse)
   - **Category**: Mobile Applications, Web Development, හෝ Desktop Systems
   - **Badge**: (උදා: Mobile & AI, Full-Stack)
   - **Tech Stack**: කොමා (,) වලින් වෙන් කර තාක්ෂණයන් ලියන්න (උදා: `Flutter, Dart, Firebase, SQLite`)
   - **Short Description**: කෙටි හැඳින්වීමක්
   - **Key Features**: විශේෂාංග එක් පේළියකට එක බැගින්
   - **Image**: ඔබගේ පරිගණකයෙන් ඡායාරූපයක් Upload කරන්න (හෝ Image Path එකක් ලබාදෙන්න)
   - **GitHub Link**: ඔබගේ Repository link එක
4. **`Save & Add Project to Portfolio`** click කරන්න.
   - ව්‍යාපෘතිය ක්ෂණිකව Portfolio එකට එක් වේ!

---

## 💻 ක්‍රමය 2: Code එක හරහා ස්ථිරවම එක් කිරීම (Permanent Code Method)

ඔබගේ ව්‍යාපෘති GitHub එකට push කරන විට ස්ථිරවම තිබීම සඳහා:

1. ඔබගේ Project ඡායාරූපය `assets/images/` folder එකට save කරන්න (උදා: `myproject.jpg`).
2. `js/projects-data.js` file එක open කරන්න.
3. `projectsData` array එක ඇතුළට පහත structure එක අනුව අලුත් කොටසක් copy-paste කරන්න:

```javascript
{
  id: "my-new-project",
  title: "My New Project Name",
  category: "mobile", // "mobile" | "web" | "desktop"
  categoryBadge: "Mobile App",
  image: "assets/images/myproject.jpg", // ඔබගේ image එකේ නම
  techStack: ["Flutter", "Dart", "Firebase"],
  shortDesc: "A short one-paragraph description of the project...",
  keyFeatures: [
    "Key feature 1 description",
    "Key feature 2 description",
    "Key feature 3 description"
  ],
  overview: "Detailed overview explanation for modal popup...",
  detailedFeatures: [
    "Detailed feature 1...",
    "Detailed feature 2...",
    "Detailed feature 3..."
  ],
  github: "https://github.com/bldewasurendra",
  demo: "#"
},
```

4. File එක Save කරන්න. වෙබ් අඩවිය refresh කළ විට එය ස්වයංක්‍රීයව අලංකාර Project Card එකක් සහ Modal එකක් ලෙස දිස්වේ!

---

## 📞 ඔබගේ සත්‍ය Contact Links (Configured Links)

- **Email**: [lenminibhagya@gmail.com](mailto:lenminibhagya@gmail.com)
- **LinkedIn**: [linkedin.com/in/bhagya-lenmini-dewasurendra](https://www.linkedin.com/in/bhagya-lenmini-dewasurendra?utm_source=share_via&utm_content=profile&utm_medium=member_android)
- **GitHub**: [github.com/bldewasurendra](https://github.com/bldewasurendra)
- **Phone**: `0771759318` ([tel:+94771759318](tel:+94771759318))
- **WhatsApp**: [Chat directly on WhatsApp](https://wa.me/94771759318)
