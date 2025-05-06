# OpenAI Model Updates (2025)

## Overview

This document outlines the addition of new OpenAI models to our self-hosted GPT application. As of April 2025, we've integrated support for the latest models from OpenAI, including the GPT-4.1 family and the o-series models.

## New Models Added

### GPT-4.1 Family

- **GPT-4.1** (`gpt-4.1`)
  - Latest flagship model with excellent capabilities
  - Input: $2.00 per 1M tokens
  - Output: $8.00 per 1M tokens
  - Ideal for: Complex reasoning, creative tasks, comprehensive analysis

- **GPT-4.1 Mini** (`gpt-4.1-mini`)
  - Balanced model with good performance/cost ratio
  - Input: $0.40 per 1M tokens
  - Output: $1.60 per 1M tokens
  - Ideal for: Everyday tasks requiring good reasoning capabilities

- **GPT-4.1 Nano** (`gpt-4.1-nano`)
  - Most affordable GPT-4.1 variant
  - Input: $0.10 per 1M tokens
  - Output: $0.40 per 1M tokens
  - Ideal for: Simple tasks, brief responses, economic usage

### o-Series Models

- **o1** (`o1`)
  - High-end model with superior reasoning capabilities
  - Input: $15.00 per 1M tokens
  - Output: $60.00 per 1M tokens
  - Ideal for: Advanced mathematical reasoning, formal logic, complex problem-solving

- **o1 Mini** (`o1-mini`)
  - More affordable version of o1
  - Input: $1.10 per 1M tokens
  - Output: $4.40 per 1M tokens
  - Ideal for: Strong reasoning needs with better cost efficiency

- **o3** (`o3`)
  - Specialized high-performance model
  - Input: $10.00 per 1M tokens
  - Output: $40.00 per 1M tokens
  - Ideal for: Diverse complex tasks requiring high accuracy

- **o3 Mini** (`o3-mini`)
  - More affordable version of o3
  - Input: $1.10 per 1M tokens
  - Output: $4.40 per 1M tokens
  - Ideal for: Balance of performance and cost

- **o4 Mini** (`o4-mini`)
  - Latest o-series mini model
  - Input: $1.10 per 1M tokens
  - Output: $4.40 per 1M tokens
  - Ideal for: Latest capabilities in the mini form factor

## Pricing Comparison

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|-------|------------------------|-------------------------|
| GPT-4.1 | $2.00 | $8.00 |
| GPT-4.1 Mini | $0.40 | $1.60 |
| GPT-4.1 Nano | $0.10 | $0.40 |
| o1 | $15.00 | $60.00 |
| o1 Mini | $1.10 | $4.40 |
| o3 | $10.00 | $40.00 |
| o3 Mini | $1.10 | $4.40 |
| o4 Mini | $1.10 | $4.40 |
| GPT-4o | $2.50 | $10.00 |
| GPT-4o Mini | $0.15 | $0.60 |
| GPT-3.5 Turbo | $0.50 | $1.50 |

## Implementation Details

### Changes Made

1. Added model constants and pricing information to `src/constants.ts`
2. Updated token context window limits in the `OpenAIAdapter` class
3. Enhanced the model suggester to recommend appropriate models based on content
4. Updated UI model options to include all new models with relevant descriptions and ratings

### Model Selection Strategy

The application now intelligently suggests models based on:

- Message content complexity
- Presence of image processing needs
- Advanced reasoning requirements
- Message length
- Task simplicity

## Recommendations for Users

- For everyday use: Consider GPT-4.1 Mini or GPT-4.1 Nano for the best balance of capability and cost
- For complex tasks: Use GPT-4.1 or o1 (when advanced reasoning is needed)
- For simple tasks: GPT-4.1 Nano offers excellent value
- Budget-conscious users: GPT-3.5 Turbo remains the most economical option

## Future Considerations

- Implement usage analytics by model to help users track costs
- Add support for specialized model variants (e.g., audio processing models)
- Consider adding model family filtering in the UI for easier selection 