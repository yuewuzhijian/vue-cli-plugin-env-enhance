declare function loadEnv(mode: string, envDir: string, prefixes?: string | string[], useProcessEnv?: boolean): Record<string, string>;

declare const pluginName = "env-enhance";
interface PluginOptions {
    /** The directory from which .env files are loaded, refer to vite */
    envDir?: string;
    /** Env variables starting with envPrefix will be exposed to your client source code, refer to vite */
    envPrefix?: string | string[];
    /** Whether to inject env variables to "import.meta.env" */
    useImportMetaEnv?: boolean;
}
declare function getCurrentMode(): string;

export { type PluginOptions, getCurrentMode, loadEnv, pluginName };
