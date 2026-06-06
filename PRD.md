# Product Requirements Document: Arabic Modern Vocabulary Website

## 1. Overview

Arabic Modern Vocabulary is a website that helps users discover, understand, and learn modern Arabic words and expressions that are difficult to find in traditional dictionaries. The product focuses on contemporary vocabulary used in technology, culture, media, business, internet communities, and everyday modern life.

The core experience is a searchable and browsable vocabulary list with clear Arabic terms, English meanings, usage notes, examples, and categorization.

## 2. Problem

Many modern words, phrases, and concepts are hard to find in Arabic, especially when they come from fast-moving areas such as technology, startups, social media, AI, design, gaming, finance, and pop culture.

Users often face these problems:

- Traditional dictionaries do not include new or modern terms.
- Existing translations may sound too formal, outdated, or unnatural.
- It is hard to know which Arabic word is commonly used versus technically correct.
- Learners and writers need examples that show how words are used in real contexts.
- Arabic speakers may use different terms across regions, creating confusion.

## 3. Goals

- Provide a modern Arabic vocabulary list for new and hard-to-find words.
- Make vocabulary easy to search, browse, and understand.
- Show useful context, including examples, categories, pronunciation, and usage notes.
- Help users choose natural Arabic equivalents for modern English terms.
- Build a foundation for a community-powered vocabulary database.

## 4. Non-Goals

- Replace full Arabic dictionaries.
- Provide legal, medical, or certified translation services.
- Cover every classical Arabic word.
- Build a full language-learning platform in the MVP.
- Support complex grammar lessons in the first version.

## 5. Target Users

- Arabic learners who want modern vocabulary.
- Translators and writers looking for natural Arabic terms.
- Arabic speakers who want equivalents for English modern words.
- Students and professionals working in technology, media, design, finance, AI, or business.
- Content creators who write Arabic content for modern topics.

## 6. User Stories

- As a learner, I want to search for an English modern word so I can find a useful Arabic equivalent.
- As a writer, I want to see example sentences so I can use the Arabic word naturally.
- As a translator, I want to compare multiple Arabic options so I can choose the best one for my context.
- As a user, I want to browse by category so I can discover related vocabulary.
- As a contributor, I want to suggest a new word so the vocabulary list can grow.
- As an admin, I want to review submitted words before publishing them.

## 7. MVP Scope

### 7.1 Vocabulary List

The website must display a list of modern vocabulary entries.

Each entry should include:

- English term
- Arabic equivalent
- Transliteration, if useful
- Short definition
- Category
- Example sentence in Arabic
- English explanation or translation of the example
- Usage notes
- Tags

### 7.2 Search

Users must be able to search vocabulary by:

- English word
- Arabic word
- Tags
- Category

### 7.3 Categories

The MVP should include categories such as:

- Technology
- Artificial Intelligence
- Internet and Social Media
- Business and Startups
- Design and Creativity
- Gaming
- Finance
- Culture and Lifestyle
- Media
- Everyday Modern Speech

### 7.4 Vocabulary Detail Page

Each vocabulary item should have a detail page with:

- Main Arabic translation
- Alternative Arabic translations
- Definition
- Example sentences
- Notes about formality and common usage
- Related terms

### 7.5 Submit a Word

Users should be able to submit a suggested word with:

- English term
- Suggested Arabic equivalent
- Optional explanation
- Optional example sentence
- Optional source or context

Submitted words should not be published automatically in the MVP.

### 7.6 Admin Review

Admins should be able to:

- View submitted words
- Approve submissions
- Edit submissions before publishing
- Reject submissions

## 8. Future Features

- User accounts and saved vocabulary lists
- Voting on best translations
- Regional Arabic variants
- Audio pronunciation
- Spaced repetition flashcards
- Browser extension
- API for developers
- AI-assisted vocabulary suggestions
- Community comments and discussion
- Import/export vocabulary lists
- Difficulty levels

## 9. Content Guidelines

Vocabulary entries should be:

- Clear and practical
- Modern and relevant
- Natural in Arabic usage
- Marked when formal, technical, slang, or region-specific
- Supported by examples when possible

For words with multiple Arabic translations, the product should explain the difference between them instead of showing only one answer.

Example:

| English | Arabic | Notes |
| --- | --- | --- |
| Algorithm | خوارزمية | Common technical term |
| Startup | شركة ناشئة | Common business term |
| Interface | واجهة | Used in software and design |
| Prompt | مطالبة / توجيه | Context depends on AI or general usage |

## 10. Data Model

### Vocabulary Entry

- id
- english_term
- arabic_term
- transliteration
- definition
- category
- tags
- formality_level
- usage_notes
- example_arabic
- example_english
- alternatives
- related_terms
- status
- created_at
- updated_at

### Submission

- id
- english_term
- suggested_arabic_term
- explanation
- example_sentence
- source_context
- submitter_email
- status
- admin_notes
- created_at
- reviewed_at

## 11. UX Requirements

- The homepage should immediately show search and featured vocabulary.
- Search should feel fast and simple.
- Vocabulary cards should be readable on mobile and desktop.
- Arabic text should use proper right-to-left display.
- Mixed Arabic and English content should be visually clean.
- Categories should be easy to browse.
- The interface should feel modern, minimal, and trustworthy.

## 12. Technical Requirements

- Responsive website for desktop and mobile.
- Proper RTL support for Arabic content.
- Database-backed vocabulary entries.
- Admin-only review workflow for submissions.
- SEO-friendly pages for vocabulary terms.
- Basic analytics for search terms and popular entries.
- Accessible UI with readable contrast and keyboard navigation.

## 13. Success Metrics

- Number of published vocabulary entries.
- Number of searches per week.
- Search success rate.
- Number of user submissions.
- Submission approval rate.
- Returning users.
- Organic search traffic.
- Average time spent on vocabulary detail pages.

## 14. MVP Acceptance Criteria

- Users can browse published vocabulary entries.
- Users can search by English or Arabic terms.
- Users can open a detail page for each word.
- Users can submit new vocabulary suggestions.
- Admins can review, approve, edit, or reject submissions.
- Arabic content displays correctly in RTL.
- Website works well on mobile and desktop.

## 15. Open Questions

- Should the first version support only English-to-Arabic, or also Arabic-to-English?
- Should regional Arabic terms be included in the MVP?
- Should user submissions require email verification?
- Should AI suggestions be allowed before admin review?
- What tone should the Arabic translations prefer: formal Arabic, natural modern Arabic, or both?
