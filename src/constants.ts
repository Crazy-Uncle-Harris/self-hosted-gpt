export class Constants {
  // CSS
  static readonly MODAL_MAIN_ELEM = "MAIN_WRAPPER";
  static readonly BG_DARK_CLASS = "dark-theme-bg";
  static readonly SCROLLBAR_DARK_CLASS = "scroll-dark";

  // Models
  static readonly GPT_3_5 = "gpt-3.5-turbo";
  static readonly GPT_4 = "gpt-4";
  static readonly GPT_4_TURBO = "gpt-4-turbo"
  static readonly GPT_4_OMNI = "gpt-4o";
  
  // GPT-4.1 Family
  static readonly GPT_4_1 = "gpt-4.1";
  static readonly GPT_4_1_MINI = "gpt-4.1-mini";
  static readonly GPT_4_1_NANO = "gpt-4.1-nano";
  
  // o-Series Models
  static readonly O1 = "o1";
  static readonly O1_MINI = "o1-mini";
  static readonly O3 = "o3";
  static readonly O3_MINI = "o3-mini";
  static readonly O4_MINI = "o4-mini";

  static readonly GPT_3_5_MAX_TOKENS = 4096;
  static readonly GPT_4_MAX_TOKENS = 8192;
  static readonly GPT_4_TURBO_MAX_TOKENS = 128000;
  static readonly GPT_4_OMNI_MAX_TOKENS = 128000;
  
  // New model token limits
  static readonly GPT_4_1_MAX_TOKENS = 128000;
  static readonly GPT_4_1_MINI_MAX_TOKENS = 128000;
  static readonly GPT_4_1_NANO_MAX_TOKENS = 128000;
  static readonly O1_MAX_TOKENS = 128000;
  static readonly O1_MINI_MAX_TOKENS = 128000;
  static readonly O3_MAX_TOKENS = 128000;
  static readonly O3_MINI_MAX_TOKENS = 128000;
  static readonly O4_MINI_MAX_TOKENS = 128000;
  
  // Model pricing information (USD per 1M tokens)
  static readonly MODEL_PRICING = {
    // Existing models
    [Constants.GPT_3_5]: { input: 0.50, output: 1.50 },
    [Constants.GPT_4]: { input: 30.00, output: 60.00 },
    [Constants.GPT_4_TURBO]: { input: 10.00, output: 30.00 },
    [Constants.GPT_4_OMNI]: { input: 2.50, output: 10.00 },
    
    // GPT-4.1 Family
    [Constants.GPT_4_1]: { input: 2.00, output: 8.00 },
    [Constants.GPT_4_1_MINI]: { input: 0.40, output: 1.60 },
    [Constants.GPT_4_1_NANO]: { input: 0.10, output: 0.40 },
    
    // o-Series Models
    [Constants.O1]: { input: 15.00, output: 60.00 },
    [Constants.O1_MINI]: { input: 1.10, output: 4.40 },
    [Constants.O3]: { input: 10.00, output: 40.00 },
    [Constants.O3_MINI]: { input: 1.10, output: 4.40 },
    [Constants.O4_MINI]: { input: 1.10, output: 4.40 },
  };
  
  // Model capabilities and ratings (1-5 scale, with 5 being best)
  static readonly MODEL_CAPABILITIES = {
    // Existing models
    [Constants.GPT_3_5]: { 
      reasoning: 3, 
      costEfficiency: 5, 
      description: "Good balance of capability and cost for simple tasks" 
    },
    [Constants.GPT_4]: { 
      reasoning: 4, 
      costEfficiency: 1, 
      description: "Strong overall capabilities, but expensive" 
    },
    [Constants.GPT_4_TURBO]: { 
      reasoning: 4, 
      costEfficiency: 2, 
      description: "Similar to GPT-4 with larger context window" 
    },
    [Constants.GPT_4_OMNI]: { 
      reasoning: 5, 
      costEfficiency: 3, 
      description: "Excellent capabilities with better cost efficiency than GPT-4" 
    },
    
    // GPT-4.1 Family
    [Constants.GPT_4_1]: { 
      reasoning: 5, 
      costEfficiency: 3, 
      description: "Latest flagship model for complex reasoning and creative tasks" 
    },
    [Constants.GPT_4_1_MINI]: { 
      reasoning: 4, 
      costEfficiency: 4, 
      description: "Good balance of performance and cost for everyday tasks" 
    },
    [Constants.GPT_4_1_NANO]: { 
      reasoning: 3, 
      costEfficiency: 5, 
      description: "Most affordable GPT-4.1 variant for simple tasks" 
    },
    
    // o-Series Models
    [Constants.O1]: { 
      reasoning: 5, 
      costEfficiency: 1, 
      description: "Superior reasoning for advanced mathematical and logical tasks" 
    },
    [Constants.O1_MINI]: { 
      reasoning: 4, 
      costEfficiency: 3, 
      description: "Strong reasoning with better cost efficiency than O1" 
    },
    [Constants.O3]: { 
      reasoning: 5, 
      costEfficiency: 1, 
      description: "Specialized high-performance model for diverse complex tasks" 
    },
    [Constants.O3_MINI]: { 
      reasoning: 4, 
      costEfficiency: 3, 
      description: "Balance of performance and cost for various tasks" 
    },
    [Constants.O4_MINI]: { 
      reasoning: 4, 
      costEfficiency: 3, 
      description: "Latest mini model with strong capabilities" 
    },
  };

  // LocalStorage Keys;
  static readonly LS_SETTINGS_KEY = "LS-SETTINGS";

  // Taken from https://platform.openai.com/docs/guides/chat/instructing-chat-models
  static readonly DEFAULT_SYS_MSG = "You are GPT, a large language model trained by OpenAI. Answer as concisely as possible.";

  // Errors
  static readonly DEFAULT_ERR_MSG = "There was an error generating the response."

  static readonly DB_INIT_ERR_MSG = "There was an error opening IndexedDB. Site may function incorrectly! \nPlease ensure your browser allows this site to store data locally."
  static readonly DB_ERR_MSG = "There was an error saving/reading from IndexedDB. Site may function incorrectly! \nPlease ensure your browser allows this site to store data locally."

  // DB
  static readonly DB_NAME = "SelfHostGPT";
  static readonly DB_VERSION = 2;
  static readonly DB_CHATS_STORE = "chats";

  // Default Messages (When you start new chat)
  static readonly TITLE = "Self-Host GPT";
  static readonly NO_API_KEY_MSG1 = "Please ensure you have entered your OpenAI APIKey in the settings"
  static readonly NO_API_KEY_MSG2 = "found at the top left of the page."
  static readonly NO_API_KEY_SELF_HOST = "If self-hosting, ensure it is set in the .env file."

  // Other
  static readonly BLANK_CHAT_ID = -1;  // Something our real chat will never have.
}
