# Self-Hosted GPT Modernization: TODO List

This document outlines the remaining tasks for the Self-Hosted GPT modernization project, organized according to the phases defined in the plan_of_attack-v4.md document.

## Phase 1: Core Updates & Basic Security (4-5 weeks)

- [✅] Update React to v19
- [✅] Update TypeScript to 5.4.x
- [✅] Update Vite to 5.x
- [✅] Implement secure API Key handling
- [✅] Create dedicated input field for OpenAI API key
- [✅] Implement temporary storage (React state or sessionStorage)
- [✅] Add clear security warnings about API key storage
- [✅] Update model constants with latest OpenAI offerings
- [✅] Create basic model selection UI
- [✅] Implement `OpenAIAdapter` with error handling & cost calculation
- [✅] Add token usage display with error state handling
- [✅] Implement main-thread token counting

## Phase 2: Cost Awareness & UX (4-5 weeks)

- [✅] Enhance model selection UI with cost/capability ratings
- [✅] Implement token usage statistics with localStorage
- [✅] Add error handling for storage limits
- [✅] Create model suggestion functionality based on content
- [✅] Develop basic prompt templates UI
- [✅] Refine API adapter error handling based on testing

## Phase 3: Advanced Features & Performance (5-6 weeks)

- [✅] Integrate vision model support (UI & API)
- [✅] Implement prompt optimization suggestions
- [✅] Enhance token tracking with input/output differentiation
- [ ] Implement multi-model conversation support (if needed)


## Phase 4: Polishing & Future-Proofing (4-5 weeks)

- [✅] Migrate from localStorage to IndexedDB for usage stats/conversation history
- [ ] Implement virtualization for message rendering (for large conversations)
- [ ] Explore/implement optional server-side API key proxy
- [ ] Create comprehensive documentation
- [ ] Conduct final testing and polish
- [ ] Set up learning sessions for IndexedDB, Advanced Security Patterns, Deployment Strategies

## Testing Strategy

- [ ] Develop unit tests for:
  - [ ] `calculateCost` function
  - [ ] `OpenAIAdapter` class
  - [ ] Token counting functions
  - [ ] Storage functions
- [ ] Implement integration tests
- [ ] Establish manual testing protocols for UI responsiveness, error messages, cost display accuracy

## Security Considerations

- [ ] Review and enhance API key handling
- [ ] Assess data storage security for conversation/usage history
- [ ] Consider future enhancements for client-side encryption

## Performance Optimization

- [ ] Monitor UI responsiveness during development
- [ ] Evaluate token counting performance impact
- [ ] Implement Web Worker solution if needed

## Learning Resources to Prepare

- [ ] OWASP Top 10 Web Application Security Risks
- [ ] MDN Web Storage API (LocalStorage, SessionStorage)
- [ ] MDN IndexedDB API
- [ ] MDN Web Workers API
- [ ] JavaScript Error Handling Best Practices 