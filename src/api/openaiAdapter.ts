import { Constants } from '@/constants';
import { sendChatStream } from './chat';
import { ChatMessage } from '@/types';

// Define a type for valid OpenAI models that have pricing information
type OpenAIModelWithPricing = keyof typeof Constants.MODEL_PRICING;

/**
 * OpenAIAdapter handles interactions with the OpenAI API,
 * including cost calculation and error handling.
 */
export class OpenAIAdapter {
  private apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      console.error("API Key is missing for OpenAIAdapter");
      // Use an empty string rather than null to avoid potential errors
      this.apiKey = "";
    } else {
      this.apiKey = apiKey;
    }
  }

  /**
   * Calculate the cost of API usage based on model and token counts
   * @param model The OpenAI model used
   * @param inputTokens Number of tokens in the prompt
   * @param outputTokens Number of tokens in the completion
   * @returns Calculated cost in USD or null if pricing info not found
   */
  calculateCost(model: string, inputTokens: number, outputTokens: number): number | null {
    // Type guard to check if the model exists in MODEL_PRICING
    if (!(model in Constants.MODEL_PRICING)) {
      console.warn(`Pricing info not found for model: ${model}`);
      return null;
    }
    
    const pricing = Constants.MODEL_PRICING[model as OpenAIModelWithPricing];
    
    // Ensure non-negative token counts
    inputTokens = Math.max(0, inputTokens);
    outputTokens = Math.max(0, outputTokens);
    
    const inputCost = (inputTokens / 1000000) * pricing.input;
    const outputCost = (outputTokens / 1000000) * pricing.output;
    return inputCost + outputCost;
  }

  /**
   * Sends a chat request to OpenAI API and streams the response
   * @param model OpenAI model to use
   * @param messages Array of chat messages
   * @param streamReadCB Callback function for processing stream chunks
   * @returns Promise resolving to response status and data
   */
  async sendChatRequest(
    model: string,
    messages: ChatMessage[],
    streamReadCB?: (stream: string) => Promise<void>
  ) {
    try {
      // Use the existing sendChatStream function
      return await sendChatStream(this.apiKey, model, messages, streamReadCB);
    } catch (error: any) {
      console.error("OpenAI API request failed:", error);
      const errorMessage = error.message || "Failed to communicate with OpenAI API.";
      return {
        status: "ERROR",
        data: errorMessage
      };
    }
  }

  /**
   * Get the maximum token context length for a specific model
   * @param model The model name
   * @returns Maximum token context length or undefined if not found
   */
  getModelMaxTokens(model: string): number | undefined {
    switch(model) {
      case Constants.GPT_3_5: return Constants.GPT_3_5_MAX_TOKENS;
      case Constants.GPT_4: return Constants.GPT_4_MAX_TOKENS;
      case Constants.GPT_4_TURBO: return Constants.GPT_4_TURBO_MAX_TOKENS;
      case Constants.GPT_4_OMNI: return Constants.GPT_4_OMNI_MAX_TOKENS;
      // GPT-4.1 Family
      case Constants.GPT_4_1: return Constants.GPT_4_1_MAX_TOKENS;
      case Constants.GPT_4_1_MINI: return Constants.GPT_4_1_MINI_MAX_TOKENS;
      case Constants.GPT_4_1_NANO: return Constants.GPT_4_1_NANO_MAX_TOKENS;
      // o-Series Models
      case Constants.O1: return Constants.O1_MAX_TOKENS;
      case Constants.O1_MINI: return Constants.O1_MINI_MAX_TOKENS;
      case Constants.O3: return Constants.O3_MAX_TOKENS;
      case Constants.O3_MINI: return Constants.O3_MINI_MAX_TOKENS;
      case Constants.O4_MINI: return Constants.O4_MINI_MAX_TOKENS;
      default: return undefined;
    }
  }

  /**
   * Check if a token count exceeds the context limit for a model
   * @param model The model name
   * @param tokens Current token count
   * @returns True if context limit is exceeded, false otherwise
   */
  isOverContextLimit(model: string, tokens: number): boolean {
    const max = this.getModelMaxTokens(model);
    return max ? tokens > max : false;
  }
} 