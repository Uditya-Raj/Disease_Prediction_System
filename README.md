# Disease Prediction System

A Next.js-based disease prediction web application that allows users to enter symptoms and basic patient details and receive probable disease suggestions.

This project is being built as an academic prototype. In the first phase, it uses dummy data for the frontend. In the next phase, it will be connected to a real machine learning model, likely XGBoost.

---

## Features

- Symptom selection using searchable multi-select UI.
- Patient detail inputs such as age and gender.
- Mock disease predictions with confidence scores.
- Clean and responsive frontend built with Next.js.
- Results page with top predicted diseases.
- About and disclaimer page.
- Ready for future XGBoost integration.

---

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Data:** Dummy JSON / TypeScript mock data
- **Future ML:** XGBoost
- **Optional Backend Later:** FastAPI or Next.js API routes

---

## Project Structure

```bash
app/
  page.tsx
  predict/page.tsx
  results/page.tsx
  compare/page.tsx
  about/page.tsx
components/
  Navbar.tsx
  SymptomSelector.tsx
  ResultCard.tsx
  ConfidenceBar.tsx
lib/
  dummyData.ts
  utils.ts
public/
```

---

## Pages

- `/` — Home page
- `/predict` — Symptom input form
- `/results` — Prediction results
- `/compare` — Model comparison
- `/about` — Project details and disclaimer

---

## Dummy Prediction Flow

For the current phase, the app does not use a real ML model.
Instead, it returns mock predictions based on selected symptoms.

Example:

- Fever + cough + sore throat → Common Cold, Flu, Viral Infection
- Chest pain + shortness of breath → Cardiac Risk, Respiratory Issue
- Headache + nausea + fatigue → Migraine, Viral Fever, Dehydration

---

## Future Plan

1. Build the frontend completely.
2. Replace dummy data with API output.
3. Integrate the XGBoost model.
4. Add real prediction confidence and feature-based output.
5. Improve explainability and history tracking.

---

## Disclaimer

This application is for educational and informational purposes only.
It is **not** a replacement for professional medical diagnosis.

---

## Getting Started

```bash
npm install
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## Goal of This Project

The goal is to build a professional-looking disease prediction interface first, then connect it to a real machine learning backend later.

This allows the frontend, UX, and flow to be completed early while the model is developed separately.
