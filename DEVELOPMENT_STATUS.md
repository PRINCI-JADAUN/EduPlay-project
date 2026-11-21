# Development status

## Completed in this milestone

- [x] Created separate Django backend and React/Vite frontend.
- [x] Added database-backed class, subject, chapter, practical, equipment, quiz, player, and attempt models.
- [x] Added seed content for Classes 1–12 and the Class 10 CBSE pH practical plus two related sample activities.
- [x] Added subject lists for each class from the requested syllabus index, source-linked chapters, per-subject activity records, class 10 science experiment templates, and YouTube/DIKSHA/Khan Academy links.
- [x] Added enterable per-subject classroom/laboratory buildings and a campus library, with sequential activity steps and draggable inventory, placement, pour, mix, measure, weigh, and observation controls.
- [x] Added visible 3D activity materials to classroom workspaces, including labeled card stacks and instrument props that update with the current task step.
- [x] Built a procedural third-person campus and student avatar with keyboard/mouse controls and Science-block interaction.
- [x] Differentiated classroom and laboratory interiors with procedural teachers, students, seating, subject-specific benches, and equipment.
- [x] Implemented a virtual pH practical, server-side action/observation validation, three difficulty questions, and server-calculated rewards.
- [x] Added a three-question, server-scored quiz after each seeded guided activity; activity rewards are issued after quiz submission.
- [x] Added structured story, scene, dialogue, mission, reward, and player-progress records; seeded age-tiered ten-scene stories for the existing activity/practical catalog.
- [x] Added safe story-schema validation, optional AI-provider draft generation, staff-only draft/publish APIs, and Django-admin editing/approval.
- [x] Connected story introductions, action-driven scene/dialogue updates, and quiz-completion endings to activity and practical gameplay.
- [x] Fixed the generic and Physical Education activity pick/place item mismatches; added regression checks across the seeded activity catalog.
- [x] Added guest mode and optional Supabase Auth/JWT and PostgreSQL settings.
- [x] Added backend workflow/authentication tests, a frontend onboarding interaction test, and production-build verification.

## Remaining work

- [ ] Add teacher, parent, and administrator workflows and role permissions.
- [ ] Add curriculum authoring endpoints, assignments, badges, and detailed progress reporting.
- [ ] Expand from the initial chemistry practical to additional full learning worlds and experiments.
- [ ] Expand the current catalog into 7–10 unique, curriculum-reviewed story activities per subject for every class; the current seed provides reusable story templates for existing activities instead.
- [ ] Add production-grade Supabase Row Level Security policies and verify them against a configured Supabase project.
- [ ] Add hosted AI provider integration, multiplayer/realtime features, authored avatar assets, and deployment automation.

## Known limitations

- The syllabus catalog transcribes the class/subject listings and source links from the supplied index; it is not a full chapter-by-chapter transcription of every CBSE syllabus.
- Chapter-by-chapter Classes 11–12 content has not yet been imported. The official CBSE Academic host failed trusted TLS access in this environment, so current official syllabus PDFs or an accessible official link are needed before adding those chapters and practicals.
- Most per-subject activities are reusable guided interaction templates. YouTube links are topic searches, and learning-platform links are general references rather than individually curated lessons.
- Activity quiz questions are generated from each activity's objective and procedure; curriculum experts should review them before classroom use.
- Story generation currently covers the existing catalog with reusable, age-tiered templates; complete unique stories and 7–10 activities per subject/class have not yet been authored. Provider-generated stories remain drafts pending teacher/admin approval.
- Only the Class 10 pH activity has predefined science results and validated observations. Other Science activities demonstrate the workflow and should not be treated as teacher-validated experiment simulations.
- The 3D avatar, buildings, and equipment are procedural placeholders, not rigged external GLB assets.
- Supabase and third-party AI integrations require project credentials and have not been tested against a hosted service.
- SQLite guest mode is intended for local demos, not a multi-user deployment.

