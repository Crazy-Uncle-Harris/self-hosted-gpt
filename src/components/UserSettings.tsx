import { useState, ReactElement } from 'react';
import Modal from '@/components/Modal';
import {
  useUserSettings,
  useUserSettingsDispatch,
  useUserSettingsDispatchFunctions,
} from '@/hooks/useUserSettings'
import { Constants } from '@/constants';
import styles from './UserSettings.module.css';

interface UserSettingsProps {
  refreshNewChat: () => void;
  closeSettings: () => void;
}

const ENV_APIKEY = import.meta.env.VITE_OPENAI_API_KEY;

export default function UserSettings({closeSettings, refreshNewChat} : UserSettingsProps) {
  const settings = useUserSettings();
  const dispatchSettings = useUserSettingsDispatch();
  const { setTheme, setModel, setAPIKey, setSystemMessage } = useUserSettingsDispatchFunctions(dispatchSettings);

  const [showAPIKey, setShowAPIKey] = useState(false);
  const [tooltipModel, setTooltipModel] = useState<string | null>(null);

  const darkTheme = settings.theme === "DARK";

  function toggleTheme() {
    setTheme(darkTheme ? "LIGHT" : "DARK");
  }

  function handleModelChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setModel(e.target.value);
  }

  function handleAPIKeyChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAPIKey(e.target.value);
  }

  function handleSysMsgChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setSystemMessage(e.target.value);
    refreshNewChat();
  }

  function resetAPIKey() {
    setAPIKey(ENV_APIKEY ?? "");
  }

  function resetSysMsg() {
    setSystemMessage(Constants.DEFAULT_SYS_MSG);
    refreshNewChat();
  }

  function darkThemeClass() {
    return darkTheme ? styles.dark : "";
  }

  function getStars(reasoning: number): string {
    // Convert reasoning level (1-5) to stars
    return "★".repeat(reasoning);
  }

  function getCostSymbol(model: string): string {
    const pricing = Constants.MODEL_PRICING[model as keyof typeof Constants.MODEL_PRICING];
    const totalCost = pricing.input + pricing.output;
    
    if (totalCost < 5) return "$";
    if (totalCost < 15) return "$$";
    if (totalCost < 30) return "$$$";
    if (totalCost < 60) return "$$$$";
    return "$$$$$";
  }

  function getModelTooltip(model: string): ReactElement | null {
    if (!model) return null;
    
    const capabilities = Constants.MODEL_CAPABILITIES[model as keyof typeof Constants.MODEL_CAPABILITIES];
    const pricing = Constants.MODEL_PRICING[model as keyof typeof Constants.MODEL_PRICING];
    
    return (
      <div className={`${styles.tooltip} ${darkThemeClass()}`}>
        <h4>{model}</h4>
        <p><strong>Description:</strong> {capabilities.description}</p>
        <p><strong>Reasoning:</strong> {getStars(capabilities.reasoning)}</p>
        <p><strong>Cost Efficiency:</strong> {getStars(capabilities.costEfficiency)}</p>
        <p><strong>Pricing:</strong> ${pricing.input}/1M input tokens, ${pricing.output}/1M output tokens</p>
      </div>
    );
  }

  return (
    <Modal closeModal={closeSettings}>
      <div className={`${styles.container} ${darkThemeClass()}`}>
        <div className={styles["inner-container"]}>
          <h2>Settings:</h2>
          <button className={`${styles["close-button"]} ${darkThemeClass()}`}
                  onClick={() => closeSettings()}>
            &#10006;
          </button>
          <hr className={styles.hline}/>
          <div className={styles["theme-container"]}>
            Theme:

            <button onClick={toggleTheme}
                    className={`${styles.toggle} ${darkThemeClass()}`}>
              <div className={styles["inner-toggle"]}/>
            </button>
            {darkTheme ? "Dark" : "Light"}
          </div>

          <div className={`${styles.model} ${darkThemeClass()}`}>
            <label htmlFor="model-input">Model:</label>
            <div className={styles.modelSelectContainer}>
              <select id="model-input"
                      value={settings.model}
                      onChange={handleModelChange}>
                <option value={Constants.GPT_3_5} 
                        onMouseEnter={() => setTooltipModel(Constants.GPT_3_5)}
                        onMouseLeave={() => setTooltipModel(null)}>
                  GPT-3.5-Turbo - {getCostSymbol(Constants.GPT_3_5)} | Reasoning: {getStars(Constants.MODEL_CAPABILITIES[Constants.GPT_3_5].reasoning)}
                </option>
                <option value={Constants.GPT_4}
                        onMouseEnter={() => setTooltipModel(Constants.GPT_4)}
                        onMouseLeave={() => setTooltipModel(null)}>
                  GPT-4 - {getCostSymbol(Constants.GPT_4)} | Reasoning: {getStars(Constants.MODEL_CAPABILITIES[Constants.GPT_4].reasoning)}
                </option>
                <option value={Constants.GPT_4_TURBO}
                        onMouseEnter={() => setTooltipModel(Constants.GPT_4_TURBO)}
                        onMouseLeave={() => setTooltipModel(null)}>
                  GPT-4-Turbo - {getCostSymbol(Constants.GPT_4_TURBO)} | Reasoning: {getStars(Constants.MODEL_CAPABILITIES[Constants.GPT_4_TURBO].reasoning)}
                </option>
                <option value={Constants.GPT_4_OMNI}
                        onMouseEnter={() => setTooltipModel(Constants.GPT_4_OMNI)}
                        onMouseLeave={() => setTooltipModel(null)}>
                  GPT-4o - {getCostSymbol(Constants.GPT_4_OMNI)} | Reasoning: {getStars(Constants.MODEL_CAPABILITIES[Constants.GPT_4_OMNI].reasoning)}
                </option>
                
                {/* GPT-4.1 Family */}
                <option value={Constants.GPT_4_1}
                        onMouseEnter={() => setTooltipModel(Constants.GPT_4_1)}
                        onMouseLeave={() => setTooltipModel(null)}>
                  GPT-4.1 - {getCostSymbol(Constants.GPT_4_1)} | Reasoning: {getStars(Constants.MODEL_CAPABILITIES[Constants.GPT_4_1].reasoning)}
                </option>
                <option value={Constants.GPT_4_1_MINI}
                        onMouseEnter={() => setTooltipModel(Constants.GPT_4_1_MINI)}
                        onMouseLeave={() => setTooltipModel(null)}>
                  GPT-4.1 Mini - {getCostSymbol(Constants.GPT_4_1_MINI)} | Reasoning: {getStars(Constants.MODEL_CAPABILITIES[Constants.GPT_4_1_MINI].reasoning)}
                </option>
                <option value={Constants.GPT_4_1_NANO}
                        onMouseEnter={() => setTooltipModel(Constants.GPT_4_1_NANO)}
                        onMouseLeave={() => setTooltipModel(null)}>
                  GPT-4.1 Nano - {getCostSymbol(Constants.GPT_4_1_NANO)} | Reasoning: {getStars(Constants.MODEL_CAPABILITIES[Constants.GPT_4_1_NANO].reasoning)}
                </option>
                
                {/* o-Series Models */}
                <option value={Constants.O1}
                        onMouseEnter={() => setTooltipModel(Constants.O1)}
                        onMouseLeave={() => setTooltipModel(null)}>
                  o1 - {getCostSymbol(Constants.O1)} | Reasoning: {getStars(Constants.MODEL_CAPABILITIES[Constants.O1].reasoning)}
                </option>
                <option value={Constants.O1_MINI}
                        onMouseEnter={() => setTooltipModel(Constants.O1_MINI)}
                        onMouseLeave={() => setTooltipModel(null)}>
                  o1 Mini - {getCostSymbol(Constants.O1_MINI)} | Reasoning: {getStars(Constants.MODEL_CAPABILITIES[Constants.O1_MINI].reasoning)}
                </option>
                <option value={Constants.O3}
                        onMouseEnter={() => setTooltipModel(Constants.O3)}
                        onMouseLeave={() => setTooltipModel(null)}>
                  o3 - {getCostSymbol(Constants.O3)} | Reasoning: {getStars(Constants.MODEL_CAPABILITIES[Constants.O3].reasoning)}
                </option>
                <option value={Constants.O3_MINI}
                        onMouseEnter={() => setTooltipModel(Constants.O3_MINI)}
                        onMouseLeave={() => setTooltipModel(null)}>
                  o3 Mini - {getCostSymbol(Constants.O3_MINI)} | Reasoning: {getStars(Constants.MODEL_CAPABILITIES[Constants.O3_MINI].reasoning)}
                </option>
                <option value={Constants.O4_MINI}
                        onMouseEnter={() => setTooltipModel(Constants.O4_MINI)}
                        onMouseLeave={() => setTooltipModel(null)}>
                  o4 Mini - {getCostSymbol(Constants.O4_MINI)} | Reasoning: {getStars(Constants.MODEL_CAPABILITIES[Constants.O4_MINI].reasoning)}
                </option>
              </select>
              {tooltipModel && getModelTooltip(tooltipModel)}
            </div>
            <div className={`${styles.modelInfo} ${darkThemeClass()}`}>
              <p><strong>Model Categories:</strong></p>
              <ul>
                <li><strong>GPT-3.5:</strong> Basic model, best for simple tasks and cost-efficiency</li>
                <li><strong>GPT-4:</strong> Advanced model with strong reasoning capabilities</li>
                <li><strong>GPT-4.1 Family:</strong> Latest generation with excellent performance/cost balance</li>
                <li><strong>o-Series:</strong> Specialized models for complex reasoning tasks</li>
              </ul>
              <p><small>Hover over each model in the dropdown for detailed information.</small></p>
              <p><small>$ = Low cost, $$$$$ = High cost. More stars = better reasoning capabilities.</small></p>
            </div>
          </div>

          <div className={styles["apikey-container"]}>
            <label htmlFor="apikey-input">
              {"API Key (Is this safe? "}
              <a href="https://github.com/darylhcw/self-hosted-gpt#questions"
                rel="external help"
                target="_black"
                className={darkThemeClass()}>
                {"See here"}
              </a>
              {"):"}
            </label>
            <input id="apikey-input"
                   className={`${styles["apikey-input"]} ${darkThemeClass()}`}
                   type={showAPIKey ? "text" : "password"}
                   value={settings.apiKey}
                   onChange={handleAPIKeyChange}/>
            <div>
              <button className={`${styles.button} ${darkThemeClass()}`}
                      onClick={() => setShowAPIKey(!showAPIKey)}>
                { showAPIKey ? "Hide" : "Show"}
              </button>
              <button className={`${styles.button} ${darkThemeClass()}`}
                      onClick={() => setAPIKey("")}>
                Clear
              </button>
              <button className={`${styles.button} ${darkThemeClass()}`}
                      onClick={() => resetAPIKey()}>
                Reset to .env value
              </button>
            </div>
          </div>

          <div className={styles["sysmsg-container"]}>
            <label htmlFor="sysmsg-input">System Message - (Base Context for Chat)</label>
            <textarea id="sysmsg-input"
                      className={`${styles.sysmsg} ${darkThemeClass()}`}
                      rows={6}
                      value={settings.systemMessage}
                      onChange={handleSysMsgChange}/>
            <button className={`${styles.button} ${darkThemeClass()}`}
                    onClick={() => resetSysMsg()}>
              Reset to Default
            </button>
          </div>

        </div>
      </div>
    </Modal>
  )
}
