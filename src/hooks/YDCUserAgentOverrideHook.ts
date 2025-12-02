import { BeforeRequestContext, BeforeRequestHook, Awaitable } from "./types.js";
import { SDK_METADATA } from "../lib/config.js";
 
// Inspired by https://www.speakeasy.com/docs/sdks/guides/hooks/user-agent-hook
export class YDCUserAgentOverrideHook implements BeforeRequestHook {
    beforeRequest(_: BeforeRequestContext, request: Request): Awaitable<Request> {
        const version = SDK_METADATA.sdkVersion;
        const ua = `youdotcom-typescript-sdk/${version}`
 
        // Try to set the standard user-agent header first
        request.headers.set("user-agent", ua);
 
        // Check if the header was actually set (it may silently fail in browsers)
        if (!request.headers.get("user-agent")) {
            // Fall back to a custom header if the user-agent couldn't be set
            request.headers.set("x-sdk-user-agent", ua);
        }
 
        return request;
    }
}