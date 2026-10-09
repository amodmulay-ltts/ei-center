# PowerPoint Prompt Usage Guide

## Quick Start

### How to Generate a PowerPoint Using the Prompt

1. **Open Microsoft Copilot for PowerPoint**
   - Go to [copilot.microsoft.com](https://copilot.microsoft.com) or open PowerPoint 365 and click "Copilot" in the ribbon

2. **Access the prompt file**
   - Open `/ppt-prompt.md` from the project repository
   - Copy the entire content (or specific sections you want)

3. **Paste into Copilot with a request**

   Example requests:

   **Full presentation generation:**
   ```
   Create a complete PowerPoint presentation for the Engineering Intelligence 
   Center using this design system and content structure. Use dark navy background 
   (#070b14), bright blue accents (#3d8bff), and teal secondary accents (#3fd0c9). 
   Include all 9 sections from the prompt: Hero, Discipline, Stack, AI Café, 
   Lifecycle, Gallery, Proofs, Engagement, and AI Models. Apply the 6 layout 
   patterns as specified.
   ```

   **Single section generation:**
   ```
   Create 3 slides for the "AI Models Portfolio" section using this design system. 
   Include the 5 model levels (No AI, Local, Enterprise, Hybrid, Frontier) with 
   pricing information and a gradient accent bar. Use the dark theme with colors 
   as specified in the design tokens.
   ```

   **Design refinement:**
   ```
   Generate a slide using the Four-Card Grid pattern. Show the four Engineering 
   Intelligence Lenses: Engineering AI, Agentic AI, Physical AI, and Industrial AI. 
   Use the specified lens colors and layout pattern. Include 2-3 lines of description 
   text under each card.
   ```

4. **Review and edit**
   - Copilot will generate slides based on the prompt
   - Use Copilot's "Design Ideas" feature to refine further
   - Manually adjust spacing, text, or colors if needed
   - Test transitions and animations

5. **Save and share**
   - Save to OneDrive or SharePoint
   - Export as PDF if needed
   - Share the link with stakeholders

---

## Design System Quick Reference

### Essential Colors (always include in requests)
- **Dark background**: #070b14 (must use this)
- **Card surface**: #111a2c
- **Primary text**: #f2f5fa (off-white)
- **Secondary text**: #97a3b9 (muted blue)
- **Primary accent**: #3d8bff (bright blue) — use for emphasis, buttons, links
- **Secondary accent**: #3fd0c9 (teal) — use for quotes, highlights
- **Borders**: rgba(255,255,255,0.08) (very subtle)

### Key Layout Patterns to Reference
When requesting specific slides, mention the pattern:
- **Pattern 1**: Title + Lead Text (for section openers)
- **Pattern 2**: Four-Card Grid (for lenses, capabilities, or groupings of 4)
- **Pattern 3**: Vertical Stack (for journey, processes, hierarchies)
- **Pattern 4**: Two-Column Comparison (for side-by-side comparisons)
- **Pattern 5**: KPI/Stat Tiles (for metrics and numbers)
- **Pattern 6**: Quote Block (for testimonials or key statements)

---

## Common Requests & Responses

### "I need to update the pricing in the AI Models section"
1. Open `ppt-prompt.md` in the docs
2. Locate **Section 9: AI Models Portfolio**
3. Update the pricing information under each level
4. Update the version history at the end (increment version number)
5. Commit the changes to git
6. Request Copilot to regenerate that specific section with the new prompt

### "How do I ensure my presentation matches the website design?"
- Always use the color palette from the "Color Palette" section in the prompt
- Follow one of the 6 layout patterns — don't create custom layouts
- Keep dark theme (#070b14 background) consistent
- Use the typography specs: bold/semi-bold headers, regular body text
- No drop shadows — use borders and subtle background colors instead

### "Can I use this prompt for a different presentation?"
Yes, but:
1. Copy the design tokens and layout patterns (these are universal)
2. Replace the content sections with your own sections
3. Keep the color palette and typography guidelines
4. Maintain the same visual hierarchy and spacing

### "How do I update the prompt for new content?"
1. Edit `/ppt-prompt.md`
2. Update the relevant section(s) with new content
3. Scroll to "Version History & Updates" at the end
4. Add a new entry with:
   - Version number (v1.2, v1.3, etc.)
   - Date
   - Brief description of changes
5. Commit and push to git
6. The next time you request slides, use the updated prompt

---

## Tips for Best Results

### ✅ Do's
- **Be specific**: "Create 4 cards in a grid, each 300px wide, with blue top borders"
- **Reference patterns**: "Use Pattern 2: Four-Card Grid layout"
- **Include exact colors**: Paste hex codes (#3d8bff, not "blue")
- **Specify typography**: "Use 48pt bold for the title, 18pt regular for body text"
- **Use the eyebrow**: Every section should start with a small-caps label in bright blue
- **Add white space**: Dark slides benefit from generous spacing around content

### ❌ Don'ts
- **Don't mix color schemes**: Don't ask for light backgrounds mixed with dark cards
- **Don't use drop shadows**: Use borders instead (it's in the design system)
- **Don't over-animate**: Stick to simple fades and basic transitions
- **Don't change fonts**: Keep to Segoe UI, Inter, or system UI fonts
- **Don't request serif fonts**: Headers and body should be sans-serif
- **Don't add heavy branding**: Let white space and color do the work

---

## Troubleshooting

### "The colors look wrong in the exported PDF"
- Try exporting as PPTX first, then convert to PDF
- Check your display color settings
- Ensure you're using exact hex codes, not approximations

### "Copilot isn't creating the layout I requested"
- Break the request into smaller, simpler slides
- Request one layout pattern at a time
- Use screenshots or references to show the desired layout
- Manually adjust if Copilot's version is close but not perfect

### "The text is too small/large"
- Specify font sizes in your request: "36pt for headers, 18pt for body"
- Ask Copilot to "Adjust text sizing for readability"
- Test the presentation in presentation mode before finalizing

### "I want to reuse slides from an old version"
- Open the old PPTX file
- Copy slides individually
- Use Copilot's "Design Ideas" to refresh them
- Or regenerate them using the updated prompt

---

## Workflow: From Change to Updated Presentation

### Step 1: Update Content
```bash
cd ei-center
# Edit ppt-prompt.md with new content
git add ppt-prompt.md
git commit -m "Update [section name] with [what changed]"
git push origin main
```

### Step 2: Generate New Slides
- Copy updated section from `ppt-prompt.md`
- Paste into Copilot with specific request
- Example: `"Create 3 slides for the 'AI Models' section using this updated content"`

### Step 3: Integrate into Presentation
- Copy generated slides into your working PowerPoint
- Apply Copilot's Design Ideas if desired
- Review for consistency with existing slides
- Save

### Step 4: Track Changes
- Keep a "Slide Changelog" in speaker notes if sharing with team
- Document which version of the prompt was used for each section
- Reference commit hash if significant changes were made

---

## FAQ

**Q: How often should I update ppt-prompt.md?**  
A: After any significant content change to the website or strategy. Typically quarterly, or whenever a new section or major update is released.

**Q: Can I use the prompt in other presentation tools (Google Slides, Keynote)?**  
A: Yes! The design tokens, layout patterns, and content are tool-agnostic. You'll need to manually recreate layouts, but the visual system translates well.

**Q: Is there a template PPTX I can start with?**  
A: Not yet, but you can generate one using Copilot with the full prompt, then save it as a template for future use.

**Q: How do I ensure brand consistency across presentations?**  
A: Always use the exact color codes, fonts, and spacing from the prompt. Use Copilot's Design Ideas sparingly (they often override your specifications). Manual adjustments are sometimes necessary.

**Q: Can I share the prompt with my team?**  
A: Yes! It's in the repo. Team members can copy it and generate their own slides, ensuring consistency across all presentations.

---

## Need Help?

- **Design questions**: Check the "Design System" and "Design Checklist" sections
- **Content questions**: See "Content Structure & Sections"
- **Layout questions**: Review the "Slide Layout Patterns"
- **Updates**: Add to "Version History" in ppt-prompt.md

Last updated: October 9, 2026
