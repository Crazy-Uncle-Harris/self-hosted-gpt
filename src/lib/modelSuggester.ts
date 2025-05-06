import { Constants } from '@/constants';

/**
 * Interface for model suggestion parameters
 */
interface SuggestionParams {
  messageContent: string;
  requiresVision?: boolean;
  requiresReasoning?: boolean;
  isSimpleTask?: boolean;
  isCostSensitive?: boolean;
}

/**
 * Suggests an appropriate OpenAI model based on the provided parameters
 * @param params Parameters to consider for model suggestion
 * @returns Suggested model ID (from Constants)
 */
export function suggestModel(params: SuggestionParams): string {
  const {
    messageContent,
    requiresVision = false,
    requiresReasoning = false,
    isSimpleTask = false,
    isCostSensitive = false
  } = params;

  // Content length analysis (approximate tokens)
  const wordCount = messageContent.split(/\s+/).length;
  const isLongContent = wordCount > 1000; // Roughly 1000+ words means long content
  
  // Decision logic for model suggestion
  if (requiresVision) {
    // For vision-based tasks, currently only GPT-4 Omni supports it
    return Constants.GPT_4_OMNI;
  }
  
  if (requiresReasoning) {
    // Advanced reasoning tasks
    if (isCostSensitive) {
      return Constants.GPT_4_1_MINI; // Good balance of cost and reasoning
    } else {
      return isLongContent ? Constants.GPT_4_1 : Constants.O1; // Best reasoning capabilities
    }
  }
  
  if (isSimpleTask) {
    // Simple tasks prioritize cost efficiency
    return isCostSensitive ? Constants.GPT_3_5 : Constants.GPT_4_1_NANO;
  }
  
  if (isLongContent) {
    // Long content needs models with large context windows
    return isCostSensitive ? Constants.GPT_4_1_MINI : Constants.GPT_4_1;
  }
  
  // Default recommendation for everyday use
  return isCostSensitive ? Constants.GPT_4_1_NANO : Constants.GPT_4_1_MINI;
}

/**
 * Analyzes message content to estimate task complexity
 * @param messageContent The message content to analyze
 * @returns Object with estimated task properties
 */
export function analyzeTaskComplexity(messageContent: string): {
  requiresReasoning: boolean;
  isSimpleTask: boolean;
} {
  const content = messageContent.toLowerCase();
  
  // Check for keywords indicating complex reasoning
  const reasoningKeywords = [
    'explain', 'analyze', 'compare', 'evaluate', 'synthesize',
    'complex', 'detailed', 'thorough', 'comprehensive',
    'algorithm', 'logic', 'math', 'mathematics', 'proof'
  ];
  
  // Check for keywords indicating simple tasks
  const simpleTaskKeywords = [
    'summarize', 'list', 'simple', 'brief', 'short',
    'quick', 'help', 'find', 'define', 'meaning'
  ];
  
  const hasReasoningKeywords = reasoningKeywords.some(keyword => 
    content.includes(keyword)
  );
  
  const hasSimpleTaskKeywords = simpleTaskKeywords.some(keyword => 
    content.includes(keyword)
  );
  
  return {
    requiresReasoning: hasReasoningKeywords,
    isSimpleTask: hasSimpleTaskKeywords && !hasReasoningKeywords
  };
}

/**
 * Simple interface to suggest a model based only on message content
 * @param messageContent The user's message content
 * @param isCostSensitive Whether cost is a primary concern
 * @returns Suggested model ID
 */
export function suggestModelFromMessage(
  messageContent: string, 
  isCostSensitive = false
): string {
  const { requiresReasoning, isSimpleTask } = analyzeTaskComplexity(messageContent);
  
  return suggestModel({
    messageContent,
    requiresReasoning,
    isSimpleTask,
    isCostSensitive
  });
} 