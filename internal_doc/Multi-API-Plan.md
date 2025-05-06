Okay, here is a plan of attack to refactor the application for multi-provider AI support. This plan focuses on creating an abstraction layer and then implementing specific providers.
Goal: Allow users to select and use different AI providers (OpenAI, Google AI, Hugging Face) within the existing chat interface.
Phase 1: Abstraction & Refactoring Existing Code
Define the Core API Adapter Interface (src/api/adapter.ts):
Create a new TypeScript interface, IApiAdapter.
Define the essential methods needed by the chat logic (useChat hook). This should include:
sendChatStream: Takes standardized parameters (model ID specific to the provider, messages in a common format, streaming callback, optional tools). Returns a standardized promise that resolves upon stream completion with final content or tool calls, or rejects on error.
The streaming callback (streamReadCB) should receive standardized chunk objects indicating content, tool use progress, errors, or completion.
Define standardized types for messages, tool calls, stream chunks, and final responses that are provider-agnostic. (e.g., AdapterChatMessage, AdapterToolCall, AdapterStreamChunk, AdapterFinalResponse).
Refactor OpenAIAdapter (src/api/chat.ts):
Modify OpenAIAdapter to implement the new IApiAdapter interface.
Update the sendChatStream method signature to match IApiAdapter.
Internal Translation: Inside sendChatStream, translate the standardized input messages/tools into the OpenAI-specific format before making the fetch call.
Response Translation: Modify the stream processing logic to parse OpenAI's SSE events (delta.content, delta.tool_calls, [DONE]) and call streamReadCB with the standardized AdapterStreamChunk objects.
Modify the method to return the standardized AdapterFinalResponse upon completion.
Keep existing OpenAI-specific logic like cost calculation within this adapter, potentially exposing it via an optional interface method if needed generically, or keeping it private.
Centralize Model Definitions (src/lib/models.ts or similar):
Create a new file to act as a registry for all supported models across different providers.
Define a ModelInfo interface: { id: string; name: string; provider: 'openai' | 'google' | 'huggingface'; providerModelId: string; capabilities: { vision: boolean; maxTokens: number; /* other relevant flags */ }; pricing?: { input: number; output: number }; /* USD per 1M tokens or similar */ }.
Move existing model definitions from src/constants.ts into this new registry, populating the ModelInfo structure. Mark them with provider: 'openai'.
Create helper functions: getModelInfo(id: string), getModelsByProvider(provider: string).
Refactor existing code (e.g., OpenAIAdapter.getModelMaxTokens, overContextLimit, modelSuggester.ts, model selection UI) to use this registry instead of src/constants.ts for model properties.
Update Settings Management (src/contexts/settingsContext.tsx, src/hooks/useUserSettings.ts):
Add selectedProvider: string (defaulting to 'openai') to the SettingsState.
Add fields for API keys for other providers (e.g., googleApiKey: string | null, huggingfaceApiKey: string | null). Decide on storage strategy (e.g., keep only the active provider's key in sessionStorage, others in localStorage or prompt user).
Update the context provider and useUserSettings hook.
Refactor useChat Hook (src/hooks/useChat.ts):
Import IApiAdapter and the specific adapter implementations (initially just OpenAIAdapter).
Instantiate the correct adapter based on settings.selectedProvider.
Replace direct calls to OpenAIAdapter methods with calls to the IApiAdapter interface methods.
Use the ModelRegistry to get the providerModelId from the selected model's id before calling adapter.sendChatStream.
Update the stream handling logic to work with the standardized AdapterStreamChunk objects from the streamReadCB.
Update the final response handling to work with the standardized AdapterFinalResponse.
Adapt token counting and cost display logic. It might need to rely on the AdapterFinalResponse usage info or call the adapter's calculateCost if available.
Phase 2: Adding New Providers
Implement GoogleAIAdapter (src/api/google.ts):
Create the GoogleAIAdapter class implementing IApiAdapter.
Implement sendChatStream:
Use the googleApiKey from settings.
Translate AdapterChatMessage[] and AdapterToolCall[] (if supporting tools) to Google Gemini's API format (contents, tools).
Make fetch requests to the appropriate Google AI API endpoint (e.g., generativelanguage.googleapis.com/.../models/gemini-pro:streamGenerateContent).
Handle Google's authentication mechanism (API key in URL or headers).
Parse the Google SSE stream format, translating chunks into AdapterStreamChunks for streamReadCB.
Construct the AdapterFinalResponse upon completion.
Add Google models (e.g., Gemini variants) to the ModelRegistry (src/lib/models.ts) with provider: 'google'.
Implement HuggingFaceAdapter (src/api/huggingface.ts):
Create the HuggingFaceAdapter class implementing IApiAdapter.
Implement sendChatStream:
Use the huggingfaceApiKey from settings.
Translate messages/tools to the format expected by the Hugging Face Inference API/Endpoints (this might vary depending on the model/task).
Handle authentication (Bearer token).
Make fetch requests. Note: Streaming support varies on HF. Might need to implement non-streaming fallback or specific logic for server-sent events if the chosen endpoint supports it.
Parse the response (JSON or SSE) and translate to AdapterStreamChunk / AdapterFinalResponse.
Add relevant Hugging Face models to the ModelRegistry. Note that pricing/token limits might be less standardized here.

// --- CURRENT STATUS (as of end of refactoring session) --- //
// Phase 1 (Abstraction & Refactoring) is complete.
// Phase 2 (Adding New Providers) is complete - Initial implementations for GoogleAIAdapter and HuggingFaceAdapter exist.
// Next steps fall under Phase 3: UI Updates & Finalization.
// --- END CURRENT STATUS --- //

Phase 3: UI Updates & Finalization
Update Settings UI (src/components/SettingsModal.tsx):
Add a dropdown or radio group to select the selectedProvider.
Conditionally display the API key input field relevant to the selected provider.
Ensure API keys are saved correctly via useUserSettings.
Update Model Selection UI (src/components/ModelSelector.tsx or similar):
Fetch the list of models using getModelsByProvider(settings.selectedProvider) from the ModelRegistry.
Populate the dropdown only with models available for the currently selected provider.
Testing:
Thoroughly test chat functionality with each provider.
Verify API key handling, provider switching, model selection per provider.
Test streaming, text responses, tool usage (where applicable), error handling (invalid keys, network errors, API errors), and cost estimation/display.
This plan breaks down the task into manageable phases, starting with the critical abstraction layer. This allows for incremental implementation and testing.